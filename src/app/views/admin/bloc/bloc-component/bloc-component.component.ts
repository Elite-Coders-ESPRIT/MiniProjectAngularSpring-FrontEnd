import { Component,OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {BlocFormComponent} from "../bloc-form/bloc-form.component";
import {FilterByBlocNamePipe} from "../pipe/filter-by-bloc-name.pipe";
import { Chambre } from 'src/app/Model/Chambre';
import { Foyer } from 'src/app/Model/Foyer';
import { Bloc } from 'src/app/Model/Bloc';
import { BlocService } from 'src/app/service/bloc/bloc.service';


@Component({
  selector: 'app-bloc-component',
  templateUrl: './bloc-component.component.html',
  styleUrls: ['./bloc-component.component.css'],
  providers:[FilterByBlocNamePipe]
})
export class BlocComponentComponent implements OnInit{

  blocs? : Bloc[];
  bloc? : Bloc;
  chambres? : Chambre[];
  searchTerm: string = '';
  idBlocToUpdate? : number;
  foyerToAdd? : Foyer;

  pageSize = 5;
  currentPage = 1;

  showDeleteToast?: boolean = false;
  showUpdateToast?: boolean = false;
  showInsertToast?: boolean = false;


  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    if (this.blocs != undefined){
      return this.blocs.slice(startIndex, startIndex + this.pageSize);
    }
    return null;
  }
  get totalPages() {
    return this.blocs!.length % this.pageSize === 0
      ? this.blocs!.length / this.pageSize
      : Math.floor(this.blocs!.length / this.pageSize) + 1;
  }
  constructor(private blocService: BlocService,private dialog:MatDialog) {

  }
  ngOnInit() {
    this.blocService.getBlocs().forEach(data => {
      this.blocs = data;
    }).then(r => {console.log("r : ",r)});
    if(this.showDeleteToast || this.showInsertToast || this.showUpdateToast){
      this.hideToastAfterDelay();
    }
  }

  openBlocAddForm(): void {
    const dialogRef = this.dialog.open(BlocFormComponent, {
      width: '50%',
      height: '65%',
      data : {
        action : 'add',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showDeleteToast= true;
      if(result){
        console.log("DATA TO ADD :",result);
        this.insertBloc(result);
        this.blocService.refreshPage();
        this.showInsertToast = true;
      }
    });
  }


  openBlocUpdateForm(bloc: Bloc): void {
    const dialogRef = this.dialog.open(BlocFormComponent, {
      width: '50%',
      height: '56%',
      data : {
        action : 'update',
        bloc: bloc
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBloc(result);
      }
    })
  }
    openBlocShowForm(bloc: Bloc): void {
    const dialogRef = this.dialog.open(BlocFormComponent, {
      width: '50%',
      height: '50%',
      data : {
        action : 'show',
        bloc: bloc
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBloc(result);
      }
    })
  }


  deleteItem(idBloc:string): void {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      console.log(idBloc);
      this.blocService.deleteBloc(idBloc.toString());
    }
    else
      {
        console.log('Deletion canceled');
      }
    }

  updateBloc(bloc: Bloc): void {
    this.blocService.updateBloc(bloc).subscribe(updatedBloc => {
      console.log('Bloc updated:', updatedBloc);
      this.showUpdateToast = true;
      this.hideToastAfterDelay();
    });
  }

  insertBloc(dataToAdd:any): void {
    this.foyerToAdd = dataToAdd.foyers;
    console.log(this.foyerToAdd);
    this.blocService.addBloc(dataToAdd.bloc).subscribe(addedBloc => {
      console.log("added bloc : ",addedBloc);
      addedBloc.foyers = this.foyerToAdd;
      console.log("FOYER : ",addedBloc.foyers);
      this.blocService.updateBloc(addedBloc).subscribe(value => {
        console.log("NEXT : ",value);
      });
    });
    this.showInsertToast = true;
  }
  private hideToastAfterDelay(): void {
    setTimeout(() => {
      this.showDeleteToast = false;
      this.showUpdateToast = false;
      this.showInsertToast = false;
    }, 3000);
  }

}

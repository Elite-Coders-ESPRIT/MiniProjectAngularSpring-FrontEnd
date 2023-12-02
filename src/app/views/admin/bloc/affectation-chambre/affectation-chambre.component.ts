import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Chambre } from 'src/app/Model/Chambre';
import { BlocService } from 'src/app/service/bloc/bloc.service';


@Component({
  selector: 'app-affectation-chambre',
  templateUrl: './affectation-chambre.component.html',
  styleUrls: ['./affectation-chambre.component.css'],
})
export class AffectationChambreComponent implements OnInit  {

  @Input() blocFromParent?: any;
  chambres!: Chambre[];
  selectedChambres!: Chambre[];
  @Output() myEvent = new EventEmitter<boolean>();
  constructor(private blocService:BlocService) {

  }


  ngOnInit() {
    console.log(this.blocFromParent);
    this.blocService.getAllUnassignedChambres().subscribe((chambres) =>{
      this.chambres=chambres;
  });
}

  affecter() {
    // console.log("Chambres a affecter : ",this.selectedChambres);
    this.myEvent.emit(true);
    if(this.blocFromParent){
      this.blocFromParent.chambres = this.selectedChambres;
      console.log("affectation du front : ",this.blocFromParent.chambres);
      this.blocService.updateBloc(this.blocFromParent).subscribe((updatedBloc) => {
        console.log(updatedBloc);
      })
    }
  }
}

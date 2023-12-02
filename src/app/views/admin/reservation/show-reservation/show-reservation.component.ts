import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bloc } from 'src/app/Model/Bloc';
import { Chambre } from 'src/app/Model/Chambre';
import { Etudiant } from 'src/app/Model/Etudiant';
import { Foyer } from 'src/app/Model/Foyer';
import { Reservation } from 'src/app/Model/Reservation';
import { Universite } from 'src/app/Model/Universite';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  selector: 'app-show-reservation',
  templateUrl: './show-reservation.component.html',
  styleUrls: ['./show-reservation.component.css']
})
export class ShowReservationComponent {

  etudiant: Etudiant = { 
    idEtudiant:.0,
    nomEt:'',
    prenomEt:'',
    cin:null,
    ecole:'',
    dateNaissance:null
  }
  reservation:Reservation={ 
    idReservation:0,
    anneeUniversitaire:0,
    estValide:false,
    numReservation:"Pas Encore",
    cinEtudiant:null,
    typeChambre:null

  };
  chambre: Chambre = { 
    idChambre: null,
    typeChambre:'',
    numeroChambre:null,
    blocIdBloc:null
  }
  universite: Universite = { 
    idUniversite: null,
    nomUniversite:'',
    adresse:null,
  }
  foyer : Foyer={
    idFoyer:null,
    nomFoyer:null,
    capaciteFoyer:null,
    universite:null
  }
  bloc:Bloc={
    idBloc:null,
    nomBloc:null,
    capaciteBloc:null
  }
  constructor(private route: ActivatedRoute,  private serviceReservation:ReservationService, private router: Router) { }

 
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['idReservation'];
      this.reservation.idReservation = id;
      console.log('read from the params: ', id);

      this.getByIdReservation(id).subscribe((data: Reservation) => {
        this.reservation = data;
        // Maintenant, cinEtudiant est disponible ici
        const cinEtudiant = this.reservation.cinEtudiant;
        console.log('read from the params: ', cinEtudiant);

        // Appeler la fonction avec cinEtudiant
        this.getByEtudiantByCin(cinEtudiant);
       this.getInfoByReservation(cinEtudiant);
      });
    });
  }
  getByIdReservation(id) {
    return this.serviceReservation.getByIdReservation(id);
  }

  getByEtudiantByCin(cinEtudiant){
    this.serviceReservation.getByEtudiantByCin(cinEtudiant).subscribe((data : Etudiant)=>{          
    this.etudiant = data;
    console.log("Object Etudiant ",this.etudiant);
    })
  }

  getInfoByReservation(cinEtudiant){
    this.serviceReservation.getInfoByReservation(cinEtudiant).subscribe((data : Map<string, Object>)=>{          
    this.foyer = data['foyer'];
    this.bloc=data['bloc'];
    this.chambre=data['chambre'];
    this.universite=data['universite'];
    console.log("Object all info  ",data);
  })
  }
}


import { Component , NgZone } from '@angular/core';
import { Reservation } from 'src/app/Model/Reservation';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  selector: 'app-ajouter-reservation',
  templateUrl: './ajouter-reservation.component.html',
  styleUrls: ['./ajouter-reservation.component.css']
})
export class AjouterReservationComponent {
  reservation:Reservation={ 
    idReservation:0,
    anneeUniversitaire:0,
    estValide:false,
    numReservation:"Pas Encore",
    cinEtudiant:null,
    typeChambre:null

  };

  message: string = '';
  constructor( private serviceReservation:ReservationService,  private zone: NgZone) { }
  ngOnInit(): void {
  }

  ajouterReservation(): void {
   
    this.serviceReservation.ajouterReservation(this.reservation).subscribe(
      (response) => {
        console.log('Réponse de l\'API :', response.message);
        this.message = response.message; 
        // Stocker this.reservation.cinEtudiant dans le localStorage
        localStorage.setItem('cinEtudiant', this.reservation.cinEtudiant.toString());
        setTimeout(() => {
          this.zone.run(() => {
            this.message = null;
          });
        }, 3000);
      },
      (error) => {
        console.error('Erreur lors de l\'appel à l\'API :', error);
        this.message = 'Une erreur s\'est produite lors de la réservation.'; 
        // Masquer le message après 3 secondes
        setTimeout(() => {
          this.zone.run(() => {
            this.message = null;
          });
        }, 3000);
      }
    );
  }

  
}

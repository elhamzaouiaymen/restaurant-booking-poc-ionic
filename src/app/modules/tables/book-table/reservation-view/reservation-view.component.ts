import { Component, OnInit, Input } from '@angular/core'
import { NavParams, ModalController } from '@ionic/angular'

@Component({
    selector: 'app-reservation-view',
    templateUrl: './reservation-view.component.html',
    styleUrls: ['./reservation-view.component.scss'],
})
export class ReservationViewComponent implements OnInit {
    data: any
    constructor(
        private navParams: NavParams,
        private modalCtrl: ModalController
    ) {}

    ngOnInit() {
        console.log(this.navParams.get('data'))
    }

    handleBack(): void {
        this.modalCtrl.dismiss()
    }
}

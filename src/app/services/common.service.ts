import { Injectable } from '@angular/core'
import {
    LoadingController,
    AlertController,
    ModalController,
    ToastController,
} from '@ionic/angular'

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    loader: any
    constructor(
        private loadingController: LoadingController,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
        public toastController: ToastController
    ) {}

    async presentLoading() {
        this.loader = await this.loadingController.create()
        await this.loader.present()

        const { role, data } = await this.loader.onDidDismiss()
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
        })
        toast.present()
    }

    async presentAlert(alertOptions: any) {
        const alert = await this.alertCtrl.create({
            header: alertOptions.header,
            subHeader: alertOptions.subHeader,
            message: alertOptions.message,
            buttons: alertOptions.buttons,
        })

        await alert.present()
    }

    async presentModal(page: any, data?: any) {
        const modal = await this.modalCtrl.create({
            component: page,
            componentProps: { data },
        })
        return await modal.present()
    }
}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BookTableComponent } from './book-table/book-table.component'
import { IonicModule } from '@ionic/angular'
import { TablesRoutingModule } from './tables-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { CommonService } from 'src/app/services/common.service'
import { QRCodeModule } from 'angularx-qrcode'
import { ReservationViewComponent } from './book-table/reservation-view/reservation-view.component'
@NgModule({
    declarations: [BookTableComponent, ReservationViewComponent],
    entryComponents: [ReservationViewComponent],
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        TablesRoutingModule,
        QRCodeModule,
    ],
    providers: [CommonService],
})
export class TablesModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableViewComponent } from './table-view/table-view.component'
import { LoaderComponent } from './loader/loader.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
    declarations: [TableViewComponent, LoaderComponent],
    imports: [CommonModule, IonicModule],
    exports: [TableViewComponent, LoaderComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { BookTableComponent } from './book-table/book-table.component'

const routes: Routes = [
    {
        path: '',
        component: BookTableComponent,
    },
    {
        path: 'book-table',
        component: BookTableComponent,
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TablesRoutingModule {}

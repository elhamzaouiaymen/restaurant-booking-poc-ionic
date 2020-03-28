import { Component, OnInit, Input, SimpleChanges } from '@angular/core'

@Component({
    selector: 'app-table-view',
    templateUrl: './table-view.component.html',
    styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
    @Input()
    sits: number

    sitsArray: any

    constructor() {}

    ngOnInit() {
        this.sitsArray = Array(this.sits).fill(0)
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges.hasOwnProperty('sits')) {
            this.sitsArray = Array(simpleChanges.sits.currentValue).fill(0)
        }
    }
}

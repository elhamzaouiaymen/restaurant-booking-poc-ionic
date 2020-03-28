import { Component, OnInit, ComponentRef } from '@angular/core'
import DateUtils from '../../../utils/date.utils'
import { IReservation } from 'src/app/models/reservation.model'
import { mockTables } from 'src/app/models/mockData'
import { mockReservations } from 'src/app/models/mockData'
import { ITable, ITableFilter } from 'src/app/models/table.model'
import { CommonService } from 'src/app/services/common.service'
import { ReservationViewComponent } from './reservation-view/reservation-view.component'
import * as moment from 'moment'

@Component({
    selector: 'app-book-table',
    templateUrl: './book-table.component.html',
    styleUrls: ['./book-table.component.scss'],
})
export class BookTableComponent implements OnInit {
    isLoading: boolean = false
    AVAILABLE_TIMESLOTS = [
        '5:00 PM',
        '5:30 PM',
        '6:00 PM',
        '6:30 PM',
        '7:00 PM',
        '7:30 PM',
        '8:00 PM',
        '8:30 PM',
        '9:00 PM',
        '9:30 PM',
        '10:00 PM',
        '10:30 PM',
        '11:00 PM',
        '11:30 PM',
        '00:00 AM',
    ]

    formatDate = DateUtils.formatDateToLiteral

    filter: ITableFilter = {
        date: new Date('2020-03-28T17:30:00Z'),
        numberOfSits: 2,
    }

    selectedTable: ITable
    tables: ITable[] = mockTables
    reservations: IReservation[] = mockReservations

    newReservationObject: IReservation = {
        _tableId: this.selectedTable ? this.selectedTable._id : null,
        date: new Date(),
    }

    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        this.isLoading = true
        this.applyFilter()
        setTimeout(() => {
            this.isLoading = !this.isLoading
        }, 500)
    }

    applyFilter() {
        this.tables.forEach(table => {
            const fetchedTable = this.reservations.find(
                reservation => reservation._tableId == table._id
            )

            table['selectable'] =
                this.filter.numberOfSits !== table.numberOfSits &&
                fetchedTable &&
                fetchedTable.date.toString() !== this.filter.date.toString()
        })
    }

    handleIncreaseSits(): void {
        this.filter.numberOfSits++
        this.applyFilter()
    }

    handleDecreaseSits(): void {
        if (this.filter.numberOfSits > 1) this.filter.numberOfSits--
        this.applyFilter()
    }

    handleSelectTable(_tableId: number): void {
        this.selectedTable = this.tables.find(table => table._id == _tableId)
    }

    handleTimeslotChanged(value: string): void {
        const converted24Time = DateUtils.getStandardTime(value)
        this.filter.date.setSeconds(0)
        this.filter.date.setHours(parseInt(converted24Time.split(':')[0]))
        this.filter.date.setMinutes(parseInt(converted24Time.split(':')[1]))

        this.applyFilter()
    }

    handleReservationDateChanged(date: any): void {
        this.filter.date = new Date(date)
        this.applyFilter()
    }

    confirmReservation(): void {
        if (this.selectedTable)
            this.newReservationObject._tableId = this.selectedTable._id
        const alertOptions = {
            header: 'Confirmation',
            message: 'Are you sure to confirm your booking ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked')
                    },
                },
                {
                    text: 'Confirm',
                    handler: () => {
                        console.log(this.newReservationObject)
                        if (
                            this.newReservationObject.date !== undefined &&
                            this.newReservationObject._tableId !== null
                        ) {
                            this.commonService.presentModal(
                                ReservationViewComponent,
                                this.newReservationObject
                            )
                        } else {
                            this.commonService.presentToast(
                                'Something is missed!'
                            )
                        }
                    },
                },
            ],
        }

        this.commonService.presentAlert(alertOptions)
    }

    isReserved(_tableId: number): boolean {
        return (
            this.reservations.find(
                reservation => reservation._tableId === _tableId
            ) !== undefined
        )
    }
}

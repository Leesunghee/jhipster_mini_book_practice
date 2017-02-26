import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Blood_pressure } from './blood-pressure.model';
import { Blood_pressureService } from './blood-pressure.service';
@Injectable()
export class Blood_pressurePopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private blood_pressureService: Blood_pressureService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.blood_pressureService.find(id).subscribe(blood_pressure => {
                blood_pressure.timestamp = this.datePipe.transform(blood_pressure.timestamp, 'yyyy-MM-ddThh:mm');
                this.blood_pressureModalRef(component, blood_pressure);
            });
        } else {
            return this.blood_pressureModalRef(component, new Blood_pressure());
        }
    }

    blood_pressureModalRef(component: Component, blood_pressure: Blood_pressure): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.blood_pressure = blood_pressure;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}

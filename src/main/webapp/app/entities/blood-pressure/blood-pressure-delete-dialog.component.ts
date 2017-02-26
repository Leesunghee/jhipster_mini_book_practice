import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Blood_pressure } from './blood-pressure.model';
import { Blood_pressurePopupService } from './blood-pressure-popup.service';
import { Blood_pressureService } from './blood-pressure.service';

@Component({
    selector: 'jhi-blood-pressure-delete-dialog',
    templateUrl: './blood-pressure-delete-dialog.component.html'
})
export class Blood_pressureDeleteDialogComponent {

    blood_pressure: Blood_pressure;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private blood_pressureService: Blood_pressureService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['blood_pressure']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.blood_pressureService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'blood_pressureListModification',
                content: 'Deleted an blood_pressure'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-blood-pressure-delete-popup',
    template: ''
})
export class Blood_pressureDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private blood_pressurePopupService: Blood_pressurePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.blood_pressurePopupService
                .open(Blood_pressureDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

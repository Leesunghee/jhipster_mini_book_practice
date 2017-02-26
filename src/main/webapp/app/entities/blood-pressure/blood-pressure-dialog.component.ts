import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Blood_pressure } from './blood-pressure.model';
import { Blood_pressurePopupService } from './blood-pressure-popup.service';
import { Blood_pressureService } from './blood-pressure.service';
import { User, UserService } from '../../shared';
@Component({
    selector: 'jhi-blood-pressure-dialog',
    templateUrl: './blood-pressure-dialog.component.html'
})
export class Blood_pressureDialogComponent implements OnInit {

    blood_pressure: Blood_pressure;
    authorities: any[];
    isSaving: boolean;

    users: User[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private blood_pressureService: Blood_pressureService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['blood_pressure']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.blood_pressure.id !== undefined) {
            this.blood_pressureService.update(this.blood_pressure)
                .subscribe((res: Blood_pressure) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.blood_pressureService.create(this.blood_pressure)
                .subscribe((res: Blood_pressure) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Blood_pressure) {
        this.eventManager.broadcast({ name: 'blood_pressureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-blood-pressure-popup',
    template: ''
})
export class Blood_pressurePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private blood_pressurePopupService: Blood_pressurePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.blood_pressurePopupService
                    .open(Blood_pressureDialogComponent, params['id']);
            } else {
                this.modalRef = this.blood_pressurePopupService
                    .open(Blood_pressureDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Preferences } from './preferences.model';
import { PreferencesPopupService } from './preferences-popup.service';
import { PreferencesService } from './preferences.service';
import { User, UserService } from '../../shared';
@Component({
    selector: 'jhi-preferences-dialog',
    templateUrl: './preferences-dialog.component.html'
})
export class PreferencesDialogComponent implements OnInit {

    preferences: Preferences;
    authorities: any[];
    isSaving: boolean;

    users: User[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private preferencesService: PreferencesService,
        private userService: UserService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['preferences', 'units']);
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
        if (this.preferences.id !== undefined) {
            this.preferencesService.update(this.preferences)
                .subscribe((res: Preferences) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.preferencesService.create(this.preferences)
                .subscribe((res: Preferences) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Preferences) {
        this.eventManager.broadcast({ name: 'preferencesListModification', content: 'OK'});
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
    selector: 'jhi-preferences-popup',
    template: ''
})
export class PreferencesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private preferencesPopupService: PreferencesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.preferencesPopupService
                    .open(PreferencesDialogComponent, params['id']);
            } else {
                this.modalRef = this.preferencesPopupService
                    .open(PreferencesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

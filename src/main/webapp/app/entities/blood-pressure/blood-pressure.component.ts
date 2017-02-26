import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Blood_pressure } from './blood-pressure.model';
import { Blood_pressureService } from './blood-pressure.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-blood-pressure',
    templateUrl: './blood-pressure.component.html'
})
export class Blood_pressureComponent implements OnInit, OnDestroy {

    blood_pressures: Blood_pressure[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private blood_pressureService: Blood_pressureService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private parseLinks: ParseLinks,
        private principal: Principal
    ) {
        this.blood_pressures = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.jhiLanguageService.setLocations(['blood_pressure']);
    }

    loadAll () {
        this.blood_pressureService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: Response) => this.onSuccess(res.json(), res.headers),
            (res: Response) => this.onError(res.json())
        );
    }

    reset () {
        this.page = 0;
        this.blood_pressures = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBlood_pressures();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Blood_pressure) {
        return item.id;
    }



    registerChangeInBlood_pressures() {
        this.eventSubscriber = this.eventManager.subscribe('blood_pressureListModification', (response) => this.reset());
    }

    sort () {
        let result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.blood_pressures.push(data[i]);
        }
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

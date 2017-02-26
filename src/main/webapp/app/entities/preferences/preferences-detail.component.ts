import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Preferences } from './preferences.model';
import { PreferencesService } from './preferences.service';

@Component({
    selector: 'jhi-preferences-detail',
    templateUrl: './preferences-detail.component.html'
})
export class PreferencesDetailComponent implements OnInit, OnDestroy {

    preferences: Preferences;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private preferencesService: PreferencesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['preferences', 'units']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.preferencesService.find(id).subscribe(preferences => {
            this.preferences = preferences;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

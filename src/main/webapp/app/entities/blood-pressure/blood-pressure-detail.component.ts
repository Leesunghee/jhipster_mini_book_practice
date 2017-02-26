import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Blood_pressure } from './blood-pressure.model';
import { Blood_pressureService } from './blood-pressure.service';

@Component({
    selector: 'jhi-blood-pressure-detail',
    templateUrl: './blood-pressure-detail.component.html'
})
export class Blood_pressureDetailComponent implements OnInit, OnDestroy {

    blood_pressure: Blood_pressure;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private blood_pressureService: Blood_pressureService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['blood_pressure']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.blood_pressureService.find(id).subscribe(blood_pressure => {
            this.blood_pressure = blood_pressure;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

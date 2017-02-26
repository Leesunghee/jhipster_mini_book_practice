import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Weight } from './weight.model';
import { WeightService } from './weight.service';

@Component({
    selector: 'jhi-weight-detail',
    templateUrl: './weight-detail.component.html'
})
export class WeightDetailComponent implements OnInit, OnDestroy {

    weight: Weight;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private weightService: WeightService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['weight']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.weightService.find(id).subscribe(weight => {
            this.weight = weight;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

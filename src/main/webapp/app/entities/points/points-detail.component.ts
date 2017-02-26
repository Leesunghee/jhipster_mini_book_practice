import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Points } from './points.model';
import { PointsService } from './points.service';

@Component({
    selector: 'jhi-points-detail',
    templateUrl: './points-detail.component.html'
})
export class PointsDetailComponent implements OnInit, OnDestroy {

    points: Points;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private pointsService: PointsService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['points']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.pointsService.find(id).subscribe(points => {
            this.points = points;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

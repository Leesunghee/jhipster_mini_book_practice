import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PointsDetailComponent } from '../../../../../../main/webapp/app/entities/points/points-detail.component';
import { PointsService } from '../../../../../../main/webapp/app/entities/points/points.service';
import { Points } from '../../../../../../main/webapp/app/entities/points/points.model';

describe('Component Tests', () => {

    describe('Points Management Detail Component', () => {
        let comp: PointsDetailComponent;
        let fixture: ComponentFixture<PointsDetailComponent>;
        let service: PointsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [PointsDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    PointsService
                ]
            }).overrideComponent(PointsDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PointsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PointsService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Points(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.points).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

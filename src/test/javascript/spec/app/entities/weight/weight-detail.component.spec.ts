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
import { WeightDetailComponent } from '../../../../../../main/webapp/app/entities/weight/weight-detail.component';
import { WeightService } from '../../../../../../main/webapp/app/entities/weight/weight.service';
import { Weight } from '../../../../../../main/webapp/app/entities/weight/weight.model';

describe('Component Tests', () => {

    describe('Weight Management Detail Component', () => {
        let comp: WeightDetailComponent;
        let fixture: ComponentFixture<WeightDetailComponent>;
        let service: WeightService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [WeightDetailComponent],
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
                    WeightService
                ]
            }).overrideComponent(WeightDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeightDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeightService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Weight(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.weight).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

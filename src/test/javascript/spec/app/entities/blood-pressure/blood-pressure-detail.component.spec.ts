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
import { Blood_pressureDetailComponent } from '../../../../../../main/webapp/app/entities/blood-pressure/blood-pressure-detail.component';
import { Blood_pressureService } from '../../../../../../main/webapp/app/entities/blood-pressure/blood-pressure.service';
import { Blood_pressure } from '../../../../../../main/webapp/app/entities/blood-pressure/blood-pressure.model';

describe('Component Tests', () => {

    describe('Blood_pressure Management Detail Component', () => {
        let comp: Blood_pressureDetailComponent;
        let fixture: ComponentFixture<Blood_pressureDetailComponent>;
        let service: Blood_pressureService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [Blood_pressureDetailComponent],
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
                    Blood_pressureService
                ]
            }).overrideComponent(Blood_pressureDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Blood_pressureDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Blood_pressureService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Blood_pressure(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.blood_pressure).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

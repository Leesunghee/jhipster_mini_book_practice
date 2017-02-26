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
import { PreferencesDetailComponent } from '../../../../../../main/webapp/app/entities/preferences/preferences-detail.component';
import { PreferencesService } from '../../../../../../main/webapp/app/entities/preferences/preferences.service';
import { Preferences } from '../../../../../../main/webapp/app/entities/preferences/preferences.model';

describe('Component Tests', () => {

    describe('Preferences Management Detail Component', () => {
        let comp: PreferencesDetailComponent;
        let fixture: ComponentFixture<PreferencesDetailComponent>;
        let service: PreferencesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [PreferencesDetailComponent],
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
                    PreferencesService
                ]
            }).overrideComponent(PreferencesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreferencesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferencesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Preferences(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.preferences).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

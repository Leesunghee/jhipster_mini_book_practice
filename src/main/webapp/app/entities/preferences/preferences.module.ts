import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoSharedModule } from '../../shared';
import { DemoAdminModule } from '../../admin/admin.module';

import {
    PreferencesService,
    PreferencesPopupService,
    PreferencesComponent,
    PreferencesDetailComponent,
    PreferencesDialogComponent,
    PreferencesPopupComponent,
    PreferencesDeletePopupComponent,
    PreferencesDeleteDialogComponent,
    preferencesRoute,
    preferencesPopupRoute,
} from './';

let ENTITY_STATES = [
    ...preferencesRoute,
    ...preferencesPopupRoute,
];

@NgModule({
    imports: [
        DemoSharedModule,
        DemoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PreferencesComponent,
        PreferencesDetailComponent,
        PreferencesDialogComponent,
        PreferencesDeleteDialogComponent,
        PreferencesPopupComponent,
        PreferencesDeletePopupComponent,
    ],
    entryComponents: [
        PreferencesComponent,
        PreferencesDialogComponent,
        PreferencesPopupComponent,
        PreferencesDeleteDialogComponent,
        PreferencesDeletePopupComponent,
    ],
    providers: [
        PreferencesService,
        PreferencesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoPreferencesModule {}

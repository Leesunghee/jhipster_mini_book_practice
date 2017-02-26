import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoSharedModule } from '../../shared';
import { DemoAdminModule } from '../../admin/admin.module';

import {
    Blood_pressureService,
    Blood_pressurePopupService,
    Blood_pressureComponent,
    Blood_pressureDetailComponent,
    Blood_pressureDialogComponent,
    Blood_pressurePopupComponent,
    Blood_pressureDeletePopupComponent,
    Blood_pressureDeleteDialogComponent,
    blood_pressureRoute,
    blood_pressurePopupRoute,
} from './';

let ENTITY_STATES = [
    ...blood_pressureRoute,
    ...blood_pressurePopupRoute,
];

@NgModule({
    imports: [
        DemoSharedModule,
        DemoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        Blood_pressureComponent,
        Blood_pressureDetailComponent,
        Blood_pressureDialogComponent,
        Blood_pressureDeleteDialogComponent,
        Blood_pressurePopupComponent,
        Blood_pressureDeletePopupComponent,
    ],
    entryComponents: [
        Blood_pressureComponent,
        Blood_pressureDialogComponent,
        Blood_pressurePopupComponent,
        Blood_pressureDeleteDialogComponent,
        Blood_pressureDeletePopupComponent,
    ],
    providers: [
        Blood_pressureService,
        Blood_pressurePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoBlood_pressureModule {}

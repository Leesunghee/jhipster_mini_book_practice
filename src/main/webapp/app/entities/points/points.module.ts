import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoSharedModule } from '../../shared';
import { DemoAdminModule } from '../../admin/admin.module';

import {
    PointsService,
    PointsPopupService,
    PointsComponent,
    PointsDetailComponent,
    PointsDialogComponent,
    PointsPopupComponent,
    PointsDeletePopupComponent,
    PointsDeleteDialogComponent,
    pointsRoute,
    pointsPopupRoute,
} from './';

let ENTITY_STATES = [
    ...pointsRoute,
    ...pointsPopupRoute,
];

@NgModule({
    imports: [
        DemoSharedModule,
        DemoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PointsComponent,
        PointsDetailComponent,
        PointsDialogComponent,
        PointsDeleteDialogComponent,
        PointsPopupComponent,
        PointsDeletePopupComponent,
    ],
    entryComponents: [
        PointsComponent,
        PointsDialogComponent,
        PointsPopupComponent,
        PointsDeleteDialogComponent,
        PointsDeletePopupComponent,
    ],
    providers: [
        PointsService,
        PointsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoPointsModule {}

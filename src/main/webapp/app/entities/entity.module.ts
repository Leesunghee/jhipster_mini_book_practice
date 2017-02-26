import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DemoPointsModule } from './points/points.module';
import { DemoWeightModule } from './weight/weight.module';
import { DemoBlood_pressureModule } from './blood-pressure/blood-pressure.module';
import { DemoPreferencesModule } from './preferences/preferences.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DemoPointsModule,
        DemoWeightModule,
        DemoBlood_pressureModule,
        DemoPreferencesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoEntityModule {}

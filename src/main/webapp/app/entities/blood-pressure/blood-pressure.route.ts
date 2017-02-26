import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { Blood_pressureComponent } from './blood-pressure.component';
import { Blood_pressureDetailComponent } from './blood-pressure-detail.component';
import { Blood_pressurePopupComponent } from './blood-pressure-dialog.component';
import { Blood_pressureDeletePopupComponent } from './blood-pressure-delete-dialog.component';

import { Principal } from '../../shared';


export const blood_pressureRoute: Routes = [
  {
    path: 'blood-pressure',
    component: Blood_pressureComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.blood_pressure.home.title'
    }
  }, {
    path: 'blood-pressure/:id',
    component: Blood_pressureDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.blood_pressure.home.title'
    }
  }
];

export const blood_pressurePopupRoute: Routes = [
  {
    path: 'blood-pressure-new',
    component: Blood_pressurePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.blood_pressure.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'blood-pressure/:id/edit',
    component: Blood_pressurePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.blood_pressure.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'blood-pressure/:id/delete',
    component: Blood_pressureDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.blood_pressure.home.title'
    },
    outlet: 'popup'
  }
];

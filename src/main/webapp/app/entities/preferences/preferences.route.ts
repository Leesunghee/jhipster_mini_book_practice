import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PreferencesComponent } from './preferences.component';
import { PreferencesDetailComponent } from './preferences-detail.component';
import { PreferencesPopupComponent } from './preferences-dialog.component';
import { PreferencesDeletePopupComponent } from './preferences-delete-dialog.component';

import { Principal } from '../../shared';


export const preferencesRoute: Routes = [
  {
    path: 'preferences',
    component: PreferencesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.preferences.home.title'
    }
  }, {
    path: 'preferences/:id',
    component: PreferencesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.preferences.home.title'
    }
  }
];

export const preferencesPopupRoute: Routes = [
  {
    path: 'preferences-new',
    component: PreferencesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.preferences.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'preferences/:id/edit',
    component: PreferencesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.preferences.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'preferences/:id/delete',
    component: PreferencesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.preferences.home.title'
    },
    outlet: 'popup'
  }
];

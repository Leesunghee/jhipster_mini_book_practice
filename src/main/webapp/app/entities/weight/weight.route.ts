import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { WeightComponent } from './weight.component';
import { WeightDetailComponent } from './weight-detail.component';
import { WeightPopupComponent } from './weight-dialog.component';
import { WeightDeletePopupComponent } from './weight-delete-dialog.component';

import { Principal } from '../../shared';


export const weightRoute: Routes = [
  {
    path: 'weight',
    component: WeightComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.weight.home.title'
    }
  }, {
    path: 'weight/:id',
    component: WeightDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.weight.home.title'
    }
  }
];

export const weightPopupRoute: Routes = [
  {
    path: 'weight-new',
    component: WeightPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.weight.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'weight/:id/edit',
    component: WeightPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.weight.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'weight/:id/delete',
    component: WeightDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'demoApp.weight.home.title'
    },
    outlet: 'popup'
  }
];

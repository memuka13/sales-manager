import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  PRODUCTS_FEATURE_KEY,
  productsPageReducer,
} from './products/products.reducer';
import { ProductsPageEffect } from './products/products.effect';
import {
  MANAGERS_FEATURE_KEY,
  managersPageReducer,
} from './managers/managers.reducer';
import { ManagersPageEffect } from './managers/managers.effect';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsFacade } from './products/products.facade';
import { ManagersFacade } from './managers/managers.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productsPageReducer),
    StoreModule.forFeature(MANAGERS_FEATURE_KEY, managersPageReducer),
    EffectsModule.forFeature([ProductsPageEffect, ManagersPageEffect]),
    MatSnackBarModule,
  ],
  providers: [ProductsFacade, ManagersFacade],
})
export class StateModule {}

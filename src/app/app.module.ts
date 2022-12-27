import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { HomeModule } from "./modules/home/home.module";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from "./modules/store/app.state";
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from "./modules/store/effects/products.effects";
import { WalletEffects } from "./modules/store/effects/wallet.effects";
import { CoreModule } from "./modules/core/core.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'Marketplace', maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([ProductsEffects, WalletEffects]),
    CoreModule.forRoot(),
    // At the moment, the Core Module is not required here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './registration/log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './pages/basket/basket.component';
import { DishComponent } from './pages/dish/dish.component';

import { GetStartedComponent } from './pages/get-started/get-started.component';

import { SignUpComponent } from './registration/sign-up/sign-up.component';

import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchPipe } from './shared/pipes/search.pipe';

import {HttpClient,HttpClientModule} from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { TruncateTextPipe } from './shared/pipes/truncate-text.pipe';
import { NutrionProgramsComponent } from './pages/nutrion-programs/nutrion-programs.component';
import { AdminNutritionsComponent } from './admin/admin-nutritions/admin-nutritions.component';
import { CourierComponent } from './courier/courier.component';
// import { CookerComponent } from './cooker/cooker.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LogInComponent,
    ProfileComponent,
    BasketComponent,
    GetStartedComponent,
    SignUpComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    SearchPipe,
    AdminProductComponent,
    DishComponent,
    AdminOrdersComponent,
    TruncateTextPipe,
    NutrionProgramsComponent,
    AdminNutritionsComponent,
    CourierComponent,
    // CookerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatRadioModule,
    AnimateOnScrollModule.forRoot(),
    TranslateModule.forRoot({
      loader : {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
    // NgbModule,
    // NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http)
}

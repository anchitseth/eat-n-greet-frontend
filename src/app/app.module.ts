import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingcomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { StepperSignupComponent } from './stepper-signup/stepper-signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { NewpostmealComponent } from './newpostmeal/newpostmeal.component';
import { NewhomeComponent } from './newhome/newhome.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import { BookamealComponent } from './bookameal/bookameal.component';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {UserprofileService} from './userprofile.service';
import {PostmealserService} from './postmealser.service';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProfileComponent } from './profile/profile.component';
import { Newpost1Component } from './newpost1/newpost1.component';

@NgModule({
  declarations: [
    AppComponent,
    StepperSignupComponent,
    LoginComponent,
    routingcomponents,
    MyOrdersComponent,
    HeaderComponent,
    FooterComponent,
    NewpostmealComponent,
    NewhomeComponent,
    BookamealComponent,
    ProfileComponent,
    Newpost1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatAutocompleteModule,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    FlexLayoutModule,
    NgxGalleryModule
  ],
  providers: [UserprofileService, PostmealserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

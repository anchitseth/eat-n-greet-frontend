import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PostAMealComponent } from './post-a-meal/post-a-meal.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'post-meal',
    component: PostAMealComponent
  },
  {
    path: 'orders',
    component: MyOrdersComponent
  },
  {
    path: 'meal-details/:orderId',
    component: MealDetailsComponent
  },
  {
    path: 'profile',
    component: MyProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [
  SignupComponent,
  HomeComponent,
  PostAMealComponent,
  MyOrdersComponent,
  MealDetailsComponent,
  MyProfileComponent];

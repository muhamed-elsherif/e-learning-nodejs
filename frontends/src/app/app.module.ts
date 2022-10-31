import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { LoginComponent } from './pages/login/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { HomeComponent } from './pages/home/home/home.component';
import { SingleComponent } from './pages/single/single/single.component';
import { TeachersComponent } from './pages/teachers/teachers/teachers.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StudentComponent } from './pages/students/student/student.component';
import { SubjectsComponent } from './pages/subjects/subjects/subjects.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SingleComponent,
    TeachersComponent,
    StudentComponent,
    SubjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { SingleComponent } from './pages/single/single/single.component';
import { StudentComponent } from './pages/students/student/student.component';
import { TeachersComponent } from './pages/teachers/teachers/teachers.component';


const routes: Routes = [
 {path:"/",component:HomeComponent},
 {path:"login",component:LoginComponent},
 {path:"register",component:RegisterComponent},
 {path:"teachers",component:TeachersComponent},
 {path:"single",component:SingleComponent},
 {path:"studens",component:StudentComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
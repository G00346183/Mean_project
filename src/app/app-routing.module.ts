import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { RouterModule, Routes} from '@angular/router';
import {ReadComponent} from './read/read.component'
import {CreateComponent} from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { HomePageComponent } from 'src/app/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'read',
    component: ReadComponent
  },
  {
    path:'',
    component: HomePageComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path:'edit/:id',
    component: EditComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

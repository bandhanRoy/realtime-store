import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';


const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'orders',
    pathMatch: 'full',
    component: ListComponent
  },
  {
    path: 'stores',
    pathMatch: 'full',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

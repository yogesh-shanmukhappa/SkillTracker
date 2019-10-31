import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkilltrackerComponent } from './skilltracker.component';

const routes: Routes = [
    { path: '', component: SkilltrackerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkilltrackerRoutingModule { }

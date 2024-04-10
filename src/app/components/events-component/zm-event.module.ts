import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ZoneminderEvents } from "./zm-event.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from "@angular/material/sort";
import { SharedModule } from "../shared-module.module";

const routes: Routes = [ { path: '', component: ZoneminderEvents} ]; 

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      SharedModule,
      MatPaginatorModule,
      MatTableModule,
      MatSortModule,
    ],
    declarations: [
      ZoneminderEvents
    ],
  providers: [RouterModule],
  exports: [RouterModule]
})
export class EventModule { }

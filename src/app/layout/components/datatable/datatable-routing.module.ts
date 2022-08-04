import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatatableComponent } from './datatable.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DatatableComponent }
    ])],
    exports: [RouterModule]
})
export class DatatableRoutingModule { }

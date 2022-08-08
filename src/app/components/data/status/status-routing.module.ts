import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusComponent } from './status.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: StatusComponent }]),
    ],
    exports: [RouterModule],
})
export class StatusRoutingModule {}

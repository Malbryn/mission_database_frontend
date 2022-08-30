import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusComponent } from './status.component';
import { StatusManagerComponent } from './manager/status-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: StatusComponent },
            { path: 'manage', component: StatusManagerComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class StatusRoutingModule {}

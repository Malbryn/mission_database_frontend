import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DLCComponent } from './dlc.component';
import { DLCManagerComponent } from './manager/dlc-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: DLCComponent },
            { path: 'manage', component: DLCManagerComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class DLCRoutingModule {}

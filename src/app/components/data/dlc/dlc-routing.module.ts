import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DLCComponent } from './dlc.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: DLCComponent }])],
    exports: [RouterModule],
})
export class DLCRoutingModule {}

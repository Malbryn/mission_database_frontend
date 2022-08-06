import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModsetComponent } from './modset.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ModsetComponent }]),
    ],
    exports: [RouterModule],
})
export class ModsetRoutingModule {}

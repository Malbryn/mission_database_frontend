import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModsetComponent } from './modset.component';
import { ModsetManagerComponent } from './manager/modset-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ModsetComponent },
            { path: 'manage', component: ModsetManagerComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ModsetRoutingModule {}

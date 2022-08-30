import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
import { MapManagerComponent } from './manager/map-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MapComponent },
            { path: 'manage', component: MapManagerComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class MapRoutingModule {}

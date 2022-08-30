import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameTypeComponent } from './game-type.component';
import { GameTypeManagerComponent } from './manager/game-type-manager.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: GameTypeComponent },
            { path: 'manage', component: GameTypeManagerComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class GameTypeRoutingModule {}

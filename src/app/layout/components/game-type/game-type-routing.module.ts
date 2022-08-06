import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameTypeComponent } from './game-type.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: GameTypeComponent }]),
    ],
    exports: [RouterModule],
})
export class GameTypeRoutingModule {}

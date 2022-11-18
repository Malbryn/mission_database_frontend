import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'dlcs',
                loadChildren: () =>
                    import('./dlc/dlc.module').then(
                        (module) => module.DLCModule
                    ),
            },
            {
                path: 'game-types',
                loadChildren: () =>
                    import('./game-type/game-type.module').then(
                        (module) => module.GameTypeModule
                    ),
            },
            {
                path: 'maps',
                loadChildren: () =>
                    import('./map/map.module').then(
                        (module) => module.MapModule
                    ),
            },
            {
                path: 'missions',
                loadChildren: () =>
                    import('./mission/mission.module').then(
                        (module) => module.MissionModule
                    ),
            },
            {
                path: 'mission-files',
                loadChildren: () =>
                    import('./mission-file/mission-file.module').then(
                        (module) => module.MissionFileModule
                    ),
            },
            {
                path: 'modsets',
                loadChildren: () =>
                    import('./modset/modset.module').then(
                        (module) => module.ModsetModule
                    ),
            },
            {
                path: 'statuses',
                loadChildren: () =>
                    import('./status/status.module').then(
                        (module) => module.StatusModule
                    ),
            },
            { path: '**', redirectTo: '/' },
        ]),
    ],
    exports: [RouterModule],
})
export class DataRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'dlcs',
                loadChildren: () =>
                    import('./dlc/dlc.module').then((m) => m.DLCModule),
            },
            {
                path: 'game-types',
                loadChildren: () =>
                    import('./game-type/game-type.module').then(
                        (m) => m.GameTypeModule
                    ),
            },
            {
                path: 'maps',
                loadChildren: () =>
                    import('./map/map.module').then((m) => m.MapModule),
            },
            {
                path: 'missions',
                loadChildren: () =>
                    import('./mission/mission.module').then(
                        (m) => m.MissionModule
                    ),
            },
            {
                path: 'data-files',
                loadChildren: () =>
                    import('./mission-file/mission-file.module').then(
                        (m) => m.MissionFileModule
                    ),
            },
            {
                path: 'modsets',
                loadChildren: () =>
                    import('./modset/modset.module').then(
                        (m) => m.ModsetModule
                    ),
            },
            {
                path: 'statuses',
                loadChildren: () =>
                    import('./status/status.module').then(
                        (m) => m.StatusModule
                    ),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DataRoutingModule {}

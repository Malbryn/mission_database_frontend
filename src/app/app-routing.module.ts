import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './layout/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    loadChildren: () =>
                        import(
                            './layout/components/dashboard/dashboard.module'
                        ).then((m) => m.DashboardModule),
                },
                {
                    path: 'data',
                    component: AppLayoutComponent,
                    loadChildren: () =>
                        import('./layout/components/data/data.module').then(
                            (m) => m.DataModule
                        ),
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./layout/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                { path: 'notfound', component: NotFoundComponent },
                { path: '**', redirectTo: 'notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

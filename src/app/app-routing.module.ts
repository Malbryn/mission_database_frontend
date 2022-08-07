import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './layout/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { IsAuthenticatedGuard } from './layout/service/is-authenticated.guard';
import { HasRoleGuard } from './layout/service/has-role.guard';
import { AccessComponent } from './layout/components/auth/access/access.component';

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
                    canActivate: [IsAuthenticatedGuard],
                },
                {
                    path: 'data',
                    component: AppLayoutComponent,
                    loadChildren: () =>
                        import('./layout/components/data/data.module').then(
                            (m) => m.DataModule
                        ),
                    canActivate: [IsAuthenticatedGuard],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./layout/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                { path: 'notfound', component: NotFoundComponent },
                { path: 'notallowed', component: AccessComponent },
                { path: '**', redirectTo: 'notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

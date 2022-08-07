import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotFoundComponent } from './layout/components/notfound/notfound.component';
import { MissionService } from './layout/service/mission.service';
import { AuthInterceptorProvider } from './layout/service/auth.interceptor';

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [AuthInterceptorProvider, MissionService],
    bootstrap: [AppComponent],
})
export class AppModule {}

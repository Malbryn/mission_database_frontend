import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './components/layout/app.layout.module';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { MissionService } from './services/mission.service';
import { AuthInterceptorProvider } from './services/auth.interceptor';

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [AuthInterceptorProvider, MissionService],
    bootstrap: [AppComponent],
})
export class AppModule {}

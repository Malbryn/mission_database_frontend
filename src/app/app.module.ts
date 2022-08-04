import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotFoundComponent } from './layout/components/notfound/notfound.component';
import { MissionService } from './layout/service/mission.service';

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        MissionService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

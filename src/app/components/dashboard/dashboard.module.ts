import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
    imports: [CommonModule, DashboardRoutingModule, MenuModule],
    declarations: [DashboardComponent],
})
export class DashboardModule {}

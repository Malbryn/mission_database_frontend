import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './services/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private layoutService: LayoutService
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.layoutService.config = {
            ripple: false,
            inputStyle: 'filled',
            menuMode: 'static',
            colorScheme: 'dark',
            theme: 'bootstrap4-dark-blue',
            scale: 14,
        };
    }
}

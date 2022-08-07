import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/app.layout.service';

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

        // Optional configuration with the default configuration
        this.layoutService.config = {
            ripple: false, // Toggles ripple on and off
            inputStyle: 'filled', // Default style for input elements
            menuMode: 'static', // Layout mode of the menu, valid values are "static" and "overlay"
            colorScheme: 'dark', // Color scheme of the template, valid values are "light" and "dark"
            theme: 'bootstrap4-dark-blue', // Default component theme for PrimeNG
            scale: 14, // Size of the body font size to scale the whole application
        };
    }
}

import { Component } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
})
export class AppFooterComponent {
    version = environment.VERSION;

    constructor(public layoutService: LayoutService) {}
}

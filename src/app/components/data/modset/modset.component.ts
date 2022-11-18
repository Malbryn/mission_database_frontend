import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Modset } from '../../../models/modset';
import { ModsetService } from '../../../services/modset.service';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';

@Component({
    templateUrl: './modset.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class ModsetComponent extends AbstractDataComponent implements OnInit {
    modsets: Modset[] = [];

    constructor(private service: ModsetService, private router: Router) {
        super();
    }

    override manage(): void {
        this.router.navigate(['data/modsets/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: Modset[]) => {
            this.modsets = data;
            this.loading = false;
        });
    }
}

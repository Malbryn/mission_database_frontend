import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DLC } from '../../../models/dlc';
import { Router } from '@angular/router';
import { DLCService } from '../../../services/dlc.service';
import { AbstractDataComponent } from '../common/abstract-data.component';

@Component({
    templateUrl: './dlc.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class DLCComponent extends AbstractDataComponent implements OnInit {
    DLCs: DLC[] = [];

    constructor(private service: DLCService, private router: Router) {
        super();
    }

    override manage(): void {
        this.router.navigate(['data/dlcs/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: DLC[]) => {
            this.DLCs = data;
            this.loading = false;
        });
    }
}

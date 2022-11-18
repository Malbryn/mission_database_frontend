import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Status } from '../../../models/Status';
import { StatusService } from '../../../services/status.service';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';

@Component({
    templateUrl: './status.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class StatusComponent extends AbstractDataComponent implements OnInit {
    statuses: Status[] = [];

    constructor(private service: StatusService, private router: Router) {
        super();
    }

    override manage(): void {
        this.router.navigate(['data/statuses/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: Status[]) => {
            this.statuses = data;
            this.loading = false;
        });
    }
}

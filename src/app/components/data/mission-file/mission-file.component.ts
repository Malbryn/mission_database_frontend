import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MissionFile } from '../../../models/mission-file';
import { MissionFileService } from '../../../services/mission-file.service';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';

@Component({
    templateUrl: './mission-file.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionFileComponent
    extends AbstractDataComponent
    implements OnInit
{
    missionFiles: MissionFile[] = [];

    constructor(private service: MissionFileService, private router: Router) {
        super();
    }

    override manage(): void {
        this.router.navigate(['data/mission-files/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: MissionFile[]) => {
            this.missionFiles = data;
            this.loading = false;
        });
    }
}

import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MissionFile } from '../../../../models/MissionFile';
import { MissionFileService } from '../../../../services/mission-file.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './mission-file-manage.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionFileManageComponent implements OnInit {
    currentMissionFile!: MissionFile | any;
    missionFiles: MissionFile[] = [];
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private service: MissionFileService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: MissionFile[]) => {
            this.missionFiles = data;
            this.loading = false;
        });

        this.cols = [{ field: 'name', header: 'Name' }];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    goBack() {
        this.router.navigateByUrl('/data/mission-files');
    }

    openNew() {
        this.currentMissionFile = {};
        this.submitted = false;
        this.newDialog = true;
    }

    editMissionFile(missionFile: MissionFile) {
        this.currentMissionFile = { ...missionFile };
        this.newDialog = true;
    }

    deleteMissionFile(missionFile: MissionFile) {
        this.deleteDialog = true;
        this.currentMissionFile = { ...missionFile };
    }

    saveMissionFile() {
        this.submitted = true;

        if (this.currentMissionFile.name?.trim()) {
            if (this.currentMissionFile.id) {
                this.service
                    .update(this.currentMissionFile.id, this.currentMissionFile)
                    .subscribe((data) => {
                        this.missionFiles[
                            this.findIndexById(this.currentMissionFile.id)
                        ] = this.currentMissionFile;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Mission file updated',
                            life: 3000,
                        });

                        this.missionFiles = [...this.missionFiles];
                        this.newDialog = false;
                        this.currentMissionFile = {};
                    });
            } else {
                this.service
                    .create(this.currentMissionFile)
                    .subscribe((data) => {
                        this.missionFiles.push(data);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Mission file created',
                            life: 3000,
                        });

                        this.missionFiles = [...this.missionFiles];
                        this.newDialog = false;
                        this.currentMissionFile = {};
                    });
            }
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.missionFiles.length; i++) {
            if (this.missionFiles[i].id === parseInt(id, 10)) {
                index = i;
                break;
            }
        }

        return index;
    }

    hideDialog() {
        this.newDialog = false;
        this.submitted = false;
    }

    confirmDelete() {
        this.deleteDialog = false;

        if (this.currentMissionFile.id) {
            this.service
                .delete(this.currentMissionFile.id)
                .subscribe((data) => {
                    this.missionFiles = this.missionFiles.filter(
                        (value) => value.id !== this.currentMissionFile.id
                    );
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Mission file deleted',
                        life: 3000,
                    });
                });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Couldn't remove Mission file",
                life: 3000,
            });

            this.currentMissionFile = {};
        }
    }
}

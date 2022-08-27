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
import { MissionService } from '../../../../services/mission.service';
import { Mission } from '../../../../models/Mission';
import { Map } from '../../../../models/Map';

@Component({
    templateUrl: './mission-file-manage.component.html',
    styleUrls: ['./mission-file-manage.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionFileManageComponent implements OnInit {
    // Mission files
    missionFiles: MissionFile[] = [];
    selectedMissionFile!: MissionFile;

    // Missions
    missions: Mission[] = [];
    selectedMission!: Mission;
    filteredMissions: Mission[] = [];

    // Version
    selectedVersion!: number;

    // PBO
    selectedFile: File = {} as File;

    @ViewChild('filter') filter!: ElementRef;
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];

    constructor(
        private service: MissionFileService,
        private missionService: MissionService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: MissionFile[]) => {
            this.missionFiles = data;
            this.loading = false;
        });

        this.missionService.getAll().subscribe((data: Mission[]) => {
            this.missions = data;
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
        this.selectedMissionFile = {} as MissionFile;
        this.selectedMission = {} as Mission;
        this.selectedVersion = 0;

        this.submitted = false;
        this.newDialog = true;
    }

    editMissionFile(missionFile: MissionFile) {
        this.selectedMissionFile = { ...missionFile };

        console.log(this.selectedMissionFile);

        this.selectedMission = this.findMissionByID(missionFile.mission);
        this.selectedVersion = missionFile.version;
        this.newDialog = true;
    }

    deleteMissionFile(missionFile: MissionFile) {
        this.deleteDialog = true;
        this.selectedMissionFile = { ...missionFile };
    }

    saveMissionFile() {
        this.submitted = true;

        this.selectedMissionFile.mission = this.selectedMission.id;
        this.selectedMissionFile.version = this.selectedVersion;
        this.selectedMissionFile.file = this.selectedFile;

        if (this.selectedMissionFile.name?.trim()) {
            if (this.selectedMissionFile.id) {
                const requested = this.selectedMissionFile;

                this.service
                    .update(this.selectedMissionFile.id, requested)
                    .subscribe((data) => {
                        this.missionFiles[
                            this.findIndexById(this.selectedMissionFile.id)
                        ] = this.selectedMissionFile;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Mission file updated',
                            life: 3000,
                        });

                        this.missionFiles = [...this.missionFiles];
                        this.newDialog = false;
                        this.selectedMissionFile = {} as MissionFile;
                    });
            } else {
                this.service
                    .create(this.selectedMissionFile)
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
                        this.selectedMissionFile = {} as MissionFile;
                    });
            }
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.missionFiles.length; i++) {
            if (this.missionFiles[i].id === id) {
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

        if (this.selectedMissionFile.id) {
            this.service
                .delete(this.selectedMissionFile.id)
                .subscribe((data) => {
                    this.missionFiles = this.missionFiles.filter(
                        (value) => value.id !== this.selectedMissionFile.id
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

            this.selectedMissionFile = {} as MissionFile;
        }
    }

    filterMission(event: any): void {
        const filtered: Mission[] = [];
        const query = event.query;

        for (const mission of this.missions) {
            if (mission.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(mission);
            }
        }

        this.filteredMissions = filtered;
    }

    findMissionByID(id: number): Mission {
        const mission = this.missions.find((element) => element.id === id);
        return mission === undefined ? ({} as Mission) : mission;
    }

    onFileUpload($event: any): void {
        this.selectedFile = $event.currentFiles[0];
    }
}

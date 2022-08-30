import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MissionFile } from '../../../../models/MissionFile';
import { MissionFileService } from '../../../../services/mission-file.service';
import { Router } from '@angular/router';
import { MissionService } from '../../../../services/mission.service';
import { Mission } from '../../../../models/Mission';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { AbstractManagerComponent } from '../../../../helpers/abstract-manager.component';
import { saveAs } from 'file-saver';
import { environment } from '../../../../../environments/environment';

@Component({
    templateUrl: './mission-file-manager.component.html',
    styleUrls: ['./mission-file-manager.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionFileManagerComponent
    extends AbstractManagerComponent
    implements OnInit
{
    missionFileForm = this.formBuilder.group({
        id: new FormControl(),
        name: new FormControl(),
        mission: new FormControl(),
        version: new FormControl(),
        path: new FormControl(),
        url: new FormControl(),
        description: new FormControl(),
        file: new FormControl(),
        created_by: new FormControl(),
    });

    // Mission files
    missionFiles: MissionFile[] = [];
    selectedMissionFile!: MissionFile;

    // Missions
    missions: Mission[] = [];
    selectedMission!: Mission;
    filteredMissions: Mission[] = [];

    constructor(
        router: Router,
        formBuilder: FormBuilder,
        authService: AuthService,
        messageService: MessageService,
        private service: MissionFileService,
        private missionService: MissionService
    ) {
        super(router, formBuilder, authService, messageService);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.service.getAll().subscribe((data: MissionFile[]) => {
            this.missionFiles = data;
            this.isLoading = false;
        });

        this.missionService.getAll().subscribe((data: Mission[]) => {
            this.missions = data;
        });
    }

    create(): void {
        this.selectedMissionFile = {} as MissionFile;
        this.selectedMission = {} as Mission;
        this.submitted = false;
        this.newDialog = true;
    }

    edit(missionFile: MissionFile) {
        this.selectedMissionFile = { ...missionFile };
        this.selectedMission = this.findMissionByID(missionFile.mission);
        this.submitted = false;
        this.newDialog = true;
    }

    delete(missionFile: MissionFile) {
        this.selectedMissionFile = { ...missionFile };
        this.deleteDialog = true;
    }

    save() {
        this.submitted = true;

        if (this.missionFileForm.valid) {
            const form = this.missionFileForm;

            form.controls.mission.setValue(form.controls.mission.value.id);

            if (form.value.id) {
                const formData = this.getFormData(form);

                this.service
                    .update(form.controls.mission.value.id, formData)
                    .subscribe(
                        (response) => {
                            this.missionFiles[
                                this.findMissionIndexById(response.id)
                            ] = this.selectedMissionFile;

                            this.missionFiles = [...this.missionFiles];
                            this.selectedMissionFile = {} as MissionFile;
                            this.newDialog = false;

                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Mission file updated',
                                life: 3000,
                            });
                        },
                        (error) => console.log(error)
                    );
            } else {
                form.controls.created_by.setValue(
                    this.authService.userValue.id
                );

                const formData = this.getFormData(form);

                this.service.create(formData).subscribe(
                    (response) => {
                        this.missionFiles.push(response);

                        this.missionFiles = [...this.missionFiles];
                        this.selectedMissionFile = {} as MissionFile;
                        this.newDialog = false;

                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Mission file created',
                            life: 3000,
                        });
                    },
                    (error) => console.log(error)
                );
            }
        }
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

    onFileSelect(event: any): void {
        this.missionFileForm.patchValue({ file: event.files[0] });
        this.missionFileForm.get('file')?.updateValueAndValidity();
    }

    async downloadMissionFile(url: string, fileName: string): Promise<void> {
        const response = await fetch(environment.PROXY_SERVER + url, {
            method: 'GET',
            headers: new Headers({
                Authorization: `token ${environment.GITHUB_TOKEN}`,
                'Content-Type': 'application/octet-stream',
            }),
        });

        const content = await response.blob();
        saveAs(content, `${fileName}.pbo`);
    }

    private findMissionByID(id: number): Mission {
        const mission = this.missions.find((element) => element.id === id);
        return mission === undefined ? ({} as Mission) : mission;
    }

    private findMissionIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.missionFiles.length; i++) {
            if (this.missionFiles[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    private getFormData(form: FormGroup): FormData {
        const formData = new FormData();

        Object.keys(form.controls).forEach((formControlName) => {
            formData.append(formControlName, form.get(formControlName)?.value);
        });

        return formData;
    }
}

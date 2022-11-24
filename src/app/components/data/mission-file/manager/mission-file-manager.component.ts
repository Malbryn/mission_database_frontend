import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MissionFile } from '../../../../models/mission-file';
import { MissionFileService } from '../../../../services/mission-file.service';
import { Router } from '@angular/router';
import { MissionService } from '../../../../services/mission.service';
import { Mission } from '../../../../models/mission';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { AbstractManagerComponent } from '../../common/abstract-manager.component';
import { saveAs } from 'file-saver';
import { environment } from '../../../../../environments/environment';
import { MessageType } from '../../../../models/message-type';

@Component({
    templateUrl: './mission-file-manager.component.html',
    styleUrls: ['./mission-file-manager.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionFileManagerComponent
    extends AbstractManagerComponent<MissionFile>
    implements OnInit
{
    // Missions
    missions: Mission[] = [];
    selectedMission!: Mission;
    filteredMissions: Mission[] = [];

    constructor(
        router: Router,
        formBuilder: FormBuilder,
        authService: AuthService,
        messageService: MessageService,
        service: MissionFileService,
        private missionService: MissionService
    ) {
        super(router, formBuilder, authService, messageService, service);

        this.form = this.formBuilder.group({
            id: new FormControl(),
            mission: new FormControl(),
            name: new FormControl(),
            version: new FormControl(),
            path: new FormControl(),
            downloadUrl: new FormControl(),
            description: new FormControl(),
            createdAt: new FormControl(),
            createdBy: new FormControl(),
            file: new FormControl(),
        });
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.missionService.getAll().subscribe({
            next: (value) => {
                this.missions = value;
            },
            error: (error) => this.handleError(error),
        });
    }

    override handleCreate(): void {
        this.form.reset();
        this.selectedMission = {} as Mission;

        this.openNewDialog();
    }

    override handleEdit(data: MissionFile) {
        this.form.setValue({ ...data });
        this.selectedMission = this.findMissionByID(data.mission);
        this.form.controls['mission'].patchValue(this.selectedMission);

        this.openNewDialog();
    }

    override handleSave() {
        if (this.form.valid) {
            this.closeNewDialog();
            this.setLoadingState(true);

            const form = this.form;
            form.controls['mission'].setValue(
                form.controls['mission'].value.id
            );
            let formData = form.value;

            if (form.value.id) {
                formData.delete('file');

                this.update(formData);
            } else {
                // TODO: TESTING ONLY
                /*form.controls['createdBy'].setValue(
                    this.authService.currentUser.value.id
                );*/
                formData = form.value;
                formData.set('missionId', '1');
                formData.set('createdById', '1');

                this.create(formData);
            }
        } else {
            this.showToastMessage(MessageType.WARNING, 'Invalid input data');
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
        this.form.patchValue({ file: event.files[0] });
        this.form.get('file')?.updateValueAndValidity();
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
        await saveAs(content, `${fileName}.pbo`);
    }

    private findMissionByID(id: number): Mission {
        const mission = this.missions.find((element) => element.id === id);
        return mission === undefined ? ({} as Mission) : mission;
    }
}

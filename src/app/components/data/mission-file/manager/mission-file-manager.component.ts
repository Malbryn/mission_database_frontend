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
import { MessageType } from '../../../../models/message-type';
import { MissionFileDto } from '../../../../models/mission-file.dto';
import { saveAs } from 'file-saver';

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
        private missionFileService: MissionFileService,
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
        this.form.setValue({
            ...data,
            file: {} as File,
        });
        this.selectedMission = this.findMissionByID(data.mission.id);
        this.form.controls['mission'].patchValue(this.selectedMission);

        this.openNewDialog();
    }

    override handleSave() {
        if (this.form.valid) {
            this.closeNewDialog();
            this.setLoadingState(true);

            const form = this.form;
            const formData = form.value;

            const dto = this.convertToDto(formData);

            if (form.value.id) {
                this.update(dto);
            } else {
                const userId = this.authService.currentUser.value.id;

                const newFormData = new FormData();
                newFormData.append('missionId', formData.mission.id);
                newFormData.append('name', formData.name);
                newFormData.append('version', formData.version);
                newFormData.append('description', formData.description);
                newFormData.append('createdById', userId.toString());
                newFormData.append('file', formData.file);

                this.create(newFormData);
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

    async downloadMissionFile(id: number, fileName: string): Promise<void> {
        this.missionFileService.downloadFile(id).subscribe({
            next: async (response) => {
                try {
                    await saveAs(response, `${fileName}.pbo`);
                } catch (error) {
                    this.handleError(error);
                }
            },
            error: (error) => this.handleError(error),
        });
    }

    private findMissionByID(id: number): Mission {
        const mission = this.missions.find((element) => element.id === id);
        return mission === undefined ? ({} as Mission) : mission;
    }

    private convertToDto(missionFile: MissionFile): MissionFileDto {
        const userId = this.authService.currentUser.value.id;

        return {
            id: missionFile.id,
            missionId: missionFile.mission.id,
            name: missionFile.name,
            version: missionFile.version,
            path: missionFile.path,
            downloadUrl: missionFile.downloadUrl,
            description: missionFile.description,
            createdById: userId,
            file: missionFile.file,
        } as MissionFileDto;
    }
}

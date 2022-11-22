import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mission } from '../../../../models/mission';
import { Map } from '../../../../models/map';
import { MissionService } from '../../../../services/mission.service';
import { Router } from '@angular/router';
import { MapService } from '../../../../services/map.service';
import { GameType } from '../../../../models/game-type';
import { GameTypeService } from '../../../../services/game-type.service';
import { Status } from '../../../../models/Status';
import { StatusService } from '../../../../services/status.service';
import { DLC } from '../../../../models/dlc';
import { DLCService } from '../../../../services/dlc.service';
import { Modset } from '../../../../models/modset';
import { ModsetService } from '../../../../services/modset.service';
import { AuthService } from '../../../../services/auth.service';
import { AbstractManagerComponent } from '../../common/abstract-manager.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { MessageType } from '../../../../models/message-type';
import { MissionDto } from '../../../../models/mission.dto';
import { AbstractData } from '../../../../models/abstract-data';

@Component({
    templateUrl: './mission-manager.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionManagerComponent
    extends AbstractManagerComponent<Mission>
    implements OnInit
{
    maps: Map[] = [];
    gameTypes: GameType[] = [];
    statuses: Status[] = [];
    modsets: Modset[] = [];
    DLCs: DLC[] = [];

    filteredMaps: Map[] = [];
    filteredModsets: Modset[] = [];

    constructor(
        router: Router,
        formBuilder: FormBuilder,
        authService: AuthService,
        messageService: MessageService,
        service: MissionService,
        private mapService: MapService,
        private gameTypeService: GameTypeService,
        private statusService: StatusService,
        private modsetService: ModsetService,
        private dlcService: DLCService
    ) {
        super(router, formBuilder, authService, messageService, service);

        this.form = this.formBuilder.group({
            id: new FormControl(),
            name: new FormControl(),
            map: new FormControl(),
            author: new FormControl(),
            gameType: new FormControl(),
            slotsMin: new FormControl(),
            slotsMax: new FormControl(),
            createdAt: new FormControl(),
            createdBy: new FormControl(),
            status: new FormControl(),
            modset: new FormControl(),
            dlcs: new FormControl(),
            description: new FormControl(),
            missionFiles: new FormControl(),
        });
    }

    override ngOnInit() {
        super.ngOnInit();

        this.mapService.getAll().subscribe({
            next: (data: Map[]) => {
                this.maps = data;
            },
            error: (error) => this.handleError(error),
        });

        this.gameTypeService.getAll().subscribe({
            next: (data: GameType[]) => {
                this.gameTypes = data;
            },
            error: (error) => this.handleError(error),
        });

        this.statusService.getAll().subscribe({
            next: (data: Status[]) => {
                this.statuses = data;
            },
            error: (error) => this.handleError(error),
        });

        this.modsetService.getAll().subscribe({
            next: (data: Modset[]) => {
                this.modsets = data;
            },
            error: (error) => this.handleError(error),
        });

        this.dlcService.getAll().subscribe({
            next: (data: DLC[]) => {
                this.DLCs = data;
            },
            error: (error) => this.handleError(error),
        });
    }

    override handleEdit(mission: Mission) {
        this.form.setValue({
            ...mission,
            gameType: mission.gameType.id,
            status: mission.status.id,
        });

        this.openNewDialog();
    }

    override handleSave() {
        if (this.form.valid) {
            this.closeNewDialog();
            this.setLoadingState(true);

            const form = this.form;
            const formData = form.value;

            formData.gameType = this.findRelatedDataById(
                this.gameTypes,
                formData.gameType
            );
            formData.status = this.findRelatedDataById(
                this.statuses,
                formData.status
            );

            const dto = this.convertToDto(formData);

            if (form.value.id) {
                this.update(dto);
            } else {
                this.create(formData);
            }
        } else {
            this.showToastMessage(MessageType.WARNING, 'Invalid input data');
        }
    }

    filterMap(event: any): void {
        const filtered: Map[] = [];
        const query = event.query;

        for (const map of this.maps) {
            if (map.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(map);
            }
        }

        this.filteredMaps = filtered;
    }

    filterModset(event: any): void {
        const filtered: Modset[] = [];
        const query = event.query;

        for (const modset of this.modsets) {
            if (modset.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(modset);
            }
        }

        this.filteredModsets = filtered;
    }

    private convertToDto(mission: Mission): MissionDto {
        return {
            id: mission.id,
            name: mission.name,
            mapId: mission.map.id,
            author: mission.author,
            gameTypeId: mission.gameType.id,
            slotsMin: mission.slotsMin,
            slotsMax: mission.slotsMax,
            createdById: mission.createdBy.id,
            statusId: mission.status.id,
            modsetId: mission.modset.id,
            dlcs: mission.dlcs.map((element: DLC) => element.id),
            description: mission.description,
        } as MissionDto;
    }

    private findRelatedDataById(
        collection: AbstractData[],
        id: number
    ): AbstractData | undefined {
        const data = collection.find((value) => value.id === id);

        if (!data)
            this.handleError(
                `Data with ID ${id} is not found in collection: ${collection}`
            );

        return data;
    }
}

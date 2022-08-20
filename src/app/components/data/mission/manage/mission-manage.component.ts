import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Mission } from '../../../../models/Mission';
import { Map } from '../../../../models/Map';
import { MissionService } from '../../../../services/mission.service';
import { Router } from '@angular/router';
import { MapService } from '../../../../services/map.service';
import { GameType } from '../../../../models/GameType';
import { GameTypeService } from '../../../../services/game-type.service';
import { Status } from '../../../../models/Status';
import { StatusService } from '../../../../services/status.service';
import { DLC } from '../../../../models/DLC';
import { DLCService } from '../../../../services/dlc.service';
import { Modset } from '../../../../models/Modset';
import { ModsetService } from '../../../../services/modset.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    templateUrl: './mission-manage.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionManageComponent implements OnInit {
    // Missions
    missions: Mission[] = [];
    selectedMission!: Mission;

    // Maps
    maps: Map[] = [];
    selectedMap!: Map;
    filteredMaps: Map[] = [];

    // Game types
    gameTypes: GameType[] = [];
    selectedGameType!: GameType;

    // Slots
    selectedSlotsMin!: number;
    selectedSlotsMax!: number;

    // Statuses
    statuses: Status[] = [];
    selectedStatus!: Status;

    // Modsets
    modsets: Modset[] = [];
    selectedModset!: Modset;
    filteredModsets: Modset[] = [];

    // DLC's
    DLCs: DLC[] = [];
    selectedDLCs: DLC[] = [];

    @ViewChild('filter') filter!: ElementRef;
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];

    constructor(
        private service: MissionService,
        private mapService: MapService,
        private gameTypeService: GameTypeService,
        private statusService: StatusService,
        private modsetService: ModsetService,
        private dlcService: DLCService,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: Mission[]) => {
            this.missions = data;
            this.loading = false;
        });

        this.mapService.getAll().subscribe((data: Map[]) => {
            this.maps = data;
        });

        this.gameTypeService.getAll().subscribe((data: GameType[]) => {
            this.gameTypes = data;
        });

        this.statusService.getAll().subscribe((data: Status[]) => {
            this.statuses = data;
        });

        this.modsetService.getAll().subscribe((data: Modset[]) => {
            this.modsets = data;
        });

        this.dlcService.getAll().subscribe((data: DLC[]) => {
            this.DLCs = data;
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
        this.router.navigateByUrl('/data/missions');
    }

    openNew() {
        this.selectedMission = {} as Mission;
        this.selectedMap = {} as Map;
        this.selectedGameType = {} as GameType;
        this.selectedSlotsMin = 0;
        this.selectedSlotsMax = 0;
        this.selectedStatus = {} as Status;
        this.selectedModset = {} as Modset;
        this.selectedDLCs = this.DLCs.filter((value) => value.name === 'None');

        this.selectedMission.missionFiles = [];
        this.selectedMission.createdBy = this.authService.userValue;

        this.submitted = false;
        this.newDialog = true;
    }

    editMission(mission: Mission) {
        this.selectedMission = { ...mission };

        console.log(this.selectedMission);

        this.selectedMap = mission.map;
        this.selectedGameType = mission.gameType;
        this.selectedSlotsMin = mission.slotsMin;
        this.selectedSlotsMax = mission.slotsMax;
        this.selectedStatus = mission.status;
        this.selectedModset = mission.modset;
        this.selectedDLCs = mission.dlcs;
        this.newDialog = true;
    }

    deleteMission(mission: Mission) {
        this.deleteDialog = true;
        this.selectedMission = { ...mission };
    }

    saveMission() {
        this.submitted = true;
        console.log(this.selectedMission);

        this.selectedMission.map = this.selectedMap;
        this.selectedMission.modset = this.selectedModset;
        this.selectedMission.slotsMin = this.selectedSlotsMin;
        this.selectedMission.slotsMax = this.selectedSlotsMax;
        this.selectedMission.dlcs = this.selectedDLCs;
        // @ts-ignore
        this.selectedMission.gameType = this.gameTypes.find(
            (value) => value.id === this.selectedGameType.id
        );
        // @ts-ignore
        this.selectedMission.status = this.statuses.find(
            (value) => value.id === this.selectedStatus.id
        );

        if (this.selectedMission.name?.trim()) {
            if (this.selectedMission.id) {
                const requested = this.selectedMission;

                this.service
                    .update(this.selectedMission.id, requested)
                    .subscribe((data) => {
                        this.missions[
                            this.findIndexById(this.selectedMission.id)
                        ] = this.selectedMission;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Mission updated',
                            life: 3000,
                        });

                        this.missions = [...this.missions];
                        this.newDialog = false;
                        this.selectedMission = {} as Mission;
                    });
            } else {
                this.service.create(this.selectedMission).subscribe((data) => {
                    this.missions.push(data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Mission created',
                        life: 3000,
                    });

                    this.missions = [...this.missions];
                    this.newDialog = false;
                    this.selectedMission = {} as Mission;
                });
            }
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.missions.length; i++) {
            if (this.missions[i].id === id) {
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

        if (this.selectedMission.id) {
            this.service.delete(this.selectedMission.id).subscribe((data) => {
                this.missions = this.missions.filter(
                    (value) => value.id !== this.selectedMission.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Mission deleted',
                    life: 3000,
                });
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Couldn't remove Mission",
                life: 3000,
            });

            this.selectedMission = {} as Mission;
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
}

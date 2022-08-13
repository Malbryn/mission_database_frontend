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

@Component({
    templateUrl: './mission-manage.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MissionManageComponent implements OnInit {
    currentMission!: Mission | any;
    missions: Mission[] = [];
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];

    // Maps
    maps: Map[] = [];
    selectedMap: Map | any;
    filteredMaps: Map[] = [];

    // Game types
    gameTypes: GameType[] = [];
    selectedGameType: GameType | any = {};

    // Slots
    selectedSlotsMin: number | undefined;
    selectedSlotsMax: number | undefined;

    // Statuses
    statuses: Status[] = [];
    selectedStatus: Status | any = {};

    // Modsets
    modsets: Modset[] = [];
    selectedModset: Modset | any;
    filteredModsets: Modset[] = [];

    // DLC's
    DLCs: DLC[] = [];
    selectedDLCs: any[] = [];

    // Description
    description: string = '';

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private service: MissionService,
        private mapService: MapService,
        private gameTypeService: GameTypeService,
        private statusService: StatusService,
        private modsetService: ModsetService,
        private dlcService: DLCService,
        private messageService: MessageService,
        private router: Router
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
        this.currentMission = {};
        this.selectedMap = {};
        this.selectedGameType = {};
        this.selectedSlotsMin = undefined;
        this.selectedSlotsMax = undefined;
        this.selectedStatus = {};
        this.selectedModset = {};
        this.selectedDLCs = [];
        this.description = '';
        this.submitted = false;
        this.newDialog = true;
    }

    editMission(mission: Mission) {
        this.currentMission = { ...mission };
        this.selectedMap = mission.map;
        this.selectedGameType = mission.game_type.name;
        this.selectedSlotsMin = mission.slots_min;
        this.selectedSlotsMax = mission.slots_max;
        this.selectedStatus = mission.status.name;
        this.selectedModset = mission.modset;
        this.selectedDLCs = mission.dlc.map((dlc) => dlc.name);
        this.description = mission.description;
        this.newDialog = true;
    }

    deleteMission(mission: Mission) {
        this.deleteDialog = true;
        this.currentMission = { ...mission };
    }

    saveMission() {
        this.submitted = true;
        console.log(this.currentMission);

        if (this.currentMission.name?.trim()) {
            if (this.currentMission.id) {
                this.service
                    .update(this.currentMission.id, this.currentMission)
                    .subscribe((data) => {
                        this.missions[
                            this.findIndexById(this.currentMission.id)
                        ] = this.currentMission;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Mission updated',
                            life: 3000,
                        });

                        this.missions = [...this.missions];
                        this.newDialog = false;
                        this.currentMission = {};
                    });
            } else {
                this.service.create(this.currentMission).subscribe((data) => {
                    this.missions.push(data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Mission created',
                        life: 3000,
                    });

                    this.missions = [...this.missions];
                    this.newDialog = false;
                    this.currentMission = {};
                });
            }
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.missions.length; i++) {
            if (this.missions[i].id === parseInt(id, 10)) {
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

        if (this.currentMission.id) {
            this.service.delete(this.currentMission.id).subscribe((data) => {
                this.missions = this.missions.filter(
                    (value) => value.id !== this.currentMission.id
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

            this.currentMission = {};
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

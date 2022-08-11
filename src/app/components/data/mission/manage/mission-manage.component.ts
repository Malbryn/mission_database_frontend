import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Mission } from '../../../../models/Mission';
import { MissionService } from '../../../../services/mission.service';
import { Router } from '@angular/router';

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
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private service: MissionService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: Mission[]) => {
            this.missions = data;
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
        this.router.navigateByUrl('/data/missions');
    }

    openNew() {
        this.currentMission = {};
        this.submitted = false;
        this.newDialog = true;
    }

    editMission(mission: Mission) {
        this.currentMission = { ...mission };
        this.newDialog = true;
    }

    deleteMission(mission: Mission) {
        this.deleteDialog = true;
        this.currentMission = { ...mission };
    }

    saveMission() {
        this.submitted = true;

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
}

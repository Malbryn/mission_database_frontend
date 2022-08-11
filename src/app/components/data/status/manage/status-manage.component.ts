import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Status } from '../../../../models/Status';
import { StatusService } from '../../../../services/status.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './status-manage.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class StatusManageComponent implements OnInit {
    currentStatus!: Status | any;
    statuses: Status[] = [];
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private service: StatusService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: Status[]) => {
            this.statuses = data;
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
        this.router.navigateByUrl('/data/statuses');
    }

    openNew() {
        this.currentStatus = {};
        this.submitted = false;
        this.newDialog = true;
    }

    editStatus(status: Status) {
        this.currentStatus = { ...status };
        this.newDialog = true;
    }

    deleteStatus(status: Status) {
        this.deleteDialog = true;
        this.currentStatus = { ...status };
    }

    saveStatus() {
        this.submitted = true;

        if (this.currentStatus.name?.trim()) {
            if (this.currentStatus.id) {
                this.service
                    .update(this.currentStatus.id, this.currentStatus)
                    .subscribe((data) => {
                        this.statuses[
                            this.findIndexById(this.currentStatus.id)
                        ] = this.currentStatus;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Status updated',
                            life: 3000,
                        });

                        this.statuses = [...this.statuses];
                        this.newDialog = false;
                        this.currentStatus = {};
                    });
            } else {
                this.service.create(this.currentStatus).subscribe((data) => {
                    this.statuses.push(data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Status created',
                        life: 3000,
                    });

                    this.statuses = [...this.statuses];
                    this.newDialog = false;
                    this.currentStatus = {};
                });
            }
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.statuses.length; i++) {
            if (this.statuses[i].id === parseInt(id, 10)) {
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

        if (this.currentStatus.id) {
            this.service.delete(this.currentStatus.id).subscribe((data) => {
                this.statuses = this.statuses.filter(
                    (value) => value.id !== this.currentStatus.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Status deleted',
                    life: 3000,
                });
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Couldn't remove Status",
                life: 3000,
            });

            this.currentStatus = {};
        }
    }
}

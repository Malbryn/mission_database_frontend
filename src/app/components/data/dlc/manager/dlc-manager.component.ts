import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DLC } from '../../../../models/DLC';
import { DLCService } from '../../../../services/dlc.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dlc-manager.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class DlcManagerComponent implements OnInit {
    currentDLC!: DLC | any;
    DLCs: DLC[] = [];
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private service: DLCService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: DLC[]) => {
            this.DLCs = data;
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
        this.router.navigateByUrl('/data/dlcs');
    }

    openNew() {
        this.currentDLC = {};
        this.submitted = false;
        this.newDialog = true;
    }

    editDLC(dlc: DLC) {
        this.currentDLC = { ...dlc };
        this.newDialog = true;
    }

    deleteDLC(dlc: DLC) {
        this.deleteDialog = true;
        this.currentDLC = { ...dlc };
    }

    saveDLC() {
        this.submitted = true;

        if (this.currentDLC.name?.trim()) {
            if (this.currentDLC.id) {
                this.service
                    .update(this.currentDLC.id, this.currentDLC)
                    .subscribe((data) => {
                        this.DLCs[this.findIndexById(this.currentDLC.id)] =
                            this.currentDLC;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'DLC updated',
                            life: 3000,
                        });

                        this.DLCs = [...this.DLCs];
                        this.newDialog = false;
                        this.currentDLC = {};
                    });
            } else {
                this.service.create(this.currentDLC).subscribe((data) => {
                    this.DLCs.push(data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'DLC created',
                        life: 3000,
                    });

                    this.DLCs = [...this.DLCs];
                    this.newDialog = false;
                    this.currentDLC = {};
                });
            }
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.DLCs.length; i++) {
            if (this.DLCs[i].id === parseInt(id, 10)) {
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

        if (this.currentDLC.id) {
            this.service.delete(this.currentDLC.id).subscribe((data) => {
                this.DLCs = this.DLCs.filter(
                    (value) => value.id !== this.currentDLC.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'DLC deleted',
                    life: 3000,
                });
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Couldn't remove DLC",
                life: 3000,
            });

            this.currentDLC = {};
        }
    }
}

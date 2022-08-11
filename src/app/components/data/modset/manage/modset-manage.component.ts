import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Modset } from '../../../../models/Modset';
import { ModsetService } from '../../../../services/modset.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './modset-manage.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class ModsetManageComponent implements OnInit {
    currentModset!: Modset | any;
    modsets: Modset[] = [];
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private service: ModsetService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: Modset[]) => {
            this.modsets = data;
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
        this.router.navigateByUrl('/data/modsets');
    }

    openNew() {
        this.currentModset = {};
        this.submitted = false;
        this.newDialog = true;
    }

    editModset(modset: Modset) {
        this.currentModset = { ...modset };
        this.newDialog = true;
    }

    deleteModset(modset: Modset) {
        this.deleteDialog = true;
        this.currentModset = { ...modset };
    }

    saveModset() {
        this.submitted = true;

        if (this.currentModset.name?.trim()) {
            if (this.currentModset.id) {
                this.service
                    .update(this.currentModset.id, this.currentModset)
                    .subscribe((data) => {
                        this.modsets[
                            this.findIndexById(this.currentModset.id)
                        ] = this.currentModset;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Modset updated',
                            life: 3000,
                        });

                        this.modsets = [...this.modsets];
                        this.newDialog = false;
                        this.currentModset = {};
                    });
            } else {
                this.service.create(this.currentModset).subscribe((data) => {
                    this.modsets.push(data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Modset created',
                        life: 3000,
                    });

                    this.modsets = [...this.modsets];
                    this.newDialog = false;
                    this.currentModset = {};
                });
            }
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.modsets.length; i++) {
            if (this.modsets[i].id === parseInt(id, 10)) {
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

        if (this.currentModset.id) {
            this.service.delete(this.currentModset.id).subscribe((data) => {
                this.modsets = this.modsets.filter(
                    (value) => value.id !== this.currentModset.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Modset deleted',
                    life: 3000,
                });
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Couldn't remove modset",
                life: 3000,
            });

            this.currentModset = {};
        }
    }
}

import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Map } from '../../../../models/Map';
import { MapService } from '../../../../services/map.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './map-manager.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MapManagerComponent implements OnInit {
    currentMap!: Map | any;
    maps: Map[] = [];
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private service: MapService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: Map[]) => {
            this.maps = data;
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
        this.router.navigateByUrl('/data/maps');
    }

    openNew() {
        this.currentMap = {};
        this.submitted = false;
        this.newDialog = true;
    }

    editMap(map: Map) {
        this.currentMap = { ...map };
        this.newDialog = true;
    }

    deleteMap(map: Map) {
        this.deleteDialog = true;
        this.currentMap = { ...map };
    }

    saveMap() {
        this.submitted = true;

        if (this.currentMap.name?.trim()) {
            if (this.currentMap.id) {
                this.service
                    .update(this.currentMap.id, this.currentMap)
                    .subscribe((data) => {
                        this.maps[this.findIndexById(this.currentMap.id)] =
                            this.currentMap;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Map updated',
                            life: 3000,
                        });

                        this.maps = [...this.maps];
                        this.newDialog = false;
                        this.currentMap = {};
                    });
            } else {
                this.service.create(this.currentMap).subscribe((data) => {
                    this.maps.push(data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Map created',
                        life: 3000,
                    });

                    this.maps = [...this.maps];
                    this.newDialog = false;
                    this.currentMap = {};
                });
            }
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.maps.length; i++) {
            if (this.maps[i].id === parseInt(id, 10)) {
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

        if (this.currentMap.id) {
            this.service.delete(this.currentMap.id).subscribe((data) => {
                this.maps = this.maps.filter(
                    (value) => value.id !== this.currentMap.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Map deleted',
                    life: 3000,
                });
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Couldn't remove Map",
                life: 3000,
            });

            this.currentMap = {};
        }
    }
}

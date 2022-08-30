import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GameType } from '../../../../models/GameType';
import { GameTypeService } from '../../../../services/game-type.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './game-type-manager.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class GameTypeManagerComponent implements OnInit {
    currentGameType!: GameType | any;
    gameTypes: GameType[] = [];
    newDialog: boolean = false;
    deleteDialog: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    cols: any[] = [];
    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private service: GameTypeService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: GameType[]) => {
            this.gameTypes = data;
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
        this.router.navigateByUrl('/data/game-types');
    }

    openNew() {
        this.currentGameType = {};
        this.submitted = false;
        this.newDialog = true;
    }

    editGameType(gameType: GameType) {
        this.currentGameType = { ...gameType };
        this.newDialog = true;
    }

    deleteGameType(gameType: GameType) {
        this.deleteDialog = true;
        this.currentGameType = { ...gameType };
    }

    saveGameType() {
        this.submitted = true;

        if (this.currentGameType.name?.trim()) {
            if (this.currentGameType.id) {
                this.service
                    .update(this.currentGameType.id, this.currentGameType)
                    .subscribe((data) => {
                        this.gameTypes[
                            this.findIndexById(this.currentGameType.id)
                        ] = this.currentGameType;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Game type updated',
                            life: 3000,
                        });

                        this.gameTypes = [...this.gameTypes];
                        this.newDialog = false;
                        this.currentGameType = {};
                    });
            } else {
                this.service.create(this.currentGameType).subscribe((data) => {
                    this.gameTypes.push(data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Game type created',
                        life: 3000,
                    });

                    this.gameTypes = [...this.gameTypes];
                    this.newDialog = false;
                    this.currentGameType = {};
                });
            }
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.gameTypes.length; i++) {
            if (this.gameTypes[i].id === parseInt(id, 10)) {
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

        if (this.currentGameType.id) {
            this.service.delete(this.currentGameType.id).subscribe((data) => {
                this.gameTypes = this.gameTypes.filter(
                    (value) => value.id !== this.currentGameType.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Game type deleted',
                    life: 3000,
                });
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Couldn't remove Game type",
                life: 3000,
            });

            this.currentGameType = {};
        }
    }
}

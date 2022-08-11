import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GameType } from '../../../models/GameType';
import { GameTypeService } from '../../../services/game-type.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './game-type.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class GameTypeComponent implements OnInit {
    gameTypes: GameType[] = [];
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: GameTypeService, private router: Router) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: GameType[]) => {
            this.gameTypes = data;
            this.loading = false;
        });
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

    manage() {
        this.router.navigate(['data/game-types/manage']);
    }
}

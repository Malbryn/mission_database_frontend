import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MissionService } from '../../../service/mission.service';
import { GameType } from '../../../api/GameType';

@Component({
    templateUrl: './game-type.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class GameTypeComponent implements OnInit {
    gameTypes: GameType[] = [];
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private missionService: MissionService) {}

    ngOnInit() {
        this.missionService.getGameTypes().then((gameTypes) => {
            this.gameTypes = gameTypes;
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
}

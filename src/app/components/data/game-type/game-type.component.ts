import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GameType } from '../../../models/game-type';
import { GameTypeService } from '../../../services/game-type.service';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';

@Component({
    templateUrl: './game-type.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class GameTypeComponent extends AbstractDataComponent implements OnInit {
    gameTypes: GameType[] = [];

    constructor(private service: GameTypeService, private router: Router) {
        super();
    }

    override manage(): void {
        this.router.navigate(['data/game-types/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: GameType[]) => {
            this.gameTypes = data;
            this.loading = false;
        });
    }
}

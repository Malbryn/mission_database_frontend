import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GameType } from '../../../models/game-type';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';
import { AuthGuard } from '../../../helpers/auth.guard';
import { UserRole } from '../../../models/user-role';
import { GameTypeService } from '../../../services/game-type.service';

@Component({
    templateUrl: './game-type.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class GameTypeComponent extends AbstractDataComponent implements OnInit {
    static readonly MANAGE_PERMISSION_LEVEL = UserRole.ADMIN;

    gameTypes: GameType[] = [];

    constructor(
        private service: GameTypeService,
        private router: Router,
        authGuard: AuthGuard
    ) {
        super(authGuard);

        this.canManage = this.hasPermission(
            GameTypeComponent.MANAGE_PERMISSION_LEVEL
        );
    }

    override manage(): void {
        this.router.navigate(['data/game-types/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: GameType[]) => {
            this.gameTypes = data;
            this.isLoading = false;
        });
    }
}

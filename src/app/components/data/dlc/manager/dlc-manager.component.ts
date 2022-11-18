import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DLC } from '../../../../models/dlc';
import { DLCService } from '../../../../services/dlc.service';
import { Router } from '@angular/router';
import { AbstractManagerComponent } from '../../common/abstract-manager.component';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
    templateUrl: './dlc-manager.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class DLCManagerComponent extends AbstractManagerComponent<DLC> {
    constructor(
        router: Router,
        formBuilder: FormBuilder,
        authService: AuthService,
        messageService: MessageService,
        service: DLCService
    ) {
        super(router, formBuilder, authService, messageService, service);

        this.form = this.formBuilder.group({
            id: new FormControl(),
            name: new FormControl(),
        });
    }
}

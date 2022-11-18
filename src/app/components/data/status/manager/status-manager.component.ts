import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Status } from '../../../../models/Status';
import { StatusService } from '../../../../services/status.service';
import { Router } from '@angular/router';
import { AbstractManagerComponent } from '../../common/abstract-manager.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
    templateUrl: './status-manager.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class StatusManagerComponent extends AbstractManagerComponent<Status> {
    constructor(
        router: Router,
        formBuilder: FormBuilder,
        authService: AuthService,
        messageService: MessageService,
        service: StatusService
    ) {
        super(router, formBuilder, authService, messageService, service);

        this.form = this.formBuilder.group({
            id: new FormControl(),
            name: new FormControl(),
        });
    }
}

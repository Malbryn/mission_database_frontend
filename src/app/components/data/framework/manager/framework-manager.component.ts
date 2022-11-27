import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AbstractManagerComponent } from '../../common/abstract-manager.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { FrameworkService } from '../../../../services/framework.service';
import { Framework } from '../../../../models/framework';

@Component({
    templateUrl: './framework-manager.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class FrameworkManagerComponent extends AbstractManagerComponent<Framework> {
    constructor(
        router: Router,
        formBuilder: FormBuilder,
        authService: AuthService,
        messageService: MessageService,
        service: FrameworkService
    ) {
        super(router, formBuilder, authService, messageService, service);

        this.form = this.formBuilder.group({
            id: new FormControl(),
            name: new FormControl(),
            link: new FormControl(),
        });
    }
}

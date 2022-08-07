import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [AuthService],
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    form!: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }

    submitForm(): void {
        if (this.form.invalid) {
            return;
        }

        this.authService
            .logIn(
                this.form.get('username')?.value,
                this.form.get('password')?.value
            )
            .subscribe(() => {
                this.router.navigate(['']);
            });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
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
    providers: [MessageService],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        if (this.authService.currentUser.value) {
            this.router.navigate(['/']);
        }
    }

    get formControls() {
        return this.loginForm?.controls;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm?.invalid) return;

        this.loading = true;

        this.authService
            .logIn(
                this.formControls['username'].value,
                this.formControls['password'].value
            )
            .pipe(first())
            .subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.error = error;
                    this.loading = false;
                    this.showErrorViaToast();
                },
            });

        this.router.navigate(['/']);
    }

    showErrorViaToast() {
        this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid credentials',
        });
    }
}

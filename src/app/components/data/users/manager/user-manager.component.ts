import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AbstractManagerComponent } from '../../common/abstract-manager.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
import { UserRole } from '../../../../models/user-role';
import { MessageType } from '../../../../models/message-type';

@Component({
    templateUrl: './user-manager.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class UserManagerComponent extends AbstractManagerComponent<User> {
    roles: Map<UserRole, string>;
    filteredRoles: Map<UserRole, string> = new Map<UserRole, string>();

    constructor(
        router: Router,
        formBuilder: FormBuilder,
        authService: AuthService,
        messageService: MessageService,
        service: UserService
    ) {
        super(router, formBuilder, authService, messageService, service);

        this.roles = new Map<UserRole, string>();
        this.roles.set(UserRole.MEMBER, 'Member');
        this.roles.set(UserRole.CREATOR, 'Creator');
        this.roles.set(UserRole.STAFF, 'Staff');

        this.form = this.formBuilder.group({
            id: new FormControl(),
            role: new FormControl(),
        });
    }

    override handleEdit(user: User): void {
        const role = this.getHighestRole(user);

        if (role === 4) {
            this.showToastMessage(
                MessageType.INFO,
                'Admin users cannot be edited.',
                5000
            );

            return;
        }

        this.form.setValue({
            id: user.id,
            role,
        });

        this.openNewDialog();
    }

    override handleSave(): void {
        if (this.form.valid) {
            this.closeNewDialog();
            this.setLoadingState(true);

            const form = this.form;
            const formData = form.value;

            const userData = this.getUserDto(formData);

            if (userData.id) {
                this.updateUser(userData);
            } else {
                // this.create(userData);
            }

            // Fixes an issue with sorted tables where the table won't refresh
            this.data = [...this.data];
        } else {
            this.showToastMessage(MessageType.WARNING, 'Invalid input data');
        }
    }

    updateUser(user: Partial<User>): void {
        this.service.update(user.id!, user).subscribe({
            next: (value: User) => {
                const index = this.findIndexById(user.id!, this.data);
                this.data[index] = value;

                // Fixes an issue with sorted tables where the table won't refresh
                this.data = [...this.data];

                this.setLoadingState(false);
                this.showToastMessage(
                    MessageType.SUCCESS,
                    'Updated successfully'
                );
            },
            error: (error) => this.handleError(error),
        });
    }

    override handleDelete(user: User): void {
        const role = this.getHighestRole(user);

        if (role === 4) {
            this.showToastMessage(
                MessageType.INFO,
                'Admin users cannot be deleted.',
                5000
            );

            return;
        }

        this.selectedValue = { ...user };
        this.openDeleteDialog();
    }

    private getHighestRole(user: User): UserRole {
        if (user['isAdmin']) return UserRole.ADMIN;
        if (user['isStaff']) return UserRole.STAFF;
        if (user['isCreator']) return UserRole.CREATOR;
        if (user['isMember']) return UserRole.MEMBER;

        return UserRole.UNKNOWN;
    }

    private getUserDto(formData: { id: number; role: number }): Partial<User> {
        const user = {
            id: formData.id,
            isMember: true,
            isCreator: true,
            isStaff: true,
        } as User;

        if (formData.role < UserRole.STAFF) {
            user.isStaff = false;

            if (formData.role < UserRole.CREATOR) {
                user.isCreator = false;
            }
        }

        return user;
    }
}

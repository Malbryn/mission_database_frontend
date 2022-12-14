import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { UserManagerComponent } from './manager/user-manager.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        ChipModule,
        ToolbarModule,
        DialogModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        RadioButtonModule,
    ],
    declarations: [UserComponent, UserManagerComponent],
})
export class UserModule {}

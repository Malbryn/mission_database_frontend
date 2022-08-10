import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Modset } from '../../../models/Modset';
import { ModsetService } from '../../../services/modset.service';

@Component({
    templateUrl: './modset.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class ModsetComponent implements OnInit {
    modsets: Modset[] = [];
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: ModsetService) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: Modset[]) => {
            this.modsets = data;
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

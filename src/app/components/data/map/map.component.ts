import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Map } from '../../../models/Map';
import { MapService } from '../../../services/map.service';

@Component({
    templateUrl: './map.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MapComponent implements OnInit {
    maps: Map[] = [];
    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private service: MapService) {}

    ngOnInit() {
        this.service.getAll().subscribe((data: Map[]) => {
            this.maps = data;
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

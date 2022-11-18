import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Map } from '../../../models/map';
import { MapService } from '../../../services/map.service';
import { Router } from '@angular/router';
import { AbstractDataComponent } from '../common/abstract-data.component';

@Component({
    templateUrl: './map.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService, ConfirmationService],
})
export class MapComponent extends AbstractDataComponent implements OnInit {
    maps: Map[] = [];

    constructor(private service: MapService, private router: Router) {
        super();
    }

    override manage(): void {
        this.router.navigate(['data/maps/manage']);
    }

    ngOnInit() {
        this.service.getAll().subscribe((data: Map[]) => {
            this.maps = data;
            this.loading = false;
        });
    }
}

import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements AfterViewInit {

  private _vehicleService = inject(VehicleService);

  ngAfterViewInit(): void {
    this._vehicleService.getAllVehicles();
  }

}

import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { PaginatorTranlation } from '../../../shared/utils/paginator-translation';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateVehicleComponent } from '../add-update-vehicle/add-update-vehicle.component';
import { Vehicle } from '../../interfaces/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { FileService } from '../../services/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useClass: PaginatorTranlation }
  ]
})
export class TableComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  @Output() editRow = new EventEmitter<Vehicle>();

  dialog = inject(MatDialog);
  private _vehicleService = inject(VehicleService);
  private _fileService = inject(FileService);

  displayedColumns: string[] = ['id', 'brand', 'model', 'actions'];
  columnHeaders: { [key: string]: string } = {
    id: 'ID',
    brand: 'Marca',
    model: 'Modelo',
    actions: 'Acciones'
  };

  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
  };

  ngAfterViewInit() {
    this.getAllVehicles();
  }

  async getAllVehicles() {
    const response = await this._vehicleService.getAllVehicles();
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async deleteVehicle(vehicle: Vehicle): Promise<void> {
    try {
      Swal.fire({
        title: "¿Estas seguro de eliminar el Vehiculo?",
        showDenyButton: true,
        confirmButtonText: "Si, eliminar",
        denyButtonText: `No, cancelar`,
        confirmButtonColor: "#dc3545",
        denyButtonColor: "#434343"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this._fileService.deleteVehicleImage(vehicle.image);
          await this._vehicleService.deleteVehicleRecord(vehicle.id);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Vehículo eliminado correctamente",
            showConfirmButton: false,
            timer: 1500
          });
    
          this.getAllVehicles();
        }
      });
      
    } catch (err) {
      console.error('Error al eliminar vehículo o imagen:', err);
    }
  }


  openEditModal(row: Vehicle) {
    const modal = this.dialog.open(AddUpdateVehicleComponent, {
      data: {
        title: 'Editar Vehículo',
        data: row
      },
    });

    modal.afterClosed().subscribe((result) => {
      this.getAllVehicles();
    });
  }

  addModal() {
    const modal = this.dialog.open(AddUpdateVehicleComponent, {
      data: {
        title: 'Agregar Vehículo',
        data: null
      },
    });

    modal.afterClosed().subscribe((result) => {
      this.getAllVehicles();
    });
  }


}

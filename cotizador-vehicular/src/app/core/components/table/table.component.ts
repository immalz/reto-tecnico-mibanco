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
  displayedColumns: string[] = ['id', 'brand', 'model', 'year', 'usageType', 'Acciones'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
      this.dataSource = new MatTableDataSource([
          {id: 1, brand: 'Toyota', model: 'Corolla', year: 2020, 'usageType': 'Particular'},
          {id: 2, brand: 'Honda', model: 'Civic', year: 2019, 'usageType': 'Particular'},
          {id: 3, brand: 'Ford', model: 'Focus', year: 2021, 'usageType': 'Servicio'},
          {id: 4, brand: 'Chevrolet', model: 'Malibu', year: 2018, 'usageType': 'Servicio'},
          {id: 5, brand: 'Nissan', model: 'Sentra', year: 2022, 'usageType': 'Particular'},
          {id: 6, brand: 'Hyundai', model: 'Elantra', year: 2020, 'usageType': 'Servicio'},
          {id: 7, brand: 'Kia', model: 'Forte', year: 2021, 'usageType': 'Particular'},
      ]);
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditModal(row: Vehicle) {
    this.editRow.emit(row);
    this.dialog.open(AddUpdateVehicleComponent, {
      data: {
        title: 'Editar Vehículo',
        data: row
      },
      // width: '500px',
    })
  }

  addModal() {
    this.dialog.open(AddUpdateVehicleComponent, {
      data: {
        title: 'Agregar Vehículo',
        data: null
      },
      // width: '500px',
    });
  }


}

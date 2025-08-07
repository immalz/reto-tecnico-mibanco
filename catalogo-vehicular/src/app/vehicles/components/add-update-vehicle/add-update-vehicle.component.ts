import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Vehicle } from '../../interfaces/vehicle';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleStore } from '../../store/vehicle.store';
import { FileService } from '../../services/file.service';
import Swal from 'sweetalert2';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-add-update-vehicle',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatSelectModule,
    NgOptimizedImage
  ],
  templateUrl: './add-update-vehicle.component.html',
  styleUrl: './add-update-vehicle.component.scss'
})
export class AddUpdateVehicleComponent implements OnInit {

  private _vehicleService = inject(VehicleService);
  private _fileService = inject(FileService);
  _store = inject(VehicleStore);
  fb = inject(FormBuilder);
  data = inject<{title: string, data: Vehicle}>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AddUpdateVehicleComponent>);

  loading = signal<boolean>(false);

  form!: FormGroup;
  previewUrl: string | null = null;  

  ngOnInit(): void {
    this.initForm();
    this.getFilters();
  }

  patchValues() {
    this.onBrandChange(this.data.data.brand);

    this.form.patchValue({
      brand: this.data.data.brand,
      model: this.data.data.model,
      image: this.data.data.image
    });
    this.previewUrl = this.data.data.image;
  }

  getFilters(): void {
    this._vehicleService.getFilters().subscribe((response: any) => {
      this._store.setData(response);
    });
  }

  onBrandChange(value: string) {
    this._store.setBrand(value);
    this.form.get('model')?.reset();
  }

  onModelChange(value: string) {
    this._store.setModel(value);
  }

  initForm(): void {
    this.form = this.fb.group({
      brand: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required])],
      image: [null, Validators.compose([Validators.required])],
    });

    if(this.data.data) this.patchValues();
  }

  async createVehicle() {
    try {
      const file: File = this.form.get('image')?.value;
      this.loading.set(true);
      if(file) {
        const imageUrl = await this._fileService.uploadImage(file);
  
        if(imageUrl) {
          const vehicle: Vehicle = {
            brand: this.form.get('brand')?.value,
            model: this.form.get('model')?.value,
            image: imageUrl
          };
  
          await this._vehicleService.insertVehicle(vehicle).then(() => {
            this._vehicleService.getAllVehicles();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Se registro el vehículo correctamente",
              showConfirmButton: false,
              timer: 1500
            });
            this.loading.set(false);
            this.previewUrl = null;
            this.dialogRef.close();
          })
        }
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Ha ocurrido un error",
        showConfirmButton: false,
        timer: 1500
      });
      this.loading.set(false);
    }
  }

  async updateVehicle() {
    const file: any = this.form.get('image')?.value;
    this.loading.set(true);
    let imageUrl = '';

    if (file instanceof File) {
      const uploadedUrl = await this._fileService.uploadImage(file);
      if (!uploadedUrl) return;
  
      imageUrl = uploadedUrl;
    } else {
      imageUrl = file;
    }
    if(imageUrl) {
      const vehicle: Vehicle = {
        brand: this.form.get('brand')?.value,
        model: this.form.get('model')?.value,
        image: imageUrl
      };

      await this._vehicleService.updateVehicle(this.data.data.id, vehicle).then(() => {
        this._vehicleService.getAllVehicles();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Se actualizo el vehículo correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        this.loading.set(false);
        this.previewUrl = null;
        this.dialogRef.close();
      })
    }
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0] ?? null;

    if (file) {
      this.form.get('image')?.setValue(file);
      this.previewUrl = URL.createObjectURL(file);
    }
  }
}

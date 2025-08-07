import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { RouterModule } from '@angular/router';
import { PrimaResult } from '../../interfaces/PrimaResult';
import { Vehicle } from '../../interfaces/vehicle';
import { QuoterService } from '../../services/quoter.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {
 private _vehicleService = inject(VehicleService);
  private _quoterService = inject(QuoterService);
  private _fb = inject(FormBuilder);

  form: FormGroup = this._fb.group({});
  vehicles = signal<Vehicle[]>([]);
  filteredModels: any = signal<Vehicle[]>([]);
  filteredBrands: any = signal<string[]>([]);
  imageUrl = signal<string>('');
  quoteData = signal<PrimaResult>({
    basePrima: 0,
    depreciationFactor: 0,
    driverAgeFactor: 0,
    useTypeFactor: 0,
    brandModelRiskFactor: 0,
    adjustedVehicleValue: 0,
    primaFinal: 0,
    ageAdjustmentAmount: 0,
    useTypeAdjustmentAmount: 0,
    brandModelAdjustmentAmount: 0
  });

  ngOnInit(): void {
    this.getFilters();
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1980)]],
      driverAge: [18, [Validators.required, Validators.min(18)]],
      value: [0, [Validators.required, Validators.min(1000)]],
      useType: ['personal', Validators.required]
    });

    this.form.get('brand')?.valueChanges.subscribe(value => {
      this.filterModels(value);
    });
    this.form.get('model')?.valueChanges.subscribe(value => {
      const selected = this.filteredModels().find((model: any) => model.model === value);
      this.imageUrl.set(selected ? selected.image : '');
    });
  }

  filterModels(brand: string): void {
    console.log("brand: ", brand);
    this.filteredModels.set(this.vehicles().filter(vehicle => vehicle.brand === brand));
    console.log('Filtered models:', this.filteredModels());
  }

  async getFilters() {
    (await this._vehicleService.getVehicles()).subscribe(result => {
      this.vehicles.set(result);
      // this.filteredBrands.set([...new Set(result.map((v: any) => v.brand))]);
      this.filteredBrands.set([...new Set(result.map((v: Vehicle) => v.brand))]);
      console.log('Vehicles loaded:', this.filteredBrands());
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log("result: ", this.form.value);
      
      const result = this._quoterService.calculateInsurancePremium(this.form.value);
      this.saveRecord({...result, image: this.imageUrl()})
      this.quoteData.set(result);
    }
  }

  saveRecord(quote: any) {
    const record = JSON.parse(sessionStorage.getItem('historial') || '[]');
  
    if (record.length >= 3) {
      record.pop();
    }
  
    record.unshift(quote);
  
    sessionStorage.setItem('historial', JSON.stringify(record));
  }

}


import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Vehicle } from '../../interfaces/vehicle';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

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
    MatSelectModule
  ],
  templateUrl: './add-update-vehicle.component.html',
  styleUrl: './add-update-vehicle.component.scss'
})
export class AddUpdateVehicleComponent implements OnInit {

  fb = inject(FormBuilder);
  data = inject<{title: string, data: Vehicle}>(MAT_DIALOG_DATA);
  form!: FormGroup;
  

  ngOnInit(): void {
    this.initForm();

    if(this.data.data){
      this.form.patchValue(this.data.data);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [null],
      brand: ['', Validators.compose([Validators.required, Validators.min(1)])],
      model: ['', Validators.compose([Validators.required])],
      year: [null, Validators.compose([Validators.required])],
      usageType: ['', Validators.compose([Validators.required])]
    });
  }



}

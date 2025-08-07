import { Component, OnInit, signal } from '@angular/core';
import { PrimaResult } from '../../interfaces/PrimaResult';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {

  quotesData = signal<PrimaResult[]>([{
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
  }]);

  ngOnInit(): void {
    const data = sessionStorage.getItem('historial');
    this.quotesData.set(data ? JSON.parse(data) : []);

    this
    
  }
}

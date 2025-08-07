import { Injectable } from '@angular/core';
import { PrimaParams } from '../interfaces/PrimaParams';
import { PrimaResult } from '../interfaces/PrimaResult';

@Injectable({
  providedIn: 'root'
})
export class QuoterService {
    private BASE_RATE = 0.05;
    
    
    private getDriverAgeFactor(driverAge: number): number {
        if (driverAge < 25) return 1.2;
        if (driverAge <= 50) return 1.0;
        return 1.1;
    }

    private calculateDepreciationFactor(vehicleYear: number): number {
        const currentYear = new Date().getFullYear();
        const age = currentYear - vehicleYear;
        if (age <= 2) return 1;
        if (age <= 5) return 0.9;
        if (age <= 10) return 0.8;
        return 0.7;
    }

    private getUseTypeFactor(useType: PrimaParams['useType']): number {
        switch (useType) {
        case 'personal': return 1.0;
        case 'trabajo': return 1.2;
        case 'carga': return 1.3;
        default: return 1.0;
        }
    }

    private getBrandModelRiskFactor(brand: string, model: string): number {
        const highRiskBrands = ['Kia', 'Hyundai', 'Toyota'];
        const highRiskModels = ['Rio', 'Accent', 'Hilux'];
        let factor = 1.0;
        if (highRiskBrands.includes(brand)) factor += 0.1;
        if (highRiskModels.includes(model)) factor += 0.1;
        return factor;
    }

    calculateInsurancePremium(params: PrimaParams): PrimaResult {

        const { brand, model, year, driverAge, value, useType } = params;

        const depreciationFactor = this.calculateDepreciationFactor(year);
        const driverAgeFactor = this.getDriverAgeFactor(driverAge);
        const useTypeFactor = this.getUseTypeFactor(useType);
        const brandModelRiskFactor = this.getBrandModelRiskFactor(brand, model);
    
        const adjustedVehicleValue = value * depreciationFactor;
        const basePrima = adjustedVehicleValue * this.BASE_RATE;
        const primaFinal = basePrima * driverAgeFactor * useTypeFactor * brandModelRiskFactor;

        const ageAdjustmentAmount = basePrima * (driverAgeFactor - 1);
        const useTypeAdjustmentAmount = basePrima * (useTypeFactor - 1);
        const brandModelAdjustmentAmount = basePrima * (brandModelRiskFactor - 1);


        return {
            basePrima: Math.round(basePrima * 100) / 100,
            depreciationFactor,
            driverAgeFactor,
            useTypeFactor,
            brandModelRiskFactor,
            adjustedVehicleValue: Math.round(adjustedVehicleValue * 100) / 100,
            primaFinal: Math.round(primaFinal * 100) / 100,
        
            ageAdjustmentAmount: Math.round(ageAdjustmentAmount * 100) / 100,
            useTypeAdjustmentAmount: Math.round(useTypeAdjustmentAmount * 100) / 100,
            brandModelAdjustmentAmount: Math.round(brandModelAdjustmentAmount * 100) / 100,
          };
    }

}

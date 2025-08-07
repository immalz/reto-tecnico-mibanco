export interface PrimaResult {
    basePrima: number;
    depreciationFactor: number;
    driverAgeFactor: number;
    useTypeFactor: number;
    brandModelRiskFactor: number;
    adjustedVehicleValue: number;
    primaFinal: number;
    ageAdjustmentAmount: number;
    useTypeAdjustmentAmount: number;
    brandModelAdjustmentAmount: number;
    image?: string;
  }
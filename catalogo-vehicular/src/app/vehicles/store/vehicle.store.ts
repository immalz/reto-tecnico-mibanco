import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VehicleStore {
  private allData = signal<{ brand: string; models: string[] }[]>([]);

  selectedBrand = signal<string | null>(null);
  selectedModel = signal<string | null>(null);

  setData(data: { brand: string; models: string[] }[]) {
    this.allData.set(data);
  }

  setBrand(brand: string) {
    this.selectedBrand.set(brand);
    this.selectedModel.set(null);
  }

  setModel(model: string) {
    this.selectedModel.set(model);
  }

  modelsByBrand = computed(() => {
    const brand = this.selectedBrand();
    const data = this.allData();
    return data.find(b => b.brand === brand)?.models || [];
  });

  brands = computed(() => this.allData().map(b => b.brand));
}

import { Vehicle } from './../interfaces/vehicle';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';
import { HttpClient } from '@angular/common/http';

interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private _supabaseClient = inject(SupabaseService).supabaseClient;
  private http = inject(HttpClient);

  _state = signal<VehicleState>({
    vehicles: [],
    loading: false,
    error: false
  })

  //selectors
  notes = computed(() => this._state().vehicles);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);

  getFilters() {
    return this.http.get('/assets/data/brands.json');
  }

  async getAllVehicles() {
    try {
      this._state.update(state => ({ ...state, loading: true }));
      const { data } = await this._supabaseClient.from('vehicles').select();
  
      if (data && data.length > 0) {
        this._state.update(state => ({ ...state, vehicles: data, loading: false }));
        return data;
      }
  
      // Si no hay data
      this._state.update(state => ({ ...state, vehicles: [], loading: false }));
      return [];
    } catch (error) {
      this._state.update(state => ({ ...state, error: true }));
      return []; // <- Retorna algo también en caso de error
    } finally {
      this._state.update(state => ({ ...state, loading: false }));
    }
  }


  async insertVehicle(vehicle: Vehicle) {
    try {
      this._state.update(state => ({ ...state, loading: true }));
      // const session = this._authService.session();
      const { data } = await this._supabaseClient.from('vehicles').insert({
        brand: vehicle.brand,
        model: vehicle.model,
        image: vehicle.image        
      });

      console.log("Vehicle inserted: ", data);

    } catch (error) {
      
    }
  }

  async updateVehicle(id: number, data: Partial<Vehicle>) {
    this._state.update(state => ({ ...state, loading: true }));
    try {
      const { error } = await this._supabaseClient
        .from('vehicles')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    } finally {
      this._state.update(state => ({ ...state, loading: false }));
    }
  }

  async deleteVehicleRecord(vehicleId: string): Promise<void> {
    const { error } = await this._supabaseClient
      .from('vehicles')
      .delete()
      .eq('id', vehicleId);
  
    if (error) {
      console.error('Error al eliminar el registro del vehículo:', error);
      throw error;
    }
  }

}

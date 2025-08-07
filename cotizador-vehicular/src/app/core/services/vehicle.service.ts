import { Vehicle } from './../interfaces/vehicle';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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

  async getVehicles(): Promise<Observable<Vehicle[]>> {
    return from(
      this._supabaseClient
        .from('vehicles')
        .select('*')
    ).pipe(map((res) => res.data as Vehicle[]));
  }

}

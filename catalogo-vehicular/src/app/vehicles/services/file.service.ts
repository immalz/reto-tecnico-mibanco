import { Vehicle } from './../interfaces/vehicle';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    private _supabaseClient = inject(SupabaseService).supabaseClient;

    _state = signal<any>({
        loading: false,
        error: false
    })

    //selectors
    loading = computed(() => this._state().loading);
    error = computed(() => this._state().error);


    async uploadImage(file: File, folder = 'images') {

        try {
        this._state.update(state => ({ ...state, loading: true }));
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}.${ext}`;
    
        const { error: uploadError } = await this._supabaseClient.storage
            .from('images')
            .upload(fileName, file);
    
        if (uploadError) {
            console.error('Error al subir imagen:', uploadError);
            return null;
        }
    
        const { data } = this._supabaseClient.storage.from(folder).getPublicUrl(fileName);

        if(data && data.publicUrl.length > 0) {
            this._state.update(state => ({ ...state, loading: false }));
        }

        return data?.publicUrl ?? null;

        } catch (error) {
        this._state.update(state => ({ ...state, error: true }));
        return null;
        } finally {
        this._state.update(state => ({ ...state, loading: false }));
        }
    }

    async deleteVehicleImage(imagePath: string): Promise<void> {
        const { error } = await this._supabaseClient
            .storage
            .from('images')
            .remove([imagePath]);
    
        if (error) {
            console.error('Error al eliminar la imagen del storage:', error);
            throw error;
        }
    }
  

}

import { Injectable } from "@angular/core";
import { environments } from "../../../environments/environment";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from '@supabase/supabase-js'

@Injectable({providedIn: 'root'})
export class SupabaseService {
    supabaseClient: SupabaseClient;
    
    constructor(){ 
        this.supabaseClient = createClient(environments.SUPABASE_URL, environments.SUPABASE_KEY);
    }

}
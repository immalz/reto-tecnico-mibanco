import { Injectable } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from '@supabase/supabase-js'
import { environments } from "../../../environments/environment.development";

@Injectable({providedIn: 'root'})
export class SupabaseService {
    supabaseClient: SupabaseClient;
    
    constructor(){ 
        this.supabaseClient = createClient(environments.SUPABASE_URL, environments.SUPABASE_KEY);
    }

}
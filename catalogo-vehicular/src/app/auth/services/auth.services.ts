import { inject, Injectable } from "@angular/core";
import { SupabaseService } from "../../shared/services/supabase.service";
import { SignInWithOAuthCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js";

@Injectable({providedIn: 'root'})
export class AuthService {

    private _supabaseClient = inject(SupabaseService).supabaseClient;

    session() {
        return this._supabaseClient.auth.getSession();
    }

    signUp(credentials: SignUpWithPasswordCredentials): any {
        return this._supabaseClient.auth.signUp(credentials);
    }

    login(credentials: SignUpWithPasswordCredentials): any {
        return this._supabaseClient.auth.signInWithPassword(credentials);
    }

    signOut(): Promise<any> {
        return this._supabaseClient.auth.signOut();
    }
}
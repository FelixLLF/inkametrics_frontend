import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtRequestDTO } from '../models/JwtRequestDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    login(request: JwtRequestDTO) {
        return this.http.post(`${base_url}/InkaMetrics/tf/login`, request);
    }

    register(data: { username: string; password: string; companyId: number | null }) {
        return this.http.post(`${base_url}/InkaMetrics/tf/register`, data, { responseType: 'text' });
    }

    verificar(): boolean {
        if (!this.isBrowser()) {
            return false;
        }
        const token = sessionStorage.getItem('token');
        return token != null;
    }

    showRole(): string | null {
        if (!this.isBrowser()) {
            return null;
        }
        const token = sessionStorage.getItem('token');
        if (!token) {
            return null;
        }
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        return decodedToken.role;
    }
}

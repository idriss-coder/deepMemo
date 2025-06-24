import {IUser} from "@/models/UserModel";
import {AuthManagerGuard} from "@/service/AuthManager";
import {BaseResponse} from "@/models/base";

export default class UserService {
    async register({email, password, pseudo}: Partial<IUser>) {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password, pseudo})
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        return data;
    }

    async login({email, password}: Partial<IUser>) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        return data;
    }

    async requestProfile() {
        const _token = AuthManagerGuard.getToken();
        const res = await fetch("/api/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${_token}`
            },
        });
        const data = <BaseResponse & { user: any }>await res.json();
        if (!res.ok) {
            if (res.status == 401) {
                window.location.replace("/auth/login");
            }
            throw new Error(data.message);
        }
        return data;
    }
}
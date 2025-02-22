enum ManagerKeys {
    token = "_token"
}

export class AuthManagerGuard {

    private static instance: AuthManagerGuard

    constructor() {
    }

    static __init() {
        if (!AuthManagerGuard.instance) {
            return new AuthManagerGuard()
        }
        return AuthManagerGuard.instance
    }

    static loginToApp(token: string) {
        localStorage.setItem(String(ManagerKeys.token), token)
    }

    static getToken() {
        return localStorage.getItem(String(ManagerKeys.token)) || '';
    }

    static logoutToApp() {
        localStorage.removeItem(String(ManagerKeys.token));
    }

    static isLoggedIn(token = AuthManagerGuard.getToken()) {

        if (!token) {
            return false;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (!payload.exp) {
                return false;
            }

            const currentTime = Date.now() / 1000;

            const timeLeft = payload.exp - currentTime;
            return timeLeft > 20

        } catch (error) {
            return false;
        }


    }
}
//client/src/utils/auth.js
import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

    async getUserEvents() {
        try {
            const token = this.getToken();

            if (!token) {
                throw new Error('No token found');
            }

            const decoded = decode(token);

            // Assuming you have a way to fetch user events, replace the following line
            // with your actual API call to retrieve user events
            const userEvents = await getevent(decoded.userId);

            return userEvents;
        } catch (error) {
            console.error('Error fetching user events:', error);
            throw error;
        }
    }
}

export default new AuthService();

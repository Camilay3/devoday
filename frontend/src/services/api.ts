import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

let accessToken: string | null = null;
let onTokenExpired: (() => void) | null = null;

export function setAccessToken(token: string | null) {
	accessToken = token;
}

export function setOnTokenExpired(callback: () => void) {
    onTokenExpired = callback;
}

api.interceptors.request.use((config) => {
	if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

api.interceptors.response.use(
	(response) => response, async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (originalRequest.url?.endsWith("/auth/refresh")) return Promise.reject(error);
			originalRequest._retry = true; // evita loop infinito
			try {
				const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true });
				setAccessToken(data.data.accessToken);
				originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
				return api(originalRequest);

			} catch {
				setAccessToken(null);
				onTokenExpired?.();
			}
		}

		return Promise.reject(error);
	}
);

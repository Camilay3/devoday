import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing/Landing';
import { Entrar } from "./pages/Autenticação/Entrar";
import { Home } from "./pages/Home/Home";
import { Toaster } from "./components/ui/sonner";
import { api, setAccessToken, setOnTokenExpired } from "./services/api";
import type { IResponse } from "./interfaces/defaultResponse";

type SessionResponse = { accessToken: string };

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [hasSessionError, setHasSessionError] = useState(false);

	useEffect(() => {
		let active = true;
		setOnTokenExpired(() => setIsAuthenticated(false));

		api.post<IResponse<SessionResponse>>("/auth/refresh")
			.then(({ data }) => {
				if (!active) return;
				setAccessToken(data.data.accessToken);
				setIsAuthenticated(true);
			})
			.catch((error: unknown) => {
				if (!active) return;
				setAccessToken(null);
				setIsAuthenticated(false);
				setHasSessionError(!axios.isAxiosError(error) || error.response?.status !== 401);
			});

		return () => {
			active = false;
			setOnTokenExpired(() => {});
		};
	}, []);

	if (hasSessionError) return <main>Não foi possível verificar a sessão. Recarregue a página.</main>;

	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Home /> : <Landing />} />
                <Route path="/entrar" element={isAuthenticated ? <Navigate to="/" replace /> : <Entrar />} />
            </Routes>

			<Toaster />
        </BrowserRouter>
	);
}

export default App;

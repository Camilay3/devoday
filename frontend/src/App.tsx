import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing/Landing';
import { Entrar } from "./pages/Autenticação/Entrar";
import { Toaster } from "./components/ui/sonner";

function App() {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/entrar" element={<Entrar />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>

			<Toaster />
        </BrowserRouter>
	);
}

export default App;

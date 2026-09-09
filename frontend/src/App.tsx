import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing/Landing';
import { Entrar } from "./pages/Autenticação/Entrar";

function App() {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/entrar" element={<Entrar />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </BrowserRouter>
	);
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing/Landing';

function App() {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                {/* <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </BrowserRouter>
	);
}

export default App;

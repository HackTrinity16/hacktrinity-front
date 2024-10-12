import { Routes, Route } from 'react-router-dom'
import './App.css'
import Room from "./pages/Room.jsx";
import Navigation from "./Navigation.jsx";
import Home from "./pages/Home.jsx";
import Judge from "./pages/room/Judge.jsx";
import EvidenceLibrary from "./pages/EvidenceLibrary.jsx";
import Witnesses from "./pages/Witnesses.jsx";

function App() {
    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room" element={<Room />} />
                <Route path="/room/judge" element={<Judge />} />
                <Route path="/evidence" element={<EvidenceLibrary />} />
                <Route path="/witnesses" element={<Witnesses />} />
            </Routes>
        </div>
    )
}

export default App
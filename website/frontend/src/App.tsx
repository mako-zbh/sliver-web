import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Sessions from './pages/Sessions';
import Beacons from './pages/Beacons';
import Hosts from './pages/Hosts';
import Listeners from './pages/Listeners';
import Generate from './pages/Generate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="beacons" element={<Beacons />} />
          <Route path="hosts" element={<Hosts />} />
          <Route path="listeners" element={<Listeners />} />
          <Route path="generate" element={<Generate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

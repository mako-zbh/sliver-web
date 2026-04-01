import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import StatusBar from './StatusBar';

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-sliver-bg-primary">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
      <StatusBar />
    </div>
  );
}

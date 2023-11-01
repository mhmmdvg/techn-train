import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import BottomNav from '../bottom-nav';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full flex-1 overflow-scroll h-screen bg-[#f7f8fc] dark:bg-zinc-900 transition-all">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default Layout;

import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#efefef] text-zinc-900">
      <NavBar />
      <main className="pb-16 pt-28 md:pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

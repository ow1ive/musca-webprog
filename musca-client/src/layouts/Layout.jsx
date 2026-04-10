import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/about';

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <NavBar />
      <main className="pb-16 pt-28 md:pt-16">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;

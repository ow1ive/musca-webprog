import React from 'react';
import { NavLink } from 'react-router-dom';
import muscaLogo from '../assets/musca-logo.svg';
import Button from './Button';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border px-3 py-1.5 text-[9px] font-semibold leading-none uppercase tracking-[0.22em] transition-colors duration-200',
    isActive
      ? '!border-[#171922] !bg-[#171922] !text-white hover:!border-[#171922] hover:!bg-[#171922] hover:!text-white'
      : 'border-transparent text-zinc-600 hover:!border-zinc-900 hover:!bg-zinc-900 hover:!text-white focus-visible:!text-white',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900/90 bg-[#ececec]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <NavLink to="/" className="group flex items-center gap-2.5 rounded-full border border-zinc-900/20 bg-white/50 px-3 py-1">
          <img
            src={muscaLogo}
            alt="CALI logo"
            className="h-7 w-7 rounded-md object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-900">CALI</p>
        </NavLink>

        <nav className="hidden items-center gap-1 rounded-full border border-zinc-900/25 bg-white/60 p-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/auth/signin" variant="primary" className="px-4 py-2 text-[10px] tracking-[0.2em]">
            Log In
          </Button>
        </div>
      </div>

      <div className="border-t border-zinc-900/20 px-4 py-2 md:hidden">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2">
          <nav className="flex items-center gap-1 rounded-full border border-zinc-900/25 bg-white/70 p-1">
            {links.map((link) => (
              <NavLink key={`mobile-${link.to}`} to={link.to} end={link.to === '/'} className={`${navLinkClassName} flex-1 text-center`}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Button to="/auth/signin" variant="primary" className="w-full px-4 py-2 text-[10px] tracking-[0.2em]">
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

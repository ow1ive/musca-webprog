import { NavLink } from 'react-router-dom';
import muscaLogo from '../assets/musca-logo.svg';
import facebookIcon from '../assets/image/facebook.png';
import xIcon from '../assets/image/x.png';
import igIcon from '../assets/image/ig.png';

const infoLinks = ['About Us', 'Articles', 'Careers', 'Contact'];
const resourceLinks = ['Documentation', 'Support', 'Privacy Policy', 'Terms & Conditions'];
const socialLinks = [
  { label: 'Facebook', icon: facebookIcon, href: 'https://facebook.com' },
  { label: 'X', icon: xIcon, href: 'https://x.com' },
  { label: 'Instagram', icon: igIcon, href: 'https://instagram.com' },
];

const Footer = () => {
  return (
    <footer className="bg-white px-5 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1400px] gap-5 md:grid-cols-2 lg:grid-cols-[1.45fr_0.7fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={muscaLogo} alt="CALI logo" className="h-8 w-8 rounded-md object-contain" />
            <p className="text-[24px] font-bold uppercase tracking-[0.08em] text-zinc-900">CALI</p>
          </div>
          <p className="mt-2 max-w-sm text-[12px] leading-6 text-zinc-600">
            Creative web studio focused on clean design, modern interfaces, and seamless
            experiences.
          </p>

          <h3 className="mt-5 text-[9px] font-semibold uppercase tracking-[0.34em] text-zinc-600">
            Subscribe to Cali
          </h3>
          <div className="mt-2 max-w-[300px] border-b border-zinc-500 pb-3">
            <div className="flex items-center gap-2 text-zinc-700">
              <span className="text-sm">✉</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-[12px] text-zinc-700 placeholder:text-zinc-500 focus:outline-none"
              />
            </div>
          </div>
          <button className="mt-4 rounded-full bg-[#171922] px-5 py-2 text-[12px] font-medium text-white">
            Subscribe
          </button>
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-zinc-700">Information</p>
          <ul className="mt-3 space-y-2">
            {infoLinks.map((label) => (
              <li key={label}>
                <NavLink to="/" className="text-[12px] text-zinc-700 transition hover:text-zinc-900">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-zinc-700">Resources</p>
          <ul className="mt-3 space-y-2">
            {resourceLinks.map((label) => (
              <li key={label}>
                <NavLink to="/" className="text-[12px] text-zinc-700 transition hover:text-zinc-900">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-zinc-700">Contact</p>
          <ul className="mt-3 space-y-2.5 text-[12px] text-zinc-700">
            <li className="flex items-center gap-2">
              <span className="text-sm">📞</span>
              <span>+63 956 940 2044</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sm">✉</span>
              <span>olivemusca@gmail.com</span>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                aria-label={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center bg-transparent transition hover:opacity-80"
              >
                <img src={social.icon} alt={social.label} className="h-9 w-9 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-[1400px] flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-zinc-600">© 2026 CALI. All rights reserved.</p>
        <div className="flex items-center gap-5 text-[11px] text-zinc-600">
          <NavLink to="/" className="hover:text-zinc-900">FAQ</NavLink>
          <NavLink to="/" className="hover:text-zinc-900">Privacy</NavLink>
          <NavLink to="/" className="hover:text-zinc-900">Terms & Conditions</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin, FaInstagram } from 'react-icons/fa6';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/rizkikasim', icon: SiGithub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/muhamad-rizki-kasim-69834128b/', icon: FaLinkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/baimksim_/', icon: FaInstagram },
];

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-white border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
          {/* Brand & Identity */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xl font-bold tracking-tight text-white hover:text-[#cf8047] transition-colors cursor-default">
              Kasim.dev
            </span>
            <span className="text-xs text-zinc-400">
              Muhamad Rizki Kasim — Software Engineer
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-300">
            {NAV_LINKS.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="transition-colors duration-200 hover:text-[#cf8047]"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="p-2 text-zinc-400 hover:text-[#cf8047] hover:scale-110 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Muhamad Rizki Kasim. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 transition-colors duration-200 hover:text-[#cf8047] cursor-pointer select-none"
          >
            <span>Back to top</span>
            <span className="text-sm">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
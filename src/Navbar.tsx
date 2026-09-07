import React from 'react';

const LogoMark = ({ className = "w-5 h-5", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill={color}>
    <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
  </svg>
);

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between gap-6 p-5 sm:px-8 sm:py-7">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-3.5 text-xl font-semibold tracking-tight hover:scale-105 transition-transform duration-300"
        >
          {/* <img 
            // src="" 
            // alt="MRK Logo" 
            className="w-11 h-11 sm:w-12 sm:h-12 object-contain shrink-0"
          /> */}
          <span className="text-white font-sans">Kasim <span className="text-[#cf8047]">.dev</span></span>
        </a>

        {/* Navigation Items */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-white/80">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="hover:text-white hover:-translate-y-0.5 transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
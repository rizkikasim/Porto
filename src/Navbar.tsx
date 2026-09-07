import React from 'react';

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
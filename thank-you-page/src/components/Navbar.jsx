import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';

const TABS = [
  { label: 'Код', path: '/' },
  { label: 'Илгээлтүүд', path: '/commits' },
  { label: 'Оролцогчид', path: '/contributors' },
  { label: 'Багшийн нэвтрэх', path: '/teacher-access' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav id="main-nav" className="border-b border-github-border bg-github-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <Github size={20} className="text-github-text shrink-0" />
            <span className="text-sm text-github-muted truncate">
              <span className="text-github-text font-semibold">IO2026</span>
              <span className="mx-1">/</span>
              <span className="text-github-text font-semibold">thank-you-teachers</span>
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2 text-github-muted hover:text-github-text transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`${
            mobileOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row gap-0 sm:gap-0 pb-0`}
        >
          {TABS.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={label}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`relative px-4 py-2.5 text-sm font-medium transition-colors duration-150
                  ${
                    isActive
                      ? 'text-github-text border-b-2 border-github-green'
                      : 'text-github-muted hover:text-github-text border-b-2 border-transparent'
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

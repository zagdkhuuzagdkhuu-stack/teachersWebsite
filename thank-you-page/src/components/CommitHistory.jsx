import { useState, useEffect, useLayoutEffect } from 'react';
import { GitBranch } from 'lucide-react';

const API = '/api';

const COLORS = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-green-400 to-emerald-600',
  'from-orange-400 to-red-500',
  'from-teal-400 to-blue-500',
  'from-pink-400 to-rose-500',
  'from-amber-400 to-orange-500',
  'from-indigo-400 to-purple-600',
  'from-lime-400 to-green-500',
  'from-sky-400 to-indigo-500',
  'from-violet-400 to-purple-500',
  'from-rose-400 to-pink-600',
];

function getColor(index) {
  return COLORS[index % COLORS.length];
}

function getInitials(name) {
  if (!name) return '';
  return name.split(/[-\s]+/).map(w => w[0] || '').join('').toUpperCase().slice(0, 2);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function CommitHistory() {
  const [commits, setCommits] = useState([]);
  const [topOffset, setTopOffset] = useState(96);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/commits`);
        if (res.ok) setCommits(await res.json());
      } catch {}
    })();
  }, []);

  useLayoutEffect(() => {
    const nav = document.getElementById('main-nav');
    if (nav) {
      const gap = window.innerWidth >= 640 ? 32 : 24;
      setTopOffset(nav.offsetHeight + gap);
    }
  }, []);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 640);
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (commits.length === 0) {
    return (
      <div className="fixed left-0 right-0 bottom-0 z-30 overflow-y-auto bg-github-bg" style={{ top: topOffset }}>
        <div className="max-w-5xl mx-auto mb-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-github-muted mb-3">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="text-github-muted">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 01-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 010 8c0-4.42 3.58-8 8-8z" />
            </svg>
            <span>IO2026</span>
            <span>/</span>
            <span className="text-github-text font-semibold">thank-you-teachers</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-github-text">
              Багш нартаа баярлалаа{' '}
              <span role="img" aria-label="heart" className="inline-block animate-pulse">❤️</span>
            </h1>
            <span className="text-xs text-github-muted bg-[#21262d] px-2 py-0.5 rounded-full self-start sm:self-auto">
              0 илгээлт
            </span>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="github-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-github-border">
              <GitBranch size={16} className="text-github-muted shrink-0" />
              <span className="text-sm font-semibold text-github-text">Оюутны илгээлтүүд</span>
            </div>
            <div className="px-4 py-12 text-center text-github-muted text-sm">
              Илгээлт байхгүй байна.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 right-0 bottom-0 z-30 overflow-y-auto bg-github-bg" style={{ top: topOffset }}>
      {/* Repo header matching Code section */}
      <div className="max-w-5xl mx-auto mb-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-github-muted mb-3">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="text-github-muted">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 01-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 010 8c0-4.42 3.58-8 8-8z" />
          </svg>
          <span>IO2026</span>
          <span>/</span>
          <span className="text-github-text font-semibold">thank-you-teachers</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-github-text">
            Багш нартаа баярлалаа{' '}
            <span role="img" aria-label="heart" className="inline-block animate-pulse">❤️</span>
          </h1>
          <span className="text-xs text-github-muted bg-[#21262d] px-2 py-0.5 rounded-full self-start sm:self-auto">
            {commits.length} илгээлт
          </span>
        </div>

      </div>

      {/* Falling cards container */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8 pb-8" style={{ height: isMobile ? 'auto' : '70vh', minHeight: isMobile ? '0' : '400px' }}>
        {isMobile ? (
          // On small screens render a stacked, scrollable list for better readability
          <div className="flex flex-col gap-4">
            {commits.map((c, index) => {
              const displayName = c.name || 'Оюутан нэрээ үлдээгээгүй';
              return (
                <div
                  key={c.id}
                  className="flex flex-col gap-1.5 px-4 py-3 rounded-lg border border-github-border bg-github-card/95 backdrop-blur-sm shadow-sm w-full"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full bg-gradient-to-br ${getColor(index)} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}
                    >
                      {getInitials(displayName)}
                    </div>
                    <span className="text-sm font-medium text-github-text truncate">{displayName}</span>
                    <span className="text-[10px] text-github-muted ml-auto whitespace-nowrap">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                  <p className="text-sm text-github-accent leading-relaxed">{c.message}</p>
                </div>
              );
            })}
          </div>
        ) : (
          commits.map((c, index) => {
          const displayName = c.name || 'Оюутан нэрээ үлдээгээгүй';
          const duration = randomBetween(10, 16);
          const startX = randomBetween(2, 88);
          const sway = randomBetween(-140, 140);

          return (
            <div
              key={c.id}
              className="absolute flex flex-col gap-1.5 px-4 py-3 rounded-lg border border-github-border bg-github-card/95 backdrop-blur-sm shadow-xl w-64 sm:w-80 cursor-default transition-shadow duration-300 hover:shadow-2xl hover:border-github-accent/50 group"
              style={{
                left: `${startX}%`,
                top: `${index * 80}px`,
                animation: `fall-leaf ${duration}s ease-in-out ${index * 0.15}s infinite`,
                animationPlayState: 'running',
                '--sway': `${sway}px`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
              onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full bg-gradient-to-br ${getColor(index)} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}
                >
                  {getInitials(displayName)}
                </div>
                <span className="text-sm font-medium text-github-text truncate">
                  {displayName}
                </span>
                <span className="text-[10px] text-github-muted ml-auto whitespace-nowrap">
                  {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
              <p className="text-sm text-github-accent leading-relaxed group-hover:text-github-text transition-colors">
                {c.message}
              </p>
            </div>
          );
        })
      )}
      </div>
    </div>
  );
}

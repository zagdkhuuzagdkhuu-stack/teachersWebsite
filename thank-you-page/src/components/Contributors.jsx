import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

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
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Contributors() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/contributors`);
        if (res.ok) setContributors(await res.json());
      } catch {}
    })();
  }, []);

  return (
    <div className="github-card overflow-hidden mb-8">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-github-border">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-github-muted shrink-0" />
          <span className="text-sm font-semibold text-github-text">Оролцогчид</span>
          <span className="text-xs text-github-muted bg-[#21262d] px-2 py-0.5 rounded-full">
            {contributors.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-github-border">
        {contributors.length === 0 ? (
          <div className="col-span-full px-4 py-6 text-center text-github-muted text-sm">
            Оролцогч байхгүй байна.
          </div>
        ) : (
          contributors.map((s, index) => (
            <div
              key={s.name}
              className="flex items-start gap-3 p-4 hover:bg-[#161b22]/70 transition-colors duration-150"
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${getColor(index)} flex items-center justify-center text-sm font-bold text-white shrink-0`}
              >
                {getInitials(s.name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-github-text truncate">
                    {s.name}
                  </span>
                  <span className="text-xs text-github-muted whitespace-nowrap">
                    {s.contributions} {s.contributions === 1 ? 'илгээлт' : 'илгээлт'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

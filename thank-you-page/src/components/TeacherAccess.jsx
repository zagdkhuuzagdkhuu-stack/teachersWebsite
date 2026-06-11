import { useState, useEffect } from 'react';
import { Lock, Download, ArrowLeft } from 'lucide-react';

const API = '/api';

export default function TeacherAccess() {
  const [secretCode, setSecretCode] = useState('');
  const [teacher, setTeacher] = useState(null);
  const [letters, setLetters] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(null);

  useEffect(() => {
    if (teacher) {
      setPhase('landing');
      const t = setTimeout(() => setPhase('letters'), 2800);
      return () => clearTimeout(t);
    }
  }, [teacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!secretCode.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/teacher/${encodeURIComponent(secretCode.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setTeacher(data.teacher);
        setLetters(data.letters);
      } else {
        const d = await res.json();
        setError(d.error || 'Нууц код буруу байна');
      }
    } catch {
      setError('Сүлжээний алдаа');
    }
    setLoading(false);
  };

  const handleDownloadLetter = (letter) => {
    const text = `Захидал ${letter.name || "Оюутан нэрээ үлдээгээгүй"}\n${'='.repeat(30)}\nОгноо: ${new Date(letter.createdAt).toLocaleString()}\n\n${letter.message}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `letter-${letter.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (teacher) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col overflow-hidden">
        {/* Back button — visible in both phases */}
        <div className={`absolute top-0 left-0 right-0 z-20 flex items-center px-6 py-4 transition-opacity duration-700 ${phase === 'landing' ? 'opacity-0' : 'opacity-100'}`}>
          <button
            onClick={() => { setTeacher(null); setSecretCode(''); setLetters([]); setPhase(null); }}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Буцах
          </button>
        </div>

        {/* Animated welcome + header */}
        <div
          className={`flex flex-col items-center justify-center w-full transition-all duration-1000 ease-in-out ${
            phase === 'landing' ? 'min-h-screen' : 'min-h-0 pt-20 px-6'
          }`}
        >
          <h1
            className={`font-bold text-center transition-all duration-1000 ease-in-out ${
              phase === 'landing'
                ? 'text-4xl sm:text-6xl text-white'
                : 'text-2xl sm:text-3xl text-white mt-0'
            }`}
          >
            {phase === 'landing' ? (
              <>
                Тавтай морил, Профессор {teacher.name}
                <span className="block text-xl sm:text-2xl text-white/50 font-normal mt-3 animate-pulse">
                  Таны захидлууд ачаалагдаж байна...
                </span>
              </>
            ) : (
              `Сайн уу, профессор ${teacher.name}. Таны захидлууд энд байна.`
            )}
          </h1>
        </div>

        {/* Letters content */}
        <div
          className={`flex-1 overflow-y-auto px-6 pb-8 max-w-3xl mx-auto w-full mt-12 transition-all duration-700 ease-in-out ${
            phase === 'letters' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          {letters.length === 0 ? (
            <div className="text-white/40 text-center py-12">
              <p className="text-lg">Захидал байхгүй байна.</p>
              <p className="text-sm mt-2">Дараа дахин оролдоно уу.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {letters.map((l, i) => (
                <div key={l.id} className="border border-white/10 rounded-lg p-5 bg-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/40 text-xs font-mono">
                      Захидал #{letters.length - i}
                    </span>
                    <span className="text-white/30 text-xs">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                    {l.message}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <p className="text-white/50 text-xs">
                      — {l.name || "Оюутан нэрээ үлдээгээгүй"}
                    </p>
                    <button
                      onClick={() => handleDownloadLetter(l)}
                      className="text-white/40 hover:text-white text-xs flex items-center gap-1 transition-colors"
                    >
                      <Download size={12} />
                      Татах
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="github-card overflow-hidden mb-8">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-github-border">
        <Lock size={16} className="text-github-muted shrink-0" />
        <span className="text-sm font-semibold text-github-text">Багшийн нэвтрэх</span>
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-github-muted text-sm mb-6">
          Нууц кодоо оруулаад оюутнуудын захидлыг үзнэ үү.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
          <input
            type="password"
            value={secretCode}
            onChange={e => setSecretCode(e.target.value)}
            placeholder="Нууц кодоо оруулна уу..."
            className="w-full bg-[#0d1117] border border-github-border rounded-md px-3 py-2 text-sm text-github-text placeholder-github-muted/50 focus:outline-none focus:border-github-accent"
          />
          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !secretCode.trim()}
            className="github-btn flex items-center gap-1.5 px-4 py-2 disabled:opacity-50"
          >
            <Lock size={14} />
            {loading ? 'Шалгаж байна...' : 'Захидлууд үзэх'}
          </button>
        </form>
      </div>
    </div>
  );
}

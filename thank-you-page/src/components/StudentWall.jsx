import { useState, useEffect } from 'react';
import { MessageSquare, Mail, GitCommit } from 'lucide-react';

const API = '/api';

export default function StudentWall() {
  const [teachers, setTeachers] = useState([]);

  const [commitMsg, setCommitMsg] = useState('');
  const [commitName, setCommitName] = useState('');
  const [letterTeacherId, setLetterTeacherId] = useState('');
  const [letterMsg, setLetterMsg] = useState('');
  const [letterName, setLetterName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/teachers`);
        if (res.ok) setTeachers(await res.json());
      } catch {}
    })();
  }, []);

  const handleCommit = async (e) => {
    e.preventDefault();
    if (!commitMsg.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/commits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: commitMsg.trim(), name: commitName.trim() || undefined }),
      });
      if (res.ok) {
        setCommitMsg('');
        setCommitName('');
        showToast('Зурвас амжилттай илгээгдлээ!');
      } else {
        const d = await res.json();
        setError(d.error || 'Илгээж чадсангүй');
      }
    } catch {
      setError('Сүлжээний алдаа');
    }
    setSubmitting(false);
  };

  const handleLetter = async (e) => {
    e.preventDefault();
    if (!letterTeacherId || !letterMsg.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/letters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: Number(letterTeacherId),
          message: letterMsg.trim(),
          name: letterName.trim() || undefined,
        }),
      });
      if (res.ok) {
        setLetterMsg('');
        setLetterTeacherId('');
        setLetterName('');
        showToast('Захидал амжилттай илгээгдлээ!');
      } else {
        const d = await res.json();
        setError(d.error || 'Илгээж чадсангүй');
      }
    } catch {
      setError('Сүлжээний алдаа');
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Commit form */}
      <div className="github-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-github-border">
          <GitCommit size={16} className="text-github-muted shrink-0" />
          <span className="text-sm font-semibold text-github-text">Зурвас илгээх</span>
        </div>
        <form onSubmit={handleCommit} className="p-4 space-y-3">
          <textarea
            value={commitMsg}
            onChange={e => setCommitMsg(e.target.value)}
            placeholder="Талархлаа бичнэ үү..."
            rows={2}
            className="w-full bg-[#0d1117] border border-github-border rounded-md px-3 py-2 text-sm text-github-text placeholder-github-muted/50 focus:outline-none focus:border-github-accent resize-none"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={commitName}
              onChange={e => setCommitName(e.target.value)}
              placeholder="Нэрээ оруулна уу (заавал биш)"
              className="flex-1 bg-[#0d1117] border border-github-border rounded-md px-3 py-2 text-sm text-github-text placeholder-github-muted/50 focus:outline-none focus:border-github-accent"
            />
            <button
              type="submit"
              disabled={submitting || !commitMsg.trim()}
              className="github-btn flex items-center gap-1.5 px-4 py-2 disabled:opacity-50"
            >
              <MessageSquare size={14} />
              Илгээх
            </button>
          </div>
        </form>
      </div>

      {/* Letter form */}
      <div className="github-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-github-border">
          <Mail size={16} className="text-github-muted shrink-0" />
          <span className="text-sm font-semibold text-github-text">Багшид захидал бичих</span>
        </div>
        <form onSubmit={handleLetter} className="p-4 space-y-3">
          <select
            value={letterTeacherId}
            onChange={e => setLetterTeacherId(e.target.value)}
            className="w-full bg-[#0d1117] border border-github-border rounded-md px-3 py-2 text-sm text-github-text focus:outline-none focus:border-github-accent"
          >
            <option value="">Багшаа сонгоно уу...</option>
            {teachers.map(t => (
              <option key={t.id} value={t.id}>Профессор {t.name}</option>
            ))}
          </select>
          <textarea
            value={letterMsg}
            onChange={e => setLetterMsg(e.target.value)}
            placeholder="Захидлаа бичнэ үү..."
            rows={3}
            className="w-full bg-[#0d1117] border border-github-border rounded-md px-3 py-2 text-sm text-github-text placeholder-github-muted/50 focus:outline-none focus:border-github-accent resize-none"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={letterName}
              onChange={e => setLetterName(e.target.value)}
              placeholder="Нэрээ оруулна уу (заавал биш)"
              className="flex-1 bg-[#0d1117] border border-github-border rounded-md px-3 py-2 text-sm text-github-text placeholder-github-muted/50 focus:outline-none focus:border-github-accent"
            />
            <button
              type="submit"
              disabled={submitting || !letterTeacherId || !letterMsg.trim()}
              className="github-btn flex items-center gap-1.5 px-4 py-2 disabled:opacity-50"
            >
              <Mail size={14} />
              Илгээх
            </button>
          </div>
        </form>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-github-green text-black px-5 py-3 rounded-lg shadow-lg text-sm font-medium animate-slide-up">
          {toast}
        </div>
      )}
    </div>
  );
}

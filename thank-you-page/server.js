import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const TEACHERS = [
  { id: 1, name: 'James', secretCode: 'james-2026' },
  { id: 2, name: 'Emily', secretCode: 'emily-2026' },
  { id: 3, name: 'Alex', secretCode: 'alex-2026' },
  { id: 4, name: 'Sofia', secretCode: 'sofia-2026' },
  { id: 5, name: 'Daniel', secretCode: 'daniel-2026' },
  { id: 6, name: 'Linda', secretCode: 'linda-2026' },
  { id: 7, name: 'Noah', secretCode: 'noah-2026' },
  { id: 8, name: 'Maya', secretCode: 'maya-2026' },
  { id: 9, name: 'Oscar', secretCode: 'oscar-2026' },
  { id: 10, name: 'Chloe', secretCode: 'chloe-2026' },
  { id: 11, name: 'Isaac', secretCode: 'isaac-2026' },
];

const commits = [];
const letters = [];
let nextId = 1;

app.get('/api/teachers', (_req, res) => {
  res.json(TEACHERS.map(({ id, name }) => ({ id, name })));
});

app.get('/api/commits', (_req, res) => {
  res.json(commits);
});

app.post('/api/commits', (req, res) => {
  const { message, name } = req.body;
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const commit = { id: nextId++, message: message.trim(), name: name?.trim() || null, createdAt: new Date().toISOString() };
  commits.unshift(commit);
  res.status(201).json(commit);
});

app.get('/api/letters', (_req, res) => {
  res.json(letters);
});

app.post('/api/letters', (req, res) => {
  const { teacherId, message, name } = req.body;
  if (!teacherId || typeof teacherId !== 'number') {
    return res.status(400).json({ error: 'teacherId is required and must be a number' });
  }
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const teacher = TEACHERS.find(t => t.id === teacherId);
  if (!teacher) {
    return res.status(404).json({ error: 'Teacher not found' });
  }
  const letter = { id: nextId++, teacherId, message: message.trim(), name: name?.trim() || null, createdAt: new Date().toISOString() };
  letters.push(letter);
  res.status(201).json(letter);
});

app.get('/api/teacher/:secretCode', (req, res) => {
  const teacher = TEACHERS.find(t => t.secretCode === req.params.secretCode);
  if (!teacher) {
    return res.status(401).json({ error: 'Invalid secret code' });
  }
  const teacherLetters = letters.filter(l => l.teacherId === teacher.id);
  res.json({ teacher: { id: teacher.id, name: teacher.name }, letters: teacherLetters });
});

app.get('/api/teacher/:secretCode/download', (req, res) => {
  const teacher = TEACHERS.find(t => t.secretCode === req.params.secretCode);
  if (!teacher) {
    return res.status(401).json({ error: 'Invalid secret code' });
  }
  const teacherLetters = letters.filter(l => l.teacherId === teacher.id);
  let text = `Letters for Professor ${teacher.name}\n`;
  text += `${'='.repeat(40)}\n\n`;
  if (teacherLetters.length === 0) {
    text += 'No letters yet.\n';
  } else {
    teacherLetters.forEach((l, i) => {
      text += `Letter #${i + 1}\n`;
      const senderName = l.name || "Student didn't leave a name";
      text += `From: ${senderName}\n`;
      text += `Date: ${new Date(l.createdAt).toLocaleString()}\n`;
      text += `Message:\n${l.message}\n\n`;
      text += `${'-'.repeat(30)}\n\n`;
    });
  }
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', `attachment; filename="${teacher.name.toLowerCase()}-letters.txt"`);
  res.send(text);
});

app.get('/api/contributors', (_req, res) => {
  const map = {};
  for (const c of commits) {
    const key = c.name || 'Student didn\'t leave a name';
    if (!map[key]) map[key] = { name: key, isAnonymous: !c.name, contributions: 0 };
    map[key].contributions++;
  }
  for (const l of letters) {
    const key = l.name || 'Student didn\'t leave a name';
    if (!map[key]) map[key] = { name: key, isAnonymous: !l.name, contributions: 0 };
    map[key].contributions++;
  }
  res.json(Object.values(map));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

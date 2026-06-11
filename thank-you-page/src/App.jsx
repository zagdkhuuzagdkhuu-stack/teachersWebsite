import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import RepoHeader from './components/RepoHeader';
import ReadmeSection from './components/ReadmeSection';
import CommitHistory from './components/CommitHistory';
import Contributors from './components/Contributors';
import StudentWall from './components/StudentWall';
import TeacherAccess from './components/TeacherAccess';
import Footer from './components/Footer';

export default function App() {
  const { pathname } = useLocation();
  const hideNav = pathname === '/student-wall';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && <Navbar />}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <RepoHeader />
        <Routes>
          <Route path="/" element={<ReadmeSection />} />
          <Route path="/commits" element={<CommitHistory />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/student-wall" element={<StudentWall />} />
          <Route path="/teacher-access" element={<TeacherAccess />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

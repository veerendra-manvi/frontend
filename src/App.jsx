import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Optimized Lazy Loading
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Dashboard = lazy(() => import('./pages/DashBoard.jsx'));
const Categories = lazy(() => import('./pages/Categories.jsx'));
const Topics = lazy(() => import('./pages/Topics.jsx'));
const Lessons = lazy(() => import('./pages/Lessons.jsx'));
const LessonExperience = lazy(() => import('./pages/LessonExperience.jsx'));
const InterviewArena = lazy(() => import('./pages/InterviewArena.jsx'));
const MistakesLab = lazy(() => import('./pages/MistakesLab.jsx'));
const CodeArena = lazy(() => import('./pages/CodeArena.jsx'));
const Roadmap = lazy(() => import('./pages/Roadmap.jsx'));
const Quiz = lazy(() => import('./pages/Quiz.jsx'));
const Bookmarks = lazy(() => import('./pages/Bookmarks.jsx'));
const SearchResults = lazy(() => import('./pages/SearchResults.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="space-y-6 text-center">
       <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mx-auto" />
       <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Assembling Workspace...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="categories" element={<Categories />} />
                <Route path="roadmap" element={<Roadmap />} />
                <Route path="topics/:categoryId" element={<Topics />} />
                <Route path="lessons" element={<Lessons />} />
                <Route path="lesson/:slug" element={<LessonExperience />} />
                <Route path="lessons/:topicId" element={<Lessons />} />
                <Route path="quiz-arena" element={<Quiz />} />
                <Route path="quiz/:topicId" element={<Quiz />} />
                <Route path="interview-arena" element={<InterviewArena />} />
                <Route path="mistakes-lab" element={<MistakesLab />} />
                <Route path="code-arena" element={<CodeArena />} />
                <Route path="profile" element={<div>User Profile Page</div>} />
                <Route path="bookmarks" element={<Bookmarks />} />
                <Route path="search" element={<SearchResults />} />
              </Route>
              
              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
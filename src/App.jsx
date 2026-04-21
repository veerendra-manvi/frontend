import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';

// Optimized Lazy Loading
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Categories = lazy(() => import('./pages/Categories'));
const Topics = lazy(() => import('./pages/Topics'));
const Lessons = lazy(() => import('./pages/Lessons'));
const LessonExperience = lazy(() => import('./pages/LessonExperience'));
const InterviewArena = lazy(() => import('./pages/InterviewArena'));
const MistakesLab = lazy(() => import('./pages/MistakesLab'));
const CodeArena = lazy(() => import('./pages/CodeArena'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
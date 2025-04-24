import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import TwoAuth from './auth/TwoAuth';
import Dashboard from './dashboard/Dashboard';
import AboutPage from './components/AboutPage';
import UnAvailable from './errors/404';
import { ThemeProvider } from './components/theme-provider';
import FaceLandmarkDetector from './components/App';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <Router>
      <Routes>
        <Route path="/" element={<FaceLandmarkDetector />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/twoauth" element={<TwoAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<UnAvailable />} /> {/* Catch-all route */}
      </Routes>
    </Router>
    </ThemeProvider>
  </StrictMode>,
)

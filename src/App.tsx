import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import AppDetailPage from './pages/AppDetailPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps/:slug" element={<AppDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

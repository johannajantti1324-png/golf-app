import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import SearchPage from './pages/searchPage.jsx';
import CoursePage from './pages/coursePage.jsx';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">Golf Courses</a>
          <Link to="/" className="nav-link">Golf Explorer</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App

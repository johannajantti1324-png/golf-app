import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import SearchPage from './pages/searchPage.jsx';
import CoursePage from './pages/coursePage.jsx';
import ComparePage from './pages/comparePage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar expand="lg" className="mb-4 shadow-sm" style={{ backgroundColor: 'var(--clubhouse-green)' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: 'var(--clubhouse-gold)', fontWeight: 'bold', fontSize: '1.5rem' }}>
            The Clubhouse
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" style={{ color: 'var(--clubhouse-gold)', marginRight: '1rem' }}>
                Search Courses
              </Nav.Link>
              <Nav.Link as={Link} to="/compare" style={{ color: 'var(--clubhouse-gold)' }}>
                Compare Courses
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
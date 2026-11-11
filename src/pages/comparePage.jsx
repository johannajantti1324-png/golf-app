import { useState } from 'react';
import { fetchGolfCourses } from '../services/golfApi';
import { Container, Form, Button, ListGroup, Table, Badge } from 'react-bootstrap';

export default function ComparePage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [compareList, setCompareList] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        try {

            const data = await fetchGolfCourses(query);
            setResults(data || []); 
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    const addToCompare = (course) => {
        // Lisätään, jos listalla on tilaa (max 3) eikä kenttä ole jo siellä
        if (compareList.length >= 3) return;
        if (compareList.find(c => c.id === course.id)) return;
        setCompareList([...compareList, course]);
    };

    const removeFromCompare = (id) => {
        setCompareList(compareList.filter(c => c.id !== id));
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4" style={{ color: 'var(--clubhouse-green)' }}>Compare Courses</h1>

            {/* Hakulomake */}
            <Form onSubmit={handleSearch} className="mb-4">
                <div className="d-flex gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Search courses to compare..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button variant="primary" type="submit" style={{ backgroundColor: 'var(--clubhouse-green)', borderColor: 'var(--clubhouse-green)' }}>
                        Search
                    </Button>
                </div>
            </Form>

            {/* Hakutulokset */}
            {results.length > 0 && (
                <div className="mb-5">
                    <h5 className="mb-3" style={{ color: 'var(--clubhouse-green)' }}>Search Results</h5>
                    <ListGroup>
                        {results.map(course => (
                            <ListGroup.Item key={course.id} className="d-flex justify-content-between align-items-center">
                                <span>
                                    {/* Käytetään turvavalintaa (fallback), jos nimeä ei ole */}
                                    {course.name || course.course_name || 'Unknown Course'} 
                                    <small className="text-muted ms-2">
                                        ({course.city || 'Unknown'}, {course.state || 'N/A'})
                                    </small>
                                </span>
                                <Button 
                                    variant="dark" 
                                    size="sm" 
                                    onClick={() => addToCompare(course)}
                                    disabled={compareList.length >= 3 || compareList.find(c => c.id === course.id)}
                                    style={{ backgroundColor: 'var(--clubhouse-green)', borderColor: 'var(--clubhouse-green)' }}
                                >
                                    + Add
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            )}

            {/* Vertailutaulukko */}
            <div className="d-flex align-items-center mb-3">
                <h3 className="mb-0 me-3" style={{ color: 'var(--clubhouse-green)' }}>Selected Courses</h3>
                <Badge bg="dark" pill style={{ backgroundColor: 'var(--clubhouse-gold)', color: 'white' }}>
                    {compareList.length} / 3
                </Badge>
            </div>

            {compareList.length === 0 ? (
                <p className="text-muted">No courses selected yet. Search and add courses above.</p>
            ) : (
                <Table bordered hover responsive className="bg-white shadow-sm">
                    <thead style={{ backgroundColor: 'var(--clubhouse-green)', color: 'var(--clubhouse-cream)' }}>
                        <tr>
                            <th>Feature</th>
                            {compareList.map(c => (
                                <th key={c.id}>
                                    {c.name || c.course_name || 'Unknown'}
                                    <Button variant="danger" size="sm" className="ms-2 py-0 px-2" onClick={() => removeFromCompare(c.id)}>×</Button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>City</strong></td>
                            {compareList.map(c => <td key={c.id}>{c.city || '—'}</td>)}
                        </tr>
                        <tr>
                            <td><strong>State</strong></td>
                            {compareList.map(c => <td key={c.id}>{c.state || '—'}</td>)}
                        </tr>
                        <tr>
                            <td><strong>Par</strong></td>
                            {compareList.map(c => <td key={c.id}>{c.par || '—'}</td>)}
                        </tr>
                        <tr>
                            <td><strong>Type</strong></td>
                            {compareList.map(c => <td key={c.id}>{c.type || '—'}</td>)}
                        </tr>
                    </tbody>
                </Table>
            )}
        </Container>
    );
}
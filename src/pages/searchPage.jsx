import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGolfCourses } from '../services/golfApi';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        setError('');
        try {
            const results = await fetchGolfCourses(query);
            setCourses(results);
        } catch (err) {
            console.error('Error searching courses:', err);
            setError('Failed to fetch courses.');
        }
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4" style={{ color: 'var(--clubhouse-green)' }}>Search Golf Courses</h1>
            
            <Form onSubmit={handleSearch} className="mb-5">
                <Row className="g-2">
                    <Col md={9}>
                        <Form.Control
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter course name (e.g. Pebble)..."
                        />
                    </Col>
                    <Col md={3}>
                        <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: 'var(--clubhouse-green)', borderColor: 'var(--clubhouse-green)' }}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}

            <Row xs={1} md={2} lg={3} className="g-4">
                {courses.map((course) => (
                    <Col key={course.id}>
                        <Link to={`/course/${course.id}`} className="text-decoration-none">
                            <Card className="h-100 shadow-sm" style={{ backgroundColor: 'var(--clubhouse-cream)', borderColor: 'var(--clubhouse-gold)', borderWidth: '2px' }}>
                                <Card.Header style={{ backgroundColor: 'var(--clubhouse-green)', color: 'var(--clubhouse-gold)', fontWeight: 'bold' }}>
                                    {course.name || course.course_name}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text className="text-dark">
                                        {course.city || 'Unknown'}, {course.state || ''}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
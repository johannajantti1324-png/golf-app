import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGolfCourseDetails } from '../services/golfApi';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';

export default function CoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        async function loadCourseDetails() {
            try {
                const data = await fetchGolfCourseDetails(id);
                setCourse(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadCourseDetails();
    }, [id]);

    if (!course) return <Container className="py-4">Loading...</Container>;

    return (
        <Container className="py-4">
            <Link to="/" className="btn btn-dark mb-4" style={{ backgroundColor: 'var(--clubhouse-green)', borderColor: 'var(--clubhouse-green)' }}>
                ← Back to Search
            </Link>
            
            <h1 className="fw-bold mb-2" style={{ color: 'var(--clubhouse-green)' }}>
                {course.name || course.course_name}
            </h1>
            <p className="lead text-muted mb-4">
                {course.city ? `${course.city}, ${course.state}` : 'Location not available'}
            </p>
            
            <Card className="shadow-sm border-0">
                <Card.Header as="h5" style={{ backgroundColor: 'var(--clubhouse-green)', color: 'var(--clubhouse-gold)' }}>
                    Course Information
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Par:</strong> <span>{course.par || 'N/A'}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Type:</strong> <span>{course.type || 'N/A'}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Phone:</strong> <span>{course.phone || 'N/A'}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <strong>Website:</strong>
                        {course.website ? (
                            <Button variant="outline-dark" size="sm" href={course.website} target="_blank" style={{ borderColor: 'var(--clubhouse-green)', color: 'var(--clubhouse-green)' }}>
                                Visit Site
                            </Button>
                        ) : 'N/A'}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Container>
    );
}
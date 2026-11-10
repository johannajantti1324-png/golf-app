import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchGolfCourseDetails } from '../services/golfApi' 

export default function CoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        async function loadCourseDetails() {
            try {
                console.log('Fetching course details for ID:', id);
                const data = await fetchGolfCourseDetails(id);
                console.log('Fetched course details:', data);
                setCourse(data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        }
        loadCourseDetails();
    }, [id]);

    if (!course) {
        return <div className="container py-4">Loading...</div>;
    }
    return (
        <div className="container py-4">
            <Link to="/" className="btn btn-secondary mb-4">Back to Search</Link>
            <h1 className="mb-4">{course.name}</h1>
            <p><strong>Location:</strong> {course.city}, {course.state}</p>
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">Course Details</h3>
                    <p className="card-text"><strong>Par:</strong> {course.par}</p>
                    <p className="card-text"><strong>Type:</strong> {course.type}</p>
                    <p className="card-text"><strong>Phone Number:</strong> {course.phone}</p>
                </div>
            </div>
        </div>
    );
}
        
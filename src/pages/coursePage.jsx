import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { fetchGolfCourseDetails } from '../services/golfApi' 

export default function CoursePage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        async function loadCourseDetails() {
            const data = await fetchGolfCourseDetails(id);
            setCourse(data);
        }
        loadCourseDetails();
    }, [id]);

    if (!course) {
        return <div className="container py-4">Loading...</div>;
    }
    return (
        <div className="container py-4">
            <link to="/" className="btn btn-secondary mb-4">Back to Search</link>
            <h1 className="mb-4">{course.course_name}</h1>
            <p><strong>Location:</strong> {course.city}, {course.state}</p>
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">Course Details</h3>
                    <p><strong>Par:</strong> {course.par}</p>
                    <p><strong>Yardage:</strong> {course.yardage}</p>
                    <p><strong>Holes:</strong> {course.holes}</p>
                    <p><strong>Rating:</strong> {course.rating}</p>
                    <p><strong>Slope:</strong> {course.slope}</p>
                </div>
            </div>
        </div>
    );
}
        
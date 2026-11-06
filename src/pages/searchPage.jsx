import {useState} from 'react'
import { Link } from 'react-router-dom'
import { fetchGolfCourses } from '../services/golfApi'

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [courses, setCourses] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        try {
            const results = await fetchGolfCourses(query);
            setCourses(results);
        } catch (error) {
            console.error('Error searching courses:', error);
        }       
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">Search Golf Courses</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter course name or location"
                    />
                    <button className="btn btn-primary" type="submit">
                        Search
                    </button>
                </div>
            </form>
            <div className="row">
                {courses.map((course) => (
                    <div className="col-md-4 mb-3" key={course.id}>
                        {}
                        <Link to={`/course/${course.id}`} className="text-decoration-none text-dark">
                            <div className="card h-100">
                            <h5 className="card-header">{course.course_name}</h5>
                            <p className="card-body">{course.city}, {course.state}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}


                            
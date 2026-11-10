import { useState } from 'react';
import { fetchGolfCourses } from '../services/golfApi';

export default function ComparePage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [comparison, setComparison] = useState([]);
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        const data = await fetchGolfCourses(query);
        setResults(data);
    };
    const addToComparison = (course) => {
        if (comparison.length >=2) return; // Limit to 2 courses for comparison
        if (comparison.find(c => c.id === course.id)) return; // Avoid duplicates
        setComparison([...comparison, course]);
    }
    const removeFromComparison = (id    ) => {
        setComparison(comparison.filter(course => course.id !== id));
    };
    return (
        <div className="container py-4">
            <h1 className="mb-4">Compare Golf Courses</h1>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for golf courses..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
            <div className="row mt-4">
                <h2>Search Results</h2>
                {results.map(course => (
                    <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{course.name||'Unnamed Course'} - {course.city||'Unknown City'}, {course.state||'Unknown State'}</span>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => addToComparison(course)}
                            disabled={comparison.length >= 2 || comparison.some(c => c.id === course.id)}
                        >
                            Add to Comparison
                        </button>
                    </li>
                ))}
            </div>  
            <h3 className="mt-4">Chosen Courses</h3>
            <div className="row">
                {comparison.map(course => (
                    <div className="col-md-6 mb-3" key={course.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{course.name||'Unnamed Course'}</h5>
                                <p className="card-text">
                                    {course.city||'Unknown City'}, {course.state||'Unknown State'}
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => removeFromComparison(course.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
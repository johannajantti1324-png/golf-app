const BASE_URL = 'https://api.opengolfapi.org';
export async function searchCourses(query) {
    const response = await fetch(`${BASE_URL}/courses/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    const data = await response.json();
    return data.courses;
    }
export async function getCourseDetails(courseId) {
    const response = await fetch(`${BASE_URL}/courses/${courseId}`);
    if (!response.ok) throw new Error('Failed to fetch course details');
    const data = await response.json();
    return data.course;
}
const BASE_URL = 'https://api.opengolfapi.org';


export async function fetchGolfCourses(query) {
    const response = await fetch(`${BASE_URL}/v1/courses/search?q=${query}`);
    const data = await response.json();
    return data.courses;

}
export async function fetchGolfCourseDetails(Id) {
    const response = await fetch(`${BASE_URL}/v1/courses/${Id}`);
    const data = await response.json();
    return data.course || [];
}

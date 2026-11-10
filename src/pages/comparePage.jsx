import { useState } from 'react';
import { fetchGolfCourses } from '../services/golfApi';

export default function ComparePage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const 
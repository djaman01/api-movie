import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovieAxios() {
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');

  const handleTitle = (e) => setTitle(e.target.value);

  useEffect(() => {
    const fetchData = () => {
      const apiKey = 'f929f9583302a8f0d7430c5a660bf542';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`;

      axios.get(url)
        .then((response) => {
          console.log("here is the result of the API", response.data);
          setSearchResult(response.data.results);
        })
        .catch((error) => {
          setError('An error occurred while fetching data.');
        });
    };

    fetchData();
  }, [title]);

  return (
    <>
      <div>
        <h1>List of Movies with Axios</h1>
      </div>
      <div>
        <input value={title} onChange={handleTitle} type="text" />
      </div>
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <h1>Search Results</h1>
            <ul>
              {searchResult.map((item) => (
                <li key={item.id}>
                  <h2>{item.title}</h2>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.title}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

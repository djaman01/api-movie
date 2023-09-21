import React, { useState, useEffect } from 'react';

function MovieSearch() {
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      //A la place de game à la fin, qui est le titre d'un fil, on met la value state d'un inputqu'on va créer en bas, pour pouvoir chercher toutes les images de tous les films
      const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8354168104mshfc3df6799c7f5d9p1f2232jsn0d943433ae01',
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
      };

      try {
        //fetch = on cherche la data: on aurait pu écrire les url en haut
        const response = await fetch(url, options);

        if (response.ok) {
          const result = await response.json();
          setSearchResult(result.d);
        } 
        //1ère erreur de s'il ne fetch pas: s'il ne va même pas chercher la data
        else {
          throw new Error('Network response was not ok');
        }
      } 
      //2ème erreur de s'il ne trouve pas la data qu'il est allé fetcher
      catch (error) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h1>Search Results</h1>
          <ul>
            {searchResult.map((item) => (
              <li key={item.id}>
                <h2>{item.l}</h2>
                {item.q && <p>Type: {item.q}</p>}
                {item.y && <p>Year: {item.y}</p>}
                <img src={item.i.imageUrl} alt={item.l} />
              </li>
            ))}
          </ul>
          <h1>heeeeeeeeeeeeeey i am here</h1>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;

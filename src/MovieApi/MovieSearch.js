import React, { useState, useEffect } from 'react';

function MovieSearch() {

  //On crée une state variable ou on va store toutes les valeus de l'objet de l'API
  const [searchResult, setSearchResult] = useState([]);

  //On crée une variable pour store l'erreur si le fetch ne se fait pas
  const [error, setError] = useState('');

  //On crée une state variable pour store la value de l'input
  const [title, setTitle] = useState('');
  //L'event handler sera donné à onChange de l'input
  const handleTitle = (e) => setTitle(e.target.value);

  //On utilise useEffect pour que la data soit fetch quand on va changer le titre écrit dans l'input
  //Là on va utiliser la syntax de fetch.api qui est intégré à VScode
  useEffect(() => {
  
    //On crée une arrow function qui va etre asynchrone, donc qui pourra fetché la data, même si le return apparait. 
    const fetchData = async () => {//Quand on écrit async, il faut écrire await plus tard
      const apiKey = 'f929f9583302a8f0d7430c5a660bf542'; //notre Api key qui permet au site de savoir combien de fois on a fetch la data
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`; //L'url de l'api, avec en endpoint l'apikey et à la fin {title} pour que query soit == à la value de l'input (on a écrit query juste parce que c'est comme ça dans le site)
      
      try {//Syntax à connaitre
        const response = await fetch(url);//fetch la data de l'url
        
        if (response.ok) {//Si fetch marche
          console.log("here is the result of the API", response)

          const result = await response.json();//On transforme la data en json() et on store dans la variable result
          console.log("here is the result of the API", result)
          setSearchResult(result.results); // et ensuite on update  la state variable serachResult avec la "results" array for movie data
        } else {//Si fetch ne marche pas écrit:
          throw new Error('Network response was not ok');
        }
      } catch (error) {//Si fetch a marché mais qu'ensuite on en trouve pas la data écrit
        setError('An error occurred while fetching data.');
      }
    };
    //Fin de l'arrow function du useEffect
    fetchData();//Appel de l'arrow function pour l'activer
  
  }, [title]);//[title] veut dire que le useEffect s'activera et va fetch la data, à chaque fois que le titre de l'input (state variable) chanegra

  return (
    <>
    <div>
    <h1>List of Movies</h1>
    </div>
      <div>
        <input value={title} onChange={handleTitle} type="text" />
      </div>
      <div>
        {error ? (//Si erreur,
          <p>Error: {error}</p>//Montre la value de erreur
        ) : ( //sinon affiche:
          <div>
            <h1>Search Results</h1>
            <ul>
              {searchResult.map((item) => (//on map sur la state variable qui contient l'array avec tous les films de la movie app
              //On peut trouver les nom des property dans les objets de l'api grace à thunder client
                <li key={item.id}>  
                  <h2>{item.title}</h2> {/* Use "title" for movie title */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.title} // Use "title" for alt text
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

export default MovieSearch;

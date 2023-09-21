
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    axios.get('https://imdb8.p.rapidapi.com/auto-complete?q=game')
      .then((response) => {
        setListOfUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Movies</h1>
      <ul>
        {listOfUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=game';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8354168104mshfc3df6799c7f5d9p1f2232jsn0d943433ae01',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
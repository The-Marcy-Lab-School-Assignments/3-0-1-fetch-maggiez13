const userUrl = 'https://jsonplaceholder.typicode.com/users'

export const checkResponseStatus = () => {
  return fetch(userUrl) 
    .then(response => { 
      return {
        status: response.status, 
        ok: response.ok,         
        url: response.url     
      };
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

export const getUsers = () => {
  return fetch(userUrl)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error fetching users:', error);
    });
};

export const getUserPosts = (userId, maxNumPosts = 3) => {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => posts.slice(0, maxNumPosts))
    .catch(error => {
      console.error('Error fetching user posts:', error);
    });
};

export const createNewUser = (newUserData = {username, email}) => {
  const postOption = {
    method: "POST",                      
    body: JSON.stringify(newUserData),       
  }
  return fetch(userUrl, postOption)
    .then((response) => {
      if (!response.ok) {
        return console.log(`Fetch failed. ${response.status} ${response.statusText}`)
      }
      return response.json();
    })
    .then((responseData) => {
        console.log("Here is your data:", responseData);
        return responseData;
    })
    .catch((error) => {
      console.log("Error caught!");
      console.error(error.message);
    })
}
import {
  renderStatus,
  setupPageBasics,
  renderUsers,
  renderPosts,
  renderNewUser,
} from './render-functions.js';
import {
  checkResponseStatus,
  getUserPosts,
  createNewUser,
  getUsers
} from './fetch-functions.js';
/** FEEDBACK: Great job getting all test cases to pass! You are killing it! */
export default function app(appDiv) {
  const { statusDiv, usersUl, postsUl, newUserForm, newUserDiv } = setupPageBasics(appDiv);

  // Fetch and render status
  checkResponseStatus().then(statusInfo => {
    renderStatus(statusDiv, statusInfo);
  });

  // Fetch and render users
  getUsers().then(users => {
    renderUsers(usersUl, users);
  });

  // Event delegation for loading user posts
  usersUl.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const userId = event.target.getAttribute('data-user-id');
      getUserPosts(userId).then(posts => {
        renderPosts(postsUl, posts);
      });
    }
  });

  // Handle new user form submission
  newUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(newUserForm);
    const newUserData = {
      username: formData.get('username'),
      email: formData.get('email')
    };
    createNewUser(newUserData).then(newUser => {
      renderNewUser(newUserDiv, newUser);
      newUserForm.reset();
    });
    
  });
}

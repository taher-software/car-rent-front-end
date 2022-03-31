export const populateStorage = (user) => {
  localStorage.setItem('current_user', JSON.stringify(user));
};

export const fetchStorage = (key) => (JSON.parse(localStorage.getItem(key)));

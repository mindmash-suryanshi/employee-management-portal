const AUTH_KEY = "authUser";

export const setAuthUser = (user) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const getAuthUser = () => {
  const user = localStorage.getItem(AUTH_KEY);

  return user ? JSON.parse(user) : null;
};

export const removeAuthUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = () => {
  return Boolean(getAuthUser());
};

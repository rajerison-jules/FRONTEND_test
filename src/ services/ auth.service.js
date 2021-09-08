import axios from "./../axios";

const register = (username, email, password) => {
  return axios.post("/api/auth/signup", {
    username,
    email,
    password,
    role: ["user"],
  });
};

const login = (username, password) => {
  return axios
    .post("/api/auth/signin", {
      username,
      password,
      role: ["user"],
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};

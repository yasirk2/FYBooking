// ======= users =======

export const getUsers = () => {
  return JSON.parse(sessionStorage.getItem("users")) || [];
}

export const addUsers = (user) => {
  const users = JSON.parse(sessionStorage.getItem("users")) || [];
  users.push(user);
  sessionStorage.setItem("users", JSON.stringify(users))
}

export const deleteUser = (userId) => {
  const updatedUsers = getUsers().filter((user) => user.user_id !== userId);
  sessionStorage.setItem("users", JSON.stringify(updatedUsers))
}
export function getUserFromStorage() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function checkIsAdmin() {
  const user = getUserFromStorage();
  return user?.role === "admin";
}


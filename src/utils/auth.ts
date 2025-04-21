export function getUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function checkIsAdmin() {
  const user = getUser();
  return user?.role === "admin";
}


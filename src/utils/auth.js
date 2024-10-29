import { jwtDecode } from "jwt-decode";

export function isTokenValid() {
  const token = localStorage.getItem("jwtToken");
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000;  // Current time in seconds
    return exp > currentTime;  // Token is valid if expiration is in the future
  } catch (error) {
    return false;
  }
}

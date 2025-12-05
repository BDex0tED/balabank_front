const BASE_URL = "http://localhost:8000";

export default async function api(url, method = "GET", body = null, isJson = true) {
  const options = {
  method,
  headers: {}
  };

  const token = localStorage.getItem("token");
  if (token) {
  options.headers["Authorization"] = `Bearer ${token}`;
  }


  if (body) {
  options.headers["Content-Type"] = "application/json";
  options.body = JSON.stringify(body);
  }

  try {
  const res = await fetch(BASE_URL + url, options);

  if (res.status === 401) {
  console.error("Ошибка 401: Токен недействителен или истек.");
  }

  if (!isJson || res.status === 204) return res; 

  return res.json();
  } catch (error) {
  console.error(`Ошибка при выполнении запроса к ${url}:`, error);
  return { detail: "Ошибка сети или сервера." };
  }
}
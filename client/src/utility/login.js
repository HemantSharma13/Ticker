export default async function login(email, password) {
  try {
    console.log(import.meta.env.VITE_API_URL);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("data from login function:", data);

    return data;
  } catch (error) {
    console.error("The error happening is:", error);
    throw error;
  }
}

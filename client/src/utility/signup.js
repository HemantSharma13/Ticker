export default async function signup(name, email, password, confirmPassword) {
  try {
    console.log("The details are:", name, email, password, confirmPassword);
    console.log(import.meta.env.VITE_API_URL);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({ name, email, password, confirmPassword }),
      },
    );

    const data = await response.json();
    console.log("data from signup function:", data);

    return data;
  } catch (error) {
    console.error("error from signup function:", error);
    throw error;
  }
}

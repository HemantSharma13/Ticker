import styles from "./LoginCard.module.css";
import { Link, Outlet } from "react-router";
import { useEffect, useState } from "react";
import login from "../utility/login.js";
import Spinner from "../components/Spinner.jsx";
import { useNavigate } from "react-router";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittedOnce, setSubmittedOnce] = useState(false); //to allow error message after submit
  const [serverResponse, setServerResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordIsValid = password.length > 10;

  useEffect(() => {
    console.log("useeffect running with message:", serverResponse);
    if (!serverResponse) return;

    const timeout = setTimeout(() => {
      setServerResponse(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [serverResponse]);

  async function handleSubmit(e) {
    try {
      e.preventDefault(); //to prevent default behavior
      setSubmittedOnce(true);
      if (!emailIsValid || !passwordIsValid) {
        return;
      }
      setIsLoading(true);
      const response = await login(email, password);
      console.log("Response variable is:", response);
      setServerResponse(() => response);
      if (response?.success) {
        navigate("/app");
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.right}>
      <div className={styles.card}>
        <h2>Welcome Back 👋</h2>

        <p>Sign in to continue to your workspace.</p>

        {serverResponse && (
          <div
            className={`${styles.serverResponseMessage} ${serverResponse.success ? styles.loginSuccessStyle : styles.loginFailStyle}`}
          >
            {serverResponse.message}
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/*Field Email */}
          <div className={styles.inputGroup}>
            <label id="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email id here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {submittedOnce && !emailIsValid && (
              <p className={styles.errorMessage}>
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/*Field Password */}
          <div className={styles.inputGroup}>
            <label id="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {submittedOnce && !passwordIsValid && (
              <p className={styles.errorMessage}>
                Password must be longer than 10 characters.
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={submittedOnce ? !emailIsValid || !passwordIsValid : false}
          >
            {isLoading ? <Spinner /> : "Sign In"}
          </button>
        </form>

        <p className={styles.signup}>
          Don't have an account? <Link to="/auth/signup">Create One</Link>
        </p>
      </div>
    </section>
  );
}

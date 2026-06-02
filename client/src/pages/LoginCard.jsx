import styles from "./LoginCard.module.css";
import { Link, Outlet } from "react-router";
import { useEffect, useState } from "react";
import login from "../utility/login.js";
import Spinner from "../components/Spinner.jsx";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittedOnce, setSubmittedOnce] = useState(false); //to allow error message after submit
  const [loginStatusMessage, setLoginStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordIsValid = password.length > 10;

  useEffect(() => {
    console.log("useeffect running with message:", loginStatusMessage);
    if (!loginStatusMessage) return;

    const timeout = setTimeout(() => {
      setLoginStatusMessage(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [loginStatusMessage]);

  async function handleSubmit(e) {
    try {
      e.preventDefault(); //to prevent default behavior
      setSubmittedOnce(true);
      if (!emailIsValid || !passwordIsValid) {
        return;
      }
      setIsLoading(true);
      const formData = Object.fromEntries(new FormData(e.target));
      const serverResponse = await login(formData.email, formData.password);
      console.log(serverResponse);
      setLoginStatusMessage({
        status: serverResponse?.status,
        text: serverResponse?.message,
      });
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <section className={styles.right}>
      <div className={styles.card}>
        <h2>Welcome Back 👋</h2>

        <p>Sign in to continue to your workspace.</p>

        {loginStatusMessage && (
          <div
            className={`${styles.loginStatusMessage} ${loginStatusMessage.status === "success" ? styles.loginSuccessStyle : styles.loginFailStyle}`}
          >
            {loginStatusMessage.text}
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

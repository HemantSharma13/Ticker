import styles from "./LoginPage.module.css";
import { Link, Outlet } from "react-router";
import { useState } from "react";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false); //to allow error message after submit

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordIsValid = password.length > 10;

  function handleSubmit(e) {
    e.preventDefault(); //to prevent default behavior
    setSubmitted(true);
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  }
  return (
    <section className={styles.right}>
      <div className={styles.card}>
        <h2>Welcome Back 👋</h2>

        <p>Sign in to continue to your workspace.</p>

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
            {submitted && !emailIsValid && (
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
            {submitted && !passwordIsValid && (
              <p className={styles.errorMessage}>
                Password must be longer than 10 characters.
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={submitted ? !emailIsValid || !passwordIsValid : false}
          >
            Sign In
          </button>
        </form>

        <p className={styles.signup}>
          Don't have an account? <Link to="/auth/signup">Create One</Link>
        </p>
      </div>
    </section>
  );
}

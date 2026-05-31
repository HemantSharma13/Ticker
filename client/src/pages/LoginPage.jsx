import styles from "./LoginPage.module.css";
import { Link } from "react-router";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordIsValid = password.length > 10;

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  }
  return (
    <main className={styles.page}>
      <section className={styles.left}>
        <div className={styles.brand}>
          <h1>Ticker</h1>

          <h2>
            Manage your time.
            <br />
            Complete your tasks.
          </h2>

          <p>
            Track productivity, organize projects, and collaborate with your
            team from one workspace.
          </p>

          <div className={styles.stats}>
            <div>
              <h3>25K+</h3>
              <span>Users</span>
            </div>

            <div>
              <h3>1M+</h3>
              <span>Tasks Completed</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.right}>
        <div className={styles.card}>
          <h2>Welcome Back 👋</h2>

          <p>Sign in to continue to your workspace.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
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
              {email && !emailIsValid && (
                <p>Please enter a valid email address.</p>
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
              {password && !passwordIsValid && (
                <p>Password must be longer than 10 characters.</p>
              )}
            </div>

            <button
              type="submit"
              className={styles.loginBtn}
              disabled={!emailIsValid || !passwordIsValid}
            >
              Sign In
            </button>
          </form>

          <p className={styles.signup}>
            Don't have an account? <Link to="/signup">Create One</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;

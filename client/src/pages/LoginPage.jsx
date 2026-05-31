import styles from "./LoginPage.module.css";

function LoginPage() {
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

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <div className={styles.options}>
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/">Forgot Password?</a>
            </div>

            <button type="submit" className={styles.loginBtn}>
              Sign In
            </button>

            <button type="button" className={styles.googleBtn}>
              Continue with Google
            </button>
          </form>

          <p className={styles.signup}>
            Don't have an account? <a href="/">Create one</a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;

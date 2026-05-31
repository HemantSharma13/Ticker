import styles from "./SignupPage.module.css";
import { Link } from "react-router";

function SignupPage() {
  return (
    <main className={styles.page}>
      <section className={styles.left}>
        <div className={styles.brand}>
          <h1>Ticker</h1>

          <h2>
            Start managing your time.
            <br />
            Build productive habits.
          </h2>

          <p>
            Join thousands of users who organize projects, track work hours, and
            accomplish more every day.
          </p>

          <div className={styles.stats}>
            <div>
              <h3>25K+</h3>
              <span>Active Users</span>
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
          <h2>Create Account 🚀</h2>

          <p>Create your workspace and get started.</p>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="Hemant Sharma" />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input type="password" placeholder="Create password" />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" />
            </div>

            <label className={styles.terms}>
              <input type="checkbox" />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button type="submit" className={styles.signupBtn}>
              Create Account
            </button>
          </form>

          <p className={styles.login}>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;

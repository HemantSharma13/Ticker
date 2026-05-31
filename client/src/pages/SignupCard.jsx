import styles from "./SignupCard.module.css";
import { Link } from "react-router";

export default function SignupCard() {
  return (
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
          Already have an account? <Link to="/auth/login">Sign In</Link>
        </p>
      </div>
    </section>
  );
}

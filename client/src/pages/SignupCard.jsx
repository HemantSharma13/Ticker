import styles from "./SignupCard.module.css";
import { Link } from "react-router";
import { useState } from "react";
import signup from "../utility/signup";

export default function SignupCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submittedOnce, setSubmittedOnce] = useState(false); //to allow error message after submit
  const [loginStatusMessage, setLoginStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordIsValid = password.length > 10;
  const passwordMatching = password === confirmPassword ? true : false;

  async function handleSubmit(e) {
    try {
      e.preventDefault(); //to prevent default behavior
      setSubmittedOnce(true);

      if (!emailIsValid || !passwordIsValid || !passwordIsMatching) {
        return;
      }
      setIsLoading(true); //Activates Spinner

      const formData = Object.fromEntries(new FormData(e.target));
      const serverResponse = await signup(formData);
      console.log(serverResponse);
      setLoginStatusMessage({
        status: serverResponse?.status,
        text: serverResponse?.message,
      });
      setIsLoading(false); //Deactivates Spinner
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <section className={styles.right}>
      <div className={styles.card}>
        <h2>Create Account 🚀</h2>

        <p>Create your workspace and get started.</p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
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

import styles from "./SignupCard.module.css";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import signup from "../utility/signup";
import Spinner from "../components/Spinner";

export default function SignupCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serverResponse, setServerResponse] = useState(null);
  const [submittedOnce, setSubmittedOnce] = useState(false); //to allow error message after submit
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordIsValid = password.length > 10;
  const confirmPasswordIsValid = confirmPassword.length > 10;
  const passwordMatching = password === confirmPassword ? true : false;

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
      console.log(
        "Inside the submit handler in signup:",
        name,
        email,
        password,
        confirmPassword,
      );
      if (!emailIsValid || !passwordIsValid) {
        return;
      }
      setIsLoading(true);

      const response = await signup(name, email, password, confirmPassword);
      console.log("Response variable is:", response);
      setServerResponse(() => response);
      if (response?.success) {
        setIsLoading(false);
        navigate("/app");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.right}>
      <div className={styles.card}>
        <h2>Create Account 🚀</h2>

        <p>Create your workspace and get started.</p>

        {serverResponse && (
          <div
            className={`${styles.serverResponseMessage} ${serverResponse.success ? styles.loginSuccessStyle : styles.loginFailStyle}`}
          >
            {serverResponse.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {submittedOnce && !name && (
              <p className={styles.errorMessage}>Please enter your name.</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {submittedOnce && !email && (
              <p className={styles.errorMessage}>
                Please enter a valid email address.
              </p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {submittedOnce && !passwordIsValid && (
              <p className={styles.errorMessage}>
                Password must be longer than 10 characters.
              </p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {submittedOnce && !confirmPasswordIsValid && (
              <p className={styles.errorMessage}>
                Password must be longer than 10 characters.
              </p>
            )}
          </div>

          <label className={styles.terms}>
            <input type="checkbox" />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <button
            type="submit"
            className={styles.signupBtn}
            disabled={
              submittedOnce ? !emailIsValid || !passwordIsValid || !name : false
            }
          >
            {isLoading ? <Spinner /> : "Create Account"}
          </button>
        </form>
        <p className={styles.login}>
          Already have an account? <Link to="/auth/login">Sign In</Link>
        </p>
      </div>
    </section>
  );
}

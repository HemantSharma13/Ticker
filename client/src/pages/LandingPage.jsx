import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <main>
      <header className={styles.navbar}>
        <h2 className={styles.logo}>Ticker</h2>

        <nav className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </nav>

        <button className={styles.loginBtn}>Login</button>
      </header>
    </main>
  );
}

export default LandingPage;

import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <main>
      {/* Navbar */}
      <header className={styles.navbar}>
        <h2 className={styles.logo}>Ticker</h2>

        <nav className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </nav>

        <button className={styles.loginBtn}>Login</button>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Smart Time & Task Management</span>

          <h1>
            Stay Organized.
            <br />
            Track Every Minute.
            <br />
            Get More Done.
          </h1>

          <p>
            Manage tasks, track time, and improve productivity with one powerful
            workspace.
          </p>

          <div className={styles.heroActions}>
            <button className={styles.primaryBtn}>Get Started Free</button>
            <button className={styles.secondaryBtn}>Watch Demo</button>
          </div>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.dashboard}>
            <h3>Today's Progress</h3>

            <div className={styles.taskRow}>
              <span>Build Landing Page</span>
              <span>75%</span>
            </div>

            <div className={styles.progressBar}>
              <div className={styles.progressFill} />
            </div>

            <div className={styles.timer}>
              <h2>06:42:15</h2>
              <p>Tracked Today</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <span>FEATURES</span>
          <h2>Everything you need to stay productive</h2>
          <p>
            Manage tasks, track time, and collaborate with your team from a
            single workspace.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>⏱</div>
            <h3>Time Tracking</h3>
            <p>
              Start and stop timers, track work sessions, and monitor
              productivity in real time.
            </p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>✅</div>
            <h3>Task Management</h3>
            <p>
              Organize tasks with priorities, due dates, and custom workflows.
            </p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Analytics</h3>
            <p>
              Gain insights into where your time goes and identify productivity
              bottlenecks.
            </p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>👥</div>
            <h3>Collaboration</h3>
            <p>
              Share projects, assign tasks, and work seamlessly with your team.
            </p>
          </article>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div>
          <h2>25K+</h2>
          <p>Users</p>
        </div>

        <div>
          <h2>1M+</h2>
          <p>Tasks Completed</p>
        </div>

        <div>
          <h2>99.9%</h2>
          <p>Uptime</p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Ready to boost your productivity?</h2>

        <p>Join thousands of professionals using Ticker.</p>

        <button className={styles.primaryBtn}>Start Free Trial</button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2026 Ticker. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default LandingPage;

import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";


function AuthLayout() {
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
      <Outlet />
    </main>
  );
}

export default AuthLayout;

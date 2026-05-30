import styles from "./DashboardLayout.module.css";

const tasks = [
  {
    id: 1,
    title: "Build Login Page",
    description: "Create responsive login page using React and CSS Modules.",
    status: "In Progress",
    time: "02:14:32",
  },
  {
    id: 2,
    title: "API Integration",
    description: "Integrate payment gateway and user management APIs.",
    status: "Paused",
    time: "01:08:45",
  },
  {
    id: 3,
    title: "Dashboard UI Design",
    description: "Design and implement dashboard layout.",
    status: "In Progress",
    time: "00:45:21",
  },
];

export default function DashboardLayout() {
  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}

      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoCircle}></div>
          <span>Ticker</span>
        </div>

        <nav className={styles.nav}>
          <button className={styles.active}>Dashboard</button>
          <button>Tasks</button>
          <button>Projects</button>
          <button>Calendar</button>
          <button>Reports</button>
          <button>Settings</button>
        </nav>
      </aside>

      {/* Main */}

      <main className={styles.main}>
        {/* Top Navigation */}

        <header className={styles.header}>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Search tasks, projects..." />
          </div>

          <div className={styles.headerRight}>
            <button className={styles.notification}>🔔</button>

            <div className={styles.profile}>
              <div className={styles.avatar}>H</div>

              <div>
                <h4>Hemant Sharma</h4>
                <p>Premium User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome */}

        <section className={styles.hero}>
          <div>
            <h1>Good Morning, Hemant 👋</h1>
            <p>Here's what's happening with your tasks today.</p>
          </div>

          <button className={styles.newTask}>+ New Task</button>
        </section>

        {/* Stats */}

        <section className={styles.stats}>
          <div className={styles.statCard}>
            <h3>04h 32m</h3>
            <p>Total Time Today</p>
          </div>

          <div className={styles.statCard}>
            <h3>6</h3>
            <p>Completed</p>
          </div>

          <div className={styles.statCard}>
            <h3>3</h3>
            <p>In Progress</p>
          </div>

          <div className={styles.statCard}>
            <h3>8</h3>
            <p>Projects</p>
          </div>
        </section>

        {/* Tasks */}

        <section className={styles.tasks}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.taskCard}>
              <div className={styles.taskInfo}>
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <span className={styles.status}>{task.status}</span>
              </div>

              <div className={styles.timer}>{task.time}</div>

              <div className={styles.actions}>
                <button className={styles.playBtn}>▶</button>

                <button className={styles.pauseBtn}>❚❚</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

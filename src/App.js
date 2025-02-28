import React, { useState } from "react";
import ToDoList from "./ToDoList";
import styles from "./App.module.css";
import plannerImage from "./assets/planner-image.png";

function App() {
  const [showTodo, setShowTodo] = useState(false);

  return (
    <div className={styles.appContainer}>
      {showTodo ? (
        <ToDoList goToHome={() => setShowTodo(false)} />
      ) : (
        <div className={styles.homeContainer}>
          <h1 className={styles.welcomeTitle}>Plan Your Day, Achieve Your Goals!</h1>
          
          <img src={plannerImage} alt="Planner" className={styles.plannerImage} />
          
          <button className={styles.getStartedBtn} onClick={() => setShowTodo(true)}>
            Get Started
          </button>

          <div className={styles.quotesSection}>
            <div className={styles.quoteBox}>🌟 "Don't wait—plan it, do it, achieve it!" ✅</div>
            <div className={styles.quoteBox}>📌 "A goal without a plan is just a wish." 💡</div>
            <div className={styles.quoteBox}>⏳ "Small actions every day lead to success." 🏆</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

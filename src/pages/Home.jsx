import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className={styles.mainContainer}>
    <div><img className={styles.circle1} src="./assets/circle1.png"/></div>
    <div><img className={styles.circle2} src="./assets/circle2.png"/></div>
    <div><img className={styles.circle3} src="./assets/circle3.png"/></div>

    <div className={styles.container}>
        <div className={styles.contentWrapper}>
            <div className={styles.leftSection}>
                <header>
                    <h1 className={styles.logo}>QuizLab</h1>
                    <p className={styles.tagline}>Small questions, big learning.</p>
                </header>

                <div className={styles.instructions}>
                    <h4 className={styles.instructionsTitle}>Instructions Before You Begin:</h4>
                    <ol className={styles.instructionsList}>
                        <li>Total Questions: 10</li>
                        <li>Time Limit: 5 minutes</li>
                        <li>There is only one correct answer per question unless stated otherwise.</li>
                        <li>Complete the quiz within the allotted time. Once time is up, your answers will be auto-submitted.</li>
                        <li>Each correct answer awards you 1 point. No negative marking.</li>
                    </ol>

                    <button className={styles.startBtn} onClick={handleStartQuiz}>Start Quiz</button>
                </div>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.illustration}>
                    <img src="./assets/homePage.png" alt = "Quiz illustration with people discussing" />
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};

export default Home;
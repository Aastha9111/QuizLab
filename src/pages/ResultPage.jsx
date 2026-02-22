import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ResultPage.module.css";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, selectedAnswers } = location.state || {};

  // Guard in case user directly visits /result
  if (!questions || !selectedAnswers) {
    navigate("/");
    return null;
  }

  // Calculate total score
  const score = questions.reduce(
    (acc, q, idx) => (selectedAnswers[idx] === q.answer ? acc + 1 : acc),
    0
  );
  const total = questions.length;

  const [currentQ, setCurrentQ] = useState(0);

  const handleRestart = () => {
    navigate("/"); // go back to home page
  };

  // Check marks for current question
  const currentCorrect = selectedAnswers[currentQ] === questions[currentQ].answer ? 1 : 0;

  return (
    <div className={styles.resultContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>QuizLab</h2>
        <p className={styles.sidebarTitle}>Questions</p>
        <div className={styles.questionNumbers}>
          {questions.map((_, index) => (
            <button
              key={index}
              className={`${styles.qNumber} ${
                index === currentQ ? styles.activeQ : ""
              }`}
              onClick={() => setCurrentQ(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Result Section */}
      <main className={styles.mainContent}>
        <div className={styles.headerSection}>
          {/* Total score display */}
          <div className={styles.score}>
            <p className={styles.totalScore}>{score}/{total}</p>
          </div>

          <div className={styles.headText}>
          <h2 className={styles.resultsHeading}>Results</h2>
          {/* Per-question marks */}
          <p className={styles.marksObtained}>
            Marks Obtained: {currentCorrect}/1
          </p>
          </div>
        </div>

        <div className={styles.resultQuestion}>
          <h3 className={styles.questionText}>
            Q{currentQ + 1}. {questions[currentQ].question}
          </h3>

          <div className={styles.optionsList}>
            {questions[currentQ].options.map((option, idx) => {
              const isCorrect = option === questions[currentQ].answer;
              const isSelected = option === selectedAnswers[currentQ];

              return (
                <div
                  key={idx}
                  className={`${styles.option} ${
                    isSelected
                      ? isCorrect
                        ? styles.correctSelected
                        : styles.wrongSelected
                      : ""
                  } ${isCorrect ? styles.correctOption : ""}`}
                >
                  {option}
                </div>
              );
            })}
          </div>

          <div className={styles.explanationBox}>
            <h4>Correct Answer: {questions[currentQ].answer}</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className={styles.navigation}>
          <button
            onClick={() => setCurrentQ((prev) => Math.max(prev - 1, 0))}
            className={`${styles.navBtn} ${
              currentQ === 0 ? styles.disabled : ""
            }`}
            disabled={currentQ === 0}
          >
            Prev
          </button>

          <button
            onClick={() => setCurrentQ((prev) => Math.min(prev + 1, total - 1))}
            className={`${styles.navBtn} ${
              currentQ === total - 1 ? styles.disabled : ""
            }`}
            disabled={currentQ === total - 1}
          >
            Next
          </button>
        </div>

        <div className={styles.restartWrapper}>
          <button className={styles.restartBtn} onClick={handleRestart}>
            Take Test Again
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;

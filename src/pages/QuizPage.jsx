import React, { useState, useEffect } from "react";
import styles from "./Quiz.module.css";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();

  // Sample questions
  const questions = [
    {
      question: "Which data structure follows the FIFO principle?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      answer: "O(log n)",
    },
    {
      question: "Which layer is responsible for routing in the OSI model?",
      options: ["Transport", "Network", "Session", "Physical"],
      answer: "Network",
    },
  ];

  //  Initialize timer from sessionStorage (persists across reloads in same tab)
  const getInitialTime = () => {
    const savedTime = sessionStorage.getItem('quizTimeLeft');
    const savedTimestamp = sessionStorage.getItem('quizStartTime');
    
    if (savedTime && savedTimestamp) {
      const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000);
      const remaining = parseInt(savedTime) - elapsed;
      return remaining > 0 ? remaining : 0;
    }
    
    // First time starting quiz
    sessionStorage.setItem('quizStartTime', Date.now().toString());
    return 5 * 60; // 5 minutes
  };

  // Initialize answers from sessionStorage
  const getInitialAnswers = () => {
    const savedAnswers = sessionStorage.getItem('quizAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  };

  // Initialize current question from sessionStorage
  const getInitialQuestion = () => {
    const savedQuestion = sessionStorage.getItem('quizCurrentQuestion');
    return savedQuestion ? parseInt(savedQuestion) : 0;
  };

  const [currentQ, setCurrentQ] = useState(getInitialQuestion);
  const [selectedAnswers, setSelectedAnswers] = useState(getInitialAnswers);
  const [timeLeft, setTimeLeft] = useState(getInitialTime);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('quizTimeLeft', timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    sessionStorage.setItem('quizAnswers', JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    sessionStorage.setItem('quizCurrentQuestion', currentQ.toString());
  }, [currentQ]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // auto-submit when time ends
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // Handle option selection
  const handleSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ]: option,
    });
  };

  // Next question
  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  // Previous question
  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  // Submit quiz
  const handleSubmit = () => {
    // Clear quiz state from sessionStorage
    sessionStorage.removeItem('quizTimeLeft');
    sessionStorage.removeItem('quizStartTime');
    sessionStorage.removeItem('quizAnswers');
    sessionStorage.removeItem('quizCurrentQuestion');
    
    navigate("/result", { state: { questions, selectedAnswers } });
  };

  // Jump to question directly
  const handleJumpToQuestion = (index) => {
    setCurrentQ(index);
  };

  return (
    <div className={styles.quizContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>QuizLab</h2>
        <p className={styles.subheading}>Questions</p>
        <div className={styles.questionNumbers}>
          {questions.map((_, index) => (
            <div
              key={index}
              onClick={() => handleJumpToQuestion(index)}
              className={`${styles.qNumber} ${
                index === currentQ ? styles.activeQ : ""
              } ${selectedAnswers[index] ? styles.answered : ""}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className={styles.mainContent}>
        {/* Timer */}
        <div className={styles.timerBox}>
          <p>Time Left: <span className={timeLeft < 60 ? styles.timeWarning : ""}>{formatTime(timeLeft)}</span></p>
        </div>

        <div className={styles.questionBox}>
          <p className={styles.questionText}>
            Q. {questions[currentQ].question}
          </p>

          <div className={styles.options}>
            {questions[currentQ].options.map((option, idx) => (
              <label
                key={idx}
                className={`${styles.option} ${
                  selectedAnswers[currentQ] === option ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name={`q-${currentQ}`}
                  value={option}
                  checked={selectedAnswers[currentQ] === option}
                  onChange={() => handleSelect(option)}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className={styles.buttons}>
            <button
              className={`${styles.prevBtn} ${currentQ === 0 ? styles.disabled : ""}`}
              onClick={handlePrev}
              disabled={currentQ === 0}
            >
              Prev
            </button>

            {currentQ === questions.length - 1 ? (
              <button className={styles.submitBtn} onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button className={styles.nextBtn} onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
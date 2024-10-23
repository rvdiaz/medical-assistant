import React, { useState } from "react";
import AudioCapture from "./components/AudioCapture";
import QuestionAnalyzer from "./components/QuestionAnalyzer";
import { getSuggestedAnswer } from "./services/answerService";
import "./App.css";

const App = () => {
  const [transcript, setTranscript] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null); /** Error state for overall app */

  const handleTranscription = (text) => {
    setTranscript(text);
  };

  const handleQuestionDetected = async (detectedQuestions) => {
    if (detectedQuestions.length === 0) {
      setError("No valid questions detected.");
      return;
    }

    try {
      setQuestions(detectedQuestions);
      const suggestedAnswers = await Promise.all(
        detectedQuestions.map(getSuggestedAnswer)
      );
      setAnswers(suggestedAnswers);
      setError(null); /** Clear any previous errors */
    } catch (error) {
      console.error("Error suggesting answers:", error);
      setError("Failed to suggest answers.");
    }
  };

  return (
    <div className="assistant-container ">
      <div className="Assistant-wrapper">
        <h1> Audio Medical Assistant </h1>{" "}
        <AudioCapture onTranscribe={handleTranscription} />{" "}
        <QuestionAnalyzer
          transcript={transcript}
          onQuestionDetected={handleQuestionDetected}
        />
        <div>
          <h3> Detected Questions </h3>{" "}
          {questions.map((question, index) => (
            <p key={index}>
              {" "}
              <strong> Question: </strong> {question}
            </p>
          ))}
          <h3> Suggested Answers </h3>{" "}
          {answers.map((answer, index) => (
            <p key={index}>
              {" "}
              <strong> Answer: </strong> {answer}
            </p>
          ))}{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default App;

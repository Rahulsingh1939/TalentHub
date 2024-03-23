import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5 pt-8">
        <h1 className="text-3xl text-center font-bold font-serif text-black-300 mb-8">INSTRUCTIONS</h1>
      <ul className="flex flex-col gap-1">
        <li className="text-xl font-sans">Exam must be completed in {examData.duration} seconds.</li>
        <li className="text-xl font-sans">
          Exam will be submitted automatically after {examData.duration}{" "}
          seconds.
        </li>
        <li className="text-xl font-sans">Once submitted, you cannot change your answers.</li>
        <li className="text-xl font-sans">Do not refresh the page.</li>
        <li className="text-xl font-sans">
          You can use the <span className="font-bold">"Previous"</span> and{" "}
          <span className="font-bold">"Next"</span> buttons to navigate between
          questions.
        </li>
        <li className="text-xl font-sans">
          Total marks of the exam is{" "}
          <span className="font-bold font-sans">{examData.totalMarks}</span>.
        </li>
        <li className="text-xl">
          Passing marks of the exam is{" "}
          <span className="font-bold font-sans">{examData.passingMarks}</span>.
        </li>
      </ul>

      <div className="flex gap-2">
        <button
          className="primary-outlined-btn w-24 rounded-lg"
          onClick={() => navigate("/")}
        >
          CLOSE
        </button>
        <button
          className="primary-contained-btn w-24 rounded-lg"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}

export default Instructions;

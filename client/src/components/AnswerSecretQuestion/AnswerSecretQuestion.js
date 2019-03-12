import React from "react";
import "./AnswerSecretQuestion.css";


const AnswerSecretQuestion = (props) => (

  <div className="selectquestion-area text-center">
    <div className="selectquestion-title text-center">To keep your account secure, please answer one of the questions below. If you forget your password you will be prompted to answer the question.</div>



    <form className="modifyuser-form text-center">
      <label className="modifyuser-label">
        Pick Secret Question:
                          <select className="modifyuser-select" value={props.value} onChange={props.handleChange}>

          {props.questions.map((question, i) => (
            <option key={i} value={question}>{question}</option>
          )
          )}
        </select>
      </label>
            <br/>

      <label className="updateuser-label">Your Answer</label>
      <input
        className="answerquestion-input"
        id="user-answer"
        name="userAnswer"
        value={props.userAnswer}
        onChange={props.onChange}
        type="text"
      />




      <button className="modifyuser-btn" onClick={props.submitQuestionAndAnswer}>Continue</button>
    </form>





    {/* <form>
      

        <label className="updateuser-label">Updated Name:</label>
        <input
          className="updateuser-input"
          id="username"
          name="username"
          value={props.username}
          onChange={props.onChange}
          type="text"
        />


      <button className="updateuser-submit-btn" onClick={props.submitUpdatedUser}>
        Update
        </button>

    </form> */}
  </div>
);

export default AnswerSecretQuestion;


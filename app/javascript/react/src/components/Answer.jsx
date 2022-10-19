import * as React from 'react'
import { useState } from 'react'
import * as ReactDOM from 'react-dom'

const Answer = (question) => {

  const { id } = question['question'];
  const [answer, setAnswer] = useState(question['question']['answer'] == null ? '' : question['question']['answer'])

  const handleProviderAnswer = (event) => {
    setAnswer(event.target.value)
  }

  const handleAnswerSubmit = () => {
    event.preventDefault();
    console.log('Question id:', id)
    console.log('Answer:', answer)
    console.log('Question:', question)
    createAnswer({answer: answer})
  }

  const createAnswer = (data) => {
    fetch(`/api/v1/questions/${id}/answer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.json()).then((data) => {
      console.log('Success:', data)
    }).catch((error) => {
      console.log('Error:', error)
    })
  }

  return(
    <div className="modal fade" id={`answerModal${id}`} tabIndex="-1" aria-labelledby={`answerModalLabel${id}`} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`answerModalLabel${id}`}>Write your answer.</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleAnswerSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label"> Answer </label>
                <input type="text" className="form-control form-control-lg rounded-0" value={answer} onChange={event => handleProviderAnswer(event)} name="answer"/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit Answer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Answer;

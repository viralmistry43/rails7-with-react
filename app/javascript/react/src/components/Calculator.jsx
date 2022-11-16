import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react'

const Calculator = () => {

  const [number, setNumber] = useState('')
  const [result, setResult] = useState(0)
  const [operation, setOperation] = useState('')

  const handleInput = (event) => {
    setNumber(event.target.value)
  }

  const handleButton = (event) => {
    event.preventDefault();
    value = event.target.innerText
    if (operation === 'C') {
      setOperation('')
      setNumber('')
      setResult(0)
    }
    if (result === 0 && value != '=') {
      setOperation(value)
      setResult(number)
      setNumber('')
    } else if (value === '=' && result && number && operation) {
      if (operation === '/') {
         setNumber(parseInt(result) / parseInt(number))
       } else if (operation === '*') {
         setNumber(parseInt(result) * parseInt(number))
       } else if (operation === '-') {
         setNumber(parseInt(result) - parseInt(number))
       } else if (operation === '+') {
         setNumber(parseInt(result) + parseInt(number))
       }
      setOperation('')
      setResult(0)
    }
  }

  return(
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <h1> Calculator </h1>

        <div className="row">
          <div className="col col-lg-4">
            <input className="form-control form-control-lg text-end mb-2" type="text" placeholder="0" name="inputNumber" value={number} onChange={event => handleInput(event)}/>
          </div>
        </div>

        <div className="row">
          <div className="col col-lg-4">
            <div className="row">
              <div className="col mb-2">
                <button type="button" className="btn btn-outline-danger btn-lg" style={{width: 'inherit'}} onClick={event => handleButton(event)}>
                  C
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col mb-2">
                <button type="button" className="btn btn-outline-primary btn-lg" style={{width: 'inherit'}} onClick={event => handleButton(event)}>
                  /
                </button>
              </div>

              <div className="col mb-2">
                <button type="button" className="btn btn-outline-primary btn-lg" style={{width: 'inherit'}} onClick={event => handleButton(event)}>
                  *
                </button>
              </div>

              <div className="col mb-2">
                <button type="button" className="btn btn-outline-primary btn-lg" style={{width: 'inherit'}} onClick={event => handleButton(event)}>
                  -
                </button>
              </div>

              <div className="col mb-2">
                <button type="button" className="btn btn-outline-primary btn-lg" style={{width: 'inherit'}} onClick={event => handleButton(event)}>
                  +
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <button type="button" className="btn btn-outline-success btn-lg" style={{width: 'inherit'}} onClick={event => handleButton(event)}>
                  =
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Calculator;

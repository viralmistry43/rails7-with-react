import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import QuestionList from './QuestionList'
import Nav from './Nav'
import Shop from './Shop'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


class Welcome extends React.Component {
  render() {
    return(
      <Router>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/shop" exact element={<Shop/>}/>
          <Route path="/question-list" element={<QuestionList/>}/>
        </Routes>
      </Router>
    )
  }
}

const Home = (props) => {
  return(
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <h1>Hello World!, Welcome to the Rails 7 course with React JS</h1>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('welcome'))
root.render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>
)

export default Welcome;

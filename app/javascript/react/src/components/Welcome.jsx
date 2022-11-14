import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionList from './QuestionList'
import Nav from './Nav'
import Event from './Event'
import EventDetail from './EventDetail'
import User from './User'

class Welcome extends React.Component {
  render() {
    return(
      <Router>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/user" exact element={<User/>}/>
          <Route path="/event" exact element={<Event/>}/>
          <Route path="/event/:id" element={<EventDetail/>}/>
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

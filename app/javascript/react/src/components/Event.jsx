import * as React from 'react'
import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from "react-router-dom"

const Event = () => {

  const [items, setItems] = useState([])

  const fetchItems = () => {
    fetch("https://fortnite-api.theapinetwork.com/items/popular").then((response) => response.json()).then((data) => {
      console.log(data.entries)
      setItems(data.entries)
    })
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return(
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <h1> Events </h1>
        {
          items.map(item_type => (
            item_type.entries.map(item => (
              <h3 key={item.identifier}>
                <Link to={`/event/${item.identifier}`} state={item}> {item.name} </Link>
              </h3>
            ))
          ))
        }
      </div>
    </div>
  )
}

export default Event;

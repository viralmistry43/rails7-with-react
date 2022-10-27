import * as React from 'react'
import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';


const ItemDetail = () => {

  const { id } = useParams();
  const [item, setItem] = useState({})

  const fetchItem = () => {
    fetch(`https://fortnite-api.theapinetwork.com/item/get?id=${id}`).then((response) => response.json()).then((data) => {
      console.log(data.data.item)
      setItem(data.data.item)
    })
  }

  useEffect(() => {
    fetchItem()
    console.log(id)
  }, [])

  return(
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <h1> ItemDetail </h1>
          <p> <strong> Name </strong>: {item.name}</p>
          <p> <strong> Description </strong>: {item.description}</p>
      </div>
    </div>
  )
}

export default ItemDetail;

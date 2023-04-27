import * as React from 'react'
import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const EventDetail = () => {

  const location = useLocation();
  const item = location.state;

  // const { id } = useParams();
  // const [item, setItem] = useState({})
  // const [video, setVideo] = useState(false)

  // const fetchItem = () => {
  //   fetch(`https://fortnite-api.theapinetwork.com/item/get?id=${id}`).then((response) => response.json()).then((data) => {
  //     console.log(data.data.item)
  //     setItem(data.data.item)
  //     if (data.data.item.media['length'] > 0) {
  //       setVideo(true)
  //     }
  //   })
  // }

  useEffect(() => {
    // fetchItem()
    // console.log(id)
    console.log(item);
    if (item.media && item.media['length'] > 0) {
      setVideo(true)
    }

  }, [])

  return(
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <h1> Event Detail </h1>
        <div className="row">
          <div className="col">
            <p> <strong> Name </strong>: {item.name} </p>
            <p> <strong> Type </strong>: {item.type} </p>
            <p> <strong> Cost </strong>: {item.cost} </p>
            <p> <strong> Description </strong>: {item.description} </p>
            {
              item.ratings &&
                <div>
                  <p> <strong> Avg Stars </strong>: { item.ratings['avgStars'] } </p>
                  <p> <strong> Number Votes </strong>: { item.ratings['numberVotes'] } </p>
                  <p> <strong> Total Points </strong>: { item.ratings['totalPoints'] } </p>
                </div>
            }
          </div>
          <div className="col">
            {
              item.images &&
                <div>
                  <p>
                    <strong> Image </strong>:
                    <img src={ item.images['transparent'] } alt="background image" style={{backgroundColor: '#ADD8E6'}} />
                  </p>
                </div>
            }
          </div>
          <div className="row">
            <div className="col-3">
              {
                video &&
                <div>
                  <p>
                    <strong> Video </strong>:
                      <video width="750" height="500" controls >
                        <source src={item.media[0]['src']} type={item.media[0]['type']} />
                      </video>
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail;

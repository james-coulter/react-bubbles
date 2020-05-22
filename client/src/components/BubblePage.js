import React, { useState, useEffect } from "react";
import axiosWithAuth from '../axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect( () => {
    const fetchColors= () => {
      axiosWithAuth().get('/api/colors')
                     .then (res => {
                       console.log('Successful GET request', res)
                       setColorList(res.data)
                     })
                     .catch (err => {
                       console.log('Error w/ GET request', err)
                     })
    }
    fetchColors()
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

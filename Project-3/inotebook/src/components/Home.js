import React from 'react';
import Notes from './Notes';

const Home = (props) => {
  
const {showAlert} = props;    //as showalert was passed as a props and then using the de-structring method showalert was taken from the props.
  return (
    <>
<Notes showAlert={showAlert} />
    </>
  )
}

export default Home

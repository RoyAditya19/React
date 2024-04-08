import './App.css';
import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App =(props)=> {

  const apiKey = process.env.REACT_APP_NEWS_API     //api key was brought up here from a file named(.env.local). whatever you write/initialize, after REACT_APP(here REACT_APP_NEWS_API), in .env.local file and they can be accessed using process.env and then writing the name u have used for declaring & initializing anything. 

  const [progress, setProgress] = useState(0)

  
  //here "key" has been passed as props because when you click on each tabs(present in navbar) react should re-render the component and then update the component(news component) accordingly and also path should be used as exact so that the component gets rendered only when the path matches.
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar height= {3} color='#f11946' progress={progress}/>
          <Routes>
            <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey}   key="general" pageSize={15} country = "in" category="general"/>} />
            <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey}   key="business" pageSize={15} country = "in" category="business"/>}/>
            <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey}   key="health" pageSize={15} country = "in" category="health"/>}/>
            <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey}   key="entertainment" pageSize={15} country = "in" category="entertainment"/>}/>
            <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey}   key="sports" pageSize={15} country = "in" category="sports"/>}/>
            <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey}   key="science" pageSize={15} country = "in" category="science"/>}/>
            <Route exact path='/culture' element={<News setProgress={setProgress} apiKey={apiKey}   key="culture" pageSize={15} country = "in" category="culture"/>}/>
            <Route exact path='/stocks' element={<News setProgress={setProgress} apiKey={apiKey}   key="stocks" pageSize={15} country = "in" category="stocks"/>}/>
          </Routes>
        </Router>
      </div>
    )
}

export default App;

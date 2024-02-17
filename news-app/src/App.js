
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API

  state = {progress :0 }

  setProgress =(progress)=>
  {
    this.setState({progress: progress})
  }
  
  render() {
    return (
      <div>
      <Router>
      <Navbar/>
      <LoadingBar height= {3} color='#f11946' progress={this.state.progress}/>
      <Routes>
      <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="general" pageSize={15} country = "in" category="general"/>} />
      <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="business" pageSize={15} country = "in" category="business"/>}/>
      <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="health" pageSize={15} country = "in" category="health"/>}/>
      <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="entertainment" pageSize={15} country = "in" category="entertainment"/>}/>
      <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="sports" pageSize={15} country = "in" category="sports"/>}/>
      <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="science" pageSize={15} country = "in" category="science"/>}/>
      <Route exact path='/culture' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="culture" pageSize={15} country = "in" category="culture"/>}/>
      <Route exact path='/stocks' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="stocks" pageSize={15} country = "in" category="stocks"/>}/>
      </Routes>
      </Router>
      </div>
    )
  }
}


import './App.css';
import {
  BrowserRouter as Router,
  Routes,
   Route
} from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home  from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import  Alert  from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  const [alert, setAlert] = useState(null)      //at the initial stage the alert state is null, it gets updated whenever the setalert is hit.
  const showAlert = (message, type)=>
  {
    setAlert({ msg: message, type:type})
    setTimeout(() => { setAlert(null)}, 1500);
  }

  
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert= {alert} />
          <div className="container">
            <Routes>                                                          {/*in the earlier versions of react instead of Routes, Switches were used*/}                         
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />  {/*here the showalert function is passed as the props. now whenever this function is called by using props.showalert(with message and type) or just passing as showalert={showalert} then the setalert is hit and updates the alert state of usestate method. now when the alert(state) gets updated the alert(state) is passed to the alert component and the alert gets displayed */}
              <Route exact path="/about" element= {<About />} />
              <Route exact path = "/login" element={<Login showAlert={showAlert}/>} /> 
              <Route exact path = "/signup" element={<Signup showAlert={showAlert}/>} /> 
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
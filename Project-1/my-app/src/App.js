// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Alert from './components/Alert';
import About from './components/About';
import React,{useState} from 'react';
 import {
   BrowserRouter as Router,
   Routes,
   Route
 } from "react-router-dom";


// in the following jsx code make sure that if a tag(for example some time anchor or input tag remains opened) is opened you close it, if you do not close it then it will throw an error. we have changed the class to className and also we have changed href=# to href=/

//below here Navbar is a component and to that component we have passed props such as title
function App() {
  const [mode, setMode] = useState('light');    //usestate function returns an array with two elements, one contain the current value of the state and the other contains a function to update that value. as soon as the setalert is used it updates the alert part and then that is circulated throughout
  const [alert, setAlert] = useState(null);     

  const showAlert = (message, type) =>
  {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const toggleMode = ()=>
  {
    if(mode === "light")
    {
      setMode("dark")
      document.body.style.backgroundColor = "grey"
      showAlert("Dark Mode Enabled", "success")
      // document.title = "Dark Mode"
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = "white"
      showAlert("Light Mode Enabled", "success")
      // document.title = "Light Mode"


    }
  }
  
  // below Switch were replaced by Routes. Routes are used to enclose all your route and the components are basically defined within the Route as an element 
  // exact path are used for precise routing
  return (
    <>   
    <Router>
    <Navbar title="Text- Editor" mode={mode} toggleMode= {toggleMode} />
    <Alert alert={alert}/>
    <div className="container" mode={mode}>
    <Routes>
      <Route exact path="/about" element={<About />} />
      <Route exact path="/" element={<Textform showAlert={showAlert} title="Enter something below to use the features of Text- Editor" mode={mode} />} />
    </Routes>
    </div>
    </Router> 
    </>
     //you can include only one element(or tag) at a time when you are writing JSX. instead of using "class"(in html) we use className in JSX(it prefers camelCase). 
  );
}

export default App;

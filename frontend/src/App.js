import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
    <Header/>
    <main>
    <Outlet/>
    </main>
    <Footer/>
    </div>
  );
}

export default App;

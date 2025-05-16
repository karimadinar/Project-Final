// import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Rou from './components/Rou'; 
import { UserProvider } from './components/context/UserContext';

function App() {
  return (
    <UserProvider>
        <div className='m-1'>
          <NavBar />
          <Rou /> 
          <Footer />
        </div>
    </UserProvider>
  );
}

export default App;

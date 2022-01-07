import Register from './components/register';
import MenuTabs from './components/menu';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <main>   
    <Routes>
        <Route index element = {<MenuTabs />}/>
        <Route path = '/register' element = {<Register />} />
    </Routes> 
  </main>   
  );
}

export default App;

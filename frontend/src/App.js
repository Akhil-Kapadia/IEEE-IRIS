import {Routes, Route} from 'react-router-dom';
import * as React from 'react';
import Register from './components/register';
import MenuTabs from './components/menu';
import SignIn from './components/SignIn';

function App() {
  return (
    <main>   
    <Routes>
        <Route index element = {<MenuTabs />}/>
        <Route path = '/register' element = {<Register />} />
        <Route path = '/login' element = {<SignIn />} />
    </Routes> 
  </main>   
  );
}

export default App;

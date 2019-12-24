import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { Globalstyle } from './style'
import Home from './pages/home';
import Login from './pages/login';
import Detail from './pages/detail';
function App() {
      return (
            <Provider store={store}>
                  <Globalstyle />
                  <BrowserRouter>
                        <div>
                              <Route path='/' exact component={Home}></Route>
                              <Route path='/login' exact component={Login}></Route>
                              <Route path='/detail/:id' exact component={Detail}></Route>
                        </div>
                  </BrowserRouter>
            </Provider>
      );
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

//App Component
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <div>
              <Main />
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
export default App;

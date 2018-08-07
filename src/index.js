import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import './styles/index.scss';
import store from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
<Provider store={store}> 
    <App />
</Provider>
), document.getElementById('root'));
registerServiceWorker();

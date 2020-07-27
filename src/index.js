import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Normally this files only for 1 render call

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

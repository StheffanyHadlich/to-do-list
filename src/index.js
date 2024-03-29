import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from './views/TodoList';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TodoList />, document.getElementById('root'));

serviceWorker.unregister();

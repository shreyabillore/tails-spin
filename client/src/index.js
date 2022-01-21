import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import RoutesPath from './components/RoutesPath';
import ContextMainProvider from './components/Context/ContextMain'


const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
  <ContextMainProvider >
       <RoutesPath/>
  </ContextMainProvider>
</BrowserRouter>
,
rootElement
);



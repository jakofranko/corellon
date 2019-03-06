// The ideas are inspired by this chapter of Eloquent JavaScript:
// https://eloquentjavascript.net/04_data.html
import React from 'react';
import { render } from 'react-dom';
import App from './js/app';

// Styles
import 'macian';
import './css/style.css';

render(<App />, document.getElementById("dashboard"))

import React from 'react';

// Same as render, however this is better when server-rendered markup is already present.
// React will preserve it and only attach event handlers, this gets us better load experience.
import { hydrate } from 'react-dom';
import App from './App'; // The actual application

// Render the application by inserting the App component in the template.js file inside the
// div component with the id value of root
hydrate(<App />, document.getElementById('root'));

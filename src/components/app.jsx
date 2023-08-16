import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ImageUpload from './image_upload.jsx';
import ImageEditor from './image_editor.jsx';
import '../styles/tailwind.css';


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editor" component={ImageEditor} />
        <Route path="/" component={ImageUpload} />
      </Switch>
    </Router>
  );
}

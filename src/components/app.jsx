import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ImageUpload from './image_upload';
import ImageEditor from './image_editor';



function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Router>
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">KnotzImageEditor Plus</h1>
          <Switch>
            <Route exact path="/" component={ImageUpload} />
            <Route path="/editor" component={ImageEditor} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

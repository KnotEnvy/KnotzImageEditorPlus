import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ImageUpload from './image_upload';
import ImageEditor from './image_editor';
import { ThemeProvider, useTheme } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="card-slide-in min-h-screen">
        <Router>
          <Header />
          <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">KnotzImageEditor Plus</h1>
            <Switch>
              <Route exact path="/" component={ImageUpload} />
              <Route path="/editor" component={ImageEditor} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

function Header() {
  const { toggleTheme } = useTheme(); // Get the toggleTheme function here

  return (
    <header className="container mx-auto p-4 shadow-md">
      <nav className="flex justify-between">
        <a href="/" className="text-lg font-bold">KnotzImageEditor Plus</a>
        <div>
          <a href="/" className="text-blue-500 hover:text-blue-700 mr-4">Upload</a>
          <a href="/editor" className="text-blue-500 hover:text-blue-700 mr-4">Editor</a>
          <button onClick={toggleTheme} className="text-blue-500 hover:text-blue-700">
            Toggle Theme
          </button>
        </div>
      </nav>
    </header>
  );
}

export default App;

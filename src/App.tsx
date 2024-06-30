import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">Darebee Timer App</Link>
          </div>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>

  );
}

export default App

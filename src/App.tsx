import React from 'react';

function App() {
  return (
    <>
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Darebee Timer App </a>
        </div>
      </nav>
    </div>
    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">
        <h5 className="card-title">New workout</h5>
        <p className="card-text">Create new workaout schedule here.</p>
        <a href="#create" className="btn btn-primary">Create Workout</a>
      </div>
    </div>
    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">
        <h5 className="card-title">Last workout</h5>
        <p className="card-text">20-20-20 20-20-20 20-20-20 7 sets</p>
        <a href="#create" className="btn btn-primary">Edit</a>
      </div>
    </div>
    </>

  );
}

export default App

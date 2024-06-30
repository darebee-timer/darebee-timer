import { Link } from 'react-router-dom';

function Overview() {
  return (
    <>
    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">
        <h5 className="card-title">New workout</h5>
        <p className="card-text">Create new workaout schedule here.</p>
        <Link to="/create" className="btn btn-primary">Create Workout</Link>
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

export default Overview

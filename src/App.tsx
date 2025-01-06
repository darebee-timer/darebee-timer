import { Link, Outlet } from 'react-router-dom';
import darebeeIcon from './assets/images/darebee-icon.png'

function App() {
  return (
    <>
      <div>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">Darebee Timer App</Link>
            <a href="https://darebee.com/" target="_blank" className="btn"><img src={darebeeIcon}/></a>
            <Link to="/info" className="btn">&#x2753;</Link>
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

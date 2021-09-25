import {Link} from 'react-router-dom';

function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4">
      <Link to="/" className="navbar-brand" >Blogger Dev</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/login" className="nav-link active">Login</Link>
          <Link to="/register" className="nav-link active">Register</Link>
          <Link to="/dashboard" className="nav-link active">Dashboard</Link>
          <Link to="/post" className="nav-link active">Articles</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
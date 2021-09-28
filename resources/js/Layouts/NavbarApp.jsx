import {Link} from 'react-router-dom';

function NavbarApp(){
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4">
      <Link to="/dashboard" className="navbar-brand" >Blogger Dev - App</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/dashboard" className="nav-link active">Dashboard</Link>
          <Link to="/post" className="nav-link active">Post</Link>
        </div>
      </div>
    </nav>
  )
}

export default NavbarApp;
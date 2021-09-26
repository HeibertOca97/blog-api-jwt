import {useEffect, useState} from 'react';
import {deleteToken} from '../Helpers/auth-helpers';
import { ListUser } from '../components/ListUser';
import { Pagination } from '../components/Pagination';

export function Dashboard({setSession, userAuth, setUserAuth}){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const getUsers = async () => {
    try {
      const res = await axios.get('/auth/users', {
        responseType: 'json'
      });
      setLoading(true);
      const {users} = await res.data;
      setUsers(users);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
    }    
  }

  //Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  //Change Page
  const paginate = pageNumbers => {setCurrentPage(pageNumbers)};

  async function logout(){
      try {
      const res = await axios.post('/auth/logout');
      const {success, message} = await res.data;
      if(success){
          setSession(false);
          deleteToken();
          setUserAuth(null);
          console.log(message, success)
      }
    } catch (error) {
        const {status, data} = error.response;
        if(status === 422){
            console.log(data.message, data.success)
        }
    }
  }

  useEffect(()=>{  
    document.querySelector("title").innerHTML = "Dashborad | Blogger Dev";
    getUsers();
  }, []);

  return (
    <div className="container-xl">
        <button className="btn btn-danger" onClick={logout}>Cerrar session</button>
      <div className="card mt-5 mb-5">
        <div className="card-header bg-dark text-white">Dashboard</div>
        <div className="card-body">
            <p>Nombre de usuario: <b>{userAuth.username}</b></p>
            <p>email: <b>{userAuth.email}</b></p>
            <p>Actualmente hay <b>{users.length} usuarios registrados</b> contandolo a usted</p>
        </div>
      </div>

    <div style={{overflow: 'auto'}}>
        <table className="table table-white mt-5 mb-5">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Nª article</th>
                <th scope="col">Created_at</th>
                <th scope="col">Update_at</th>
            </tr>
            </thead>
            <tbody>
            <ListUser 
                users={currentUsers} 
                loading={loading}
            />
            </tbody>
        </table>    
    </div>
      <Pagination 
        usersPerPage={usersPerPage} 
        totalUsers={users.length} 
        paginate={paginate}
      />
    </div>
  )
}
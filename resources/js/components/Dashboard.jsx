import {useEffect, useState} from 'react';
import { ListUser } from './ListUser';
import { Pagination } from './Pagination';

export function Dashboard({userAuth}){
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

  useEffect(()=>{  
    document.querySelector("title").innerHTML = "Dashborad | Blogger Dev";
    
  }, [userAuth]);
  
  return (
    <div className="container" style={{overflow: 'auto'}}>
      <div className="card mt-5 mb-5">
        <div className="card-header bg-dark text-white">Dashboard</div>
        <div className="card-body">
         <p>Este es su email: <b>{userAuth.email}</b></p>
         <p>Actualmente hay <b>{users.length} usuarios registrados</b> contandolo a usted</p>
        </div>
      </div>

      <button className="btn btn-info" onClick={getUsers}>Listar Usuarios</button>

      <table className="table table-white mt-5 mb-5">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
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
      <Pagination 
        usersPerPage={usersPerPage} 
        totalUsers={users.length} 
        paginate={paginate}
      />
    </div>
  )
}
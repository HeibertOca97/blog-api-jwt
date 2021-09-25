import {useEffect, useState} from 'react';

export function Dashboard({userAuth}){
  const [users, setUsers] = useState([]);
  
  useEffect(()=>{
    
    document.querySelector("title").innerHTML = "Dashborad | Blogger Dev";
    
    const getUsers = async () => {
      try {
        const res = await axios.get('/auth/users', {
          responseType: 'json'
        });
  
        const {users} = await res.data;
        setUsers(users);
        
      } catch (error) {
        console.log(error);
      }    
    }
    
    getUsers();
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

      <table className="table table-white">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Created_at</th>
            <th scope="col">Update_at</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) =>(
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.email}</td>
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
          </tr>
          ))}
        </tbody>
      </table>
 
    </div>
  )
}
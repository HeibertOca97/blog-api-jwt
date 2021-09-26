import React from 'react'

export function ListUser({users, loading}) {
  if(loading){
    return <tr><td colSpan="4">....Cargando</td></tr>;
  }
  return (
    users.map((item) =>(
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.posts.length}</td>
        <td>{item.created_at}</td>
        <td>{item.updated_at}</td>
      </tr>
      ))
  )
}

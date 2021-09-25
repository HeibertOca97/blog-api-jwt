import React from 'react'

export function Pagination({usersPerPage, totalUsers, paginate}) {
  const pageNumbers = [];

  for (let index = 1; index < Math.ceil(totalUsers / usersPerPage); index++) {
    pageNumbers.push(index);    
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number=>(
          <li key={number} className="page-item">
            <a onClick={ (e) => {
              e.preventDefault();
              paginate(number);
              }} href="/dashboard" className="page-link">{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

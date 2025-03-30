import React from 'react'
import { Link } from 'react-router'

const NavLink = ({ label, icon, path }) => {
  return (
    <li>
      <Link to={path} title={label}>
        {icon}
      </Link>
    </li>
  )
}

export default NavLink

import React from 'react'
import { Link, useLocation } from 'react-router'

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <div className='absolute right-0 bottom-0 '>
      <ul className='navlist list-disc'>
        <li className='navitem hover:underline text-blue-700'>
          <Link to='/' className={`navlink ${pathname === '/' && 'underline'}`}>
            Black
          </Link>
        </li>
        <br />
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/landing'
            className={`navlink ${pathname === '/landing' && 'underline'}`}
          >
            Landing
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/background'
            className={`navlink ${pathname === '/background' && 'underline'}`}
          >
            StadiumBackground
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/team'
            className={`navlink ${pathname === '/team' && 'underline'}`}
          >
            Team
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/tournaments'
            className={`navlink ${pathname === '/tournaments' && 'underline'}`}
          >
            Tournaments
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/scores'
            className={`navlink ${pathname === '/scores' && 'underline'}`}
          >
            Scores
          </Link>
        </li>

        <br />

        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/login'
            className={`navlink ${pathname === '/login' && 'underline'}`}
          >
            Login
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/admin/dashboard'
            className={`navlink ${
              pathname === '/admin/dashboard' && 'underline'
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/admin/dashboard/editTeam'
            className={`navlink ${
              pathname === '/admin/dashboard/editTeam' && 'underline'
            }`}
          >
            EditTeam
          </Link>
        </li>
        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/admin/dashboard/editTournaments'
            className={`navlink ${
              pathname === '/admin/dashboard/editTournaments' && 'underline'
            }`}
          >
            EditTournaments
          </Link>
        </li>

        <br />

        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/exit'
            className={`navlink ${pathname === '/exit' && 'underline'}`}
          >
            Exit
          </Link>
        </li>

        <li className='navitem hover:underline text-blue-700'>
          <Link
            to='/temp'
            className={`navlink ${pathname === '/temp' && 'underline'}`}
          >
            Temp
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar

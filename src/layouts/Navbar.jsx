import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="absolute right-0 bottom-0 ">
      <ul className="navlist list-disc">
        <li className="navitem hover:underline text-blue-500">
          <Link to="/" className="navlink">
            Black
          </Link>
        </li>
        <br />
        <li className="navitem hover:underline text-blue-500">
          <Link to="/landing" className="navlink">
            Landing
          </Link>
        </li>
        <li className="navitem hover:underline text-blue-500">
          <Link to="/background" className="navlink">
            StadiumBackground
          </Link>
        </li>
        <li className="navitem hover:underline text-blue-500">
          <Link to="/team" className="navlink">
            Team
          </Link>
        </li>
        <li className="navitem hover:underline text-blue-500">
          <Link to="/tournaments" className="navlink">
            Tournaments
          </Link>
        </li>
        <li className="navitem hover:underline text-blue-500">
          <Link to="/scores" className="navlink">
            Scores
          </Link>
        </li>

        <br />

        <li className="navitem hover:underline text-blue-500">
          <Link to="/login" className="navlink">
            Login
          </Link>
        </li>
        <li className="navitem hover:underline text-blue-500">
          <Link to="/admin/dashboard" className="navlink">
            Dashboard
          </Link>
        </li>
        <li className="navitem hover:underline text-blue-500">
          <Link to="/admin/dashboard/editTeam" className="navlink">
            EditTeam
          </Link>
        </li>
        <li className="navitem hover:underline text-blue-500">
          <Link to="/admin/dashboard/editTournaments" className="navlink">
            EditTournaments
          </Link>
        </li>

        <br />

        <li className="navitem hover:underline text-blue-500">
          <Link to="/exit" className="navlink">
            Exit
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

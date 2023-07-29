import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import { FaUser } from "react-icons/fa";


const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const picture = user?.photoURL;
    // console.log(user);

    const handleLogOut = () => {
        logOut()
            .then()
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="navbar bg-green-500 opacity-90 rounded-md text-white ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-xl font-bold"
                    >
                        <li>
                            <Link to="/" className="hover:bg-green-500">
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link className="hover:bg-green-500">
                                Instructor
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard"
                                className="hover:bg-green-500"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/classes" className="hover:bg-green-500">
                                Classes
                            </Link>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl font-bold">
                    <span className=" text-blue-800 text-2xl">Language</span>{" "}
                    Master
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-xl font-bold">
                    <li>
                        <Link to="/" className="hover:bg-green-500">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link className="hover:bg-green-500">Instructor</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="hover:bg-green-500">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/classes" className="hover:bg-green-500">
                            Classes
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <>
                    {user ? (
                        <>
                            <p className="flex items-center  ">
                                <span>
                                    {picture ? (
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={picture}
                                            alt=""
                                        />
                                    ) : (
                                        <FaUser className="h-6 w-6"></FaUser>
                                    )}
                                </span>
                            </p>
                            <button
                                onClick={handleLogOut}
                                className="btn  ml-2 text-white bg-gradient-to-r from-green-500 to-pink-500 hover:bg-gradient-to-l  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="btn  btn-primary hover:btn-success font-extrabold text-xl"
                        >
                            Log In
                        </Link>
                    )}
                </>
            </div>
        </div>
    );
};

export default NavBar;

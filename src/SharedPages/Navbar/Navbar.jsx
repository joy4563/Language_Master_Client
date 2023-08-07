import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/language_icon.jpg";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    // console.log(user);

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    const navOptions = (
        <>
            <li className="text-xl font-semibold bg-sky-300 mx-2 rounded-md">
                <Link to="/">Home</Link>
            </li>
            <li className="text-xl font-semibold bg-sky-300 mx-2 rounded-md">
                <Link to="/instructor">Instructor</Link>
            </li>
            <li className="text-xl font-semibold bg-sky-300 mx-2 rounded-md">
                <Link to="/classes">Classes</Link>
            </li>
            {user && (
                <li className="text-xl font-semibold bg-sky-300 mx-2 rounded-md">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            )}
        </>
    );
    return (
        <div className="navbar bg-blue-500">
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
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navOptions}
                    </ul>
                </div>
                <div className="flex items-center gap-5 md:ml-5">
                    <div>
                        <img
                            src={icon}
                            alt=""
                            className="w-[50px] md:w-[60px] rounded-md"
                        />
                    </div>
                    <div>
                        <p className="uppercase text-3xl font-bold">
                            Language
                        </p>
                        <p className="text-2xl uppercase font-bold">
                            Master
                        </p>
                    </div>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navOptions}</ul>
            </div>
            <div className="navbar-end md:gap-4 flex items-center content-center">
                <div className="hidden md:block">
                    <label className="swap mt-0 ">
                        <input
                            type="checkbox"
                            className="w-full"
                            onChange={handleToggle}
                        />
                        <div className="swap-on  btn font-semibold text-center">
                            Light
                        </div>
                        <div className="swap-off  btn font-semibold text-center">
                            Dark
                        </div>
                    </label>
                </div>
                <>
                    {" "}
                    {user ? (
                        <div className="flex items-center gap-1 md:gap-3 md:mr-5">
                            <img
                                src={user.photoURL}
                                alt=""
                                className="w-[50px] h-[50px] rounded-full"
                            />
                            <button
                                onClick={handleLogout}
                                className="uppercase btn btn-warning mt-0"
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">
                                <button className="uppercase btn btn-warning md:mr-5 mt-0">
                                    Log In
                                </button>
                            </Link>
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default Navbar;

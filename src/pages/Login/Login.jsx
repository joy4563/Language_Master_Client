import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders";

const Login = () => {
    const { signIn, googleSignIn, gitHubSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const [errors, setErrors] = useState("");

    const handleLogIn = (event) => {
        event.preventDefault();
        setErrors("");
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then((result) => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                form.reset();
                navigate(from);
            })
            .catch((error) => {
                setErrors(error.message);
                // console.log(error);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const currentUser = result.user;
                navigate(from);
                // console.log(currentUser);
            })
            .catch((error) => {
                // console.log("error", error.message);
                setErrors(error.message);
            });
        // console.log(user);
    };

    const handleGitHubSignIn = () => {
        gitHubSignIn()
            .then((result) => {
                const currentUser = result.user;
                // console.log(currentUser);
                navigate(from);
            })
            .catch((error) => {
                // console.log("error", error.message);
                setErrors(error.message);
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold">Login now !</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="form-control mt-6 mx-2">
                        <button
                            className="btn bg-green-500"
                            onClick={handleGoogleSignIn}
                        >
                            <span className="mr-2">
                                <FaGoogle></FaGoogle>
                            </span>{" "}
                            Log In with Google
                        </button>
                    </div>

                    <div className="form-control my-6 mx-2 ">
                        <button
                            className="btn bg-gray-700"
                            onClick={handleGitHubSignIn}
                        >
                            <span className="mr-2">
                                <FaGithub></FaGithub>
                            </span>
                            Log In with GitHub
                        </button>
                    </div>
                    <form onSubmit={handleLogIn} className="card-body">
                        <div className="form-control">
                            <hr />
                            <p className=" text-center text-2xl my-2 font-extrabold">
                                OR
                            </p>

                            <hr />
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <input
                                required
                                type={show ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                            />
                            <p onClick={() => setShow(!show)}>
                                <small>
                                    {show ? (
                                        <span>Hide Password</span>
                                    ) : (
                                        <span>show Password</span>
                                    )}
                                </small>
                            </p>
                            <p className="mt-3">
                                New here?{" "}
                                <span className="text-blue-800 font-bold text-lg">
                                    <Link to="/register"> Register now!</Link>
                                </span>
                            </p>
                        </div>
                        <div className="form-control mt-6">
                            {" "}
                            <p className="text-red-500 font-semibold ">
                                {errors}
                            </p>
                            <button className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 mt-7">
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

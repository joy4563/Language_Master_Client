import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";

const Register = () => {
    const { user, createUser } = useContext(AuthContext);
    const [errors, setErrors] = useState("");
    // console.log(user?.displayName);
    const [show, setShow] = useState(false);
    const [reShow, setReTypeShow] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        setErrors("");

        const form = event.target;
        const email = form.email.value;
        const name = form.name.value;
        const URL = form.photoURL.value;
        const password = form.password.value;
        const reTypePassword = form.reTypePassword.value;
        const saveUser = { email, name, URL };
        // console.log(email, name, password, URL);

        if (password.length < 6) {
            setErrors("Password at least 6 chaaracter");
            return;
        }
        else if (reTypePassword != password) {
            setErrors("Password Doesn't match.");
            return;
        } else {
            createUser(email, password, name)
                .then((result) => {
                    const loggedUser = result.user;
                    loggedUser.displayName = name;
                    loggedUser.photoURL = URL;
                    // console.log(loggedUser);
                    form.reset();
                    navigate("/");
                })
                .catch((error) => {
                    // console.log(error);
                    setErrors(error.message);
                });
            fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(saveUser),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    //   if (data.insertedId) {
                    //       reset();
                    //       Swal.fire({
                    //           position: "top-end",
                    //           icon: "success",
                    //           title: "User created successfully.",
                    //           showConfirmButton: false,
                    //           timer: 1500,
                    //       });
                    //       navigate("/");
                    //   }
                });
        }
    };
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold">Register now !</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
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
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Photo URL
                                    </span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="photoURL"
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                />
                            </div>
                            {/* password section */}
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
                                <label className="label my-1">
                                    <span className="label-text">
                                        Retype Password
                                    </span>
                                </label>
                                <input
                                    required
                                    type={reShow ? "text" : "password"}
                                    name="reTypePassword"
                                    placeholder="Retype Password"
                                    className="input input-bordered"
                                />
                                <p onClick={() => setReTypeShow(!reShow)}>
                                    <small>
                                        {reShow ? (
                                            <span>Hide Password</span>
                                        ) : (
                                            <span>show Password</span>
                                        )}
                                    </small>
                                </p>
                                <label className="my-2 ">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="label-text-alt link link-hover"
                                    >
                                        <span className="text-blue-800 font-bold text-lg">
                                            Log in now!
                                        </span>
                                    </Link>
                                </label>
                            </div>
                            <p className="text-red-500 font-semibold ">
                                {errors}
                            </p>
                            <div className="form-control mt-6">
                                <button className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500hover:to-yellow-500">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>{" "}
        </div>
    );
};

export default Register;

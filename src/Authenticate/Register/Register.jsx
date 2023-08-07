import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useTitle from "../../Hooks/useTitle";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { createUser } = useAuth();
    const navigate = useNavigate();
    useTitle("Register");

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            return;
        }
        createUser(data.email, data.password).then((result) => {
            const saveUser = { name: data.name, email: data.email };
            const loggedUser = result.user;
            // console.log(loggedUser);
            updateUserData(loggedUser, data.name, data.photoUrl);
            fetch("https://language-master-server-omega.vercel.app/users", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(saveUser),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        reset();
                        Swal.fire({
                            title: "Register Successful",
                            showClass: {
                                popup: "animate__animated animate__fadeInDown",
                            },
                            hideClass: {
                                popup: "animate__animated animate__fadeOutUp",
                            },
                        });
                        navigate("/");
                    }
                });
        });
    };

    const updateUserData = (user, name, photo) => {
        updateProfile(user, {
            displayName: name,
            photoURL: photo,
        }).then(() => {
            // console.log("User Profile Updated");
        });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card  max-w-sm shadow-2xl bg-gray-300 ">
                    <div className="text-center mx-auto  pt-5">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body my-0 mx-5 md:mx-10"
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                {...register("name", { required: true })}
                                placeholder="Name"
                                className="input input-bordered w-64"
                            />
                            {errors.name && (
                                <span className="text-red-600">
                                    Name is required
                                </span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photoUrl"
                                {...register("photoUrl", { required: true })}
                                placeholder="Photo Url"
                                className="input input-bordered w-64"
                            />
                            {errors.name && (
                                <span className="text-red-600">
                                    photoUrl is required
                                </span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                {...register("email", { required: true })}
                                placeholder="Email"
                                className="input input-bordered w-64"
                            />
                            {errors.email && (
                                <span className="text-red-600">
                                    Email is required
                                </span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: new RegExp(
                                        /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])/
                                    ),
                                })}
                                placeholder="Password"
                                className="input input-bordered w-64"
                            />
                            {errors.password?.type === "required" && (
                                <p className="text-red-600">
                                    Password is required
                                </p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-600">
                                    Minimum six characters are required
                                </p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-600">
                                    Password must have one Capital letter and
                                    one special Character
                                </p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                {...register("confirmPassword", {
                                    required: true,
                                })}
                                placeholder="Confirm Password"
                                className="input input-bordered w-64"
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-600">
                                    Confirm Password is required
                                </span>
                            )}
                        </div>

                        <div className="form-control mt-6">
                            <input
                                className="btn btn-primary uppercase w-64"
                                type="submit"
                                value="Sign Up"
                            />
                        </div>
                    </form>
                    <p className="text-center mb-5">
                        <small>Already Have an Account? </small>
                        <br />
                        <Link to="/login" className="uppercase text-orange-600">
                            Go to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

import React from "react";
import { Link, useRouteError } from "react-router-dom";
import errorImg from "../../assets/404.gif";

const ErrorPage = () => {
    const { error, status } = useRouteError();
    return (
        <section className="lg:flex items-center h-screen p-16 bg-red-200 text-gray-900 ">
            <img className=" rounded-lg h-[80vh]" src={errorImg} alt="" />

            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <Link to="/" className="btn">
                        Back to homepage
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;

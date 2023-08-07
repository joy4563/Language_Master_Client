import websiteImg from "../../assets/language_icon.jpg";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="mt-8">
            <footer className="bg-black rounded-md text-gray-300 p-8">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div>
                            <img src={websiteImg} alt="" className="h-[60px] w-[60px] rounded-md"/>
                            <h2 className="text-2xl font-extrabold mb-4">
                                Language Master
                            </h2>
                        </div>
                        <p className="text-sm">
                            "Unlock your linguistic potential and gain fluency
                            in multiple languages through our user-friendly
                            platform. Join our community of language enthusiasts
                            and embark on a journey of cultural exploration and
                            effective language acquisition."
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <h2 className="text-lg font-bold mb-4">Contact</h2>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm hover:text-white"
                                >
                                    Email: joy@gmail.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm hover:text-white"
                                >
                                    Phone: +01712345678
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm hover:text-white"
                                >
                                    Address: Dumuria, Khulna, Bangladesh
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <h2 className="text-lg font-bold mb-4">Resources</h2>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm hover:text-white"
                                >
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm hover:text-white"
                                >
                                    Tutorials
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm hover:text-white"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <h2 className="text-lg font-bold mb-4">Connect</h2>
                        <ul className="flex space-x-4">
                            <li>
                                <a
                                    href="#"
                                    className="text-lg hover:text-white"
                                >
                                    <span>
                                        <FaFacebook></FaFacebook>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-lg hover:text-white"
                                >
                                    <FaTwitter></FaTwitter>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-lg hover:text-white"
                                >
                                    <FaInstagram></FaInstagram>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-lg hover:text-white"
                                >
                                    <FaLinkedin></FaLinkedin>{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm">
                        © 2023 All rights reserved to JOY MONDAL.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
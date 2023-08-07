import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useTitle from "../Hooks/useTitle";

const MyClass = () => {
    useTitle("My Class");
    const [classes, setClasses] = useState([]);
    const { user } = useAuth();
    const url = `https://language-master-server-omega.vercel.app/specific?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setClasses(data));
    }, [url]);

    return (
        <div className="mt-16 mx-4 gap-5  rounded-xl ">
            {classes.map((oneClass) => (
                <div
                    key={oneClass._id}
                    className="border border-gray-800 bg-sky-200 rounded-xl mb-10 shadow-2xl"
                >
                    <div className="grid grid-cols-2 items-center p-5">
                        <div>
                            <p className="text-2xl  pb-3">
                                <span className="text-3xl font-semibold mr-2">
                                    Course Name:
                                </span>
                                {oneClass.className}
                            </p>
                            <p className="text-4xl font-semibold pb-3">
                                {oneClass.instructorName}
                            </p>
                            <p className="text-xl pb-3">
                                <span className="text-2xl font-semibold mr-2">
                                    Email:
                                </span>
                                {oneClass.instructorEmail}
                            </p>
                            <p className="text-xl pb-3">
                                <span className="text-2xl font-semibold mr-2">
                                    Available Seats:
                                </span>
                                {oneClass.availableSeat}
                            </p>
                            <p className="text-xl pb-3">
                                {" "}
                                <span className="text-2xl font-semibold mr-2">
                                    Enrolled Student:
                                </span>{" "}
                                {oneClass.enrolledNumber}
                            </p>
                            <p className="text-xl pb-3">
                                <span className="text-2xl font-semibold mr-2">
                                    Price:
                                </span>{" "}
                                {oneClass.price} tk
                            </p>
                            <p className="text-xl pb-3">
                                <span className="text-2xl font-semibold mr-2">
                                    Status:
                                </span>{" "}
                                {oneClass.status}
                            </p>
                            {oneClass.feedback && (
                                <p className="text-xl pb-3">
                                    Feedback: {oneClass.feedback}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img
                                src={oneClass.classImage}
                                alt=""
                                className="w-[400px] rounded-xl py-5"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyClass;

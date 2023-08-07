import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useTitle from "../Hooks/useTitle";

const EnrolledClass = () => {
    useTitle("Enrolled Class");

    const [enrollClasses, setEnrollClasses] = useState([]);
    const { user } = useAuth();
    const url = `https://language-master-server-omega.vercel.app/payments/specific?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setEnrollClasses(data));
    }, [url]);

    return (
        <div className="p-10 gap-5">
            <h2 className="text-3xl font-semibold my-4 text-center">
                You Have Enrolled {enrollClasses.length} classes
            </h2>
            <div>
                {enrollClasses.map((oneClass) => (
                    <div
                        key={oneClass._id}
                        className="border border-gray-800 rounded-xl mb-10 shadow-2xl bg-sky-200"
                    >
                        <div className="grid grid-cols-2 items-center p-5">
                            <div>
                                <p className="text-2xl  pb-3">
                                    <span className="text-3xl font-semibold pb-3 mr-3">
                                        Class Name:
                                    </span>{" "}
                                    {oneClass.className}
                                </p>
                                <p className="text-2xl  pb-3">
                                    <span className="text-3xl font-semibold pb-3 mr-3">
                                        Instructor Name:
                                    </span>
                                    {oneClass.instructorName}
                                </p>
                                <p className="text-2xl pb-3">
                                    <span className="text-3xl font-semibold pb-3 mr-3">
                                        Price:
                                    </span>
                                    {oneClass.price} tk
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    src={oneClass.classImage}
                                    alt=""
                                    className="w-[400px] rounded-lg py-5"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnrolledClass;

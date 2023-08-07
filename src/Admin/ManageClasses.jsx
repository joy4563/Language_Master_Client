import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useTitle from "../Hooks/useTitle";

const ManageClasses = () => {
    useTitle("Manage Classes");

    const { data: classes = [], refetch } = useQuery(["admin"], async () => {
        const res = await fetch(
            "https://language-master-server-omega.vercel.app/admin"
        );
        return res.json();
    });

    const handleMakeApproved = (id) => {
        fetch(
            `https://language-master-server-omega.vercel.app/admin/approved/${id}`,
            {
                method: "PATCH",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `This Class is Approved`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            });
    };

    const handleMakeRejected = (id) => {
        fetch(
            `https://language-master-server-omega.vercel.app/admin/rejected/${id}`,
            {
                method: "PATCH",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `This Class is Rejected`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            });
    };

    return (
        <div className="p-20 gap-5 ">
            {classes.map((oneClass) => (
                <div
                    key={oneClass._id}
                    className="border border-gray-200 rounded-xl mb-10 bg-slate-100 shadow-xl"
                >
                    <div className="grid grid-cols-2 items-center p-5">
                        <div>
                            <p className="text-2xl  pb-3">
                                <span className="text-3xl font-bold mr-2">
                                    Course Name:
                                </span>
                                {oneClass.className}
                            </p>
                            <p className="text-2xl  pb-3">
                                <span className="text-3xl font-bold mr-2">
                                    Instructor Name:
                                </span>
                                {oneClass.instructorName}
                            </p>
                            <p className="text-xl pb-3">
                                <span className="text-2xl font-bold mr-2">
                                    Email:
                                </span>{" "}
                                {oneClass.instructorEmail}
                            </p>
                            <p className="text-xl pb-3">
                                <span className="text-2xl font-bold mr-2">
                                    Available Seats:
                                </span>{" "}
                                {oneClass.availableSeat}
                            </p>
                            <p className="text-xl pb-3">
                                {" "}
                                <span className="text-2xl font-bold mr-2">
                                    Price:
                                </span>
                                {oneClass.price} TK
                            </p>
                            <p className="text-xl pb-3">
                                <span className="text-2xl font-bold mr-2">
                                    Status:
                                </span>{" "}
                                {oneClass.status}
                            </p>
                            <div className="flex">
                                <button
                                    onClick={() =>
                                        handleMakeApproved(oneClass._id)
                                    }
                                    disabled={
                                        oneClass.status === "Approved" ||
                                        oneClass.status == "Rejected"
                                    }
                                    className="btn btn-success mr-5"
                                >
                                    Accepted
                                </button>
                                <button
                                    onClick={() =>
                                        handleMakeRejected(oneClass._id)
                                    }
                                    disabled={
                                        oneClass.status === "Approved" ||
                                        oneClass.status == "Rejected"
                                    }
                                    className="btn btn-error mr-5"
                                >
                                    Rejected
                                </button>
                                <Link
                                    to={`/dashboard/feedback/${oneClass._id}`}
                                >
                                    <button className="btn btn-warning">
                                        Feedback
                                    </button>
                                </Link>
                            </div>
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

export default ManageClasses;

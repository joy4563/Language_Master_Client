import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useTitle from "../Hooks/useTitle";

const ManageUsers = () => {
    useTitle("Manage Users");

    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await fetch(
            "https://language-master-server-omega.vercel.app/users"
        );
        return res.json();
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(
                    `https://language-master-server-omega.vercel.app/users/${id}`,
                    {
                        method: "DELETE",
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                            refetch();
                        }
                    });
            }
        });
    };

    const handleMakeAdmin = (user) => {
        fetch(
            `https://language-master-server-omega.vercel.app/users/admin/${user._id}`,
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
                        title: `${user.name} is an ADMIN Now !`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            });
    };

    const handleMakeInstructor = (user) => {
        fetch(
            `https://language-master-server-omega.vercel.app/users/instructor/${user._id}`,
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
                        title: `${user.name} is an INSTRUCTOR Now !`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            });
    };

    return (
        <div className="w-full">
            <h3 className="text-3xl font-semibold my-4 text-center mt-10 mb-10">
                Total User: {users.length}
            </h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-2xl">#</th>
                            <th className="text-2xl">Name</th>
                            <th className="text-2xl">Email</th>
                            <th className="text-2xl">Admin Role</th>
                            <th className="text-2xl">Instructor Role</th>
                            <th className="text-2xl">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === "admin" ? (
                                        "ADMIN"
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleMakeAdmin(user)
                                            }
                                            className="btn btn-ghost p-5 bg-slate-300"
                                        >
                                            <FaUserShield></FaUserShield>
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {user.role === "instructor" ? (
                                        "INSTRUCTOR"
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleMakeInstructor(user)
                                            }
                                            className="btn btn-ghost p-5 bg-slate-300"
                                        >
                                            <FaChalkboardTeacher></FaChalkboardTeacher>
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn bg-red-400 hover:bg-red-600 p-5"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;

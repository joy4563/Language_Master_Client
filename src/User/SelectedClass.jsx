import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useTitle from "../Hooks/useTitle";

//TODO Delete
const SelectedClass = () => {
    const { user } = useAuth();
    useTitle("Selected Class");

    const { data: selectedClasses = [], refetch } = useQuery(
        ["admin"],
        async () => {
            const res = await fetch(
                `https://language-master-server-omega.vercel.app/selectedClass?email=${user?.email}`
            );
            return res.json();
        }
    );

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
                    `https://language-master-server-omega.vercel.app/payments/${id}`,
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

    return (
        <div className="w-full">
            <h3 className="text-3xl font-semibold my-4 text-center mt-10 mb-10">
                Total Selected Classes: {selectedClasses.length}
            </h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-2xl">#</th>
                            <th className="text-2xl">Name</th>
                            <th className="text-2xl">Price</th>
                            <th className="text-2xl">Action</th>
                            <th className="text-2xl">Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedClasses.map((user, index) => (
                            <tr key={user._id}>
                                <th className="text-xl font-semibold">
                                    {index + 1}
                                </th>
                                <td className="text-xl font-semibold">
                                    {user.className}
                                </td>
                                <td className="text-xl font-semibold">
                                    {user.price}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-error p-5"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <Link to="/dashboard/payment" state={user}>
                                        <button className="btn btn-success p-5">
                                            Payment
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClass;

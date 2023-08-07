import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import useInstructor from "../Hooks/useInstructor";

const ClassDisplay = ({ oneClass }) => {
    const isAdmin = useAdmin();
    const isInstructor = useInstructor();
    // console.log(isAdmin[0]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { classImage, className, instructorName, availableSeat, price, _id } =
        oneClass;

    const handleSubmit = () => {
        if (user) {
            const selectedItem = {
                classId: _id,
                classImage: classImage,
                className: className,
                email: user.email,
                instructorName: instructorName,
                price: price,
            };
            fetch(
                "https://language-master-server-omega.vercel.app/selectedClass",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(selectedItem),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Successfully Add Your Class",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
        } else {
            Swal.fire({
                title: "Please login to Select Class",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div>
            {
                <div
                    className={`card card-compact w-96 bg-base-100 shadow-xl ${
                        availableSeat == 0 ? "bg-red-700" : ""
                    }`}
                >
                    <figure>
                        <img
                            src={classImage}
                            alt=""
                            className="w-full h-[300px]"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="text-3xl text-center font-bold mb-4">
                            {className}
                        </h2>
                        <p className="text-xl  mb-2">
                            <span className=" font-semibold text-2xl">
                                Instructor Name:{" "}
                            </span>
                            {instructorName}
                        </p>
                        <p className="text-xl ">
                            <span className=" font-semibold text-2xl">
                                Available Seat:{" "}
                            </span>
                            {availableSeat}
                        </p>
                        <p className="text-xl ">
                            <span className=" font-semibold text-2xl">
                                Price:{" "}
                            </span>
                            {price} TK
                        </p>
                        <div className="card-actions justify-end">
                            <button
                                onClick={handleSubmit}
                                disabled={
                                    availableSeat == 0 ||
                                    isAdmin[0] == true ||
                                    isInstructor[0] == true
                                }
                                className="btn btn-success uppercase font-bold text-xl"
                            >
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ClassDisplay;

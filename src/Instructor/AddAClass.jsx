import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useTitle from "../Hooks/useTitle";

const AddAClass = () => {
    const { user } = useAuth();
    useTitle("Add A Class");
    // console.log(user);
    const handleClass = (event) => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const classImage = form.classImage.value;
        const insName = form.instructorName.value;
        const insEmail = form.instructorEmail.value;
        const availableSeat = form.availableSeat.value;
        const price = form.price.value;

        const classInfo = {
            className: className,
            classImage: classImage,
            instructorName: insName,
            instructorEmail: insEmail,
            availableSeat: parseInt(availableSeat),
            price: price,
            status: "pending",
        };

        console.log(classInfo);
        fetch("https://language-master-server-omega.vercel.app/admin", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(classInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    form.reset();
                    Swal.fire({
                        title: "SuccessFully Add Your Class And Waiting For Admin Approval",
                        showClass: {
                            popup: "animate__animated animate__fadeInDown",
                        },
                        hideClass: {
                            popup: "animate__animated animate__fadeOutUp",
                        },
                    });
                }
            });
    };
    return (
        <div className="bg-sky-300 mt-7">
            <h2 className="pt-6  text-center text-3xl">
                Please Add Your Class
            </h2>
            <form onSubmit={handleClass}>
                <div className="flex justify-around gap-20 my-6">
                    <div className="form-control">
                        <input
                            type="text"
                            name="className"
                            placeholder="Enter Class Name"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <input
                            type="text"
                            name="classImage"
                            placeholder="Enter Class Image Url"
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <div className="flex justify-around gap-20 my-6">
                    <div className="form-control">
                        <input
                            type="text"
                            name="instructorName"
                            defaultValue={user.displayName}
                            placeholder="Enter Instructor Name"
                            className="input input-bordered"
                            readOnly
                        />
                    </div>
                    <div className="form-control">
                        <input
                            type="text"
                            name="instructorEmail"
                            defaultValue={user.email}
                            placeholder="Enter Instructor Email"
                            className="input input-bordered"
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex justify-around gap-20 my-6">
                    <div className="form-control">
                        <input
                            type="text"
                            name="availableSeat"
                            placeholder="Enter Available Seat"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <input
                            type="text"
                            name="price"
                            placeholder="Enter Price"
                            className="input input-bordered"
                        />
                    </div>
                </div>
                <div className="text-center my-6 pb-20">
                    <button className="btn bg-sky-400 hover:bg-sky-700 ">
                        Add Class
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAClass;

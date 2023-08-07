import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useTitle from "../Hooks/useTitle";
//#TODo
const Feedback = () => {
    const id = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    useTitle("Feedback");

    const handleFeedback = (event) => {
        event.preventDefault();
        const form = event.target;
        const feedback = form.feedback.value;

        const giveFeedback = {
            feedback: feedback,
        };
        fetch(
            `https://language-master-server-omega.vercel.app/admin/feedback/${id.id}`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(giveFeedback),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Feedback Successfully Send`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/dashboard/manageClass");
                    form.reset();
                }
            });
    };

    return (
        <div className="flex flex-col items-center justify-center mt-32">
            <h2 className="text-5xl text-blue-700 mb-5">
                Hi!! {user.displayName}
            </h2>
            <h2 className="text-2xl mb-10">Please Give Your Feedback</h2>
            <form onSubmit={handleFeedback}>
                <div className="form-control">
                    <input
                        type="text"
                        name="feedback"
                        placeholder="Give Your Feedback"
                        className="input input-bordered"
                    />
                </div>
                <div className="form-control mt-6">
                    <input
                        className="btn btn-primary uppercase"
                        type="submit"
                        value="Send Feedback"
                    />
                </div>
            </form>
        </div>
    );
};

export default Feedback;

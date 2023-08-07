import useAuth from "../../Hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        loginWithGoogle().then((result) => {
            const loggedUser = result.user;
            // console.log(loggedUser);
            const saveUser = {
                name: loggedUser.displayName,
                email: loggedUser.email,
            };
            fetch("https://language-master-server-omega.vercel.app/users", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(saveUser),
            })
                .then((res) => res.json())
                .then(() => {
                    navigate(from, { replace: true });
                });
        });
    };

    return (
        <div>
            <div className="divider"></div>
            <div className="w-full text-center my-5">
                <button
                    onClick={handleGoogleLogin}
                    className="btn bg-green-500 hover:bg-red-500"
                >
                    <FaGoogle></FaGoogle> Login with google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;

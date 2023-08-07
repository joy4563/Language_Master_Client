import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "https://language-master-server-omega.vercel.app",
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (
                    error.response &&
                    (error.response.status === 401 ||
                        error.response.status === 403)
                ) {
                    await logOut();
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, navigate]);

    return [axiosSecure];
};

export default useAxiosSecure;

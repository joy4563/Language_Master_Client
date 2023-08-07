import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useTitle from "../Hooks/useTitle";

const PaymentHistory = () => {
    useTitle("Payment History");

    const [paymentHistory, setPaymentHistory] = useState([]);
    const { user } = useAuth();
    const url = `https://language-master-server-omega.vercel.app/payments/history?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setPaymentHistory(data));
    }, [url]);

    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-3xl font-semibold my-4 text-center mt-10 mb-10">
                Payment History
            </h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-2xl">#</th>
                            <th className="text-2xl text-center">Date</th>
                            <th className="text-2xl text-center">
                                Transaction ID
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((user, index) => (
                            <tr key={user._id}>
                                <th className="text-xl font-semibold">
                                    {index + 1}
                                </th>
                                <td className="text-xl font-semibold">
                                    {user.date}
                                </td>
                                <td className="text-xl font-semibold">
                                    {user.transactionId}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;

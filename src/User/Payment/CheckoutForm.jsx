import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import "./CheckoutForm.css";

const CheckoutForm = ({ price, classInfo }) => {
    const [cardError, setCardError] = useState("");
    const [axiosSecure] = useAxiosSecure();
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post("/create-payment-intent", { price })
                .then((res) => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        if (error) {
            // console.log("error", error);
            setCardError(error.message);
        } else {
            setCardError("");
            // console.log("payment method", paymentMethod);
        }
        setProcessing(true);
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "unknown",
                        name: user?.displayName || "anonymous",
                    },
                },
            });
        if (confirmError) {
            // console.log(confirmError);
        }
        // console.log("payment intent", paymentIntent);
        setProcessing(false);
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                date: new Date(),
                classId: classInfo.classId,
                className: classInfo.className,
                classImage: classInfo.classImage,
                instructorName: classInfo.instructorName,
                price: classInfo.price,
            };
            fetch(
                `https://language-master-server-omega.vercel.app/payments/update/${classInfo.classId}`,
                {
                    method: "PATCH",
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    // console.log("Update Complete");
                    if (data.modifiedCount > 0) {
                        fetch(
                            `https://language-master-server-omega.vercel.app/payments/${classInfo._id}`,
                            {
                                method: "DELETE",
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                // console.log("Delete Complete");
                                if (data.deletedCount > 0) {
                                    axiosSecure
                                        .post("/payments", payment)
                                        .then((res) => {
                                            // console.log("Post complete");
                                            if (res.data.insertedId) {
                                                Swal.fire({
                                                    title: "Payment Successful",
                                                    showClass: {
                                                        popup: "animate__animated animate__fadeInDown",
                                                    },
                                                    hideClass: {
                                                        popup: "animate__animated animate__fadeOutUp",
                                                    },
                                                });
                                            }
                                        });
                                }
                            });
                    }
                });
        }
    };

    return (
        <>
            <form className="w-2/3 m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-success btn-sm mt-4 text-xl"
                    disabled={!stripe || !clientSecret || processing}
                    type="submit"
                >
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
            {transactionId && (
                <p className="text-red-500 ml-8 text-3xl">
                    Transaction complete with transactionId: {transactionId}
                </p>
            )}
        </>
    );
};

export default CheckoutForm;

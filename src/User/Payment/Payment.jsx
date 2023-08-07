import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
    useTitle("Payment");

    const location = useLocation();
    const classInfo = location.state;
    // console.log(classInfo);
    const price = classInfo.price;

    return (
        <div className="bg-slate-400 p-11 mt-20">
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    price={price}
                    classInfo={classInfo}
                ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;

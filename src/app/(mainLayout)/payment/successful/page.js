import PaymentSuccessComponent from "@/components/payment/Success";
import { Suspense } from "react";

const PaymentSuccess = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentSuccessComponent />
        </Suspense>
    )
}

export default PaymentSuccess;

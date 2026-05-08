import PaymentErrorComponent from "@/components/payment/Error";
import { Suspense } from "react";

const PaymentError = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentErrorComponent />
        </Suspense>
    )
}

export default PaymentError;

import { setIsPremium } from "../reducers/buyPremiumSlice";
import { BUY_PREMIUM_ENDPOINT, UPDATE_PREMIUM_ENDPOINT } from "../../constant/apiEndpoints";
import axios from "axios";

const buyPremiumAction = (token) => {
    return async (dispatch) => {

        try {
            const { data } = await axios.post(
                BUY_PREMIUM_ENDPOINT,
                {},
                {
                    headers: { token: token },
                }
            );


            const options = {
                key: data.key_id,
                order_id: data.order.id,
                handler: async (response) => {
                    try {
                        await axios.post(
                            UPDATE_PREMIUM_ENDPOINT,
                            {
                                order_id: options.order_id,
                                payment_id: response.razorpay_payment_id,
                            },
                            { headers: { token: token } }
                        );
                        dispatch(setIsPremium())
                        alert("You are now a premium member");

                    } catch (error) {
                        console.log(error);
                    }
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
            rzp1.on("payment.failed", (res) => {
                alert("Something went wrong");
            });

        } catch (error) {
            console.log(error);
        }
    }
}


export default buyPremiumAction
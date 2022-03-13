import { useState, useEffect } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { useHistory } from 'react-router'

const KEY = "pk_test_51KcYJNCVp5pDCbxWIrm8fLJRKQMlECs4D01qqB4DvmghN9Qe2NiMj9LD3BzU4AMiMllIwgDDrzEUmyB9HtSCTbA500wNfB1e4z"

const Pay = () => {
    const [ stripeToken, setStripeToken ] = useState(null)
    

    const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/checkout/payment", 
                    {
                        tokenId: stripeToken.id,
                        amount: 50
                    }
                )
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        stripeToken && makeRequest()
    }, [stripeToken])

    return (
        <div
            style={{ 
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {stripeToken ? (<span>Processing . Please Wait</span>) : (

                <StripeCheckout
                    name="E-Commerce Shop"
                    image="https://avatars.githubusercontent.com/u/72106126?s=400&v=4"
                    billingAddress
                    shippingAddress
                    description="your total is Rp 50.000"
                    amount={50}
                    token={onToken}
                    stripeKey={KEY}
                    >
                    <button
                        style={{ 
                            border: 'none',
                            width: 120,
                            borderRadius: 5,
                            padding: '20px',
                            backgroundColor: 'black',
                            color: 'white',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                        >
                        Pay Now
                    </button>
                </StripeCheckout>
            )}
        </div>
    )
}

export default Pay
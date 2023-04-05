import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useRouter } from 'next/router';
//@ts-ignore
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntent, setPaymentIntent] = useState('');

    const [amount, setAmount] = useState(0);
    const [promptId, setyPromptId] = useState(router.query.promptId)

    useEffect(() => {
        if (router?.query?.amount) {
            //@ts-ignore
            const amountVal = ((router.query.amount).split('$')[0]) * 100
            setAmount(amountVal)
        }
        if (router?.query?.promptId) {
            setyPromptId(router?.query?.promptId)
        }

    }, [router.query, amount])

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads using our local API
        if (amount > 0)
            fetch('api/stripe_intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amount,
                    payment_intent_id: '',
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setClientSecret(data.client_secret), setPaymentIntent(data.id);
                });
    }, [amount]);

    const appearance = {
        theme: 'stripe',
        labels: 'floating',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            <Head>
                <title>Stripe Elements</title>
            </Head>
            <h1 className="text-2xl bold mb-4 mt-4 text-center">
                Accept payments with credit card
            </h1>
            {clientSecret && (
                <div className='m-10'>
                    <Elements options={options as StripeElementsOptions} stripe={stripe}>
                        <CheckoutForm amount={router.query.amount} promptId={promptId} paymentIntent={paymentIntent} />
                    </Elements>

                </div>
            )}
        </div>
    );
}

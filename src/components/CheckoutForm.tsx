//@ts-nocheck
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { UserContext } from '@/contexts/UserContext';
import { GetPromptPurchaseByUserId, InsertPurchasePromptUrl } from '@/utils/apis';
import axios from 'axios';

export default function Form({ amount, promptId }: any) {
  const [email, setEmail] = useState('');
  const [locAmount, setLocAmount] = useState(amount);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useContext(UserContext)


  useEffect(() => {
    if (!stripe) {
      return;
    }

    //Grab the client secret from url params
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: ChangeEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log('not loaded');
      // Stripe.js has not yet loaded.
      return;
    }
    setIsLoading(true);

    if (currentUser && currentUser._id && promptId) {
      const { data } = await axios.get(`${GetPromptPurchaseByUserId}/${currentUser._id}/${promptId}`)
      console.log(data, 'dacd');

      if (!data.length) {

        stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: 'http://localhost:3000/marketplace',
            receipt_email: email,
            shipping: {
              address: { city: 'NY' },
              name: 'Shipping user',
            },
            payment_method_data: {
              billing_details: {
                name: currentUser.username,
              },
            },
          },
        }).then(async function (result) {
          if (result.error) {
            if (result.error.type === 'card_error' || result.error.type === 'validation_error') {
              setMessage(result.error.message);
            } else {
              setMessage('An unexpected error occured.');
            }
            setIsLoading(false);
          }
          else {
            await axios.post(InsertPurchasePromptUrl, {
              buyerId: currentUser._id,
              promptId: promptId
            })
          }
          setIsLoading(false);
        });
        await axios.post(InsertPurchasePromptUrl, {
          buyerId: currentUser._id,
          promptId: promptId
        })
      }
      else {
        alert('already purchased by you')
      }
      setIsLoading(false);

    }
  };

  return (
    <>
      <form className="m-10" id="payment-form" onSubmit={handleSubmit} className="m-auto">
        <div className="mb-3">
          Cart Total:
          <input
            id="amount"
            type="text"
            value={locAmount}
            className="block
            w-full
            rounded-md
            border-gray-300
            shadow-sm h-16 text-black"
            placeholder="Cart Total"
            readOnly
          />
        </div>
        <div className="mb-6">
          Email address:
          <input
            className="block
            w-full
            rounded-md
            border-gray-300
            shadow-sm h-16 text-black"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </div>
        <PaymentElement id="payment-element" />
        <button
          className="elements-style-background"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}

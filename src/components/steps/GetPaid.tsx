import { useState } from "react";

//@ts-nocheck
export default function GetPaid() {
  const [country, setCountry] = useState('Austria');
  return (
    <div className="grow flex flex-col items-center pt-32">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-2">Get Paid</h2>
        <p className=" mb-12">
          Connect your Bank account with Stripe to start receiving payments from
          every sale of your Prompt.
        </p>
        <h4 className="mb-2 leading-5 font-semibold">Country of residence</h4>
        <p className=" mb-2 text-sm italic opacity-80">
          We need to know this for sending payouts. Please read our FAQ if your
          country does not appear here.
        </p>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-6 py-4 bg-[#FFFFFF4D] rounded-md outline-none focus-within:text-zinc-500">
          <option>Australia</option>
          <option>Austria</option>
          <option>Belgium</option>
          <option>Brazil</option>
          <option>Bulgaria</option>
          <option>Canada</option>
          <option>Croatia</option>
          <option>Cyprus</option>
          <option>Czech Republic</option>
          <option>Denmark</option>
          <option>Estonia</option>
          <option>Finland</option>
          <option>France</option>
          <option>Germany</option>
          <option>Gibraltar</option>
          <option>Greece</option>
          <option>Hong Kong</option>
          <option>Hungary</option>
          <option>India</option>
          <option>Indonesia</option>
          <option>Ireland</option>
          <option>Italy</option>
          <option>Japan</option>
          <option>Latvia</option>
          <option>Liechtenstein</option>
          <option>Lithuania</option>
          <option>Luxembourg</option>
          <option>Malaysia</option>
          <option>Malta</option>
          <option>Mexico</option>
          <option>Netherlands</option>
          <option>New Zealand</option>
          <option>Norway</option>
          <option>Poland</option>
          <option>Portugal</option>
          <option>Romania</option>
          <option>Singapore</option>
          <option>Slovakia</option>
          <option>Slovenia</option>
          <option>Spain</option>
          <option>Sweden</option>
          <option>Switzerland</option>
          <option>Thailand</option>
          <option>United Arab Emirates</option>
          <option>United Kingdom</option>
          <option>United States</option>
        </select>
      </div>
    </div>
  );
}

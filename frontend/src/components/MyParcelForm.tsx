"use client";

import React, { FormEvent, useState } from "react";

const MyParcelForm = () => {
  const [shipmentId, setShipmentId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const body = [
      {
        carrier: 1,
        options: { package_type: 1 },
        recipient: {
          cc: "NL",
          person: form.person.value,
          email: form.email.value,
          street: form.street.value,
          postal_code: form.postalCode.value,
          city: form.city.value,
        },
      },
    ];

    try {
      const res = await fetch(
        "https://my-parcel-backend.vercel.app/shipments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body }),
        }
      );

      const data = await res.json();

      setShipmentId(data?.data?.id);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="w-full max-w-xl border border-gray-400 rounded-xl p-5 shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-5">
        Create Shipment
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <input name="person" placeholder="Name" required />
          <input name="email" placeholder="Email" type="email" required />
        </div>

        <div className="flex gap-2 items-center">
          <input name="street" placeholder="Street" required />
          <input name="postalCode" placeholder="Postal Code" required />
        </div>

        <input name="city" placeholder="City" required />
        <button type="submit" className="mt-3">
          Submit
        </button>
      </form>

      {shipmentId && (
        <p className="mt-5">
          ✅ Shipment Created. ID:{" "}
          <span className="font-semibold">{shipmentId}</span>
        </p>
      )}
    </main>
  );
};

export default MyParcelForm;

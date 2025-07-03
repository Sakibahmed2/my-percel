"use client";

import { cn } from "@/utils/cn";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number | null;
}

const Coins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );

        const data = res.data;
        setCoins(data);
      } catch (err) {
        console.error("Error fetching coins:", err);
        setError("Failed to fetch crypto data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-xl border border-gray-400 rounded-xl p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Crypto Prices</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xl border border-gray-400 rounded-xl p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Crypto Prices</h2>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-xl border border-gray-400 rounded-xl p-5 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Crypto Prices</h2>

      <input
        type="text"
        placeholder="Search coin..."
        className="mb-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">24h %</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin, index) => (
                <tr key={coin.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex items-center gap-2">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={20}
                      height={20}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-xs text-gray-500 uppercase">
                        {coin.symbol}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td
                    className={cn(
                      "p-2 font-medium",
                      coin.price_change_percentage_24h &&
                        coin.price_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-500"
                    )}
                  >
                    {coin.price_change_percentage_24h
                      ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No coins found matching{" "}
                  <span className="text-red-500">{searchTerm}</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coins;

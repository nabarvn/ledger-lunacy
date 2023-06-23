"use client";

import { DataTable } from "@/components/data-table";
import { Columns } from "@/components/columns";

import { Transaction } from "@/lib/schema";
import { useState } from "react";
import { Loader } from "lucide-react";
import dataFetcher from "@/helpers/transactions";
import useSWR from "swr";

type SourceDescription = {
  description: string;
};

type DestinationDescription = {
  description: string;
};

type FilteredData = {
  activity_id: string;
  date: string;
  type: string;
  method?: string;
  amount: number;
  balance: number;
  source: SourceDescription;
  destination: DestinationDescription;
};

// Function to calculate the total balance
function calculateTotalBalance(data: Transaction[]) {
  let totalBalance = 0;

  for (const activity of data) {
    totalBalance += activity.amount;
  }

  return totalBalance;
}

const Ledger = () => {
  // State to control the balance display on the client
  const [displayBalance, setDisplayBalance] = useState(false);

  // Simulate a db read
  const { data } = useSWR("json", dataFetcher);

  // Filter the accessor keys (columns to be displayed in the table) and put them in a new array
  const filteredData = data?.transactions?.map((item: FilteredData) => {
    const {
      activity_id,
      date,
      type,
      method,
      amount,
      balance,
      source: { description: sourceDescription },
      destination: { description: destinationDescription },
    } = item;

    // Convert the incoming timestamp into a more human readable string
    const timestamp = new Date(date).toUTCString();

    return {
      txID: activity_id,
      timestamp,
      type,
      method,
      amount,
      balance,
      source: sourceDescription,
      destination: destinationDescription,
    };
  });

  // Create an array with no duplicate transaction IDs
  const uniqueArray: Transaction[] = Array.from(
    new Set(filteredData?.map((obj: Transaction) => obj.txID))
  ).map((activityId) => {
    return filteredData.find((obj: Transaction) => obj.txID === activityId);
  });

  // Incase one needs to sort the array in descending order
  // uniqueArray.sort((a, b) => b.txID - a.txID);

  // Call a designated function with the unique data as an argument
  const totalBalance = calculateTotalBalance(uniqueArray);

  // Delay the display of balance by 1s to mimic a server data fetch
  setTimeout(() => {
    setDisplayBalance(true);
  }, 1000);

  return (
    <main className='container grid items-center py-5 mt-9'>
      <div className='flex justify-between text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-zinc-700/50 rounded-lg'>
        <div className='justify-center p-5'>
          <p className='text-3xl font-extrabold'>
            {displayBalance ? (
              `$${totalBalance}`
            ) : (
              <Loader className='h-9 w-9 animate-spin' />
            )}
          </p>

          <p className='text-xl'>Balance</p>
        </div>

        <div className='flex p-5'>
          <p className='text-3xl font-extrabold text-right self-start'>
            Investing Account
          </p>
        </div>
      </div>

      <div className='p-2 mt-9'>
        <h2 className='text-xl font-bold'>Your Transactions</h2>
      </div>

      {/* Render the Data Table */}
      <DataTable data={uniqueArray} columns={Columns} />
    </main>
  );
};

export default Ledger;

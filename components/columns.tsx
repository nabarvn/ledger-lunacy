"use client";

import { MoreHorizontal } from "lucide-react";
import { type ColumnDef } from "unstyled-table";
import { formatPrice } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Transaction } from "@/lib/schema";

export const Columns: ColumnDef<Transaction>[] = [
  {
    // Column for row selection
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
        }}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label='Select row'
      />
    ),
    // Disable column sorting for this column
    enableSorting: false,
    // Disable column hiding for this column
    enableHiding: false,
  },
  {
    // Column for transaction ID
    accessorKey: "txID",
    // Column header formatting
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='hover:text-accent-foreground'
        >
          Tx#
        </button>
      );
    },
  },
  {
    // Column for timestamp
    accessorKey: "timestamp",
    // Column header formatting
    header: "Timestamp",
    // Disable column filter for this column
    enableColumnFilter: false,
    // Disable sorting for this column
    enableSorting: false,
  },
  {
    // Column for method
    accessorKey: "method",
    header: "Method",
    // Optional display of cell value
    cell: ({ row }) => {
      if (!row.original.method) {
        return null;
      } else {
        return row.original.method;
      }
    },
    // Disable column filter for this column
    enableColumnFilter: false,
    // Disable sorting for this column
    enableSorting: false,
  },
  {
    // Column for source description
    accessorKey: "source",
    header: "Source",
    // Optional display of cell value
    cell: ({ row }) => {
      if (!row.original.source) {
        return null;
      } else {
        return row.original.source;
      }
    },
    // Disable column filter for this column
    enableColumnFilter: false,
    // Disable sorting for this column
    enableSorting: false,
  },
  {
    // Column for destination description
    accessorKey: "destination",
    header: "Destination",
    // Optional display of cell value
    cell: ({ row }) => {
      if (!row.original.destination) {
        return null;
      } else {
        return row.original.destination;
      }
    },
    // Disable column filter for this column
    enableColumnFilter: false,
    // Disable sorting for this column
    enableSorting: false,
  },
  {
    // Column for type
    accessorKey: "type",
    header: "Type",
    // Disable column filter for this column
    enableColumnFilter: false,
    // Disable sorting for this column
    enableSorting: false,
  },
  {
    // Column for amount
    accessorKey: "amount",
    header: "Amount",
    // Cell value formatting
    cell: ({ row }) => formatPrice(row.getValue("amount")),
    // Disable column filter for this column
    enableColumnFilter: false,
    // Disable sorting for this column
    enableSorting: false,
  },
  {
    // Column for balance
    accessorKey: "balance",
    // Column header formatting
    header: () => <span className='text-left'>Balance</span>,
    // Cell value formatting
    cell: ({ row }) => formatPrice(row.getValue("balance")),
    // Disable column filter for this column
    enableColumnFilter: false,
    // Disable sorting for this column
    enableSorting: false,
  },
  {
    // Column for row actions
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label='Open menu'
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(transaction.txID);
              }}
            >
              Copy transaction ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

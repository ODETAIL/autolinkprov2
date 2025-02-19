"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setCustomers } from "@/lib/features/customer/customerSlice";
import { convertDatesToISO } from "@/lib/util";

export default function InitCustomer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/customer");
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        const formattedCustomerData = convertDatesToISO(data);
        dispatch(setCustomers(formattedCustomerData));
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    fetchCustomers();
  }, [dispatch]);

  return null;
}

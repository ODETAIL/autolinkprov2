import { ServiceType } from "@prisma/client";

export enum StatusEnum {
  Draft = "Draft",
  Pending = "Pending",
  Paid = "Paid",
  Overdue = "Overdue",
}

export enum PaymentEnum {
  Debit = "Debit",
  Mastercard = "Mastercard",
  Cash = "Cash",
  Amex = "Amex",
  Visa = "Visa",
  Cheque = "Cheque",
  ETransfer = "E-transfer",
  Other = "Other",
}

export enum VehicleEnum {
  Suv = "Suv",
  Truck = "Truck",
  Sedan = "Sedan",
  Minivan = "Minivan",
  Convertible = "Convertible",
  Hatchback = "Hatchback",
  Coupe = "Coupe",
}

export enum ServiceEnum {
  Windshield = "Windshield",
  DoorGlass = "Door Glass",
  BackGlass = "Back Glass",
  Sunroof = "Sunroof",
  Mirror = "Mirror",
  QuarterGlass = "Quarter Glass",
  ChipSubscription = "Chip Subscription",
  Warranty = "Warranty",
}

export enum InvoiceEnum {
  A = "A",
  M = "M",
  O = "O",
}

export const ServiceTypeDisplayMap: Record<string, ServiceType> = {
  Windshield: ServiceType.Windshield,
  "Door Glass": ServiceType.DoorGlass,
  "Back Glass": ServiceType.BackGlass,
  Sunroof: ServiceType.Sunroof,
  Mirror: ServiceType.Mirror,
  "Quarter Glass": ServiceType.QuarterGlass,
  "Chip Subscription": ServiceType.ChipSubscription,
  Warranty: ServiceType.Warranty,
};

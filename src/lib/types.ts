export type UserRole = 'Admin' | 'Manager' | 'Clerk';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}

export type InvoiceStatus = 'Uploaded' | 'Parsing' | 'Awaiting Approval' | 'Committed' | 'Rejected';

export interface Invoice {
  id: string;
  vendor: string;
  uploadDate: string;
  status: InvoiceStatus;
  invoiceTotal: number;
}

export interface InvoiceLineItem {
  id: string;
  upc?: string;
  itemName: string;
  quantityCases?: number;
  quantityBottles?: number;
  unitPrice: number;
  totalPrice: number;
  vendorItemNumber?: string;
  flags: ('Price Delta' | 'Missing UPC')[];
}

export interface InventoryItem {
  id: string;
  upc: string;
  itemName: string;
  currentStock: number;
  lastPrice: number;
  vendor: string;
}

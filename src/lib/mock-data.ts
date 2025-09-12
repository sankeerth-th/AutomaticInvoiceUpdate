import { User, Invoice, InvoiceLineItem, InventoryItem } from './types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://picsum.photos/seed/user1/40/40',
  role: 'Manager',
};

export const mockOrgs = [
  { id: 'org-1', name: 'Downtown Liquors' },
  { id: 'org-2', name: 'Uptown Wines & Spirits' },
];

export const mockInvoices: Invoice[] = [
  { id: 'INV-001', vendor: 'Southern Glazer\'s', uploadDate: '2023-10-26', status: 'Committed', invoiceTotal: 1250.75 },
  { id: 'INV-002', vendor: 'RNDC', uploadDate: '2023-10-25', status: 'Awaiting Approval', invoiceTotal: 850.00 },
  { id: 'INV-003', vendor: 'Breakthru Beverage', uploadDate: '2023-10-24', status: 'Parsing', invoiceTotal: 2100.50 },
  { id: 'INV-004', vendor: 'Southern Glazer\'s', uploadDate: '2023-10-22', status: 'Rejected', invoiceTotal: 300.20 },
  { id: 'INV-005', vendor: 'RNDC', uploadDate: '2023-10-21', status: 'Uploaded', invoiceTotal: 540.00 },
];

export const mockLineItems: InvoiceLineItem[] = [
  { id: 'li-1', upc: '8954040822', itemName: 'Tito\'s Handmade Vodka 750ml', quantityCases: 2, quantityBottles: 12, unitPrice: 19.99, totalPrice: 239.88, flags: [] },
  { id: 'li-2', upc: '087116000302', itemName: 'Jameson Irish Whiskey 1L', quantityCases: 1, quantityBottles: 6, unitPrice: 24.50, totalPrice: 147.00, flags: ['Price Delta'] },
  { id: 'li-3', upc: undefined, itemName: 'Local Craft Beer IPA 4-pack', quantityCases: 5, unitPrice: 12.00, totalPrice: 60.00, flags: ['Missing UPC'] },
  { id: 'li-4', upc: '880000000000', itemName: 'Patron Silver Tequila 750ml', quantityBottles: 3, unitPrice: 45.00, totalPrice: 135.00, vendorItemNumber: 'PS750', flags: [] },
  { id: 'li-5', upc: '123456789012', itemName: 'Barefoot Pinot Grigio 1.5L', quantityCases: 2, quantityBottles: 12, unitPrice: 8.99, totalPrice: 107.88, flags: [] },
];

export const mockInventory: InventoryItem[] = [
  { id: 'inv-1', upc: '8954040822', itemName: 'Tito\'s Handmade Vodka 750ml', currentStock: 48, lastPrice: 19.99, vendor: 'Southern Glazer\'s' },
  { id: 'inv-2', upc: '087116000302', itemName: 'Jameson Irish Whiskey 1L', currentStock: 23, lastPrice: 24.50, vendor: 'RNDC' },
  { id: 'inv-3', upc: '088004021098', itemName: 'Jack Daniel\'s Old No. 7 750ml', currentStock: 60, lastPrice: 22.50, vendor: 'Breakthru Beverage' },
  { id: 'inv-4', upc: '880000000000', itemName: 'Patron Silver Tequila 750ml', currentStock: 15, lastPrice: 45.00, vendor: 'RNDC' },
  { id: 'inv-5', upc: '123456789012', itemName: 'Barefoot Pinot Grigio 1.5L', currentStock: 30, lastPrice: 8.99, vendor: 'Southern Glazer\'s' },
];

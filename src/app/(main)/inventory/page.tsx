import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryTable } from '@/components/inventory/inventory-table';

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-2xl font-bold">Inventory</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Master Inventory</CardTitle>
          <CardDescription>Search, filter, and manage your product inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <InventoryTable />
        </CardContent
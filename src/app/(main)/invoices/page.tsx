'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceList } from '@/components/invoices/invoice-list';
import { Upload } from 'lucide-react';
import { UploadInvoiceDialog } from '@/components/invoices/upload-invoice-dialog';
import { useState } from 'react';

export default function InvoicesPage() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="font-headline text-2xl font-bold">Invoices</h1>
          <Button onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Invoice
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Manage and review your vendor invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceList />
          </CardContent>
        </Card>
      </div>
      <UploadInvoiceDialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen} />
    </>
  );
}

import { InvoiceReviewTable } from '@/components/invoices/invoice-review-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockInvoices } from '@/lib/mock-data';
import { Check, X, Download } from 'lucide-react';
import Link from 'next/link';

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const invoice = mockInvoices.find((inv) => inv.id === params.id) || mockInvoices[1];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
            <Link href="/invoices" className="text-sm text-muted-foreground hover:underline">
                &larr; Back to Invoices
            </Link>
          <h1 className="font-headline text-2xl font-bold">
            Review Invoice <span className="text-primary">{invoice.id}</span>
          </h1>
          <p className="text-muted-foreground">
            From {invoice.vendor} on {invoice.uploadDate}
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Original
            </Button>
          <Button variant="destructive">
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Parsed Line Items</CardTitle>
          <CardDescription>
            Review and edit the parsed items below. Any discrepancies are flagged for your attention.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InvoiceReviewTable />
        </CardContent>
      </Card>
    </div>
  );
}

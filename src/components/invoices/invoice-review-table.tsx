'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { InvoiceLineItem } from '@/lib/types';
import { mockLineItems } from '@/lib/mock-data';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { GripVertical } from 'lucide-react';

export function InvoiceReviewTable() {
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>(mockLineItems);

  const handleInputChange = (
    id: string,
    field: keyof InvoiceLineItem,
    value: string | number
  ) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const renderCell = (item: InvoiceLineItem, field: keyof InvoiceLineItem) => {
    const isNumeric = ['quantityCases', 'quantityBottles', 'unitPrice', 'totalPrice'].includes(field);
    return (
      <Input
        type={isNumeric ? "number" : "text"}
        value={item[field] as string | number | undefined}
        onChange={(e) =>
          handleInputChange(item.id, field, isNumeric ? parseFloat(e.target.value) || 0 : e.target.value)
        }
        className="h-8"
      />
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[24px] p-2"></TableHead>
          <TableHead>UPC</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Qty Cases</TableHead>
          <TableHead>Qty Bottles</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Vendor Item #</TableHead>
          <TableHead>Flags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lineItems.map((item) => (
          <TableRow
            key={item.id}
            className={cn({
              'bg-red-500/10 hover:bg-red-500/15': item.flags.includes('Price Delta'),
              'bg-yellow-500/10 hover:bg-yellow-500/15': item.flags.includes('Missing UPC'),
            })}
          >
            <TableCell className="p-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 cursor-grab">
                <GripVertical className="h-4 w-4" />
              </Button>
            </TableCell>
            <TableCell>{renderCell(item, 'upc')}</TableCell>
            <TableCell className="min-w-[250px]">{renderCell(item, 'itemName')}</TableCell>
            <TableCell>{renderCell(item, 'quantityCases')}</TableCell>
            <TableCell>{renderCell(item, 'quantityBottles')}</TableCell>
            <TableCell>{renderCell(item, 'unitPrice')}</TableCell>
            <TableCell>{renderCell(item, 'totalPrice')}</TableCell>
            <TableCell>{renderCell(item, 'vendorItemNumber')}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                {item.flags.map((flag) => (
                  <Badge
                    key={flag}
                    variant={flag === 'Price Delta' ? 'destructive' : 'secondary'}
                    className={cn({
                      'bg-yellow-400 text-yellow-900 hover:bg-yellow-400/80': flag === 'Missing UPC'
                    })}
                  >
                    {flag}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

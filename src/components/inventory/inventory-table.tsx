'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { InventoryItem } from '@/lib/types';
import { MoreHorizontal, Search, FileDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { mockInventory } from '@/lib/mock-data';
import Link from 'next/link';

interface DataTableToolbarProps {
  table: any;
}

function DataTableToolbar({ table }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnVisibility.status === false;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter items..."
          value={(table.getColumn('itemName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('itemName')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/*  
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <Settings className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px]" align="end" side="right">
            <Command>
              <CommandList>
                <ScrollArea className="h-fit max-h-[200px] overflow-y-auto overscroll-contain">
                  {table
                    .getAllColumns()
                    .map((column) => {
                      if (column.getCanHide()) {
                        return (
                          <CommandItem
                            key={column.id}
                            onSelect={() => {
                              table.columnVisibility.toggle(column.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "[&_svg]:h-4 [&_svg]:w-4 mr-2",
                                column.getIsVisible()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {column.id}
                          </CommandItem>
                        )
                      }
                    })}
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        */}
      </div>
      <div className="flex items-center space-x-2">
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnVisibility()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <span className="sr-only">Reset column visibility</span>
          </Button>
        )}
        <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}

export function InventoryTable() {
  const inventory = mockInventory;
  const [search, setSearch] = useState('');

  const filteredInventory = inventory.filter(item =>
    item.itemName.toLowerCase().includes(search.toLowerCase()) ||
    item.upc.includes(search)
  );
  return (
    <>
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <Input
          id="search"
          placeholder="Search inventory..."
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
        <FileDown className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
    
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>UPC</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Current Stock</TableHead>
          <TableHead>Last Price</TableHead>
          <TableHead>Vendor</TableHead>
          <TableHead className="text-right">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredInventory.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.upc}</TableCell>
            <TableCell>{item.itemName}</TableCell>
            <TableCell>{item.currentStock}</TableCell>
            <TableCell>${item.lastPrice.toFixed(2)}</TableCell>
            <TableCell>{item.vendor}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="#">Update Stock</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}

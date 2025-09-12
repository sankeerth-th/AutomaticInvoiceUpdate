import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function VendorsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-headline text-2xl font-bold">Vendor & Rule Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Admin Control</CardTitle>
          <CardDescription>This section is for administrators only.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[300px]">
            <Users className="h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">Vendor Rules Editor</h2>
            <p className="mt-2 text-muted-foreground">
              Define vendor rules, normalization settings, and POS field mappings here.

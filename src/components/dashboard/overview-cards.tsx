import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, Archive, DollarSign } from 'lucide-react';

const overviewData = [
  {
    title: 'Invoices Processed',
    value: '1,250',
    icon: FileText,
    description: '+20.1% from last month',
  },
  {
    title: 'Pending Approvals',
    value: '12',
    icon: Clock,
    description: '3 waiting for more than 24h',
  },
  {
    title: 'Inventory Value',
    value: '$124,580',
    icon: DollarSign,
    description: '+2.5% from last month',
  },
  {
    title: 'Recent Price Changes',
    value: '89',
    icon: Archive,
    description: 'In the last 7 days',
  },
];

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

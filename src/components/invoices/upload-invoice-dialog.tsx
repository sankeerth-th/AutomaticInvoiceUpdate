'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, File, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadInvoiceDialog({ open, onOpenChange }: UploadInvoiceDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (isUploading) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            return prev;
          }
          return prev + 5;
        });
      }, 200);

      return () => clearInterval(timer);
    }
  }, [isUploading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleUpload = () => {
    if (files.length === 0) {
        toast({
            title: 'No files selected',
            description: 'Please select one or more invoice files to upload.',
            variant: 'destructive',
        });
        return;
    }
    setIsUploading(true);
    setProgress(5);
    // Simulate upload process
    setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
            toast({
                title: 'Upload Complete',
                description: `${files.length} invoice(s) are now being processed.`,
            });
            handleClose();
        }, 500);
    }, 4000);
  };

  const handleClose = () => {
    setFiles([]);
    setIsUploading(false);
    setProgress(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => {
        if (isUploading) e.preventDefault();
      }}>
        <DialogHeader>
          <DialogTitle className='font-headline'>Upload Invoices</DialogTitle>
          <DialogDescription>
            Drag and drop your invoice images or PDFs, or click to browse.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {files.length > 0 ? `${files.length} file(s) selected` : 'Drag & drop or click to upload'}
            </p>
            <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*,application/pdf" />
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Selected files:</h4>
              <ul className="space-y-1">
                {files.map((file, i) => (
                  <li key={i} className="flex items-center justify-between text-sm p-2 bg-secondary rounded-md">
                    <div className="flex items-center gap-2 truncate">
                      <File className="h-4 w-4 shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    {!isUploading && (
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFiles(files.filter(f => f.name !== file.name))}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Processing...</p>
              <Progress value={progress} />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Processing...' : `Upload ${files.length} file(s)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

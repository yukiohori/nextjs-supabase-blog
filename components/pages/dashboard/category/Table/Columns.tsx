'use client';

import type { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Eye,
  EyeOff,
  ImageOff,
  MoreHorizontal,
} from 'lucide-react';
import Image from 'next/legacy/image';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import type { Category } from '@/types/database';

type CategoryRow = Category & {
  delete: () => void;
  update: () => void;
  hide: () => void;
};

export const columns: ColumnDef<CategoryRow>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'image_url',
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {row.getValue('image_url') ? (
            <div className="relative h-16 w-24">
              <Image
                src={row.getValue('image_url')}
                alt={row.getValue('name')}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ) : (
            <ImageOff />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'show',
    header: () => <div className="text-center">Show Status</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {row.getValue('show') ? <Eye /> : <EyeOff />}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={row.original.update}>
              Edit Category
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={row.original.delete}>
              Delete Category
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={row.original.hide}>{`${
              row.getValue('show') ? 'Hide' : 'Show'
            } Category`}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet';
import { Category } from '../types';
import { Menu } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const CategoryList = () => (
    <ScrollArea className='h-[calc(100vh-4rem)]'>
      <div className='space-y-2 p-2'>
        <Button
          variant={selectedCategory === null ? 'secondary' : 'ghost'}
          className='w-full justify-start'
          onClick={() => {
            onSelectCategory(null);
            setIsOpen(false);
          }}
        >
          Sve Kategorije
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
            className='w-full justify-start'
            onClick={() => {
              onSelectCategory(category.id);
              setIsOpen(false);
            }}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='md:hidden bg-teal-50 border-2 border-teal-200'
          >
            <Menu className='h-4 w-4 text-teal-500' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-[240px] sm:w-[300px]'>
          <CategoryList />
        </SheetContent>
      </Sheet>
      <div className='hidden md:block w-[240px] flex-shrink-0'>
        <CategoryList />
      </div>
    </>
  );
}

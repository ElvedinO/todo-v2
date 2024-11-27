import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Category } from '../types';

interface CategoryFormProps {
  categories: Category[];
  onSubmit: (category: Category) => void;
  onUpdate: (category: Category) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export default function CategoryForm({
  categories,
  onSubmit,
  onUpdate,
  onDelete,
  onCancel,
}: CategoryFormProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      onUpdate({ ...editingCategory, name: newCategoryName });
      setEditingCategory(null);
    } else {
      onSubmit({ id: Date.now().toString(), name: newCategoryName });
    }
    setNewCategoryName('');
  };

  return (
    <div className='space-y-4 bg-white p-4 rounded-lg shadow absolute'>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <Input
          placeholder='Ime Kategorije'
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          required
        />
        <Button type='submit'>{editingCategory ? 'Spremi' : 'Dodaj'}</Button>
      </form>
      <ul className='space-y-2'>
        {categories.map((category) => (
          <li key={category.id} className='flex items-center justify-between'>
            <span>{category.name}</span>
            <div className='space-x-2'>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  setEditingCategory(category);
                  setNewCategoryName(category.name);
                }}
              >
                Uredi
              </Button>
              <Button
                size='sm'
                variant='destructive'
                onClick={() => onDelete(category.id)}
              >
                Obriši
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Button variant='outline' onClick={onCancel}>
        Zatvori
      </Button>
    </div>
  );
}

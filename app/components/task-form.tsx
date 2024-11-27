import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Task } from '../types';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  categoryId: string;
}

export default function TaskForm({
  task,
  onSubmit,
  onCancel,
  categoryId,
}: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: task?.id || Date.now().toString(),
      title,
      categoryId,
      status: task?.status || 'todo',
    });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='relative space-y-4 bg-white p-4 rounded-lg shadow'
      >
        <img
          src='/siluette.png'
          alt='Siluette'
          width={150}
          height={150}
          className='absolute -top-full left-1/2 -translate-x-1/2 -z-10 opacity-75'
        />

        <Input
          placeholder='Šta ti treba živote moj?'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className='space-x-2'>
          <Button type='submit'>{task ? 'Uredi' : 'Dodaj'}</Button>
          <Button type='button' variant='outline' onClick={onCancel}>
            Zatvori
          </Button>
        </div>
      </form>
    </div>
  );
}

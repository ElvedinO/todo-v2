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
    <form
      onSubmit={handleSubmit}
      className='absolute space-y-4 bg-white p-4 rounded-lg shadow'
    >
      <Input
        placeholder='Ime Zadatka'
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
  );
}

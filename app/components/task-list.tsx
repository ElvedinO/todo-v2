import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Task, Category } from '../types';

interface TaskListProps {
  tasks: Task[];
  category: Category | null;
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  category,
  onToggleStatus,
  onEdit,
  onDelete,
}: TaskListProps) {
  return (
    <ul className='space-y-4 w-screen px-3'>
      {tasks.map((task) => (
        <li
          key={task.id}
          className='flex items-center justify-between p-4 bg-white shadow rounded-lg'
        >
          <div className='flex items-center space-x-2'>
            <Checkbox
              checked={task.status === 'done'}
              onCheckedChange={() => onToggleStatus(task.id)}
            />
            <div>
              <h3 className='font-semibold'>{task.title}</h3>
              <p className='text-sm text-blue-500'>
                {category?.id === task.categoryId && category?.name}
              </p>
            </div>
          </div>
          <div className='space-x-2'>
            <Button variant='outline' size='sm' onClick={() => onEdit(task)}>
              Uredi
            </Button>
            <Button
              variant='destructive'
              size='sm'
              onClick={() => onDelete(task.id)}
            >
              Obriši
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

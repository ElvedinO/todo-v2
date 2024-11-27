export interface Task {
  id: string;
  title: string;
  categoryId: string;
  status: 'todo' | 'done';
}

export interface Category {
  id: string;
  name: string;
}

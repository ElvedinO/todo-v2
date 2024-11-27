'use client';

import { useState, useEffect } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import TaskList from './components/task-list';
import TaskForm from './components/task-form';
import CategoryForm from './components/category-form';
import { Sidebar } from './components/sidebar';
import { Task, Category } from './types';

export default function MechanicTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  // const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const storedCategories = localStorage.getItem('categories');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    setIsTaskFormOpen(false);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'todo' ? 'done' : 'todo' }
          : task
      )
    );
  };

  const addCategory = (category: Category) => {
    setCategories([...categories, category]);
    setIsCategoryFormOpen(false);
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    // setEditingCategory(null);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
    setTasks(tasks.filter((task) => task.categoryId !== id));
    if (selectedCategory === id) {
      setSelectedCategory(null);
    }
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.categoryId === selectedCategory)
    : tasks;

  const selectedCategoryObject = selectedCategory
    ? categories.find((category) => category.id === selectedCategory) || null
    : null;

  return (
    <div className='container flex gap-3 flex-col mx-auto p-4 '>
      <h1 className='text-2xl font-bold mb-4 text-center'>SAMO ZA DZANKICU</h1>
      <div className='flex justify-between flex-wrap'>
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className='flex gap-1 flex-wrap'>
          <Button
            onClick={() => setIsTaskFormOpen(true)}
            disabled={!selectedCategory}
          >
            Dodaj Zadatak
          </Button>
          <Button onClick={() => setIsCategoryFormOpen(true)}>
            Upravljaj Kategorijama
          </Button>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex justify-center relative'>
          <Tabs className='flex flex-col' defaultValue='todo'>
            <TabsList className='w-fit self-center'>
              <TabsTrigger value='todo'>Za Uraditi</TabsTrigger>
              <TabsTrigger value='done'>Urađeno</TabsTrigger>
              <TabsTrigger value='all'>Svi Zadatci</TabsTrigger>
            </TabsList>
            <TabsContent value='todo'>
              <TaskList
                tasks={filteredTasks.filter((task) => task.status === 'todo')}
                category={selectedCategoryObject}
                onToggleStatus={toggleTaskStatus}
                onEdit={setEditingTask}
                onDelete={deleteTask}
              />
            </TabsContent>
            <TabsContent value='done'>
              <TaskList
                tasks={filteredTasks.filter((task) => task.status === 'done')}
                category={selectedCategoryObject}
                onToggleStatus={toggleTaskStatus}
                onEdit={setEditingTask}
                onDelete={deleteTask}
              />
            </TabsContent>
            <TabsContent value='all'>
              <TaskList
                tasks={filteredTasks}
                category={selectedCategoryObject}
                onToggleStatus={toggleTaskStatus}
                onEdit={setEditingTask}
                onDelete={deleteTask}
              />
            </TabsContent>
          </Tabs>

          {isTaskFormOpen && selectedCategory && (
            <TaskForm
              onSubmit={addTask}
              onCancel={() => setIsTaskFormOpen(false)}
              categoryId={selectedCategory}
            />
          )}
          {editingTask && (
            <TaskForm
              task={editingTask}
              onSubmit={updateTask}
              onCancel={() => setEditingTask(null)}
              categoryId={editingTask.categoryId}
            />
          )}
          {isCategoryFormOpen && (
            <CategoryForm
              categories={categories}
              onSubmit={addCategory}
              onUpdate={updateCategory}
              onDelete={deleteCategory}
              onCancel={() => setIsCategoryFormOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

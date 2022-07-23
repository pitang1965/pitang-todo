import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Session } from '@supabase/gotrue-js';
import { useSnackbar } from 'notistack';
import type { SnackbarMessage } from 'notistack';
import TodoCard from './TodoCard';
import type { Todo } from './TodoCard';
import { ToDoAnimation } from './TodoAnimation';

type Props = {
  session: Session;
};

export default function Todos({ session }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => await getTodos())();
  }, [session]);


  async function deleteTask(id: number) {
    if (!session) {
      return;
    }
    try {
      const newTodos: Todo[] = todos.filter((todo) => todo.id !== id);

      const { data, error } = await supabase
        .from<Todo>('todos')
        .delete()
        .match({ id: id });

      if (!data && error) {
        throw error;
      }
      setTodos(newTodos);
    } catch (error) {
      enqueueSnackbar(error as SnackbarMessage, { variant: 'error' });
    }
  }

  async function toggleTaskComplete(id: number) {
    if (!session) {
      return;
    }
    try {
      let newTodo: Todo | undefined;
      const newTodos: Todo[] = todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        } else {
          newTodo = todo;
          todo.is_complete = !todo.is_complete;
          return newTodo;
        }
      });
      if (newTodo) {
        const { data, error } = await supabase
          .from<Todo>('todos')
          .update({ is_complete: newTodo.is_complete })
          .match({ id: id });

        if (!data && error) {
          throw error;
        }
        setTodos(newTodos);
      }
    } catch (error) {
      enqueueSnackbar(error as SnackbarMessage, { variant: 'error' });
    }
  }

  async function getTodos() {
    if (!session) {
      return;
    }
    try {
      const { data, error } = await supabase
        .from<Todo>('todos')
        .select('*')
        .eq('user_id', session.user!.id)
        .order('inserted_at', { ascending: true });

      if (!data && error) {
        throw error;
      }
      setTodos(data);
    } catch (error) {
      enqueueSnackbar(error as SnackbarMessage, { variant: 'error' });
    }
  }

  const addNewTodo = async (newTask: string) => {
    if (!session) {
      return;
    }
    if (newTask.length <= 3) {
      enqueueSnackbar('4文字以上にしてください。', { variant: 'warning' });
      return;
    }
    try {
      const { data, error } = await supabase
        .from<Todo>('todos')
        .insert({ task: newTask, user_id: session.user!.id })
        .single();
      setNewTask('');
      setTodos([...todos, data!]);
    } catch (error) {
      enqueueSnackbar(error as SnackbarMessage, { variant: 'error' });
    }
  };

  return (
    <>
      <ToDoAnimation todos={todos} />
      <div className='flex'>
        <input
          type='text'
          placeholder='やることを追加してください。'
          value={newTask}
          className='grow'
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button
          className='button primary flex-none'
          onClick={() => addNewTodo(newTask)}
        >
          追加
        </button>
      </div>

      <ol>
        {todos &&
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={deleteTask}
              onToggleComplete={toggleTaskComplete}
            />
          ))}
      </ol>
    </>
  );
}

import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Session } from '@supabase/gotrue-js';
import { alertApiError } from '../utils/alertApiError';
import TodoCard from './TodoCard';
import type { Todo } from './TodoCard';

type Props = {
  session: Session;
};

export default function Todos({ session }: Props) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    getTodos();
  }, [session]);

  async function deleteTask(id: number) {
    if (!session) {
      return;
    }
    try {
      setLoading(true);
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
      alertApiError(error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleTaskComplete(id: number) {
    if (!session) {
      return;
    }
    try {
      setLoading(true);
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
          .update({is_complete: newTodo.is_complete})
          .match({ id: id });

        if (!data && error) {
          throw error;
        }
        setTodos(newTodos);
      }
    } catch (error) {
      alertApiError(error);
    } finally {
      setLoading(false);
    }
  }

  async function getTodos() {
    if (!session) {
      return;
    }
    try {
      setLoading(true);
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
      alertApiError(error);
    } finally {
      setLoading(false);
    }
  }

  const addNewTodo = async (newTask: string) => {
    if (!session) {
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<Todo>('todos')
        .insert({ task: newTask, user_id: session.user!.id })
        .single();
      setTodos([...todos, data!]);
    } catch (error) {
      alertApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>やること</h1>
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

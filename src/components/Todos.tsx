import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Session } from '@supabase/gotrue-js';
import { alertApiError } from '../utils/alertApiError';

type Props = {
  session: Session;
};

type Todo = {
  id: number;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
};

export default function Todos({ session }: Props) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    getTodos();
  }, [session]);

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
      <input
        type='text'
        placeholder='やることを追加してください。'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={() => addNewTodo(newTask)}>追加</button>
      <ol>
        {todos && todos.map((todo) => <li key={todo.id}>{todo.task}</li>)}
      </ol>
    </>
  );
}

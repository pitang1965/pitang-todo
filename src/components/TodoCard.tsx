import { supabase } from '../utils/supabaseClient';
import { Session } from '@supabase/gotrue-js';
import { alertApiError } from '../utils/alertApiError';

export type Todo = {
  id: number;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
};

type Props = {
  session: Session;
  todo: Todo;
};

export default function TodoCard({ session, todo }: Props) {
  return (
    <li className='card' key={todo.id}>
      <div className='flex'>
        <div className='grow'>{todo.task}</div>
        <button className='button flex-none'>完了</button>
        <button className='button flex-none'>削除</button>
      </div>
    </li>
  );
}

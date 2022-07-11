import { VscTrash } from 'react-icons/vsc';

export type Todo = {
  id: number;
  user_id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
};

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
};

export default function TodoCard({ todo, onDelete, onToggleComplete }: Props) {
  return (
    <li className='card' key={todo.id}>
      <div className='flex'>
        {todo.is_complete ? (
          <div className='grow'>
            <del>{todo.task}</del>{' '}
          </div>
        ) : (
          <div className='grow'>{todo.task} </div>
        )}
        <button
          className='button complete-button flex-none'
          onClick={() => onToggleComplete(todo.id)}
        >
          {todo.is_complete ? '未完了に戻す' : '完了にする'}
        </button>
        <button className='button flex-none' onClick={() => onDelete(todo.id)}>
          <VscTrash />
        </button>
      </div>
    </li>
  );
}

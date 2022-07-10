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
        <div className='grow'>{todo.task} [{todo.is_complete ? '済' : '要作業'}]</div>
        <button
          className='button flex-none'
          onClick={() => onToggleComplete(todo.id)}
        >
          完了
        </button>
        <button className='button flex-none' onClick={() => onDelete(todo.id)}>
          削除
        </button>
      </div>
    </li>
  );
}

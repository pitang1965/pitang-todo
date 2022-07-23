import { useRef, useEffect } from 'react';
import { Player, PlayerEvent } from '@lottiefiles/react-lottie-player';
import { waitAsync } from '../utils/waitAsync';
import type { Todo } from './TodoCard';

type Props = {
  todos: Todo[];
};

export function ToDoAnimation({ todos }: Props) {
  const playerRef = useRef<Player>(null);
  const isPlayingRef = useRef<boolean>(false);

  useEffect(() => playAnimation, [todos]);

  // アニメーションをtodoがあるときのフレーム位置にする
  function setAnimationTodoExist() {
    playerRef.current?.setSeeker(40);
  }

  function playAnimation(): void {
    console.log(todos);
    isPlayingRef.current = true;
    playerRef.current?.setSeeker(0);
    playerRef.current?.play();
    waitAsync(() => !isPlayingRef.current, 200, 3000)
      .then(() => setAnimationTodoExist())
      .catch((e: any) => console.error(e.message));
  }

  const handleEventPlayer = (e: PlayerEvent) => {
    if (e === 'complete') {
      if (isPlayingRef.current) {
        isPlayingRef.current = false;
      }
    }
  };

  return (
    <Player
      src='https://assets8.lottiefiles.com/packages/lf20_z4cshyhf.json'
      ref={playerRef}
      style={{ width: '30vw' }}
      autoplay
      onEvent={handleEventPlayer}
    />
  );
}

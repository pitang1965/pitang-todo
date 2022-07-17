import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useSnackbar } from 'notistack';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      enqueueSnackbar('リンクのためのメールをご確認ください。', {
        variant: 'info',
      });
    } catch (error: any) {
      enqueueSnackbar(error.error_description || error.message, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='row flex flex-center'>
      <div className='col-6 form-widget'>
        <h1 className='header'>ピータンTO-DO</h1>
        <p className='description'>下記Eメールでマジックリンクでログイン</p>
        <div>
          <input
            className='inputField'
            type='email'
            placeholder='Eメール'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className='button block'
            disabled={loading}
          >
            <span>{loading ? '読み込み中...' : 'マジックリンクを送信'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

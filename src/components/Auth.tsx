import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { alertApiError, notifyInfo, NotifyContainer } from '../utils/notify';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
    } catch (error: any) {
      alertApiError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                notifyInfo('リンクのためのメールをご確認ください。');
              }}
              className='button block'
              disabled={loading}
            >
              <span>{loading ? '読み込み中...' : 'マジックリンクを送信'}</span>
            </button>
          </div>
        </div>
      </div>
      <NotifyContainer />
    </>
  );
}

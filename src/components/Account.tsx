import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Session } from '@supabase/gotrue-js';
import { alertApiError } from '../utils/alertApiError';
import Avatar from './Avatar';
import Todos from './Todos';

type Props = {
  session: Session;
};

export default function Account({ session }: Props) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<any>(null);
  const [website, setWebsite] = useState<any>(null);
  const [avatar_url, setAvatarUrl] = useState<any>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alertApiError(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: any;
    website: any;
    avatar_url: any;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alertApiError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='form-widget'>
      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url: any) => {
          setAvatarUrl(url);
          updateProfile({ username, website, avatar_url: url });
        }}
      />
      <div>
        <label htmlFor='email'>電子メール</label>
        <input id='email' type='text' value={session?.user?.email} disabled />
      </div>
      <div>
        <label htmlFor='username'>名前</label>
        <input
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='website'>ウェブサイト</label>
        <input
          id='website'
          type='website'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className='flex'>
        <button
          className='button primary'
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? '読み込み中...' : '更新'}
        </button>
        <button className='button' onClick={() => supabase.auth.signOut()}>
          ログアウト
        </button>
      </div>
      <Todos key={session?.user?.id} session={session} />
    </div>
  );
}

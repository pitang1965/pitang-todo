import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import VisuallyHidden from '@reach/visually-hidden';
import { useSnackbar } from 'notistack';
import type { SnackbarMessage } from 'notistack';

export default function Avatar({
  url,
  size,
  onUpload,
}: {
  url: any;
  size: any;
  onUpload: any;
}) {
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path: any) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      if (typeof data === 'object') {
        const url = URL.createObjectURL(data as Blob);
        setAvatarUrl(url);
      }
    } catch (error) {
      enqueueSnackbar(error as SnackbarMessage, { variant: 'error' });
    }
  };

  const uploadAvatar = async (event: any) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('アップロードする画像を選択してください。');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      enqueueSnackbar(error as SnackbarMessage, { variant: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ width: size }} aria-live='polite'>
      <img
        src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? 'プロフィール画像' : '画像なし'}
        className='avatar image'
        style={{ height: size, width: size }}
      />
      {uploading ? (
        'アップロード中...'
      ) : (
        <>
          <label className='button primary block' htmlFor='single'>
            画像アップロード
          </label>
          <VisuallyHidden>
            <input
              type='file'
              id='single'
              accept='image/*'
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </VisuallyHidden>
        </>
      )}
    </div>
  );
}

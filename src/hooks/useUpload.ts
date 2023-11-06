import { useAuth, useSession } from '@clerk/nextjs';
import { useCallback, useState } from 'react';

import { supabaseClient } from '@/libs/supabase';

import { toast } from './useToast';

const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_BUCKET as string;

const useUpload = () => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getToken } = useAuth();

  const uploadImage = useCallback(
    async (file: File, bucket: string) => {
      if (!session) throw new Error('User is not logged in');
      try {
        const supabaseAccessToken = await getToken({
          template: 'supabase',
        });
        if (!supabaseAccessToken) throw new Error('Error getting token');
        const sb = await supabaseClient(supabaseAccessToken);
        const { data, error: uploadError } = await sb.storage
          .from(bucket)
          .upload(`${bucket}-${new Date().getTime().toString()}`, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          throw new Error('Error uploading image');
        }
        return `${BUCKET_NAME}/${bucket}/${data?.path}` || '';
      } catch (e) {
        const errorMessage =
          e instanceof Error
            ? e.message
            : 'An unknown error occurred. Please try again later or contact support if the issue persists';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
        return '';
      } finally {
        setIsLoading(false);
      }
    },
    [getToken, session],
  );

  return { isLoading, uploadImage };
};

export default useUpload;

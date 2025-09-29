import { useAppSelector } from '@/store/hook';

export const useLang = () => {
  return useAppSelector((state) => state.language.lang);
};

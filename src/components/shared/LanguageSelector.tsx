'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setLang } from '@/store/slices/languageSlice';

export const LanguageSelector = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.language.lang);

  const handleChange = (newLang: 'vi' | 'en') => {
    dispatch(setLang(newLang));
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-zinc-900 text-white border border-zinc-700"
          >
            {lang === 'vi' ? 'Tiếng Việt' : 'English'}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleChange('vi')}>
            Tiếng Việt
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleChange('en')}>
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

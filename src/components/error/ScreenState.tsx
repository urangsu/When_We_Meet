import React from 'react';
import { Button } from '../Button';

interface ScreenLoadingProps {
  message?: string;
}

export const ScreenLoading = ({ message = '불러오는 중이에요...' }: ScreenLoadingProps) => (
  <div className="flex min-h-[50dvh] flex-col items-center justify-center p-5 text-center text-sm font-bold text-slate-400">
    <div className="animate-pulse flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <span>{message}</span>
    </div>
  </div>
);

interface ScreenErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ScreenError = ({
  title = '화면을 불러오지 못했어요',
  message = '잠시 후 다시 시도해 주세요.',
  onRetry,
}: ScreenErrorProps) => (
  <div className="flex min-h-[50dvh] flex-col items-center justify-center px-5 py-10 text-center">
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-md w-full max-w-[360px]">
      <p className="text-xs font-bold text-red-500">ERROR</p>
      <h2 className="mt-2 text-lg font-black text-slate-900 leading-snug">{title}</h2>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button onClick={onRetry} size="sm" className="mx-auto">
            다시 시도
          </Button>
        </div>
      )}
    </div>
  </div>
);

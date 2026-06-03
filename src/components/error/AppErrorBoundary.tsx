import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Button } from '../Button';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AppErrorBoundary]', error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh bg-slate-50 px-5 py-10 text-slate-800">
          <div className="mx-auto flex min-h-[70dvh] w-full max-w-[430px] flex-col items-center justify-center text-center">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-md">
              <p className="text-xs font-bold text-red-500">SYSTEM ERROR</p>
              <h1 className="mt-2 text-2xl font-black text-slate-900 leading-snug">
                화면을 불러오지 못했어요
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                잠시 후 다시 시도해 주세요. 문제가 계속되면 작성 중인 데이터가 다른 형태일 수 있어요.
              </p>
              <div className="mt-6 flex flex-col gap-2 w-full">
                <Button onClick={() => window.location.reload()} size="full">
                  새로고침
                </Button>
                <Button variant="outline" size="full" onClick={() => { window.location.href = '/app'; }}>
                  홈으로 가기
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}


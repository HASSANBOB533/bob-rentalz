// Type declarations for sonner toast library
declare module 'sonner' {
  export interface ToastT {
    id: string | number;
    title?: string;
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  }

  export interface ToastOptions {
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
    duration?: number;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  }

  export function toast(message: string, options?: ToastOptions): string | number;
  export namespace toast {
    function success(message: string, options?: ToastOptions): string | number;
    function error(message: string, options?: ToastOptions): string | number;
    function warning(message: string, options?: ToastOptions): string | number;
    function info(message: string, options?: ToastOptions): string | number;
    function loading(message: string, options?: ToastOptions): string | number;
    function dismiss(toastId?: string | number): void;
  }

  export const Toaster: React.ComponentType<{
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    expand?: boolean;
    richColors?: boolean;
    closeButton?: boolean;
  }>;
}

declare module 'sonner' {
  export * from 'sonner';
}

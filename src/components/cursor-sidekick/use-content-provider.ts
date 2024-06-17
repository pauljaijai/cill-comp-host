import { useClipboard, useElementBounding } from '@vueuse/core';

/** 選取狀態 */
interface SelectionState {
  rect?: DOMRect;
  text: string;
}

interface TargetParam {
  /** 目標元素 */
  element?: {
    value: HTMLElement;
    bounding: ReturnType<typeof useElementBounding>;
  };
  selectionState?: SelectionState;
}

interface BtnOption {
  label: string;
  onClick: (param: TargetParam) => void;
}

interface ContentProvider {
  match: (
    data: HTMLElement | SelectionState
  ) => boolean;
  getContent: (
    param: TargetParam
  ) => string | BtnOption[] | undefined;
}

export function useContentProvider() {
  const clipboard = useClipboard()

  const contentProviders: ContentProvider[] = [
    // 文字編輯類型
    {
      match(data) {
        if ('text' in data) return false;

        if (data instanceof HTMLInputElement) {
          const inputTypes = ['text', 'number', 'email', 'password', 'search', 'tel', 'url'];
          return inputTypes.includes(data.type);
        }

        if (data instanceof HTMLTextAreaElement) {
          return true
        }

        if ([
          'true', 'plaintext-only'
        ].includes(data?.contentEditable ?? '')) {
          return true;
        }

        return false;
      },
      getContent() {
        const result: BtnOption[] = [];

        if (clipboard.isSupported.value) {
          result.push({
            label: '📋 複製',
            onClick(param) {
              const { element } = param;
              const targetElement = element?.value;

              if (
                targetElement instanceof HTMLInputElement ||
                targetElement instanceof HTMLTextAreaElement
              ) {
                clipboard.copy(targetElement.value);
                targetElement.focus();
              }
            },
          });
        }

        result.push({
          label: '🧹 清空',
          onClick(param) {
            const { element } = param;
            const target = element?.value;

            if (
              target instanceof HTMLInputElement ||
              target instanceof HTMLTextAreaElement
            ) {
              target.value = '';
              // 觸發 input 事件
              const event = new Event('input', {
                bubbles: true,
                cancelable: false
              });
              target.dispatchEvent(event);

              target.focus();
            }
          },
        });

        return result;
      }
    },

    // 按鈕。button 或 role 為 button 的元素
    {
      match(data) {
        if ('text' in data) return false;

        return data instanceof HTMLButtonElement ||
          data?.getAttribute('role') === 'button'
      },
      getContent() {
        return undefined;
      }
    },

    // 選取文字
    {
      match(data) {
        return 'rect' in data;
      },
      getContent() {
        const result: BtnOption[] = [];

        if (clipboard.isSupported.value) {
          result.push({
            label: '📋 複製',
            onClick(param) {
              const { element } = param;
              const targetElement = element?.value;

              if (
                targetElement instanceof HTMLInputElement ||
                targetElement instanceof HTMLTextAreaElement
              ) {
                clipboard.copy(targetElement.value);
                targetElement.focus();
              }
            },
          });
        }

        return result;
      }
    },
  ]

  return { contentProviders };
}
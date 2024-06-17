import { useClipboard, useElementBounding } from '@vueuse/core';

/** 選取狀態 */
interface SelectionState {
  rect: DOMRect;
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
  onClick: (event: Event) => void;
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
        if ('rect' in data) return false;

        if (data instanceof HTMLInputElement) {
          const inputTypes = [
            'text', 'number', 'email',
            'password', 'search',
            'tel', 'url'
          ];
          return inputTypes.includes(data.type);
        }

        if (data instanceof HTMLTextAreaElement) {
          return true
        }

        if (
          [
            'true', 'plaintext-only'
          ].includes(data?.contentEditable ?? '')
        ) {
          return true;
        }

        return false;
      },
      getContent(param) {
        const result: BtnOption[] = [];

        if (clipboard.isSupported.value) {
          result.push({
            label: '📋 複製',
            onClick() {
              const { element } = param;
              const target = element?.value;

              if (
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement
              ) {
                clipboard.copy(target.value);
                target.focus();
              }

              if (
                [
                  'true', 'plaintext-only'
                ].includes(target?.contentEditable ?? '')
              ) {
                if (target?.innerHTML) {
                  clipboard.copy(target.innerHTML);
                }

                target?.focus();
              }
            },
          });
        }

        result.push({
          label: '🧹 清空',
          onClick() {
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

            if (
              [
                'true', 'plaintext-only'
              ].includes(target?.contentEditable ?? '')
            ) {
              if (target) {
                target.innerHTML = '';
              }

              target?.focus();
            }
          },
        });

        return result;
      }
    },

    // 按鈕。button 或 role 為 button 的元素
    {
      match(data) {
        if ('rect' in data) return false;

        return data instanceof HTMLButtonElement ||
          data?.getAttribute('role') === 'button'
      },
      getContent() {
        return undefined;
      }
    },

    // checkbox 或內有 checkbox 的 label
    {
      match(data) {
        if ('rect' in data) return false;

        if (
          data instanceof HTMLInputElement &&
          data.type === 'checkbox'
        ) {
          return true;
        }

        if (
          data instanceof HTMLLabelElement &&
          data.querySelector('input[type="checkbox"]')
        ) {
          return true;
        }

        return false;
      },
      getContent(param) {
        const { element } = param;
        const target = element?.value;

        if (target instanceof HTMLInputElement) {
          return target?.checked ? '✅→⬜' : '⬜→✅';
        }

        if (
          target instanceof HTMLLabelElement
        ) {
          const input = target.querySelector('input[type="checkbox"]');
          if (input instanceof HTMLInputElement) {
            return input?.checked ? '✅→⬜' : '⬜→✅';
          }
        }
      }
    },

    // 連結
    {
      match(data) {
        if ('rect' in data) return false;

        if (data instanceof HTMLAnchorElement) {
          return true;
        }

        return false;
      },
      getContent(param) {
        const { element } = param;
        const target = element?.value;

        if (target instanceof HTMLAnchorElement) {
          return target.href;
        }
      }
    },

    // 選取文字
    {
      match(data) {
        return 'rect' in data;
      },
      getContent(param) {
        const result: BtnOption[] = [];

        if (clipboard.isSupported.value) {
          result.push({
            label: '📋 複製',
            onClick() {
              const { selectionState } = param;

              if (selectionState?.text) {
                clipboard.copy(selectionState.text);
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

/**
 *  * - 連結
 * - 內有 radio 的 label
 * - 內有 select 的 label
 */
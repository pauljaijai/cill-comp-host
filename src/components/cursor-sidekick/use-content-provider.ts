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

interface Content {
  class?: string;
  text?: string;
  btnList?: BtnOption[];
}

export interface ContentProvider {
  match: (
    data: HTMLElement | SelectionState
  ) => boolean;
  getContent: (
    param: TargetParam
  ) => Content | undefined;
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
        const btnList: BtnOption[] = [];

        if (clipboard.isSupported.value) {
          btnList.push({
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

        btnList.push({
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

        return { btnList };
      }
    },

    // 按鈕。button 或 role 為 button 的元素
    {
      match(data) {
        if ('rect' in data) return false;

        return data instanceof HTMLButtonElement ||
          data?.getAttribute('role') === 'button'
      },
      getContent(param) {
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
          return {
            text: target?.checked ? '✅→⬜' : '⬜→✅',
          };
        }

        if (
          target instanceof HTMLLabelElement
        ) {
          const input = target.querySelector('input[type="checkbox"]');
          if (input instanceof HTMLInputElement) {
            return {
              text: input?.checked ? '✅→⬜' : '⬜→✅',
            };
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
          const btnList: BtnOption[] = [
            {
              label: '📑 新分頁開啟連結',
              onClick() {
                window.open(target.href, '_blank');
              }
            }
          ];

          if (clipboard.isSupported.value) {
            btnList.push({
              label: '🔗 複製連結',
              onClick() {
                clipboard.copy(target.href);
              },
            });
          }

          return {
            text: decodeURIComponent(target.href),
            btnList,
          };
        }
      }
    },

    // 圖片
    {
      match(data) {
        if ('rect' in data) return false;

        if (data instanceof HTMLImageElement) {
          return true;
        }

        return false;
      },
      getContent(param) {
        const { element } = param;
        const target = element?.value;

        if (target instanceof HTMLImageElement) {
          return {
            text: '👍',
          };
        }
      }
    },

    // 選取文字
    {
      match(data) {
        return 'rect' in data;
      },
      getContent(param) {
        const btnList: BtnOption[] = [];

        if (clipboard.isSupported.value) {
          btnList.push({
            label: '📋 複製',
            onClick() {
              const { selectionState } = param;

              if (selectionState?.text) {
                clipboard.copy(selectionState.text);
              }
            },
          });
        }

        return { btnList };
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
# 設計概念

除了有趣以外，主要目的還是為了練習設計元件。

所以設計時需要考慮以下內容。

## 元件特性

### ⚙️ 功能

目前以 Vue 為主，記得在每個欄位加上 [TSDoc](https://tsdoc.org/) 註解說明。

#### Prop

內容與樣式客製化，需考慮型別檢查與預設值。

#### Expose

元件對外暴露的成員

#### Emit

除了 click、focus 這類常見事件外，是否有其他事件

#### Slot

提供更高的客製化功能，請考慮其 slot prop 或動態 slot 規則等等。

---

### 🤏🏻 響應性（Responsiveness）

- 以 Quasar 為例，需考慮以下斷點

📚 [Breakpoints | Quasar Framework](https://quasar.dev/style/breakpoints)

- 需考慮觸控與滑鼠互動差異。

推薦閱讀以下資料：

📚 [Learn Responsive Design](https://web.dev/learn/design/)

---

### ✨ 可訪問性（Accessibility、a11y）

tabindex 為最基本實現項目，詳細內容可以參考下面連結：

📚 [巧用 tabindex 讓你的 UI 更鍵盤友善](https://medium.com/@accessdiversers/%E5%B7%A7%E7%94%A8-tabindex-%E8%AE%93%E4%BD%A0%E7%9A%84-ui-%E6%9B%B4%E9%8D%B5%E7%9B%A4%E5%8F%8B%E5%96%84-ad3d087e26fe)

有興趣也可以深入閱讀 a11y 資料：

📚 [Learn Accessibility](https://web.dev/learn/accessibility/)

---

### 🧪 可測試性（Testability）

每種 prop、expose、emit、slot，至少分別考慮 3 種測試案例：

- Happy Path：在我們定義所謂「正常的使用狀況」下，針對「正確的內容」，我們預期應該要做出的反應

- Sad Path：在我們定義所謂「正常的使用狀況」下，針對「錯誤的內容」，我們預期應該要做出的反應

- Bad Path：在我們定義所謂「錯誤」的使用狀況下，我們預期應該要做出的反應

推薦詳讀以下連結。

📚 [小白也能輕鬆瞭解的 Vue3 單元測試！](https://ithelp.ithome.com.tw/users/20119062/ironman/5554)

📚 [javascript-testing-best-practices](https://github.com/goldbergyoni/javascript-testing-best-practices/blob/master/readme-zh-TW.md)

---

## 成果

請不要使用 Quasar、Vuetify 這類 UI 套件框架進行開發，但可以使用 Lodash、VueUse 這類 utils 套件。

### 所以我說那個文件呢？

工程師一定要練習寫文件。( •̀ ω •́ )✧

內容描述功能需求、實現方法與測試結果並設計一份元件說明文件，

目的在於讓其他人理解元件的功能與使用方法，所以工具不限。

可以使用各類工具，如 VitePress、Storybook 等。

記得須包含以下內容：

- 元件提供之 prop、slot、event（emit）、method（expose）說明。
- 所有功能（prop、slot、event、method）的範例與說明。

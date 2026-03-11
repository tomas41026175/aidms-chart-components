import { vi } from 'vitest';

// --- ResizeObserver Mock ---
// WHY: jsdom 不實作 ResizeObserver，但 MUI x-charts 底層的
// ResponsiveChartContainer 依賴它來偵測父容器寬度。
// 不 mock 會直接 throw ReferenceError。
const ResizeObserverMock = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
(globalThis as typeof globalThis & { ResizeObserver: unknown }).ResizeObserver = ResizeObserverMock;

// --- SVGElement.getTotalLength Mock ---
// WHY: MUI LineChart 的路徑動畫需要計算 SVG path 長度。
// jsdom 不實作 SVG 方法，回傳 0 讓動畫跳過計算。
Object.defineProperty(SVGElement.prototype, 'getTotalLength', {
  value: () => 0,
  writable: true,
});

// --- window.matchMedia Mock ---
// WHY: MUI 的 useMediaQuery hook 依賴 matchMedia。
// jsdom 不實作，不 mock 會導致所有 breakpoint 判斷失敗。
// 預設 matches: false = 模擬手機寬度（最保守場景）。
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

import { describe, it, expect, vi } from 'vitest';
import { toGaugeProps } from '../to-gauge-props';

describe('toGaugeProps', () => {
  // --- arc 映射 ---

  describe('arc 映射', () => {
    it('"half" -> startAngle: -110, endAngle: 110（半圓儀表，監控常見樣式）', () => {
      const result = toGaugeProps({ value: 50, arc: 'half' });
      expect(result.startAngle).toBe(-110);
      expect(result.endAngle).toBe(110);
    });

    it('"full" -> startAngle: 0, endAngle: 360（完整圓形）', () => {
      const result = toGaugeProps({ value: 50, arc: 'full' });
      expect(result.startAngle).toBe(0);
      expect(result.endAngle).toBe(360);
    });
  });

  // --- value clamp ---

  describe('value clamp', () => {
    it('value > max -> clamp 到 max', () => {
      const result = toGaugeProps({ value: 150, min: 0, max: 100 });
      expect(result.value).toBe(100);
    });

    it('value < min -> clamp 到 min', () => {
      const result = toGaugeProps({ value: -10, min: 0, max: 100 });
      expect(result.value).toBe(0);
    });

    it('null value -> 保持 null（不 clamp，由 text fn 顯示 "--"）', () => {
      const result = toGaugeProps({ value: null });
      expect(result.value).toBeNull();
    });
  });

  // --- color 函式 ---

  describe('color 函式', () => {
    it('color: string -> 直接套用到 sx', () => {
      const result = toGaugeProps({ value: 50, color: '#ff0000' });
      expect(result.sx).toBeDefined();
    });

    it('color: fn -> 以 value 呼叫（Dashboard 傳入告警色函式）', () => {
      const colorFn = vi.fn().mockReturnValue('#22c55e');
      toGaugeProps({ value: 73, color: colorFn });
      expect(colorFn).toHaveBeenCalledWith(73);
    });

    it('color: fn + null value -> fn 不被呼叫，sx 只含 text offset', () => {
      const colorFn = vi.fn();
      const result = toGaugeProps({ value: null, color: colorFn });
      expect(colorFn).not.toHaveBeenCalled();
      expect(result.sx).not.toHaveProperty('& .MuiGauge-valueArc');
    });
  });

  // --- formatValue ---

  describe('formatValue', () => {
    it('未傳入時預設格式為 "${v}%"', () => {
      const result = toGaugeProps({ value: 73 });
      expect(result.text({ value: 73 })).toBe('73%');
    });

    it('null value -> text 回傳 "--"（載入中狀態）', () => {
      const result = toGaugeProps({ value: null });
      expect(result.text({ value: null })).toBe('--');
    });

    it('自訂 formatValue 被使用', () => {
      const result = toGaugeProps({ value: 50, formatValue: (v) => `${v} °C` });
      expect(result.text({ value: 50 })).toBe('50 °C');
    });
  });

  // --- animation ---

  describe('animation', () => {
    it('animate: false -> skipAnimation: true', () => {
      const result = toGaugeProps({ value: 50, animate: false });
      expect(result.skipAnimation).toBe(true);
    });
  });
});

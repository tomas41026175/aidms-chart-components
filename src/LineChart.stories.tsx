import type { Meta, StoryObj } from '@storybook/react'
import { LineChart } from './LineChart'

const now = Date.now()
const labels = Array.from({ length: 30 }, (_, i) => new Date(now - (29 - i) * 2000))
const cpuData = Array.from({ length: 30 }, () => Math.random() * 60 + 20)
const memData = Array.from({ length: 30 }, () => Math.random() * 40 + 40)

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof LineChart>

export const Level1_ZeroConfig: Story = {
  name: 'Level 1 — 零配置',
  args: {
    labels,
    datasets: [{ label: 'CPU %', data: cpuData }],
  },
}

export const Level2_Advanced: Story = {
  name: 'Level 2 — 進階配置',
  args: {
    labels,
    datasets: [
      { label: 'CPU %', data: cpuData, color: '#a78bfa' },
      { label: 'Memory %', data: memData, color: '#60a5fa' },
    ],
    yRange: [0, 100],
    curve: 'smooth',
    animate: false,
    title: 'System Trends',
    height: 300,
  },
}

export const WithNullData: Story = {
  name: 'Null 缺值（SSE 初始）',
  args: {
    labels,
    datasets: [{
      label: 'CPU %',
      data: [...Array(10).fill(null), ...cpuData.slice(10)],
    }],
    yRange: [0, 100],
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from './BarChart'

const cores = ['Core 0', 'Core 1', 'Core 2', 'Core 3', 'Core 4', 'Core 5', 'Core 6', 'Core 7']
const coreUsage = [45, 72, 38, 91, 55, 63, 28, 47]

const disks = ['/dev/disk0s1', '/dev/disk0s2', '/dev/disk1s1']
const diskUsage = [68, 45, 82]

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof BarChart>

export const CpuCores: Story = {
  name: 'CPU Per-Core（vertical）',
  args: {
    labels: cores,
    datasets: [{ label: 'Usage %', data: coreUsage, color: '#a78bfa' }],
    yRange: [0, 100],
    height: 280,
  },
}

export const DiskUsage: Story = {
  name: 'Disk Usage（horizontal）',
  args: {
    labels: disks,
    datasets: [{ label: 'Used %', data: diskUsage, color: '#60a5fa' }],
    layout: 'horizontal',
    yRange: [0, 100],
    height: 200,
  },
}

export const MemoryStacked: Story = {
  name: 'Memory Breakdown（stacked）',
  args: {
    title: 'Memory Usage Breakdown',
    labels: ['Memory'],
    datasets: [
      { label: 'Used',   data: [42], color: '#f87171' },
      { label: 'Cache',  data: [28], color: '#fbbf24' },
      { label: 'Free',   data: [30], color: '#34d399' },
    ],
    stacked: true,
    yRange: [0, 100],
    height: 160,
  },
}

export const MemoryStackedHorizontal: Story = {
  name: 'Memory Breakdown（stacked + horizontal）',
  args: {
    title: 'Memory Usage Breakdown',
    labels: ['Memory'],
    datasets: [
      { label: 'Used',   data: [42], color: '#f87171' },
      { label: 'Cache',  data: [28], color: '#fbbf24' },
      { label: 'Free',   data: [30], color: '#34d399' },
    ],
    stacked: true,
    layout: 'horizontal',
    yRange: [0, 100],
    height: 160,
  },
}

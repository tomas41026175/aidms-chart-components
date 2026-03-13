import type { Meta, StoryObj } from '@storybook/react'
import { GaugeChart } from './GaugeChart'

const meta: Meta<typeof GaugeChart> = {
  title: 'Charts/GaugeChart',
  component: GaugeChart,
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof GaugeChart>

export const Normal: Story = {
  name: '正常（< 70%）',
  args: { value: 45, title: 'CPU', color: '#34d399', min: 0, max: 100 },
}

export const Warning: Story = {
  name: 'Warning（70–85%）',
  args: { value: 78, title: 'CPU', color: '#fbbf24', min: 0, max: 100 },
}

export const Critical: Story = {
  name: 'Critical（> 85%）',
  args: { value: 92, title: 'CPU', color: '#f87171', min: 0, max: 100 },
}

export const NullValue: Story = {
  name: 'Null（無資料）',
  args: { value: null, title: 'CPU', min: 0, max: 100 },
}

export const HalfArcVsFullArc: Story = {
  name: 'arc: half vs full',
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>arc: half（預設）</div>
        <GaugeChart value={67} title="Memory" arc="half" color="#a78bfa" min={0} max={100} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>arc: full</div>
        <GaugeChart value={67} title="Memory" arc="full" color="#a78bfa" min={0} max={100} />
      </div>
    </div>
  ),
}

export const ColorFunction: Story = {
  name: 'color: function（告警色函式）',
  render: () => {
    function alertColor(v: number): string {
      if (v > 85) return '#f87171'
      if (v > 70) return '#fbbf24'
      return '#34d399'
    }
    return (
      <div style={{ display: 'flex', gap: 24 }}>
        {[45, 78, 92].map((v) => (
          <GaugeChart key={v} value={v} title="CPU" color={alertColor} min={0} max={100} />
        ))}
      </div>
    )
  },
}

import type { Meta, StoryObj } from '@storybook/react';
import { mockMetrics } from '@/mocks/metrics';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		value: { control: 'text' },
		trend: { control: 'number' },
		trendLabel: { control: 'text' },
		prefix: { control: 'text' },
		suffix: { control: 'text' },
		loading: { control: 'boolean' },
		className: { control: 'text' },
	},
	args: mockMetrics[0],
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {};
export const PositiveTrend: Story = { args: { trend: 12.5 } };
export const NegativeTrend: Story = { args: { trend: -4.2 } };
export const Loading: Story = { args: { loading: true } };
export const Dashboard: Story = {
	parameters: { controls: { disable: true } },
	render: () => (
		<div className='grid grid-cols-2 gap-4'>
			{mockMetrics.map((metric) => (
				<MetricCard key={metric.label} {...metric} />
			))}
		</div>
	),
};

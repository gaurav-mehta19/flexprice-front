import type { Meta, StoryObj } from '@storybook/react';
import { UsageBar } from './UsageBar';

const meta: Meta<typeof UsageBar> = {
	title: 'Molecules/UsageBar',
	component: UsageBar,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		used: { control: 'number' },
		total: { control: 'number' },
		unit: { control: 'text' },
		showNumbers: { control: 'boolean' },
		loading: { control: 'boolean' },
		className: { control: 'text' },
	},
	args: { label: 'API calls', used: 5000, total: 10000, unit: 'calls' },
};

export default meta;
type Story = StoryObj<typeof UsageBar>;

export const Default: Story = {};
export const NearLimit: Story = { args: { used: 8500, total: 10000 } };
export const AtLimit: Story = { args: { used: 10000, total: 10000 } };
export const Loading: Story = { args: { loading: true } };
export const MultipleMeters: Story = {
	parameters: { container: 'wide' },
	render: () => (
		<>
			<UsageBar label='API calls' used={42000} total={100000} unit='calls' />
			<UsageBar label='Storage' used={780} total={1000} unit='GB' />
			<UsageBar label='Seats' used={18} total={20} unit='seats' />
			<UsageBar label='Exports' used={95} total={100} unit='jobs' />
		</>
	),
};

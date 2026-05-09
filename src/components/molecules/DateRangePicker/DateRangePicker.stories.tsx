import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRange, DateRangePicker } from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
	title: 'Molecules/DateRangePicker',
	component: DateRangePicker,
	tags: ['autodocs'],
	argTypes: {
		value: { control: false },
		onChange: { action: 'changed' },
		presets: { control: 'object' },
		disabled: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {};
export const WithCustomPresets: Story = {
	args: {
		presets: [{ label: 'Today', getValue: () => ({ from: new Date(), to: new Date() }) }],
	},
};
export const Disabled: Story = { args: { disabled: true } };
export const Controlled: Story = {
	render: () => {
		const ControlledDateRangePicker = () => {
			const [value, setValue] = useState<DateRange>();
			return <DateRangePicker value={value} onChange={setValue} />;
		};
		return <ControlledDateRangePicker />;
	},
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const options = [
	{ value: 'starter', label: 'Starter' },
	{ value: 'growth', label: 'Growth' },
	{ value: 'enterprise', label: 'Enterprise' },
];

const manyOptions = Array.from({ length: 24 }, (_, index) => ({
	value: `option-${index + 1}`,
	label: `Option ${index + 1}`,
}));

const meta: Meta<typeof Select> = {
	title: 'Atoms/Select',
	component: Select,
	tags: ['autodocs'],
	parameters: {
		container: 'fixed',
		docs: {
			description: {
				story:
					'Default shows the common plan selector. Variants cover searchable, disabled, error, and dense option lists. Controls keep the current value editable in Storybook.',
			},
		},
	},
	argTypes: {
		options: { control: 'object' },
		value: { control: 'text' },
		onChange: { action: 'changed' },
		placeholder: { control: 'text' },
		searchable: { control: 'boolean' },
		disabled: { control: 'boolean' },
		error: { control: 'text' },
		label: { control: 'text' },
	},
	args: {
		options,
		placeholder: 'Select a plan',
	},
};

export default meta;
type Story = StoryObj<typeof Select>;

const ControlledSelect = (args: React.ComponentProps<typeof Select>) => {
	const [value, setValue] = useState(args.value ?? '');
	return <Select {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
	render: (args) => <ControlledSelect {...args} />,
};

export const Controls: Story = {
	args: {
		label: 'Plan',
		value: 'growth',
	},
	render: (args) => <ControlledSelect {...args} />,
};

export const WithSearch: Story = {
	render: (args) => <ControlledSelect {...args} searchable />,
};

export const Variants: Story = {
	render: () => (
		<div className='space-y-4'>
			<Select options={options} placeholder='Select a plan' value='starter' />
			<Select options={options} placeholder='Searchable plan' searchable value='growth' />
			<Select options={options} placeholder='Disabled plan' disabled value='enterprise' />
			<Select options={options} placeholder='With error' error='Please select a plan' value='' />
		</div>
	),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: Default.render,
};

export const WithError: Story = {
	args: { error: 'Please select a plan' },
	render: Default.render,
};

export const ManyOptions: Story = {
	args: { options: manyOptions, searchable: true },
	render: Default.render,
};

export const WithLabel: Story = {
	args: { label: 'Plan' },
	render: Default.render,
};

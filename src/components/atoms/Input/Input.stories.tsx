import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
	title: 'Atoms/Input',
	component: Input,
	parameters: {
		layout: 'centered',
		container: 'fixed',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		error: { control: 'text' },
		helperText: { control: 'text' },
		prefix: { control: false },
		suffix: { control: false },
		disabled: { control: 'boolean' },
		type: { control: 'text' },
		placeholder: { control: 'text' },
		value: { control: 'text' },
		onChange: { action: 'changed' },
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

const ControlledInput = (args: React.ComponentProps<typeof Input>) => {
	const [value, setValue] = useState(args.value?.toString() ?? '');

	return <Input {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
	render: (args) => <ControlledInput {...args} placeholder='Enter text here' />,
};

export const WithLabel: Story = {
	render: (args) => <ControlledInput {...args} label='Email' placeholder='Enter your email' type='email' />,
};

export const WithError: Story = {
	render: (args) => (
		<ControlledInput
			{...args}
			label='Password'
			type='password'
			error='Password must be at least 8 characters'
			placeholder='Enter your password'
		/>
	),
};

export const WithHelperText: Story = {
	render: (args) => <ControlledInput {...args} label='Name' helperText='This appears on customer invoices.' placeholder='Acme Inc.' />,
};

export const WithCurrencyPrefix: Story = {
	render: (args) => <ControlledInput {...args} label='Amount' prefix='$' placeholder='0.00' />,
};

export const WithPercentSuffix: Story = {
	render: (args) => <ControlledInput {...args} label='Tax rate' suffix='%' placeholder='0' />,
};

export const Disabled: Story = {
	render: (args) => <ControlledInput {...args} label='Username' placeholder='Enter your username' disabled />,
};

export const NumberType: Story = {
	render: (args) => <ControlledInput {...args} label='Quantity' type='number' placeholder='100' />,
};

export const TypeTest: Story = {
	render: (args) => <ControlledInput {...args} placeholder='Type here' />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');
		await userEvent.type(input, 'hello');
		await expect(input).toHaveValue('hello');
	},
};

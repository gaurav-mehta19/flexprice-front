import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { ArrowRight, Plus } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
		size: { control: 'select', options: ['sm', 'md', 'lg'] },
		loading: { control: 'boolean' },
		disabled: { control: 'boolean' },
		leftIcon: { control: false },
		rightIcon: { control: false },
		children: { control: 'text' },
		onClick: { action: 'clicked' },
	},
	args: {
		children: 'Button',
		variant: 'primary',
		size: 'md',
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const WithLeftIcon: Story = { args: { leftIcon: <Plus className='h-4 w-4' />, children: 'Create' } };
export const WithRightIcon: Story = { args: { rightIcon: <ArrowRight className='h-4 w-4' />, children: 'Continue' } };

export const ClickTest: Story = {
	args: { children: 'Click me' },
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		await expect(button).toBeInTheDocument();
	},
};

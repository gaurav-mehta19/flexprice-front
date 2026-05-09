import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
	title: 'Molecules/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	argTypes: {
		value: { control: 'text' },
		onChange: { action: 'changed' },
		placeholder: { control: 'text' },
		debounceMs: { control: 'number' },
		loading: { control: 'boolean' },
		onClear: { action: 'cleared' },
		className: { control: 'text' },
	},
	args: { placeholder: 'Search customers' },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};
export const WithDebounce: Story = { args: { debounceMs: 600 } };
export const Loading: Story = { args: { loading: true, value: 'invoice' } };
export const WithValue: Story = { args: { value: 'Customer 12' } };

export const TypeTest: Story = {
	args: { debounceMs: 50 },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');
		await userEvent.type(input, 'acme');
		await waitFor(() => expect(args.onChange).toHaveBeenCalled());
	},
};

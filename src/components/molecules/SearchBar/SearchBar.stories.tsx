import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
	title: 'Molecules/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				story:
					'Default shows the standard debounced search field. Variants cover loading, populated, and debounced states. Controls let reviewers live-edit the value and handlers.',
			},
		},
	},
	argTypes: {
		value: { control: 'text' },
		onChange: { action: 'changed' },
		placeholder: { control: 'text' },
		debounceMs: { control: 'number' },
		loading: { control: 'boolean' },
		onClear: { action: 'cleared' },
		className: { control: 'text' },
	},
	args: { placeholder: 'Search customers', onChange: fn(), onClear: fn() },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};
export const Controls: Story = {
	args: { value: 'acme', debounceMs: 350 },
};
export const WithDebounce: Story = { args: { debounceMs: 600 } };
export const Loading: Story = { args: { loading: true, value: 'invoice' } };
export const WithValue: Story = { args: { value: 'Customer 12' } };

export const Variants: Story = {
	render: () => (
		<div className='grid gap-4'>
			<SearchBar placeholder='Search customers' />
			<SearchBar placeholder='Debounced search' debounceMs={600} />
			<SearchBar placeholder='Loading search' loading value='invoice' />
		</div>
	),
};

export const TypeTest: Story = {
	args: { debounceMs: 50 },
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('textbox');
		await userEvent.type(input, 'acme');
		await waitFor(() => expect(args.onChange).toHaveBeenCalledWith('acme'));
	},
};

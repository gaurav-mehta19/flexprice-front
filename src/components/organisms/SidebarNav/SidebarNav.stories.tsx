import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { SidebarNav } from './SidebarNav';
import { defaultNavItems } from './SidebarNav';

const meta: Meta<typeof SidebarNav> = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				story:
					'Default uses the product navigation. Variants cover the collapsed state and the full menu. Controls let reviewers switch the active route and collapse state live.',
			},
		},
	},
	argTypes: {
		items: { control: false },
		activeItem: { control: 'text' },
		onItemClick: { action: 'item clicked' },
		collapsed: { control: 'boolean' },
		onCollapse: { action: 'collapsed' },
	},
	args: { activeItem: 'dashboard' },
};

export default meta;
type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {};
export const Controls: Story = {
	args: {
		activeItem: 'plans',
		collapsed: false,
		items: defaultNavItems,
	},
};
export const Collapsed: Story = { args: { collapsed: true } };
const InteractiveSidebarNavStory = () => {
	const [activeItem, setActiveItem] = useState('dashboard');
	const [collapsed, setCollapsed] = useState(false);
	return (
		<SidebarNav
			activeItem={activeItem}
			onItemClick={setActiveItem}
			collapsed={collapsed}
			onCollapse={() => setCollapsed((value) => !value)}
		/>
	);
};

export const Interactive: Story = {
	render: () => <InteractiveSidebarNavStory />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: /customers/i }));
		const buttons = canvas.getAllByRole('button');
		await userEvent.click(buttons[buttons.length - 1]);
		expect(canvas.queryByText('Customers')).not.toBeInTheDocument();
	},
};
export const AllItems: Story = {
	args: { activeItem: 'customers' },
};

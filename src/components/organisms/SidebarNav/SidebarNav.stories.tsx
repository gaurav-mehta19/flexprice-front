import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNav } from './SidebarNav';

const meta: Meta<typeof SidebarNav> = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	tags: ['autodocs'],
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
};
export const AllItems: Story = {
	args: { activeItem: 'customers' },
};

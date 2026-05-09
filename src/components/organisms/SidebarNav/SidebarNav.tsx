import {
	BarChart2,
	ChevronLeft,
	ChevronRight,
	CreditCard,
	FileText,
	LayoutDashboard,
	Package,
	RefreshCw,
	Settings,
	Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	href?: string;
	badge?: string;
}

export interface SidebarNavProps {
	items?: NavItem[];
	activeItem?: string;
	onItemClick?: (id: string) => void;
	collapsed?: boolean;
	onCollapse?: () => void;
}

export const defaultNavItems: NavItem[] = [
	{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
	{ id: 'plans', label: 'Plans', icon: Package },
	{ id: 'customers', label: 'Customers', icon: Users, badge: '1.2k' },
	{ id: 'subscriptions', label: 'Subscriptions', icon: RefreshCw },
	{ id: 'invoices', label: 'Invoices', icon: FileText },
	{ id: 'credits', label: 'Credits', icon: CreditCard },
	{ id: 'usage', label: 'Usage', icon: BarChart2 },
	{ id: 'settings', label: 'Settings', icon: Settings },
];

/**
 * SidebarNav
 * @description Application sidebar navigation with collapsible state and active route highlighting.
 * @param items - Navigation items array
 * @param activeItem - ID of the currently active item
 * @param onItemClick - Called with item id on click
 * @param collapsed - Whether sidebar is in collapsed (icon-only) mode
 * @param onCollapse - Toggle collapsed state
 */
export const SidebarNav = ({
	items = defaultNavItems,
	activeItem = 'dashboard',
	onItemClick,
	collapsed = false,
	onCollapse,
}: SidebarNavProps) => {
	return (
		<aside className={cn('flex h-[640px] flex-col border-r bg-white transition-all', collapsed ? 'w-16' : 'w-56')}>
			<div className='flex h-16 items-center gap-2 border-b px-4'>
				<div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground'>F</div>
				{!collapsed && <span className='font-semibold text-gray-950'>FlexPrice</span>}
			</div>
			<nav className='flex-1 space-y-1 p-2'>
				{items.map((item) => {
					const Icon = item.icon;
					const active = activeItem === item.id;
					return (
						<button
							key={item.id}
							type='button'
							className={cn(
								'flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-950',
								active && 'bg-primary/10 text-primary',
								collapsed && 'justify-center px-0',
							)}
							onClick={() => onItemClick?.(item.id)}
							title={collapsed ? item.label : undefined}>
							<Icon className='h-4 w-4 shrink-0' />
							{!collapsed && (
								<>
									<span className='flex-1 text-left'>{item.label}</span>
									{item.badge && <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600'>{item.badge}</span>}
								</>
							)}
						</button>
					);
				})}
			</nav>
			<div className='border-t p-2'>
				<button
					type='button'
					className='flex h-10 w-full items-center justify-center rounded-md text-gray-500 hover:bg-gray-50'
					onClick={onCollapse}>
					{collapsed ? <ChevronRight className='h-4 w-4' /> : <ChevronLeft className='h-4 w-4' />}
				</button>
			</div>
		</aside>
	);
};

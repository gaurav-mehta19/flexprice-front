import type { Meta, StoryObj } from '@storybook/react';
import { mockGraduatedPlan, mockTieredPlan } from '@/mocks/plans';
import { PricingTierTable } from './PricingTierTable';

const meta: Meta<typeof PricingTierTable> = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTable,
	tags: ['autodocs'],
	argTypes: {
		tiers: { control: 'object' },
		currency: { control: 'text' },
		billingModel: { control: 'select', options: ['per_unit', 'tiered', 'graduated', 'package'] },
		loading: { control: 'boolean' },
		showCalculator: { control: 'boolean' },
	},
	args: { tiers: mockTieredPlan.tiers, currency: mockTieredPlan.currency, billingModel: mockTieredPlan.billingModel },
};

export default meta;
type Story = StoryObj<typeof PricingTierTable>;

export const Tiered: Story = {};
export const Graduated: Story = {
	args: { tiers: mockGraduatedPlan.tiers, currency: mockGraduatedPlan.currency, billingModel: mockGraduatedPlan.billingModel },
};
export const Loading: Story = { args: { loading: true } };
export const WithCalculator: Story = { args: { showCalculator: true } };

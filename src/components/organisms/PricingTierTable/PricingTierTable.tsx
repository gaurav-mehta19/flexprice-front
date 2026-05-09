import { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import { Spinner } from '@/components/atoms/Spinner';
import { calculateTieredPrice, formatCurrency } from '@/lib/formatters';

export interface PricingTier {
	from: number;
	to: number | null;
	unitPrice: number;
	flatFee?: number;
	description?: string;
}

export interface PricingTierTableProps {
	tiers: PricingTier[];
	currency?: string;
	billingModel?: 'per_unit' | 'tiered' | 'graduated' | 'package';
	loading?: boolean;
	showCalculator?: boolean;
}

const formatRange = (tier: PricingTier) =>
	tier.to === null ? `${tier.from.toLocaleString()}+ units` : `${tier.from.toLocaleString()} - ${tier.to.toLocaleString()} units`;

/**
 * PricingTierTable
 * @description Displays tiered or graduated pricing structure in a readable table with an interactive price calculator.
 * @param tiers - Array of pricing tiers
 * @param currency - Currency code (default: 'USD')
 * @param billingModel - Pricing model type
 * @param loading - Show skeleton
 */
export const PricingTierTable = ({
	tiers,
	currency = 'USD',
	billingModel = 'tiered',
	loading = false,
	showCalculator = false,
}: PricingTierTableProps) => {
	const [quantity, setQuantity] = useState('10000');
	const total = calculateTieredPrice(tiers, Number(quantity || 0));

	if (loading) {
		return (
			<div className='flex min-h-48 items-center justify-center rounded-lg border bg-white'>
				<Spinner text='Loading tiers' />
			</div>
		);
	}

	return (
		<div className='overflow-hidden rounded-lg border bg-white'>
			<div className='border-b px-4 py-3'>
				<p className='text-sm font-semibold capitalize text-gray-950'>{billingModel} pricing</p>
			</div>
			<table className='w-full'>
				<thead className='bg-gray-50'>
					<tr>
						<th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Tier Range</th>
						<th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Unit Price</th>
						<th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Flat Fee</th>
						<th className='px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500'>Description</th>
					</tr>
				</thead>
				<tbody>
					{tiers.map((tier) => (
						<tr key={`${tier.from}-${tier.to}`} className='border-t'>
							<td className='px-4 py-3 text-sm text-gray-900'>{formatRange(tier)}</td>
							<td className='px-4 py-3 text-sm text-gray-700'>{formatCurrency(tier.unitPrice, currency)}</td>
							<td className='px-4 py-3 text-sm text-gray-700'>{formatCurrency(tier.flatFee ?? 0, currency)}</td>
							<td className='px-4 py-3 text-sm text-gray-500'>{tier.description}</td>
						</tr>
					))}
				</tbody>
			</table>
			{showCalculator && (
				<div className='flex items-end gap-4 border-t bg-gray-50 p-4'>
					<div className='w-48'>
						<Input label='Quantity' value={quantity} onChange={setQuantity} />
					</div>
					<div>
						<p className='text-xs uppercase text-gray-500'>Calculated total</p>
						<p className='text-xl font-semibold text-gray-950'>{formatCurrency(total, currency)}</p>
					</div>
				</div>
			)}
		</div>
	);
};

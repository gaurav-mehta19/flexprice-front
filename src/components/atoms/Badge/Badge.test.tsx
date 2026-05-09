import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
	it('renders active status', () => {
		render(<Badge status='active' />);
		expect(screen.getByText('Active')).toBeInTheDocument();
	});
	it('renders dot when dot=true', () => {
		const { container } = render(<Badge status='paid' dot />);
		expect(container.querySelector('.rounded-full')).toBeInTheDocument();
	});
	it('renders custom label override', () => {
		render(<Badge status='active' label='Live' />);
		expect(screen.getByText('Live')).toBeInTheDocument();
	});
});

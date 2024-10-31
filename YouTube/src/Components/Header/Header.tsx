import {
	ArrowLeft,
	Bell,
	Menu,
	Mic,
	Search,
	Upload,
	User,
	Youtube,
} from 'lucide-react';
import { Button } from '../Button/Button';
import { useState } from 'react';

import { useSidebarContext } from '../../contexts/SidebarContext';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex sm:gap-10 md:gap-20 justify-between pt-2 mb-6 mx-4">
			<PageHeaderFirstSection hidden={isOpen} />
			<form
				className={`gap-4 flex-grow justify-center ${
					isOpen ? 'flex' : 'hidden md:flex '
				}`}
			>
				{isOpen && (
					<Button
						onClick={() => {
							setIsOpen(false);
						}}
						type="button"
						size="icon"
						variant="ghost"
						className="flex-shrink-0"
					>
						<ArrowLeft />
					</Button>
				)}

				<div className="flex flex-grow max-w-[600px]">
					<input
						type="search"
						placeholder="Search"
						className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
					/>
					<Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0	">
						<Search />
					</Button>
				</div>

				<Button type="button" size="icon" className="flex-shrink-0">
					<Mic />
				</Button>
			</form>

			<div className={`flex-shrink-0 md:gap-2 ${isOpen ? 'hidden' : 'flex'}`}>
				<Button
					onClick={() => {
						setIsOpen(true);
					}}
					size="icon"
					variant="ghost"
					className="md:hidden"
				>
					<Search />
				</Button>
				<Button size="icon" variant="ghost" className="md:hidden">
					<Mic />
				</Button>
				<Button>
					<Upload />
				</Button>
				<Button>
					<Bell />
				</Button>
				<Button>
					<User />
				</Button>
			</div>
		</div>
	);
};

export default Header;

interface PageHeaderFirstSectionProps {
	hidden?: boolean;
}

export function PageHeaderFirstSection({
	hidden = false,
}: PageHeaderFirstSectionProps) {
	const { toggle } = useSidebarContext();
	return (
		<div
			className={`gap-4 items-center flex-shrink-0 ${
				hidden ? 'hidden ' : 'flex'
			}`}
		>
			<Button onClick={toggle} variant="ghost" size="icon">
				<Menu />
			</Button>
			<a className="flex gap-2" href="/">
				<Youtube />
				YouTube
			</a>
		</div>
	);
}

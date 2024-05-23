import { ChevronDown, ChevronUp, Home, User } from 'lucide-react';
import { Children, ReactNode, useState } from 'react';
import {
	MdHistory,
	MdOutlineFeedback,
	MdOutlineHelpOutline,
	MdOutlineSmartDisplay,
	MdOutlineSportsVolleyball,
	MdOutlineSubscriptions,
	MdOutlineVideoLibrary,
	MdOutlineWatchLater,
	MdOutlinedFlag,
	MdSettings,
	MdThumbUpOffAlt,
} from 'react-icons/md';
import { SiYoutubeshorts } from 'react-icons/si';

import { Link } from 'react-router-dom';
import { Button } from './Button';
import { TbDeviceGamepad2, TbMusic } from 'react-icons/tb';
import { GiFilmStrip } from 'react-icons/gi';
import { useSidebarContext } from '@/context/SidebarContext';


export function SideBar() {
	const { isLargeOpen, isSmallOpen } = useSidebarContext();

	const mainLinks = [
		{
			name: 'Home',
			url: '/',
			icon: <Home />,
		},
		{
			name: 'Shorts',
			url: '/shorts',
			icon: <SiYoutubeshorts />,
		},
		{
			name: 'Subscriptions',
			url: '/subscription',
			icon: <MdOutlineSubscriptions />,
		},
		{
			name: 'You',
			url: '/feed/you',
			icon: <User />,
		},
	];

	const secondaryLinks = [
		{
			icon: <MdOutlineVideoLibrary />,
			name: 'Library',
			url: '/library',
		},
		{
			icon: <MdHistory />,
			name: 'History',
			url: '/history',
		},
		{
			icon: <MdOutlineSmartDisplay />,
			name: 'Your Videos',
			url: '/your-videos',
		},
		{
			icon: <MdOutlineWatchLater />,
			name: 'Watch Later',
			url: '/watch-later',
		},
		{
			icon: <MdThumbUpOffAlt />,
			name: 'Liked Videos',
			url: '/liked',
		},
	];

	const subscriptionLinks = [
		{
			icon: <TbMusic />,
			name: 'Music',
			url: '/music',
		},
		{
			icon: <MdOutlineSportsVolleyball />,
			name: 'Sports',
			url: '/sports',
		},
		{
			icon: <TbDeviceGamepad2 />,
			name: 'Gaming',
			url: '/gaming',
		},
		{
			icon: <GiFilmStrip />,
			name: 'Films',
			url: '/films',
		},
	];

	const helpLinks = [
		{
			icon: <MdSettings />,
			name: 'Settings',
			url: '/settings',
		},
		{
			icon: <MdOutlinedFlag />,
			name: 'Report a problem',
			url: '/settings',
		},
		{
			icon: <MdOutlineHelpOutline />,
			name: 'Help',
			url: '/help',
		},
		{
			icon: <MdOutlineFeedback />,
			name: 'Send Feedback',
			url: '/feedback',
		},
	];
	return (
		<>
			<aside
				className={`w-[5rem]   flex-col text-white bg-[#1c1b1b] ${
					isLargeOpen
						? ' hidden '
						: '  md:flex md:transition-all '
				}`}
			>
				<ul>
					{mainLinks.map((item) => (
						<Link
							className="flex gap-3 flex-col my-2 py-3 items-center w-4/5 pr-2 pl-1 mx-auto rounded-lg hover:bg-zinc-800 "
							to={item.url}
							key={item.name}
						>
							<div className="text-xl ">{item.icon}</div>
							<div className="text-xs">{item.name}</div>
						</Link>
					))}
				</ul>
			</aside>
			<aside
				className={` md:w-[14.9rem] md:sticky overflow-y-auto absolute scrollbar-hidden flex-col scroll-smooth ${
					isLargeOpen
						? ' md:flex  '
						: ' md:hidden '
				}
				${isSmallOpen ? ' flex z-[999] bg-[#1c1b1b]' : 'hidden'}`}
			>
				<LargeSideBarSection>
					<ul className="flex flex-col gap-3  ml-2 mr-3 mt-2   ">
						{mainLinks
							.filter(({ name }) => 'You' != name)
							.map(({ name, icon, url }) => (
								<Link
									to={url}
									className=" rounded-lg flex gap-5 p-3 items-center text-sm  hover:bg-[#323030]"
									key={name}
								>
									<div className="text-xl">{icon}</div>
									<div>{name}</div>
								</Link>
							))}
					</ul>
				</LargeSideBarSection>
				<hr />
				<LargeSideBarSection>
					<ul className="flex flex-col gap-3  ml-2 mr-3">
						{secondaryLinks.map(({ icon, name, url }) => (
							<Link
								className="flex gap-5 p-3 rounded-lg text-sm  hover:bg-[#323030] "
								key={name}
								to={url}
							>
								<div className="text-xl">{icon}</div>
								<div className="">{name}</div>
							</Link>
						))}
					</ul>
				</LargeSideBarSection>
				<hr />
				<LargeSideBarSection>
					<ul className="flex flex-col gap-3  ml-2 mr-3">
						{subscriptionLinks.map(({ icon, name, url }) => (
							<Link
								className="flex gap-5 p-3 text-sm rounded-lg  hover:bg-[#323030]"
								key={name}
								to={url}
							>
								<div className="text-xl">{icon}</div>
								<div>{name}</div>
							</Link>
						))}
					</ul>
				</LargeSideBarSection>
				<hr />

				<LargeSideBarSection>
					<ul className="flex flex-col gap-3 ml-2 mr-3 ">
						{helpLinks.map(({ icon, name, url }) => (
							<Link
								className="flex gap-5 text-sm  hover:bg-[#323030] p-3 rounded-lg"
								to={url}
								key={name}
							>
								<div className="text-xl">{icon}</div>
								<div>{name}</div>
							</Link>
						))}
					</ul>
				</LargeSideBarSection>
			</aside>
		</>
	);
}

interface LargeSideBarSectionProps {
	className?: string;
	children: ReactNode;
	visibleCount?: number;
	title?: string;
}

const LargeSideBarSection = ({
	className,
	children,
	title,
	visibleCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const childrenArray = Children.toArray(children).flat();
	const visibleChildren = isExpanded
		? childrenArray
		: childrenArray.slice(0, visibleCount);
	const showExpandButton = childrenArray.length > visibleCount;

	const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

	return (
		<div className={`bg-[#1c1b1b] ${className} py-2   text-white `}>
			{title && <div className="ml-4 text-lg mb-1">{title}</div>}
			{visibleChildren}
			{showExpandButton && (
				<Button
					variant="ghost"
					onClick={() => setIsExpanded((e) => !e)}
					className="w-full flex items-center rounded-lg gap-4 p-3"
				>
					<ButtonIcon className="w-6 h-6 " />
					<div>{isExpanded ? 'Show Less' : 'Show More'}</div>
				</Button>
			)}
		</div>
	);
};

export default SideBar;

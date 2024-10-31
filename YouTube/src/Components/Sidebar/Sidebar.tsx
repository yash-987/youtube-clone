import { Children, ElementType, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { CiHome } from 'react-icons/ci';
import { Button, buttonStyles } from '../Button/Button';
import { twMerge } from 'tailwind-merge';
import { Home } from 'lucide-react';
import {
	ChevronDown,
	History,
	ChevronUp,
	Clapperboard,
	Clock,
	Library,
	PlaySquare,
	Repeat,
	ListVideo,
	Flame,
	ShoppingBag,
	Music2,
	Film,
	Radio,
	Gamepad2,
	Newspaper,
	Trophy,
	Lightbulb,
	Podcast,
	Shirt,
} from 'lucide-react';
import { playlists, subscriptions } from '../../Data/Sidebar';
import { useSidebarContext } from '../../contexts/SidebarContext';
import { PageHeaderFirstSection } from '../Header/Header';

const Sidebar = () => {
	const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
	return (
		<>
			<motion.div
				animate={{
					x: isLargeOpen ? '-100%' : 0,
				}}
				initial={false}
				transition={{ duration: 0.1, delay: 0.01 }}
				className={`sticky top-0 overflow-y-auto scrollbar-hidden hidden   pb-4  flex-col ml-1
				${isLargeOpen ? 'md:hidden' : 'md:flex'}
				`}
			>
				<SmallSidebarItem Icon={CiHome} title="Home" url="/" />
				<SmallSidebarItem Icon={Repeat} title="Repeat" url="/shorts" />
				<SmallSidebarItem
					Icon={Clapperboard}
					title="Subscription"
					url="/subscription"
				/>
				<SmallSidebarItem Icon={Library} title="Library" url="/library" />
			</motion.div>
			{isSmallOpen && (
				<div
					onClick={close}
					className="md:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
				/>
			)}
			<motion.div
				animate={{
					x: isSmallOpen || isLargeOpen ? 0 : '-100%',
				}}
				className={`w-56 lg:sticky absolute  overflow-y-auto  top-0 scrollbar-hidden  pb-4 flex-col gap-2 px-2 ${
					isLargeOpen ? 'md:flex ' : 'md:hidden'
				} ${isSmallOpen ? 'flex z-[999] bg-white max-h-screen' : 'hidden'}`}
			>
			<div className='md:hidden pt-2 pb-4 px-2 sticky top-0'>
<PageHeaderFirstSection/>
				</div>
				<LargeSidebarSection>
					<LargeSidebarItem isActive Icon={Home} title="Home" url="/" />

					<LargeSidebarItem
						Icon={Clapperboard}
						title="Subscriptions"
						url="/subscriptions"
					/>
				</LargeSidebarSection>

				<hr />

				<LargeSidebarSection visibleCount={5}>
					<LargeSidebarItem Icon={Library} title="Library" url="/library" />
					<LargeSidebarItem Icon={History} title="History" url="/history" />
					<LargeSidebarItem
						Icon={PlaySquare}
						title="Your Videos"
						url="/your-videos"
					/>

					<LargeSidebarItem
						Icon={Clock}
						title="Watch Later"
						url="/playlist?list=WL"
					/>

					{playlists.map((playlist) => (
						<LargeSidebarItem
							key={playlist.id}
							Icon={ListVideo}
							title={playlist.name}
							url={`/playlist?list=${playlist.id}`}
						/>
					))}
				</LargeSidebarSection>

				<hr />

				<LargeSidebarSection title="Subscriptions">
					{subscriptions.map((subscription) => (
						<LargeSidebarItem
							key={subscription.id}
							Icon={subscription.imgUrl}
							title={subscription.channelName}
							url={`/@${subscription.id}`}
						/>
					))}
				</LargeSidebarSection>

				<hr />

				<LargeSidebarSection title="Explore">
					<LargeSidebarItem Icon={Flame} title="Trending" url="/trending" />
					<LargeSidebarItem
						Icon={ShoppingBag}
						title="Shopping"
						url="/shopping"
					/>
					<LargeSidebarItem Icon={Music2} title="Music" url="/music" />
					<LargeSidebarItem Icon={Film} title="Movies & TV" url="/movies-tv" />
					<LargeSidebarItem Icon={Radio} title="Live" url="/live" />
					<LargeSidebarItem Icon={Gamepad2} title="Gaming" url="/gaming" />
					<LargeSidebarItem Icon={Newspaper} title="News" url="/news" />
					<LargeSidebarItem Icon={Trophy} title="Sports" url="/sports" />
					<LargeSidebarItem Icon={Lightbulb} title="Learning" url="/learning" />
					<LargeSidebarItem
						Icon={Shirt}
						title="Fashion & Beauty"
						url="/fashion-beauty"
					/>
					<LargeSidebarItem Icon={Podcast} title="Podcasts" url="/podcasts" />
				</LargeSidebarSection>
			</motion.div>
		</>
	);
};

interface SmallSidebarItemProps {
	Icon: ElementType | string;
	title: string;
	url: string;
}

function SmallSidebarItem({
	Icon,
	title,
	url,
	...props
}: SmallSidebarItemProps) {
	return (
		<a
			href={url}
			className={twMerge(
				buttonStyles({ variant: 'ghost' }),
				'py-4 px-1 flex flex-col items-center rounded-lg gap-1'
			)}
			{...props}
		>
			<Icon className="w-6 h-6" />
			<div className="text-sm">{title}</div>
		</a>
	);
}

interface LargeSidebarSectionProps {
	children: ReactNode;
	visibleCount?: number;
	title?: string;
}

function LargeSidebarSection({
	children,
	title,
	visibleCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const childrenArray = Children.toArray(children).flat();
	const visibleChildren = isExpanded
		? childrenArray
		: childrenArray.slice(0, visibleCount);
	const showExpandButton = childrenArray.length > visibleCount;

	const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
	return (
		<div>
			{title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
			{visibleChildren}
			{showExpandButton && (
				<Button
					onClick={() => {
						setIsExpanded((e) => !e);
					}}
					variant="ghost"
					className="w-full flex items-center rounded-lg gap-4 p-3"
				>
					<ButtonIcon className="w-6 h-6" />
					<div>{isExpanded ? 'Show Less' : 'Show More'}</div>
				</Button>
			)}
		</div>
	);
}

interface LargeSidebarItemProps extends SmallSidebarItemProps {
	isActive?: boolean;
}

function LargeSidebarItem({
	Icon,
	title,
	url,
	isActive,
	...props
}: LargeSidebarItemProps) {
	return (
		<a
			href={url}
			className={twMerge(
				buttonStyles({ variant: 'ghost' }),
				`w-full flex items-center rounded-lg gap-4 p-3 ${
					isActive ? 'font-bold bg-neutral-100 hover:bg-secondary' : undefined
				}`
			)}
			{...props}
		>
			{typeof Icon === 'string' ? (
				<img src={Icon} className="w-6 h-6 rounded-full" />
			) : (
				<Icon className="w-6 h-6" />
			)}
			<div className="whitespace-nowrap overflow-hidden text-ellipsis ">
				{title}
			</div>
		</a>
	);
}
export default Sidebar;

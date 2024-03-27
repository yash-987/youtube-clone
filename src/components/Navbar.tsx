import { Bell, Menu, Mic, Video } from 'lucide-react';
import { Button } from './Button';
import { BsYoutube } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useSidebarContext } from '@/context/SidebarContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isSmallSearchOpen, setIsSmallSearchOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const inputref = useRef<HTMLInputElement>(null);

	const handleClickOutside = (e: Event) => {
		if (
			(e.target as HTMLElement).closest('.search-icon') === null &&
			(e.target as HTMLElement).closest('.input') === null
		) {
			setIsSmallSearchOpen(false);
		}
	};

	useEffect(() => {
		if (isSmallSearchOpen) inputref.current?.focus();
	}, [isSmallSearchOpen, setIsSmallSearchOpen]);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div
			className={`bg-[#1c1b1b]  h-12 md:h-14  justify-between items-center flex`}
		>
			<PageHeaderFirstSection hidden={isOpen} />

			<div className={` gap-4 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
				<form className={`flex items-center `}>
					<Button variant="ghost" className="text-3xl md:hidden mx-2 ">
						<a href="/">
							<BiLeftArrowAlt />
						</a>
					</Button>
					<FiSearch
						className={` bg-transparent text-white mt-[1px] text-[38px]  pl-2 py-[9px] border-blue-500 border border-r-0   outline-none rounded-l-3xl ${
							isSmallSearchOpen ? 'flex ' : 'hidden'
						}`}
					/>
					<input
						ref={inputref}
						onFocus={() => {
							setIsSmallSearchOpen(true);
						}}
						onClick={(e) => e.stopPropagation()}
						onBlur={() => {
							setIsSmallSearchOpen(false);
						}}
						type="search"
						placeholder="Search"
						className={` input border shadow-inner   w-[18rem] text-white pr-2  text-lg  outline-none  ${
							isSmallSearchOpen
								? 'border-blue-500  border-l-0 pl-1 md:pl-2  '
								: 'rounded-l-full pl-4 md:pl-6 border-zinc-700 '
						}  md:w-[33rem]   py-1   bg-transparent`}
					/>

					<div className="border bg-zinc-800 group border-gray-600 px-5 py-2  border-l-0 rounded-r-full cursor-pointer ">
						<FiSearch className="text-white text-xl " />
						<p className="bg-gray-500 text-white p-1 rounded-sm absolute top-[3.8rem] left-[63.6%] text-sm hidden group-hover:flex">
							Search
						</p>
					</div>

					<Button variant="secondary" size="default" className="ml-3 group ">
						<Mic />
						<p className="bg-gray-500 font-normal text-sm p-1 rounded-sm absolute top-[3.8rem] hidden group-hover:flex">
							Search with your voice
						</p>
					</Button>
				</form>
			</div>

			<div
				className={`  gap-1 md:gap-3 md:h-full  md:mr-2  items-center px-4 ${
					isOpen ? 'hidden md:flex' : 'flex'
				} `}
			>
				<Button
					onClick={() => {
						setIsOpen(true);
						setIsSmallSearchOpen(true);
					}}
					className=" search-icon md:hidden"
					variant="ghost"
					size="default"
				>
					<FiSearch className="text-2xl" />
				</Button>
				<Button variant="ghost" className="md:hidden">
					<Mic />
				</Button>

				<Button className="group" variant="ghost" size="default">
					<Video />
					<p className="bg-gray-500 font-normal text-sm  p-1 rounded-sm  absolute top-[3.8rem] hidden group-hover:flex">
						Create
					</p>
				</Button>

				<Button variant="ghost" className="group" size="default">
					<Bell />
					<p className="bg-gray-500  font-normal p-1 rounded-sm absolute top-[3.8rem] right-10 text-sm hidden group-hover:flex">
						Notifications
					</p>
				</Button>
				<a href="/watch">
					<img
						src="https://yt3.ggpht.com/yti/ANjgQV8mPDr6Bry45PpI1TquP5GQ3SK4oQhGmXgN8g=s88-c-k-c0x00ffffff-no-rj"
						className=" h-8 w-8 rounded-full"
						alt=""
					/>
				</a>
			</div>
		</div>
	);
};

export default Navbar;

interface PageHeaderFirstSectionProps {
	hidden: boolean;
}

export function PageHeaderFirstSection({
	hidden = false,
}: PageHeaderFirstSectionProps) {
	const { toggle } = useSidebarContext();

	return (
		<div
			className={`${hidden ? 'hidden' : 'flex'}
					
				 gap-1 md:gap-3 ml-2  text-white  `}
		>
			<Button
				variant="ghost"
				size="default"
				className=" flex-shrink-0 "
				onClick={() => {
					toggle();
				}}
			>
				<Menu />
			</Button>

			<Link to="/" className="flex items-center  gap-1  text-xl   text-white \">
				<BsYoutube className="text-red-600 z-10   text-3xl md:text-4xl " />

				<p>Youtube</p>
			</Link>
		</div>
	);
}

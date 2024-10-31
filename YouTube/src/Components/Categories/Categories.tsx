import { ChevronDown } from 'lucide-react';
import { Button } from '../Button/Button';
import { useRef, useState, useTransition } from 'react';
import { animate, delay, motion } from 'framer-motion';

type CategoryProps = {
	categories: string[];
	selectedCategory: string;
	onSelect: (category: string) => void;
	hoverCategories: string[];
};

// const TRANSLATE_AMOUNT = 200;
const Categories = ({
	categories,
	selectedCategory,
	onSelect,
	hoverCategories,
}: CategoryProps) => {
	// const [translate, setTranslate] = useState(0);
	// const [isLeftVisible, setIsLeftVisible] = useState(false);
	// const [isRightVisible, setIsRightVisible] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	const [show, setShow] = useState(false);

	const handleMouseEnter = () => {
		setShow(true);
	};

	const handleMouseLeave = () => {
		setShow(false);
	};
	//useEffect(() => {
	// 	if (containerRef.current === null) return;

	// 	const observer = new ResizeObserver((entries) => {
	// 		const container = entries[0]?.target;

	// 		if (container == null) return;

	// 		setIsLeftVisible(translate > 0);

	// 		setIsRightVisible(
	// 			translate + container.clientWidth < container.scrollWidth
	// 		);
	// 	});

	// 	observer.observe(containerRef.current);

	// 	return () => {
	// 		observer.disconnect();
	// 	};
	// }, [categories, translate]);

	return (
		<div
			onMouseLeave={handleMouseLeave}
			ref={containerRef}
			className={`overflow-x-hidden  relative ${show ? null : 'pb-12'}`}
		>
			<div
				className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
				// style={{ transform: `translateX(-${translate}px)` }}
			>
				{categories.map((category) => (
					<Button
						key={category}
						onClick={() => {
							onSelect(category);
						}}
						variant={selectedCategory === category ? 'dark' : 'default'}
						className="py-1 px-3 rounded-lg whitespace-nowrap"
					>
						{category}
					</Button>
				))}
			</div>

			<motion.div
				animate={{ y: show ? 0 : '-70%', opacity: show ? 1 : 0 }}
				initial={false}
				transition={{ duration: 0.2, delay: 0.16 }}
				className={`${
					show ? 'flex   ' : 'hidden'
				}  gap-3  my-2  transition-transform w-[max-content] `}
			>
				{hoverCategories.map((category) => (
					<Button
						key={category}
						variant={selectedCategory === category ? 'dark' : 'default'}
						className="py-1 px-3 rounded-lg whitespace-nowrap"
						onClick={() => {
							onSelect(category);
						}}
					>
						{category}
					</Button>
				))}
			</motion.div>

			<motion.div
				onMouseMove={handleMouseEnter}
				animate={{ y: show ? 10 : 0 }}
				className={`absolute  my-1   w-full h-3 ${show && 'hidden'}  `}
			>
				<ChevronDown className="absolute left-1/2 " />
			</motion.div>

			{/* {isLeftVisible && (
				<div className="absolute left--0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
					<Button
						variant="ghost"
						size="icon"
						className="h-full aspect-sqaure w-auto p-1.5"
						onClick={() => {
							setTranslate((translate) => {
								const newTranslate = translate - TRANSLATE_AMOUNT;
								if (newTranslate <= 0) return 0;
								return newTranslate;
							});
						}}
					>
						<ChevronLeft />
					</Button>
				</div>
			)}
			{isRightVisible && (
				<div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
					<Button
						variant="ghost"
						size="icon"
						className="h-full aspect-square w-auto p-1.5"
						onClick={() => {
							setTranslate((translate) => {
								if (containerRef.current == null) {
									return translate;
								}
								const newTranslate = translate + TRANSLATE_AMOUNT;
								const edge = containerRef.current.scrollWidth;
								const width = containerRef.current.clientWidth;

								if (newTranslate + width >= edge) return edge - width;
								return newTranslate;
							});
						}}
					>
						<ChevronRight />
					</Button>
				</div>
			)} */}
		</div>
	);
};

export default Categories;

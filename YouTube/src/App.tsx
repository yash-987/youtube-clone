import { useState } from 'react';
import Header from './Components/Header/Header';
import Categories from './Components/Categories/Categories';
import { categories, hoverCategories, videos } from './Data/home';
import VideoGridItem from './Components/VideoGrid/VideoGridItem';
import Sidebar from './Components/Sidebar/Sidebar';
import { SidebarProvider } from './contexts/SidebarContext';

function App() {
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);

	return (
		<>
			<SidebarProvider>
			<div className="max-h-screen flex flex-col">
				<Header />
				<div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
					<Sidebar />
					<div className="overflow-x-hidden px-8 pb-4 ">
						<div className="sticky top-0 bg-white z-10  ">
							<Categories
								categories={categories}
								onSelect={setSelectedCategory}
								hoverCategories={hoverCategories}
								selectedCategory={selectedCategory}
							/>
						</div>

						<div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
							{videos.map((video) => (
								<VideoGridItem key={video.id} {...video} />
							))}
						</div>
					</div>
				</div>
			</div>
			</SidebarProvider>
		
		</>
	);
}

export default App;

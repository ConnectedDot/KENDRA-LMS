import React from "react";
import {
	MdArrowBackIos,
	MdArrowForward,
	MdArrowForwardIos,
} from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import './custom.css';

const responsive = {
	desktop: {
		breakpoint: {max: 3000, min: 1024},
		items: 4,
		slidesToSlide: 4,
	},
	tablet: {
		breakpoint: {max: 1024, min: 464},
		items: 3,
		slidesToSlide: 3,
	},
	mobile: {
		breakpoint: {max: 464, min: 0},
		items: 1,
		slidesToSlide: 1,
		padding: -10,
	},
};

interface CarouselComponentProps {
	children: React.ReactNode;
	deviceType?: string;
	carouselState?: any;
}

interface CarouselState {
	currentSlide: number;
}

interface CarouselRestProps {
	carouselState?: any;
	currentSlide?: number;
	next?: () => void;
	previous?: () => void;
	goToSlide?: (slide: number) => void;
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({
	children,
	deviceType,
}) => {
	const ButtonGroup = ({
		next,
		previous,
		goToSlide,
		...rest
	}: CarouselRestProps) => {
		const {
			carouselState: {currentSlide},
		} = rest;
		return (
			<div className="-mt-28 carousel-button-group absolute inset-y-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 mb-24">
				<div
					className={`bg-black hover:bg-gray-800 text-white  p-0 rounded-full w-14 h-14 flex items-center justify-center ${
						currentSlide === 0 ? "hidden opacity-50 cursor-not-allowed" : ""
					} -ml-14`}
					onClick={() => previous && previous()}
				>
					<MdArrowBackIos style={{fontSize: "12px"}} />
				</div>
				<div
					className={`bg-black hover:bg-gray-800 text-white p-0 rounded-full w-14 h-14  flex items-center justify-center ${
						currentSlide === 0 ? "!hidden" : ""
					} -mr-14`}
					onClick={() => next && next()}
				>
					<MdArrowForwardIos style={{fontSize: "12px"}} />
				</div>
			</div>
		);
	};

	return (
		<div className="relative custom-carousel">
			<Carousel
				responsive={responsive}
				arrows={false}
				renderButtonGroupOutside={true}
				customButtonGroup={<ButtonGroup />}
				swipeable={true}
				draggable={true}
				showDots={true}
				infinite={true}
				autoPlaySpeed={1000}
				keyBoardControl={true}
				customTransition="all .5"
				transitionDuration={500}
				containerClass="carousel-container"
				deviceType={deviceType}
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding"
			>
				{children}
			</Carousel>
		</div>
	);
};

export default CarouselComponent;

/** @format */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HeaderSection = () => {
  const classes = [
    "/images/img11.jpg",
    "/images/img12.jpg",
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="h-[50vh] sm:h-[60vh] md:h-[calc(100vh-4rem)] absolute top-0 left-0 mx-auto w-full -z-10 ">
      <Carousel
        swipeable={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
      >
        {classes.map((item) => {
          return (
            <div className="relative bg-image h-[50vh] sm:h-[60vh] md:h-[calc(100vh-4rem)] w-full flex items-center justify-center">
              <img
                src={item}
                alt=""
                className="absolute object-fill w-full h-full"
                fill
                objectFit="cover"
                quality={100}
              />
              <div className="absolute flex items-center justify-center">
                <h1
                  className="text-center font-semibold text-2xl sm:text-4xl capitalize text-[#DACAB1] z-20 max-w-md"
                  style={{ lineHeight: "50px" }}
                >
                  Enjoy Your dream places around the{" "}
                  <span
                    style={{ WebkitTextStroke: "1px #DACAB1" }}
                    className="text-transparent font-extrabold"
                  >
                    World
                  </span>
                </h1>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeaderSection;

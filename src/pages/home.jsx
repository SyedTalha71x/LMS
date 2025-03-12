/* eslint-disable no-unused-vars */
import HomeImage from "../../public/Group 11.svg";

const Home = () => {
  return (
    <div id="home" className="h-full bg-[#F9FAFC]">
      <main className="md:w-[85%] w-full mx-auto px-6 py-8 md:py-16">
        <div className="flex flex-col md:gap-10 gap-0 md:flex-row items-center">
          <div className="md:w-1/2 md:mt-24 mt-12 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-4xl karma lg:text-6xl font-bold text-gray-900 leading-tight mb-2">
              Getting Pharma Education is now more Easy
            </h1>
            <p className="text-gray-600 mb-6 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
            </p>
            <button className="bg-[#0B5D3A] cursor-pointer text-sm text-white px-13 py-2 rounded-lg font-medium">
              CTA
            </button>
          </div>

          <div className="relative">
            <div className="">
              <img src={HomeImage} className="h-full w-full" alt="" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

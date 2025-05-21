import React from 'react';
import Group from '../../public/Frame 17259.svg'; 

const AboutUs = () => {
    return (
        <div className="w-full bg-[#F9FAFC] py-10" id='about'>
            <div className="text-center px-4 mt-16">
                <h1 className="text-4xl md:text-5xl font-bold text-black karma mb-4">About Us</h1>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
            </div>

            <main className="max-w-7xl mx-auto px-6 flex mt-18 flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-14">
               
                <div className="md:w-1/2 flex justify-center ">
                    <img src={Group} alt="About us illustration" className="w-full max-w-md h-auto" />
                </div>

                <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-gray-600 text-base leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. <br /><br />
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </p>
                </div>

               
            </main>
        </div>
    );
};

export default AboutUs;

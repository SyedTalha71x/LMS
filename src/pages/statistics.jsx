import React from "react";

const statistics = () => {
  return (
    <section className="w-full bg-[#0B5D3A] md:p-14 p-10 mt-8">
      <div className="md:w-[90%] w-full mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-10 text-white text-center">
          <div className="flex flex-col items-center md:border-r border-white">
            <div className="text-2xl md:text-3xl font-bold karma mb-1">8200</div>
            <div className="text-sm md:text-base poppins-thin">Success Stories</div>
          </div>

          <div className="flex flex-col items-center md:border-r border-white">
            <div className="text-2xl md:text-3xl font-bold karma mb-1">12200</div>
            <div className="text-sm md:text-base poppins-thin">Expert Mentors</div>
          </div>

          <div className="flex flex-col items-center md:border-r border-white">
            <div className="text-2xl md:text-3xl font-bold karma mb-1">50000</div>
            <div className="text-sm md:text-base poppins-thin">Hours Course</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-2xl md:text-3xl font-bold karma mb-1">70000</div>
            <div className="text-sm md:text-base poppins-thin">Active Student</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default statistics;

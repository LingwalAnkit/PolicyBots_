import React, { useState, useEffect } from 'react';

const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const InsuranceSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 0,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center w-10/12 md:w-8/12 mx-auto">
          <Card className="bg-orange-500 text-white  p-2 md:p-5 h-48">
            <h3 className="text-sm md:text-lg font-bold">Health Insurance 1</h3>
            <p className="text-xs md:text-sm">Health insurance plan with comprehensive coverage.</p>
          </Card>
          <Card className="bg-green-500 text-white p-4 md:p-4 h-48">
            <h3 className="text-sm md:text-lg font-bold">Health Insurance 2</h3>
            <p className="text-xs md:text-sm">Budget-friendly health insurance for families.</p>
          </Card>
          <Card className="bg-blue-500 text-white p-2 md:p-5 h-48">
            <h3 className="text-sm md:text-lg font-bold">Health Insurance 3</h3>
            <p className="text-xs md:text-sm">Exclusive health insurance for senior citizens.</p>
          </Card>
        </div>
      ),
    },
    {
      id: 1,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center w-10/12 md:w-8/12 mx-auto">
          <Card className="bg-yellow-500 text-white p-2 md:p-5 h-48">
            <h3 className="text-sm md:text-lg font-bold">Life Insurance 1</h3>
            <p className="text-xs md:text-sm">Life insurance with flexible premium options.</p>
          </Card>
          <Card className="bg-red-500 text-white p-2 md:p-5 h-48">
            <h3 className="text-sm md:text-lg font-bold">Life Insurance 2</h3>
            <p className="text-xs md:text-sm">Term life insurance with affordable rates.</p>
          </Card>
          <Card className="bg-purple-500 text-white p-2 md:p-5 h-48">
            <h3 className="text-sm md:text-lg font-bold">Life Insurance 3</h3>
            <p className="text-xs md:text-sm">Comprehensive life insurance with rider benefits.</p>
          </Card>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center w-10/12 md:w-8/12 mx-auto">
          <Card className="bg-indigo-500 text-white p-2 md:p-5 h-48">
            <h3 className="text-sm md:text-lg font-bold">Investment Plan 1</h3>
            <p className="text-xs md:text-sm">Invest ₹10K and grow your wealth exponentially.</p>
          </Card>
          <Card className="bg-teal-500 text-white p-2 md:p-5 h-48">
            <h3 className="text-sm md:text-lg font-bold">Investment Plan 2</h3>
            <p className="text-xs md:text-sm">Long-term investment with assured returns.</p>
          </Card>
          <Card className="bg-pink-500 text-white p-2 md:p-5 h-48">
            <h3 className="text-sm md:text-lg font-bold">Investment Plan 3</h3>
            <p className="text-xs md:text-sm">SIP plans to secure your future.</p>
          </Card>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000); 

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [slides.length]);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  const activeSlideData = slides[activeSlide];

  return (
    <div className="flex flex-col gap-2 items-center justify-center pt-8">
      <div className="w-full">{activeSlideData.content}</div>

      <div className="flex justify-center space-x-2 mt-4 mb-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === activeSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

const SectionOne = () => {
  return (
    <div className="w-full pb-4 pt-4">
      <InsuranceSlider />

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mt-4 mb-2">What makes</h2>
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Policy Bots one of</h1>
        <h2 className="text-2xl font-bold mb-2">India's favourite places</h2>
        <p className="text-xl">to buy insurance?</p>
      </div>
    </div>
  );
};

export default SectionOne;

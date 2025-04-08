
import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">About Us</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Our Story</h2>
        <p className="text-gray-600 mb-4">
          Founded in 2025, our company began with a simple idea: create websites that are easy to use and navigate. 
          We believe that simplicity is the ultimate sophistication.
        </p>
        <p className="text-gray-600">
          Our team consists of passionate individuals who are dedicated to creating clean, efficient web experiences.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Our Values</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">Simplicity</h3>
            <p className="text-gray-600">We believe in keeping things simple and straightforward.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Clarity</h3>
            <p className="text-gray-600">Clear communication and transparent practices guide our work.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Efficiency</h3>
            <p className="text-gray-600">We value efficient solutions that save time and resources.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-700">Jane Doe</h3>
            <p className="text-gray-600 text-sm">Founder & CEO</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-700">John Smith</h3>
            <p className="text-gray-600 text-sm">Lead Designer</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-700">Emily Johnson</h3>
            <p className="text-gray-600 text-sm">Developer</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-700">Michael Brown</h3>
            <p className="text-gray-600 text-sm">Marketing Specialist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

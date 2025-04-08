
import React from 'react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Our Simple Website</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          We strive to provide simple, user-friendly web experiences that focus on what matters most. 
          Our minimalist approach ensures fast loading times and intuitive navigation.
        </p>
        <p className="text-gray-600">
          This website demonstrates clean design principles with straightforward functionality.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Simple Features</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Clean, responsive design</li>
            <li>Fast loading times</li>
            <li>Easy navigation</li>
            <li>Mobile-friendly interface</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Why Choose Us</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Focus on user experience</li>
            <li>No unnecessary complexity</li>
            <li>Straightforward information</li>
            <li>Easy to understand content</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

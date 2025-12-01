'use client';

import { useState } from 'react';
import BirthChartForm from '@/components/forms/BirthChartForm';
import AstrologyChart from '@/components/charts/AstrologyChart';

// Sample chart data for demonstration
const sampleChartData = {
  houses: [
    { number: 1, sign: 'Aries', planets: ['Sun', 'Mercury'] },
    { number: 2, sign: 'Taurus', planets: [] },
    { number: 3, sign: 'Gemini', planets: ['Venus'] },
    { number: 4, sign: 'Cancer', planets: [] },
    { number: 5, sign: 'Leo', planets: ['Mars'] },
    { number: 6, sign: 'Virgo', planets: [] },
    { number: 7, sign: 'Libra', planets: ['Jupiter'] },
    { number: 8, sign: 'Scorpio', planets: [] },
    { number: 9, sign: 'Sagittarius', planets: ['Saturn'] },
    { number: 10, sign: 'Capricorn', planets: [] },
    { number: 11, sign: 'Aquarius', planets: ['Moon'] },
    { number: 12, sign: 'Pisces', planets: [] },
  ],
  planets: [
    { name: 'Sun', sign: 'Aries', house: 1, degree: 15.25 },
    { name: 'Moon', sign: 'Aquarius', house: 11, degree: 22.14 },
    { name: 'Mercury', sign: 'Aries', house: 1, degree: 8.45 },
    { name: 'Venus', sign: 'Gemini', house: 3, degree: 12.33 },
    { name: 'Mars', sign: 'Leo', house: 5, degree: 28.67 },
    { name: 'Jupiter', sign: 'Libra', house: 7, degree: 5.89 },
    { name: 'Saturn', sign: 'Sagittarius', house: 9, degree: 19.22 },
  ],
};

export default function Home() {
  const [chartData, setChartData] = useState(sampleChartData);
  const [showChart, setShowChart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowChart(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Celestial Charm
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover your cosmic blueprint with personalized astrology charts and insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Birth Chart Form */}
          <div className="flex justify-center">
            <BirthChartForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>

          {/* Chart Display */}
          <div className="flex justify-center">
            {showChart ? (
              <AstrologyChart 
                data={chartData} 
                title="Your Birth Chart"
                type="circular"
              />
            ) : (
              <div className="w-full max-w-lg">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Your Chart Awaits</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill out the form to generate your personalized birth chart and unlock the secrets of the stars.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Accurate Charts</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Precise calculations based on your exact birth time and location.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose from Western, North Indian, or South Indian chart styles.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive interpretations and planetary insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

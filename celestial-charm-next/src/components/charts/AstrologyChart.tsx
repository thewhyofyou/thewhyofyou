'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartData {
  houses: Array<{
    number: number;
    sign: string;
    planets: string[];
  }>;
  planets: Array<{
    name: string;
    sign: string;
    house: number;
    degree: number;
  }>;
}

interface AstrologyChartProps {
  data: ChartData;
  title?: string;
  type?: 'north-indian' | 'south-indian' | 'circular';
}

export default function AstrologyChart({ 
  data, 
  title = 'Birth Chart',
  type = 'circular' 
}: AstrologyChartProps) {
  const renderCircularChart = () => {
    return (
      <div className="relative w-96 h-96 mx-auto">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Outer circle */}
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* House divisions */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) - 90; // Start from top
            const radian = (angle * Math.PI) / 180;
            const x1 = 200 + 180 * Math.cos(radian);
            const y1 = 200 + 180 * Math.sin(radian);
            const x2 = 200 + 120 * Math.cos(radian);
            const y2 = 200 + 120 * Math.sin(radian);
            
            return (
              <line
                key={i}
                x1={x2}
                y1={y2}
                x2={x1}
                y2={y1}
                stroke="currentColor"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Inner circle */}
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* House numbers and signs */}
          {data.houses.map((house, i) => {
            const angle = (i * 30) + 15 - 90; // Center of each house
            const radian = (angle * Math.PI) / 180;
            const x = 200 + 150 * Math.cos(radian);
            const y = 200 + 150 * Math.sin(radian);
            
            return (
              <g key={house.number}>
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  className="text-xs font-bold"
                  fill="currentColor"
                >
                  {house.number}
                </text>
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  className="text-xs"
                  fill="currentColor"
                >
                  {house.sign}
                </text>
                {house.planets.map((planet, pi) => (
                  <text
                    key={pi}
                    x={x}
                    y={y + 20 + (pi * 12)}
                    textAnchor="middle"
                    className="text-xs text-blue-600"
                    fill="currentColor"
                  >
                    {planet}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderNorthIndianChart = () => {
    return (
      <div className="relative w-96 h-96 mx-auto">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Diamond shape */}
          <polygon
            points="200,20 380,200 200,380 20,200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Internal divisions */}
          <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="1" />
          <line x1="110" y1="110" x2="290" y2="290" stroke="currentColor" strokeWidth="1" />
          <line x1="290" y1="110" x2="110" y2="290" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    );
  };

  const renderSouthIndianChart = () => {
    return (
      <div className="relative w-96 h-96 mx-auto">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Square grid */}
          <rect
            x="20"
            y="20"
            width="360"
            height="360"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Grid lines */}
          {Array.from({ length: 3 }).map((_, i) => (
            <g key={i}>
              <line
                x1={20 + (i + 1) * 90}
                y1="20"
                x2={20 + (i + 1) * 90}
                y2="380"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1="20"
                y1={20 + (i + 1) * 90}
                x2="380"
                y2={20 + (i + 1) * 90}
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'north-indian':
        return renderNorthIndianChart();
      case 'south-indian':
        return renderSouthIndianChart();
      default:
        return renderCircularChart();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {type === 'circular' && 'Western-style circular birth chart'}
          {type === 'north-indian' && 'North Indian Vedic astrology chart'}
          {type === 'south-indian' && 'South Indian Vedic astrology chart'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          {renderChart()}
        </div>
        
        {/* Planet positions table */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Planet Positions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.planets.map((planet) => (
              <div key={planet.name} className="flex justify-between p-2 bg-muted rounded">
                <span className="font-medium">{planet.name}</span>
                <span>{planet.sign} {planet.degree.toFixed(2)}°</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";

interface ChartData {
  houses: { [key: number]: string[] };
  planets: { [key: string]: { sign: string; house: number; degree: string } };
}

interface CircularChartProps {
  data: ChartData;
}

export const CircularChart = ({ data }: CircularChartProps) => {
  // Calculate position for each house/planet around the circle
  const getHouseAngle = (house: number) => {
    // Start from 9 o'clock position (ascendant) and go counter-clockwise
    return (house - 1) * 30 - 90;
  };

  const getCoordinates = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: 200 + radius * Math.cos(radian),
      y: 200 + radius * Math.sin(radian),
    };
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-2xl mx-auto p-4">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Outer circle */}
          <circle cx="200" cy="200" r="180" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          
          {/* Inner circle */}
          <circle cx="200" cy="200" r="140" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
          
          {/* House divisions */}
          {Array.from({ length: 12 }, (_, i) => i + 1).map((house) => {
            const angle = getHouseAngle(house);
            const outer = getCoordinates(angle, 180);
            const inner = getCoordinates(angle, 140);
            return (
              <g key={house}>
                <line
                  x1="200"
                  y1="200"
                  x2={outer.x}
                  y2={outer.y}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
                {/* House number */}
                <text
                  x={getCoordinates(angle + 15, 165).x}
                  y={getCoordinates(angle + 15, 165).y}
                  textAnchor="middle"
                  className="fill-muted-foreground text-xs font-semibold"
                >
                  {house}
                </text>
              </g>
            );
          })}

          {/* Planets */}
          {Object.entries(data.planets).map(([planet, info], idx) => {
            const houseAngle = getHouseAngle(info.house);
            const planetAngle = houseAngle + 10 + (idx % 3) * 5; // Slight offset for multiple planets
            const pos = getCoordinates(planetAngle, 150);
            
            return (
              <Tooltip key={planet}>
                <TooltipTrigger>
                  <g>
                    <circle cx={pos.x} cy={pos.y} r="8" fill="hsl(var(--primary))" opacity="0.8" />
                    <text
                      x={pos.x}
                      y={pos.y + 1}
                      textAnchor="middle"
                      className="fill-primary-foreground text-[10px] font-bold pointer-events-none"
                    >
                      {planet.substring(0, 2)}
                    </text>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{planet}</p>
                  <p className="text-xs">Sign: {info.sign}</p>
                  <p className="text-xs">House: {info.house}</p>
                  <p className="text-xs">Degree: {info.degree}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Center point */}
          <circle cx="200" cy="200" r="3" fill="hsl(var(--primary))" />
        </svg>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {Object.entries(data.planets).map(([planet, info]) => (
            <div key={planet} className="flex justify-between p-2 bg-muted/30 rounded">
              <span className="font-medium">{planet}:</span>
              <span className="text-muted-foreground">
                {info.sign} {info.degree}
              </span>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

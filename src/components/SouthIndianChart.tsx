import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";

interface ChartData {
  houses: { [key: number]: string[] };
  planets: { [key: string]: { sign: string; house: number; degree: string } };
}

interface SouthIndianChartProps {
  data: ChartData;
}

export const SouthIndianChart = ({ data }: SouthIndianChartProps) => {
  // South Indian chart layout - fixed zodiac signs in grid
  const zodiacLayout = [
    [12, 1, 2, 3],
    [11, null, null, 4],
    [10, null, null, 5],
    [9, 8, 7, 6]
  ];

  const zodiacNames = {
    1: "Aries", 2: "Taurus", 3: "Gemini", 4: "Cancer",
    5: "Leo", 6: "Virgo", 7: "Libra", 8: "Scorpio",
    9: "Sagittarius", 10: "Capricorn", 11: "Aquarius", 12: "Pisces"
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="grid grid-cols-4 grid-rows-4 gap-0 aspect-square bg-background border-2 border-primary/20">
          {zodiacLayout.flat().map((sign, idx) => {
            if (sign === null) {
              return (
                <div key={idx} className="border border-border bg-primary/5" />
              );
            }

            const houseContent = data.houses[sign] || [];
            return (
              <div
                key={idx}
                className="border border-border p-2 flex flex-col items-start justify-start relative min-h-[80px]"
              >
                <div className="text-xs font-semibold text-muted-foreground mb-1">
                  {zodiacNames[sign as keyof typeof zodiacNames]}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {houseContent.map((planet, planetIdx) => {
                    const planetData = data.planets[planet];
                    return (
                      <Tooltip key={planetIdx}>
                        <TooltipTrigger>
                          <span className="text-sm font-medium text-foreground hover:text-primary cursor-help">
                            {planet}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-semibold">{planet}</p>
                          <p className="text-xs">Sign: {planetData?.sign}</p>
                          <p className="text-xs">Degree: {planetData?.degree}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
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

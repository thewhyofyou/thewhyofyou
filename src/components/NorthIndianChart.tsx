import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";

interface ChartData {
  houses: { [key: number]: string[] };
  planets: { [key: string]: { sign: string; house: number; degree: string } };
}

interface NorthIndianChartProps {
  data: ChartData;
}

export const NorthIndianChart = ({ data }: NorthIndianChartProps) => {
  // North Indian chart layout - diamond shape with houses
  const getHousePosition = (house: number) => {
    const positions: { [key: number]: string } = {
      1: "col-start-2 row-start-1",
      2: "col-start-3 row-start-1",
      3: "col-start-3 row-start-2",
      4: "col-start-3 row-start-3",
      5: "col-start-2 row-start-3",
      6: "col-start-1 row-start-3",
      7: "col-start-1 row-start-2",
      8: "col-start-1 row-start-1",
      9: "col-start-2 row-start-2 border-4 border-primary/30 bg-primary/5",
      10: "hidden", // Center divided among other houses
      11: "hidden",
      12: "hidden",
    };
    return positions[house] || "";
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="grid grid-cols-3 grid-rows-3 gap-0 aspect-square bg-background border-2 border-primary/20">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((house) => {
            const houseContent = data.houses[house] || [];
            return (
              <div
                key={house}
                className={`border border-border p-2 flex flex-col items-center justify-center relative min-h-[100px] ${getHousePosition(
                  house
                )}`}
              >
                <div className="absolute top-1 left-1 text-xs font-semibold text-muted-foreground">
                  {house === 9 ? "Asc" : house}
                </div>
                <div className="flex flex-wrap gap-1 justify-center items-center mt-4">
                  {houseContent.map((planet, idx) => {
                    const planetData = data.planets[planet];
                    return (
                      <Tooltip key={idx}>
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

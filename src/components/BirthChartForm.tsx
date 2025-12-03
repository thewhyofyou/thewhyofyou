import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Calendar } from "@/src/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";

const birthChartSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.date(),
  time: z.string().min(1, "Birth time is required"),
  location: z.string().min(1, "Birth location is required"),
  chartStyle: z.enum(["north", "south", "circular"]),
});

type BirthChartFormData = z.infer<typeof birthChartSchema>;

interface BirthChartFormProps {
  onSubmit: (data: BirthChartFormData) => void;
}

export const BirthChartForm = ({ onSubmit }: BirthChartFormProps) => {
  const [searchLocation, setSearchLocation] = useState("");

  const form = useForm<BirthChartFormData>({
    resolver: zodResolver(birthChartSchema),
    defaultValues: {
      name: "",
      time: "",
      location: "",
      chartStyle: "south",
    },
  });

  // Mock location search - integrate with GeoNames or Google Places API for production
  const mockLocations = [
    { name: "New York, New York, USA", lat: 40.7128, lng: -74.0060, timezone: "America/New_York" },
    { name: "London, England, United Kingdom", lat: 51.5074, lng: -0.1278, timezone: "Europe/London" },
    { name: "Mumbai, Maharashtra, India", lat: 19.0760, lng: 72.8777, timezone: "Asia/Kolkata" },
    { name: "Sydney, New South Wales, Australia", lat: -33.8688, lng: 151.2093, timezone: "Australia/Sydney" },
    { name: "Tokyo, Tokyo, Japan", lat: 35.6762, lng: 139.6503, timezone: "Asia/Tokyo" },
    { name: "Paris, Île-de-France, France", lat: 48.8566, lng: 2.3522, timezone: "Europe/Paris" },
    { name: "Berlin, Berlin, Germany", lat: 52.5200, lng: 13.4050, timezone: "Europe/Berlin" },
    { name: "São Paulo, São Paulo, Brazil", lat: -23.5505, lng: -46.6333, timezone: "America/Sao_Paulo" },
    { name: "Los Angeles, California, USA", lat: 34.0522, lng: -118.2437, timezone: "America/Los_Angeles" },
    { name: "Chicago, Illinois, USA", lat: 41.8781, lng: -87.6298, timezone: "America/Chicago" },
    { name: "Toronto, Ontario, Canada", lat: 43.6532, lng: -79.3832, timezone: "America/Toronto" },
    { name: "Mexico City, Mexico", lat: 19.4326, lng: -99.1332, timezone: "America/Mexico_City" },
    { name: "Buenos Aires, Argentina", lat: -34.6037, lng: -58.3816, timezone: "America/Argentina/Buenos_Aires" },
    { name: "Rome, Italy", lat: 41.9028, lng: 12.4964, timezone: "Europe/Rome" },
    { name: "Madrid, Spain", lat: 40.4168, lng: -3.7038, timezone: "Europe/Madrid" },
    { name: "Amsterdam, Netherlands", lat: 52.3676, lng: 4.9041, timezone: "Europe/Amsterdam" },
    { name: "Moscow, Russia", lat: 55.7558, lng: 37.6173, timezone: "Europe/Moscow" },
    { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai" },
    { name: "Singapore, Singapore", lat: 1.3521, lng: 103.8198, timezone: "Asia/Singapore" },
    { name: "Bangkok, Thailand", lat: 13.7563, lng: 100.5018, timezone: "Asia/Bangkok" },
    { name: "Delhi, India", lat: 28.7041, lng: 77.1025, timezone: "Asia/Kolkata" },
    { name: "Bangalore, Karnataka, India", lat: 12.9716, lng: 77.5946, timezone: "Asia/Kolkata" },
    { name: "Shanghai, China", lat: 31.2304, lng: 121.4737, timezone: "Asia/Shanghai" },
    { name: "Hong Kong, China", lat: 22.3193, lng: 114.1694, timezone: "Asia/Hong_Kong" },
    { name: "Seoul, South Korea", lat: 37.5665, lng: 126.9780, timezone: "Asia/Seoul" },
    { name: "Melbourne, Victoria, Australia", lat: -37.8136, lng: 144.9631, timezone: "Australia/Melbourne" },
    { name: "Auckland, New Zealand", lat: -36.8485, lng: 174.7633, timezone: "Pacific/Auckland" },
    { name: "Cape Town, South Africa", lat: -33.9249, lng: 18.4241, timezone: "Africa/Johannesburg" },
    { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357, timezone: "Africa/Cairo" },
  ];

  const filteredLocations = mockLocations.filter((loc) =>
    loc.name.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="chartStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chart Style</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select chart style" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="south">South Indian (Default)</SelectItem>
                  <SelectItem value="north">North Indian</SelectItem>
                  <SelectItem value="circular">Circular (Western)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Birth Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Location</FormLabel>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                <FormControl>
                  <Input
                    placeholder="Type city name (e.g., Mumbai, India)..."
                    className="pl-9"
                    value={searchLocation}
                    onChange={(e) => {
                      setSearchLocation(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                {searchLocation && filteredLocations.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc.name}
                        type="button"
                        className="w-full px-3 py-2.5 text-left hover:bg-accent text-sm border-b border-border last:border-0 transition-colors"
                        onClick={() => {
                          const locationData = JSON.stringify({
                            name: loc.name,
                            lat: loc.lat,
                            lng: loc.lng,
                            timezone: loc.timezone
                          });
                          field.onChange(locationData);
                          setSearchLocation(loc.name);
                        }}
                      >
                        <div className="font-medium">{loc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Timezone: {loc.timezone}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {searchLocation && filteredLocations.length === 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg p-3">
                    <p className="text-sm text-muted-foreground">
                      No locations found. Try a different search.
                    </p>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Timezone will be automatically determined based on your location
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Generate Birth Chart
        </Button>
      </form>
    </Form>
  );
};

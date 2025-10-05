import { Cloud, Calendar as CalendarIcon, TrendingUp, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useWeatherContext } from "@/context/WeatherContext";

const cities = [
  { name: "Karachi", country: "Pakistan", lat: 24.8607, lng: 67.0011 },
  { name: "Lahore", country: "Pakistan", lat: 31.5204, lng: 74.3587 },
  { name: "Islamabad", country: "Pakistan", lat: 33.6844, lng: 73.0479 },
  { name: "Rawalpindi", country: "Pakistan", lat: 33.5651, lng: 73.0169 },
  { name: "Peshawar", country: "Pakistan", lat: 34.0151, lng: 71.5249 },
  { name: "Quetta", country: "Pakistan", lat: 30.1798, lng: 66.9750 },
  { name: "Multan", country: "Pakistan", lat: 30.1575, lng: 71.5249 },
  { name: "Hyderabad", country: "Pakistan", lat: 25.3960, lng: 68.3578 },
  { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777 },
  { name: "Delhi", country: "India", lat: 28.7041, lng: 77.1025 },
  { name: "Kolkata", country: "India", lat: 22.5726, lng: 88.3639 },
  { name: "Chennai", country: "India", lat: 13.0827, lng: 80.2707 },
  { name: "Bengaluru", country: "India", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", country: "India", lat: 17.3850, lng: 78.4867 },
  { name: "Ahmedabad", country: "India", lat: 23.0225, lng: 72.5714 },
  { name: "Pune", country: "India", lat: 18.5204, lng: 73.8567 },
  { name: "Surat", country: "India", lat: 21.1702, lng: 72.8311 },
  { name: "Jaipur", country: "India", lat: 26.9124, lng: 75.7873 },
  { name: "Lucknow", country: "India", lat: 26.8467, lng: 80.9462 },
  { name: "Patna", country: "India", lat: 25.5941, lng: 85.1376 },
  { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125 },
  { name: "Chittagong", country: "Bangladesh", lat: 22.3569, lng: 91.7832 },
  { name: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612 },
  { name: "Kandy", country: "Sri Lanka", lat: 7.2906, lng: 80.6337 },
  { name: "Kathmandu", country: "Nepal", lat: 27.7172, lng: 85.3240 },
];

export function WeatherPredictionCard() {
  const { setData } = useWeatherContext();
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  
  // Weather parameter states
  const [temperature, setTemperature] = useState<string>("");
  const [precipitation, setPrecipitation] = useState<string>("");
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await fetch("http://localhost:8080/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    },
    onSuccess: (data: any) => {
      console.log("Prediction successful:", data);
      setData(data);   
    },
    onError: (error: any) => {
      console.error("Prediction error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Collect all form data
    const city = cities.find(c => `${c.name}, ${c.country}` === selectedCity)
    const formData = {
      lat: city!.lat,
      lon: city!.lng,
      year: date ? date.getFullYear() : null,
      doy: date ? Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)) : null,
      threshold: {
        T2M: parseFloat(temperature),
        PRECTOTCORR: parseFloat(precipitation),
        wind_speed: parseFloat(windSpeed),
        QV2M: parseFloat(humidity),
      },
    };

    mutation.mutate(formData);
  };

  const formatDate = (date: Date) => {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const formatDisplayDate = (date: Date) => {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Get coordinates for the selected city
  const getSelectedCityCoordinates = () => {
    if (!selectedCity) return null;
    const city = cities.find(c => `${c.name}, ${c.country}` === selectedCity);
    return city ? { lat: city.lat, lng: city.lng } : null;
  };

  return (
    <div className="bg-[#F8F5EF] rounded-2xl p-8 shadow-lg border-2 border-[#A3A68A]/30 mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="w-6 h-6 text-[#A3A68A]" />
        <h3 className="text-[#A3A68A] text-lg">Weather Prediction</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* City Selection */}
        <div className="space-y-3">
          <label className="text-[#A3A68A]">Select City</label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full bg-white border-[#A3A68A]/30 text-[#A3A68A]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A3A68A]/60" />
                <SelectValue placeholder="Choose a city" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border-[#A3A68A]/30">
              {cities
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((city, index) => (
                  <SelectItem 
                    key={index} 
                    value={`${city.name}, ${city.country}`}
                    className="text-[#A3A68A] hover:bg-gray-50"
                  >
                    {city.name}, {city.country}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Selection */}
        <div className="space-y-3">
          <label className="text-[#A3A68A]">Select Future Date</label>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-center text-center bg-white border-[#A3A68A]/30 text-[#A3A68A] hover:bg-gray-50"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toDateString() : "Pick from Calendar"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border-[#A3A68A]/30" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  setIsOpen(false);
                }}
                // disabled={(date) => date < new Date()}
                // initialFocus
                className="rounded-md border-0"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Weather Parameter Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[#A3A68A] text-sm">Temperature (°C)</label>
            <Input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="25"
              className="bg-white border-[#A3A68A]/30 text-[#A3A68A]"
            />
          </div>
          <div>
            <label className="text-[#A3A68A] text-sm">Precipitation (mm)</label>
            <Input
              type="number"
              value={precipitation}
              onChange={(e) => setPrecipitation(e.target.value)}
              placeholder="5"
              className="bg-white border-[#A3A68A]/30 text-[#A3A68A]"
            />
          </div>
          <div>
            <label className="text-[#A3A68A] text-sm">Wind Speed (km/h)</label>
            <Input
              type="number"
              value={windSpeed}
              onChange={(e) => setWindSpeed(e.target.value)}
              placeholder="15"
              className="bg-white border-[#A3A68A]/30 text-[#A3A68A]"
            />
          </div>
          <div>
            <label className="text-[#A3A68A] text-sm">Humidity (%)</label>
            <Input
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              placeholder="70"
              className="bg-white border-[#A3A68A]/30 text-[#A3A68A]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#A3A68A] text-white hover:bg-[#8F8F6E]"
        >
          Submit Prediction
        </Button>
      </form>
    </div>
  );
}
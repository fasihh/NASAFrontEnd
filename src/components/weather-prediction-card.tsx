import { Cloud, Calendar as CalendarIcon, TrendingUp, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

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
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  
  // Weather parameter states
  const [temperature, setTemperature] = useState<string>("");
  const [precipitation, setPrecipitation] = useState<string>("");
  const [windSpeed, setWindSpeed] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");

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
    <div className="bg-[#F8F5EF] rounded-2xl p-8 shadow-lg border-2 border-[#A3A68A]/30 max-w-full mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="w-6 h-6 text-[#A3A68A]" />
        <h3 className="text-[#A3A68A] text-lg">Weather Prediction</h3>
      </div>
      
      {/* Horizontal Layout with two sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Section: Date & Location Based Prediction */}
        <div className="space-y-6">
          <h4 className="text-[#A3A68A] font-medium text-sm">Date & Location Forecast</h4>
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
          
          {/* Manual Date Input */}
          <div className="relative">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="mm/dd/yyyy"
              className="w-full bg-white border-[#A3A68A]/30 text-[#A3A68A] placeholder:text-[#A3A68A]/50 pr-10"
            />
            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A3A68A]/50" />
          </div>
          
          {/* Calendar Picker */}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-center text-center bg-white border-[#A3A68A]/30 text-[#A3A68A] hover:bg-gray-50"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? formatDate(date) : "Pick from Calendar"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border-[#A3A68A]/30" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    setInputValue(formatDate(newDate));
                    setIsOpen(false);
                  }
                }}
                disabled={(date) => date < new Date()}
                initialFocus
                className="rounded-md border-0"
              />
            </PopoverContent>
          </Popover>
          
          <p className="text-xs text-[#A3A68A]/70">
            Predictions available up to 3 months ahead
          </p>
        </div>
        
        {/* Prediction Display */}
        <div className="bg-white/70 rounded-xl p-6 text-center min-h-[120px] flex flex-col justify-center border border-[#A3A68A]/20">
          <Cloud className="w-12 h-12 text-[#A3A68A]/60 mx-auto mb-3" />
          {selectedCity && date ? (
            <div className="space-y-2">
              <p className="text-[#A3A68A] font-medium">{selectedCity}</p>
              <p className="text-[#A3A68A]/80 text-sm">{formatDisplayDate(date)}</p>
              <p className="text-[#A3A68A]/60 text-xs">Weather forecast will appear here</p>
            </div>
          ) : (
            <p className="text-[#A3A68A]/60 text-sm">Select city and date</p>
          )}
        </div>
        </div>

        {/* Right Section: Weather Parameters Analysis */}
        <div className="space-y-6">
          <h4 className="text-[#A3A68A] font-medium text-sm">Parameter Probability Analysis</h4>
          
          {/* Weather Parameter Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Temperature Input */}
              <div className="space-y-2">
                <label className="text-[#A3A68A] text-xs">Temperature (°C)</label>
                <Input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="25"
                  className="bg-white border-[#A3A68A]/30 text-[#A3A68A] placeholder:text-[#A3A68A]/50"
                />
              </div>
              
              {/* Precipitation Input */}
              <div className="space-y-2">
                <label className="text-[#A3A68A] text-xs">Precipitation (mm)</label>
                <Input
                  type="number"
                  value={precipitation}
                  onChange={(e) => setPrecipitation(e.target.value)}
                  placeholder="5"
                  className="bg-white border-[#A3A68A]/30 text-[#A3A68A] placeholder:text-[#A3A68A]/50"
                />
              </div>
              
              {/* Wind Speed Input */}
              <div className="space-y-2">
                <label className="text-[#A3A68A] text-xs">Wind Speed (km/h)</label>
                <Input
                  type="number"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(e.target.value)}
                  placeholder="15"
                  className="bg-white border-[#A3A68A]/30 text-[#A3A68A] placeholder:text-[#A3A68A]/50"
                />
              </div>
              
              {/* Humidity Input */}
              <div className="space-y-2">
                <label className="text-[#A3A68A] text-xs">Humidity (%)</label>
                <Input
                  type="number"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                  placeholder="70"
                  className="bg-white border-[#A3A68A]/30 text-[#A3A68A] placeholder:text-[#A3A68A]/50"
                />
              </div>
            </div>
            
            <p className="text-xs text-[#A3A68A]/70">
              Enter values to check probability of occurrence
            </p>
          </div>
          
          {/* Parameter Analysis Display */}
          <div className="bg-white/70 rounded-xl p-6 border border-[#A3A68A]/20">
            <div className="text-center mb-4">
              <div className="bg-[#A3A68A]/10 rounded-full p-2 w-fit mx-auto mb-2">
                <TrendingUp className="w-8 h-8 text-[#A3A68A]/60" />
              </div>
              <h5 className="text-[#A3A68A] font-medium text-sm">Probability Analysis</h5>
            </div>
            
            {(temperature || precipitation || windSpeed || humidity) ? (
              <div className="space-y-3">
                {temperature && (
                  <div className="flex justify-between items-center bg-white/50 rounded-lg p-3">
                    <span className="text-[#A3A68A] text-sm">Temperature {temperature}°C</span>
                    <span className="text-[#A3A68A] font-bold text-lg">--% </span>
                  </div>
                )}
                {precipitation && (
                  <div className="flex justify-between items-center bg-white/50 rounded-lg p-3">
                    <span className="text-[#A3A68A] text-sm">Precipitation {precipitation}mm</span>
                    <span className="text-[#A3A68A] font-bold text-lg">--%</span>
                  </div>
                )}
                {windSpeed && (
                  <div className="flex justify-between items-center bg-white/50 rounded-lg p-3">
                    <span className="text-[#A3A68A] text-sm">Wind Speed {windSpeed}km/h</span>
                    <span className="text-[#A3A68A] font-bold text-lg">--%</span>
                  </div>
                )}
                {humidity && (
                  <div className="flex justify-between items-center bg-white/50 rounded-lg p-3">
                    <span className="text-[#A3A68A] text-sm">Humidity {humidity}%</span>
                    <span className="text-[#A3A68A] font-bold text-lg">--%</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-[#A3A68A]/60 text-sm">Enter parameters above</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
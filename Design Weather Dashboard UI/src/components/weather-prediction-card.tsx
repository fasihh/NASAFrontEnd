import { Cloud, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { useState } from "react";

export function WeatherPredictionCard() {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const formatDate = (date: Date) => {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const formatDisplayDate = (date: Date) => {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="bg-[#F8F5EF] rounded-2xl p-6 shadow-lg border-2 border-[#A3A68A]/30">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-[#A3A68A]" />
        <h3 className="text-[#A3A68A]">Weather Prediction</h3>
      </div>
      
      <div className="space-y-6">
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
          <p className="text-[#A3A68A]/80 text-sm leading-relaxed">
            {date 
              ? `Weather forecast for ${formatDisplayDate(date)} will appear here`
              : "Select a date to view weather prediction"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
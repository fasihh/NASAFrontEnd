import { MapPin, Compass, Navigation } from "lucide-react";
import { Globe } from "lucide-react";

export function WeatherMapCard() {
  return (
    <div className="bg-[#F8F5EF] rounded-2xl p-6 shadow-lg border-2 border-[#A3A68A]/30">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-6 h-6 text-[#A3A68A]" />
        <h3 className="text-[#A3A68A]">Weather Map</h3>
      </div>
      
      <div className="relative bg-gradient-to-br from-[#FFD6A5] to-[#FF8C42] rounded-2xl h-64 overflow-hidden">
        {/* Compass in top right */}
        <div className="absolute top-4 right-4 bg-white/20 rounded-full p-3">
          <Compass className="w-6 h-6 text-white" />
        </div>
        
        {/* Mumbai location pin - animated */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-[#A3A68A] mb-2 animate-bounce" />
            <div className="bg-[#A3A68A] text-white px-3 py-1 rounded-lg text-sm">
              Mumbai
            </div>
          </div>
        </div>
        
        {/* Wind speed indicator in bottom left */}
        <div className="absolute bottom-4 left-4 bg-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
          <Navigation 
            className="w-5 h-5 text-white transition-transform duration-1000" 
            style={{ transform: 'rotate(45deg)' }}
          />
          <span className="text-white">2 km/h</span>
        </div>
        
        {/* Coordinates info in bottom right */}
        <div className="absolute bottom-4 right-4 bg-white/20 rounded-xl px-4 py-2 text-white text-sm">
          <div className="text-xs opacity-90">Mumbai, India</div>
          <div className="text-xs">19.0760°N, 72.8777°E</div>
        </div>
      </div>
    </div>
  );
}
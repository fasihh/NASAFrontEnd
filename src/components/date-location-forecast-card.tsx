import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

export function DateLocationForecastCard() {
  return (
    <Card className="w-full bg-white/95 backdrop-blur-sm shadow-lg border-[#A3A68A]/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-semibold text-[#A3A68A]">
          Date & Location Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#A3A68A]" />
            <span className="text-sm font-medium text-gray-700">Date</span>
          </div>
          <div className="pl-7">
            <p className="text-lg font-semibold text-gray-900">October 6, 2025</p>
            <p className="text-sm text-gray-600">Tomorrow</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#A3A68A]" />
            <span className="text-sm font-medium text-gray-700">Location</span>
          </div>
          <div className="pl-7">
            <p className="text-lg font-semibold text-gray-900">New York, NY</p>
            <p className="text-sm text-gray-600">40.7128°N, 74.0060°W</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="bg-[#A3A68A]/10 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Forecast:</span> Expect rainy conditions 
              with temperatures around 18°C. Bring an umbrella!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import { WeatherMapCard } from "./components/weather-map-card";
import { WeatherMetricsCard } from "./components/weather-metrics-card";
import { WeatherPredictionCard } from "./components/weather-prediction-card";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5EF] to-[#A3A68A]/10 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#A3A68A] tracking-wide">WEATHER PREDICTION</h1>
        </div>
        
        {/* Weather Map Card - Top */}
        <div className="w-full">
          <WeatherMapCard />
        </div>
        
        {/* Bottom Row - Metrics and Prediction Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeatherMetricsCard />
          </div>
          <div className="lg:col-span-1">
            <WeatherPredictionCard />
          </div>
        </div>
      </div>
    </div>
  );
}
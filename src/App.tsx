import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherMetricsCard } from "./components/weather-metrics-card";
import { WeatherPredictionCard } from "./components/weather-prediction-card";
import { WeatherProvider } from "./context/WeatherContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <WeatherProvider>
      <QueryClientProvider client={queryClient}>
        <div className="w-full min-h-screen bg-gradient-to-br from-[#F8F5EF] to-[#A3A68A]/10 p-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#A3A68A] tracking-wide">WEATHER PREDICTION</h1>
          </div>
          <div className="w-full flex justify-between items-center gap-6">
            <div className="flex-[1]">
              <WeatherMetricsCard />
            </div>
            <div className="flex-[1]">
              <WeatherPredictionCard />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </WeatherProvider>
  );
}
import { 
  Thermometer, 
  Droplets, 
  Wind,
  CloudRain,
  AlertTriangle,
} from "lucide-react";
import { useWeatherContext } from "../context/WeatherContext";

interface MetricBoxProps {
  icon: React.ReactNode;
  value: string;
  unit?: string;
  label: string;
  range?: string;
  description?: string;
  color: string;
}

function MetricBox({ icon, value, unit, label, range, description, color }: MetricBoxProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border border-[#A3A68A]/20">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`${color}`}>
              {icon}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl text-gray-800">{value}</span>
              {unit && <span className="text-lg text-blue-500">{unit}</span>}
            </div>
          </div>
          <div className="text-gray-600 mb-1">{label}</div>
          {range && <div className="text-sm text-gray-400">{range}</div>}
          {description && <div className="text-xs text-gray-400">{description}</div>}
        </div>
      </div>
    </div>
  );
}

export function WeatherMetricsCard() {
  const { data: { temperature, rain, windSpeed, humidity, heatWaveProbability } } = useWeatherContext();

  const metrics = [
    { 
      icon: <Thermometer className="w-5 h-5" />, 
      value: temperature.predicted.toFixed(2), 
      unit: "°C",
      label: "Temperature",
      range: `Hi: ${temperature.upper.toFixed(2)}°C, Lo: ${temperature.lower.toFixed(2)}°C`,
      description: `Probability: ${(temperature.probability * 100).toFixed(2)}%`,
      color: "text-red-500"
    },
    { 
      icon: <CloudRain className="w-5 h-5" />, 
      value: rain.predicted.toFixed(2), 
      unit: "mm",
      label: "Rain",
      range: `Hi: ${rain.upper.toFixed(2)} mm, Lo: ${rain.lower.toFixed(2)} mm`,
      description: `Heavy Rain Probability: ${(rain.heavyRainProbability * 100).toFixed(2)}%`,
      color: "text-blue-500"
    },
    { 
      icon: <Wind className="w-5 h-5" />, 
      value: windSpeed.predicted.toFixed(2), 
      unit: "km/h",
      label: "Wind Speed",
      range: `Hi: ${windSpeed.upper.toFixed(2)} km/h, Lo: ${windSpeed.lower.toFixed(2)} km/h`,
      description: "Wind conditions",
      color: "text-gray-600"
    },
    { 
      icon: <AlertTriangle className="w-5 h-5" />, 
      value: heatWaveProbability > 0 ? "High" : "Low", 
      label: "Heat Wave",
      range: "Risk Level",
      description: `Probability: ${(heatWaveProbability * 100).toFixed(2)}%`,
      color: heatWaveProbability > 0.5 ? "text-orange-500" : "text-green-500"
    },
    { 
      icon: <Droplets className="w-5 h-5" />, 
      value: humidity.predicted.toFixed(2), 
      unit: "%",
      label: "Humidity",
      range: `Hi: ${humidity.upper.toFixed(2)}%, Lo: ${humidity.lower.toFixed(2)}%`,
      description: `Probability: ${(humidity.probability * 100).toFixed(2)}%`,
      color: "text-blue-500"
    },
    { 
      icon: <CloudRain className="w-5 h-5" />, 
      value: rain.heavyRainProbability > 0.5 ? "High" : "Low", 
      label: "Heavy Rainfall",
      range: "Risk Level",
      description: `Probability: ${(rain.heavyRainProbability * 100).toFixed(2)}%`,
      color: rain.heavyRainProbability > 0.5 ? "text-orange-500" : "text-green-500"
    },
  ];

  return (
    <div className="bg-[#F8F5EF] rounded-2xl p-6 shadow-lg border-2 border-[#A3A68A]/30">
      <h3 className="text-[#A3A68A] mb-6 font-semibold">Weather Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <MetricBox
            key={index}
            icon={metric.icon}
            value={metric.value}
            unit={metric.unit}
            label={metric.label}
            range={metric.range}
            description={metric.description}
            color={metric.color}
          />
        ))}
      </div>
    </div>
  );
}
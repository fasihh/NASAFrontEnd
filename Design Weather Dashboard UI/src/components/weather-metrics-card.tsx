import { 
  Thermometer, 
  Droplets, 
  Wind,
  CloudRain,
  AlertTriangle,
  Flame
} from "lucide-react";

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
  const metrics = [
    { 
      icon: <Thermometer className="w-5 h-5" />, 
      value: "27", 
      unit: "°C",
      label: "Temperature",
      range: "Feels like 30°",
      description: "Current temperature",
      color: "text-red-500"
    },
    { 
      icon: <CloudRain className="w-5 h-5" />, 
      value: "2", 
      unit: "mm",
      label: "Rain",
      range: "Last 24 hours",
      description: "Light showers expected",
      color: "text-blue-500"
    },
    { 
      icon: <Wind className="w-5 h-5" />, 
      value: "12", 
      unit: "km/h",
      label: "Wind Speed + Direction",
      range: "NE Direction",
      description: "Gentle breeze",
      color: "text-gray-600"
    },
    { 
      icon: <AlertTriangle className="w-5 h-5" />, 
      value: "Low", 
      label: "Extreme Rain",
      range: "Risk Level",
      description: "No alerts active",
      color: "text-green-500"
    },
    { 
      icon: <Flame className="w-5 h-5" />, 
      value: "Medium", 
      label: "Heat Wave",
      range: "Risk Level",
      description: "Monitor conditions",
      color: "text-orange-500"
    },
    { 
      icon: <Droplets className="w-5 h-5" />, 
      value: "72", 
      unit: "%",
      label: "Humidity",
      range: "Comfortable range",
      description: "Relative humidity",
      color: "text-blue-500"
    },
  ];

  return (
    <div className="bg-[#F8F5EF] rounded-2xl p-6 shadow-lg border-2 border-[#A3A68A]/30">
      <h3 className="text-[#A3A68A] mb-6">Weather Metrics</h3>
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
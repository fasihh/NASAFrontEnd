import { createContext, useContext, useState, type ReactNode } from "react";

interface WeatherData {
  data: {
    temperature: { predicted: number; lower: number; upper: number; probability: number };
    rain: { predicted: number; lower: number; upper: number; heavyRainProbability: number };
    windSpeed: { predicted: number; lower: number; upper: number };
    humidity: { predicted: number; lower: number; upper: number; probability: number };
    heatWaveProbability: number;
  };
  setData: React.Dispatch<React.SetStateAction<WeatherData['data']>>;
}

const WeatherContext = createContext<WeatherData | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData['data']>({
    temperature: {
      predicted: 19.80,
      lower: 17.01,
      upper: 22.58,
      probability: 3.743601983963174e-9,
    },
    rain: {
      predicted: -0.0027,
      lower: -13.95,
      upper: 13.95,
      heavyRainProbability: 1.0325074129013956e-12,
    },
    windSpeed: {
      predicted: 1.30,
      lower: -1.58,
      upper: 4.18,
    },
    humidity: {
      predicted: 6.35,
      lower: 1.71,
      upper: 10.98,
      probability: 3.807364756802656e-9,
    },
    heatWaveProbability: 0.0,
  });

  // Function to update weather data from the response
  const updateWeatherData = (response: any) => {
    const updatedData = {
      temperature: {
        predicted: response.Predicted[3],
        lower: response.Lower[3],
        upper: response.Upper[3],
        probability: response.Probability.temp_gt_threshold,
      },
      rain: {
        predicted: response.Predicted[0],
        lower: response.Lower[0],
        upper: response.Upper[0],
        heavyRainProbability: response.Probability.heavy_rain_gt_50mm,
      },
      windSpeed: {
        predicted: response.Derived.wind_speed,
        lower: response.Derived_Lower.wind_speed,
        upper: response.Derived_Upper.wind_speed,
      },
      humidity: {
        predicted: response.Predicted[2],
        lower: response.Lower[2],
        upper: response.Upper[2],
        probability: response.Probability.humidity_gt_threshold,
      },
      heatWaveProbability: response.Probability.heatwave_hi_gt_40C,
    };

    setWeatherData(updatedData);
  };

  return (
    <WeatherContext.Provider value={{ data: weatherData, setData: updateWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};
import React from 'react';
import sunny from '../../assets/weather/weather-sunny.webp';
import cloudy from '../../assets/weather/weather-cloudy.webp';
import rainy from '../../assets/weather/weather-rainy.webp';
import snowy from '../../assets/weather/weather-snowy.webp';
import hot from '../../assets/weather/weather-hot.webp';
import cold from '../../assets/weather/weather-cold.webp';
import unknown from '../../assets/weather/weather-unknown.webp';

export type WeatherCondition =
  | 'sunny'
  | 'cloudy'
  | 'rainy'
  | 'snowy'
  | 'hot'
  | 'cold'
  | 'unknown';

const weatherImageMap: Record<WeatherCondition, string> = {
  sunny,
  cloudy,
  rainy,
  snowy,
  hot,
  cold,
  unknown,
};

interface WeatherImageProps {
  condition: WeatherCondition;
  size?: 'sm' | 'md' | 'lg';
}

export const WeatherImage = ({ condition, size = 'md' }: WeatherImageProps) => {
  const sizeClass = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
  }[size];

  return (
    <img
      src={weatherImageMap[condition] ?? unknown}
      alt=""
      className={`${sizeClass} object-contain drop-shadow-sm`}
      draggable={false}
      referrerPolicy="no-referrer"
    />
  );
};

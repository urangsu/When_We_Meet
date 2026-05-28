import { defaultWeatherMoment } from '../data/weatherMomentSeed';
import type { WeatherMomentCardProps } from '../components/home/WeatherMomentCard';

export const weatherMomentRepository = {
  getTodayMoment(): Omit<WeatherMomentCardProps, 'scheduleLine' | 'compact'> {
    return defaultWeatherMoment;
  },
};

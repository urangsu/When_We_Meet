import { useState, useEffect } from 'react';
import type { WeatherMomentCardProps } from '../components/home/WeatherMomentCard';
import { defaultWeatherMoment } from '../data/weatherMomentSeed';

type LocationState = {
  lat: number;
  lon: number;
  label?: string;
};

type WeatherApiResult = {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'hot' | 'cold' | 'unknown';
  temperature: number;
};

// Map WMO weather codes to our conditions
const mapWmoCodeToCondition = (code: number, temperature: number): 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'hot' | 'cold' | 'unknown' => {
  if (code === 0 || code === 1) {
    if (temperature >= 30) return 'hot';
    if (temperature <= 5) return 'cold';
    return 'sunny';
  }
  if (code === 2 || code === 3) return 'cloudy';
  if (code >= 45 && code <= 48) return 'cloudy'; // fog
  if (code >= 51 && code <= 67) return 'rainy'; // drizzle, rain
  if (code >= 71 && code <= 77) return 'snowy'; // snow
  if (code >= 80 && code <= 82) return 'rainy'; // rain showers
  if (code >= 85 && code <= 86) return 'snowy'; // snow showers
  if (code >= 95 && code <= 99) return 'rainy'; // thunderstorm
  return 'unknown';
};

const getConditionLabel = (condition: string): string => {
  switch (condition) {
    case 'sunny': return '맑음';
    case 'cloudy': return '흐림';
    case 'rainy': return '비';
    case 'snowy': return '눈';
    case 'hot': return '더움';
    case 'cold': return '쌀쌀함';
    default: return '알 수 없음';
  }
};

const getSuggestion = (condition: string): string => {
  switch (condition) {
    case 'sunny': return '가볍게 산책 약속 잡기 좋은 날이에요.';
    case 'cloudy': return '햇살이 없어 커피 한 잔 마시기 좋은 날이에요.';
    case 'rainy': return '실내에서 아늑하게 만나는 약속을 추천해요.';
    case 'snowy': return '따뜻하게 챙겨 입고 눈 구경하러 갈까요?';
    case 'hot': return '시원한 실내에서 만나는 약속이 좋겠어요.';
    case 'cold': return '따뜻한 국물 요리나 실내 약속이 잘 어울리는 날이에요.';
    default: return '오늘 하루도 좋은 사람들과 함께하세요.';
  }
};

const getShortForecast = (condition: string, temperature: number): string => {
  if (condition === 'rainy') return '우산을 꼭 챙기세요';
  if (condition === 'snowy') return '미끄러운 길 조심하세요';
  if (temperature >= 30) return `현재 ${Math.round(temperature)}도, 꽤 더워요`;
  if (temperature <= 5) return `현재 ${Math.round(temperature)}도, 옷을 따뜻하게 입으세요`;
  return `현재 ${Math.round(temperature)}도, 야외 활동하기 좋아요`;
};

export const useWeatherMoment = () => {
  const [weatherMoment, setWeatherMoment] = useState<Omit<WeatherMomentCardProps, 'scheduleLine' | 'compact' | 'locationLabel' | 'onRefreshLocation' | 'isRefreshing'>>(defaultWeatherMoment);
  const [loading, setLoading] = useState(true);
  const [locationLabel, setLocationLabel] = useState('위치 조회 중...');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`);
      if (!res.ok) throw new Error('Weather API failed');
      const data = await res.json();
      
      const current = data.current_weather;
      if (!current) return;

      const { temperature, weathercode } = current;
      const condition = mapWmoCodeToCondition(weathercode, temperature);

      setWeatherMoment({
        condition,
        conditionLabel: getConditionLabel(condition),
        shortForecast: getShortForecast(condition, temperature),
        suggestion: getSuggestion(condition),
      });
    } catch (err) {
      console.error('Failed to fetch weather:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const refreshLocation = () => {
    setIsRefreshing(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationLabel('현재 위치');
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationLabel('서울 (기본값)');
          fetchWeather(37.566, 126.978);
        },
        { timeout: 7000 }
      );
    } else {
      setLocationLabel('서울');
      fetchWeather(37.566, 126.978);
    }
  };

  useEffect(() => {
    let mounted = true;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!mounted) return;
          setLocationLabel('현재 위치');
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error inside mount:', error);
          if (!mounted) return;
          setLocationLabel('서울');
          fetchWeather(37.566, 126.978);
        },
        { timeout: 8000 }
      );
    } else {
      if (mounted) {
        setLocationLabel('서울');
        fetchWeather(37.566, 126.978);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  return { weatherMoment, loading, locationLabel, refreshLocation, isRefreshing };
};

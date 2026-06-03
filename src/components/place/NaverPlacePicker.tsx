import React, { useState } from 'react';
import { Search, MapPin, Check, Plus, AlertCircle, RefreshCw } from 'lucide-react';
import { mapProviderConfig } from '../../config/mapProviderConfig';
import type { PlaceResult, SelectedPlace } from '../../types/place';

// Rich local mock database for demo-friendly coordinate simulation
const SIMULATED_PLACES: PlaceResult[] = [
  { provider: 'naver', name: '옹근달 성수점', address: '서울 성동구 성수동2가 322-2', roadAddress: '서울 성동구 연무장길 101-1', category: '카페', phone: '02-499-5012', point: { lat: 37.5414, lng: 127.0601 } },
  { provider: 'naver', name: '성수 대림창고', address: '서울 성동구 성수동2가 322-31', roadAddress: '서울 성동구 성수이로 78 컬처스페이스', category: '카페/갤러리', phone: '02-499-9669', point: { lat: 37.5411, lng: 127.0583 } },
  { provider: 'naver', name: '소문난 성수 감자탕', address: '서울 성동구 성수동2가 315-100', roadAddress: '서울 성동구 연무장길 45', category: '한식', phone: '02-465-6597', point: { lat: 37.5428, lng: 127.0544 } },
  { provider: 'naver', name: '강남 땀땀 (태국/베트남 쌀국수)', address: '서울 강남구 역삼동 817-31', roadAddress: '서울 강남구 강남대로98길 12-5', category: '아시안푸드', phone: '02-554-8892', point: { lat: 37.5002, lng: 127.0279 } },
  { provider: 'naver', name: '연남동 테일러커피', address: '서울 마포구 연남동 224-41', roadAddress: '서울 마포구 성미산로 189', category: '카페', phone: '02-335-0355', point: { lat: 37.5615, lng: 126.9248 } },
  { provider: 'naver', name: '초이다이닝 혜화점', address: '서울 종로구 명륜4가 113-1', roadAddress: '서울 종로구 대학로11길 43', category: '퓨전일식', phone: '02-763-1234', point: { lat: 37.5828, lng: 127.0019 } },
];

interface NaverPlacePickerProps {
  onSelectPlace: (place: SelectedPlace) => void;
  initialPlace?: SelectedPlace;
}

export const NaverPlacePicker: React.FC<NaverPlacePickerProps> = ({
  onSelectPlace,
  initialPlace,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<PlaceResult | null>(initialPlace || null);
  const [customName, setCustomName] = useState('');

  // Local filter
  const filteredPlaces = SIMULATED_PLACES.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.address?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query)
    );
  });

  const handleSelect = (place: PlaceResult) => {
    const selectedPlace: SelectedPlace = {
      ...place,
      selectedAt: new Date().toISOString(),
    };
    setSelected(selectedPlace);
    onSelectPlace(selectedPlace);
  };

  const handleAddDirect = () => {
    if (!customName.trim()) return;
    const directPlace: SelectedPlace = {
      provider: 'manual',
      name: customName.trim(),
      address: '직접 주소 미선택',
      category: '직접 지정',
      selectedAt: new Date().toISOString(),
      point: { lat: 37.5665, lng: 126.9780 }, // Seoul Default Coordinates
    };
    setSelected(directPlace);
    onSelectPlace(directPlace);
    setCustomName('');
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col gap-4 bg-slate-50 border border-ink-line p-5 rounded-3xl shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-ink-muted flex items-center gap-1.5">
          <MapPin size={15} className="text-rose" />
          장소 선택 인프라가 가동 중입니다.
        </span>
        {mapProviderConfig.naverMapsEnabled ? (
          <span className="text-[10px] bg-rose-50 border border-rose-100 text-rose font-mono px-2 py-0.5 rounded-full font-black">
            NAVER MAPS ON
          </span>
        ) : (
          <span className="text-[10px] bg-slate-200 text-ink-muted font-mono px-2 py-0.5 rounded-full font-bold">
            OFFLINE FALLBACK
          </span>
        )}
      </div>

      {/* Feature Flag Alert */}
      {mapProviderConfig.naverMapsEnabled && (
        <div className="flex items-start gap-2 p-3 bg-rose-50/40 rounded-2xl border border-rose-100 text-xs text-rose-deep">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-extrabold text-[11px]">네이버 지도 SDK 연동 모드 활성화</p>
            <p className="text-[10px] text-rose/80 leading-relaxed mt-0.5">
              도메인 등록 및 API Client ID 세팅 완료 후 실시간 지도 타일이 클라이언트 단에 안전하게 마운트됩니다.
            </p>
          </div>
        </div>
      )}

      {/* Selected Card Preview */}
      {selected && (
        <div className="p-4 bg-white border-2 border-rose rounded-2xl shadow-sm flex flex-col gap-2 relative transition-all">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-extrabold text-rose-deep bg-rose-50 px-2 py-0.5 rounded-full">
              선택한 장소
            </span>
            <span className="text-[10px] font-mono text-ink-hint">
              {selected.provider === 'naver' ? '네이버 장소' : '직접 입력'}
            </span>
          </div>
          <div>
            <h4 className="font-black text-base text-ink">{selected.name}</h4>
            {selected.roadAddress && (
              <p className="text-xs text-ink-muted mt-1"> 도로명: {selected.roadAddress}</p>
            )}
            {selected.address && (
              <p className="text-xs text-ink-hint mt-0.5">지번: {selected.address}</p>
            )}
            {selected.category && (
              <p className="text-[10px] text-rose-deep font-semibold mt-1 inline-block bg-rose-50/50 px-2 py-0.5 rounded">
                🏷️ {selected.category}
              </p>
            )}
          </div>

          {/* Simulated mini visual map representation */}
          <div className="h-28 w-full bg-slate-100 rounded-xl relative overflow-hidden border border-ink-line mt-1 flex items-center justify-center">
            {/* Visual Grid Lines resembling Map */}
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.7))]" />
            <div className="absolute flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-rose rounded-full animate-ping opacity-60" />
                <MapPin className="text-rose relative z-10" size={24} />
              </div>
              <span className="text-[9px] font-mono bg-white/90 border border-ink-line/60 rounded px-1.5 py-0.2 mt-1.5 text-ink-muted font-bold shadow-sm">
                LAT: {selected.point?.lat.toFixed(4) || '37.566'}, LNG: {selected.point?.lng.toFixed(4) || '126.978'}
              </span>
            </div>
            <div className="absolute bottom-1 right-2 text-[8px] font-mono text-ink-hint">
              @ WWM Maps
            </div>
          </div>
        </div>
      )}

      {/* Place search box with fallback auto-lookup */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-extrabold text-ink-muted">위치/매장명 검색</label>
        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-ink-hint" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="예시: 성수, 카페, 옹근달, 초이다이닝..."
            className="w-full h-11 pl-10 pr-4 bg-white border border-ink-line rounded-2xl text-sm focus:border-rose focus:ring-1 focus:ring-rose outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Search results */}
      {searchQuery.trim().length > 0 && (
        <div className="flex flex-col gap-2 max-h-52 overflow-y-auto bg-white border border-ink-line rounded-2xl p-2 shadow-sm">
          {filteredPlaces.length === 0 ? (
            <div className="py-6 text-center text-xs text-ink-hint">
              검색 매칭 결과가 없습니다.
            </div>
          ) : (
            filteredPlaces.map((place) => (
              <button
                key={place.name}
                type="button"
                onClick={() => handleSelect(place)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-left transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-ink">{place.name}</span>
                    <span className="text-[9px] text-rose bg-rose-50 border border-rose-100 px-1 py-0.2 rounded">
                      {place.category}
                    </span>
                  </div>
                  <span className="text-xs text-ink-hint leading-relaxed block mt-0.5">
                    {place.roadAddress || place.address}
                  </span>
                </div>
                <div className="p-1 rounded-full bg-slate-50 hover:bg-rose-50 text-ink-hint hover:text-rose transition-colors">
                  <Check size={14} />
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Direct Manual Placement */}
      <div className="border-t border-dashed border-ink-line/80 pt-3 mt-1 flex flex-col gap-2">
        <span className="text-xs font-extrabold text-ink-muted">직접 이름 입력하여 추가하기</span>
        <div className="flex gap-2">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="구체적인 후보지 이름 (예: 신촌역 투썸플레이스)"
            className="flex-1 h-10 px-3 bg-white border border-ink-line rounded-xl text-xs focus:border-rose focus:outline-none focus:shadow"
          />
          <button
            type="button"
            onClick={handleAddDirect}
            disabled={!customName.trim()}
            className={`px-3 h-10 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors ${
              customName.trim()
                ? 'bg-rose text-white cursor-pointer hover:bg-rose-600'
                : 'bg-slate-200 text-ink-hint cursor-not-allowed'
            }`}
          >
            <Plus size={14} />
            지정
          </button>
        </div>
      </div>
    </div>
  );
};

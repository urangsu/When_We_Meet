export type AppThemeId =
  | 'warm-ivory'
  | 'pure-white'
  | 'paper'
  | 'mist-blue'
  | 'auto';

export interface AppThemePreset {
  id: AppThemeId;
  label: string;
  description: string;
  previewClassName: string;
  isAuto?: boolean;
  tokens: {
    primary: string;
    primaryDeep: string;
    primarySoft: string;
    primaryHalo: string;
    bgApp: string;
    surface: string;
    surfaceWarm: string;
    line: string;
    lineStrong: string;
    ink: string;
    inkMuted: string;
    inkHint: string;
  };
}

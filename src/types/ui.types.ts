
export interface DisplaySettings {

  layout: 'compact' | 'comfortable' | 'expanded';

  showSearchBar: boolean;

  showDecimals: boolean;

  circleImages: boolean;

  showSocials: boolean;

  showSafetyBadges: boolean;

  showVolume: boolean;

  showTxCount: boolean;

  showBondingProgress: boolean;
}

export interface SortConfig {
  field: SortField;
  direction: 'asc' | 'desc';
}

export type SortField = 
  | 'marketCap'
  | 'volume24h'
  | 'txCount'
  | 'priceChange24h'
  | 'createdAt'
  | 'bondingCurveProgress';

export type ActiveTab = 'newPairs' | 'finalStretch' | 'migrated';

export type Chain = 'sol' | 'bnb';

export interface UIState {
  displaySettings: DisplaySettings;
  activeTab: ActiveTab;
  sortConfig: Record<ActiveTab, SortConfig>;
  activePresets: Record<ActiveTab, string | null>;
  isDisplaySettingsOpen: boolean;
  isMobile: boolean;
  activeChain: Chain;
  isChainLoading: boolean;
}

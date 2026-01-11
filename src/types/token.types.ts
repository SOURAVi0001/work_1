
export interface Token {

  id: string;

  address: string;

  name: string;

  symbol: string;

  imageUrl: string;

  marketCap: number;

  volume24h: number;

  txCount: number;

  priceInSol: number;

  priceChange24h: number;

  bondingCurveProgress: number;

  createdAt: number;

  socials: TokenSocials;

  safety: TokenSafety;

  status: TokenStatus;
}

export interface TokenSocials {
  twitter?: string;
  telegram?: string;
  website?: string;
  discord?: string;
}

export interface TokenSafety {

  isVerified: boolean;

  auditScore: number;

  liquidityLocked: boolean;

  contractRenounced: boolean;
}

export type TokenStatus = 'new' | 'finalStretch' | 'migrated';

export interface PriceUpdate {
  tokenId: string;
  newPrice: number;
  oldPrice: number;
  timestamp: number;
}

export type ColumnType = 'newPairs' | 'finalStretch' | 'migrated';

export interface FilterPreset {
  id: string;
  name: string;
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume?: number;
  minTxCount?: number;
  minBondingProgress?: number;
  requireVerified?: boolean;
}

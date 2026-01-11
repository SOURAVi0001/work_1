'use client';

import {
  RiWalletLine,
  RiArrowDownSLine,
  RiCompass3Line,
  RiPulseLine,
  RiWindowLine,
  RiNotification3Line,
  RiPaletteLine,
  RiGasStationLine,
  RiCapsuleLine,
  RiBarChartLine,
  RiTwitterXLine,
  RiListSettingsLine,
  RiBtcFill,
  RiDiscordFill,
  RiCoinLine,
  RiSettings3Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiStarLine,
  RiBookOpenLine,
} from '@remixicon/react';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { ChainLogo, Tooltip } from '@/components/atoms';
import { NavButton, OptimizedImage } from '@/components/atoms';
import { WalletSolPill, MultiChainBadge } from '@/components/molecules';
import { setActivePreset } from '@/store/filterSlice';
import { cn } from '@/lib/utils';

interface BottomStatusBarProps {
  className?: string;
  loading?: boolean;
}

const SCROLL_AMOUNT = 150;
const SCROLL_UPDATE_DELAY = 300;

const HOVER_CLASSES = {
  common: "hover:bg-[#1a1a1f] px-1 py-[2px] rounded-md transition-all duration-200 cursor-pointer",
  settings: "text-[#6b6b7a] hover:text-[#fcfcfcfc]",
  endIcon: "bg-none border-none text-[#6b6b7a] hover:text-[#fcfcfcfc] cursor-pointer p-[2px] flex hover:bg-[#1a1a1f] rounded-md transition-all duration-200",
};

const PRICE_DATA = [
  { icon: RiBtcFill, label: 'BTC', color: 'text-[#f7931a]', price: '$90.6K', tooltip: 'Price of BTC in USD' },
  { icon: null, label: 'ETH', color: 'text-[#497493]', price: '$3094', tooltip: 'Price of ETH in USD', imageSrc: 'https://axiom.trade/images/eth-fill.svg' },
];

const FEE_DATA = [
  { icon: RiCapsuleLine, label: 'Migration', price: '$55.9K', tooltip: 'Estimated Migration Price' },
  { icon: RiGasStationLine, label: 'Gas', price: '0.0₂23', tooltip: 'Recommended priority fee' },
  { icon: RiCoinLine, label: 'Bribe', price: '0.003', tooltip: 'Recommend bribe fee' },
];

const NAV_LINKS = [
  { icon: RiWalletLine, label: 'Wallet', tooltip: 'Wallet Settings' },
  { icon: RiTwitterXLine, label: 'Twitter', tooltip: 'Twitter Settings' },
  { icon: RiCompass3Line, label: 'Discover', tooltip: 'Discover Settings' },
  { icon: RiPulseLine, label: 'Pulse', tooltip: 'Pulse Settings' },
  { icon: RiBarChartLine, label: 'PnL', tooltip: 'PnL Settings' },
];

const UTILITY_ICONS = [
  { icon: RiWindowLine, tooltip: 'Hide Watchlist Ticker' },
  { icon: RiNotification3Line, tooltip: 'Notification Settings' },
  { icon: RiPaletteLine, tooltip: 'Customize Theme' },
];

const SOCIAL_ICONS = [
  { icon: RiDiscordFill, tooltip: 'Join our Discord' },
  { icon: RiTwitterXLine, tooltip: 'follow us on X' },
];

export function BottomStatusBar({ className, loading }: BottomStatusBarProps) {
  const dispatch = useDispatch();
  const activeChain = useSelector((state: RootState) => state.ui.activeChain);
  const activePreset = useSelector((state: RootState) => state.filter.activePreset);
  const chainName = activeChain === 'bnb' ? 'BNB' : 'SOL';

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollNav = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
        behavior: 'smooth'
      });
      setTimeout(updateScrollState, SCROLL_UPDATE_DELAY);
    }
  }, [updateScrollState]);

  const renderScrollButton = (direction: 'left' | 'right', canScroll: boolean) => {
    const Icon = direction === 'left' ? RiArrowLeftSLine : RiArrowRightSLine;
    const position = direction === 'left' ? 'left-0 justify-start' : 'right-0 justify-end';
    const gradient = direction === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l';
    const padding = direction === 'left' ? 'pl-1' : 'pr-1';

    return (
      <div className={`absolute ${position} top-0 bottom-0 w-[30px] flex items-center z-20 transition-opacity duration-200 ${canScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 ${gradient} from-black via-black/50 to-transparent pointer-events-none`} />
        <button
          onClick={() => scrollNav(direction)}
          className={`relative z-10 flex items-center justify-center cursor-pointer transition-opacity duration-200 ${padding} ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <Icon className="w-4 h-4 text-[#6b6b7a] hover:text-white transition-colors" />
        </button>
      </div>
    );
  };

  return (
    <div
      className={cn("fixed bottom-0 left-0 right-0 h-10 bg-zinc-950/90 border-t border-white/5 backdrop-blur-md z-[100] flex items-center text-[10px] shrink-0 group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollContainerRef}
        className="flex items-center justify-between w-full px-4 lg:px-7 overflow-x-auto overflow-y-visible scrollbar-hide"
        onScroll={updateScrollState}
      >
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <Tooltip content="Active Preset">
            <button
              onClick={() => dispatch(setActivePreset('P1'))}
              className="flex items-center gap-1 px-2 py-[3px] bg-[#526fff] border-none rounded-[4px] text-white text-[9px] font-bold cursor-pointer whitespace-nowrap hover:brightness-110 transition-all"
            >
              <RiListSettingsLine className="w-[10px] h-[10px]" />
              <span className="uppercase">PRESET 1</span>
            </button>
          </Tooltip>

          <Tooltip content="Active wallets">
            <div className="flex items-center">
              <WalletSolPill variant="statusBar" className="hover:bg-[#1a1a1f] hover:border-[#2a2a38] transition-all" walletCount={1} solBalance={0} />
            </div>
          </Tooltip>

          <div className="flex items-center gap-2">
            <button className="text-[#6b6b7a] hover:text-white transition-colors">
              <RiSettings3Line className="w-3.5 h-3.5" />
            </button>
            <button className="text-[#6b6b7a] hover:text-white transition-colors">
              <RiStarLine className="w-3.5 h-3.5" />
            </button>
            <button className="text-[#6b6b7a] hover:text-white transition-colors">
              <RiBarChartLine className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-[1px] h-3 bg-white/10 shrink-0" />

          <div className="flex items-center gap-3">
            {NAV_LINKS.map(link => (
              <Tooltip content={link.tooltip} key={link.label}>
                <button className="flex items-center gap-1 text-[#6b6b7a] hover:text-white transition-colors">
                  <link.icon className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-medium">{link.label}</span>
                </button>
              </Tooltip>
            ))}
          </div>

          <div className="w-[1px] h-3 bg-white/10 shrink-0" />

          <div className="flex items-center gap-3">
            <MultiChainBadge />

            {PRICE_DATA.map(item => (
              <Tooltip content={item.tooltip} key={item.label}>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  {item.icon ? (
                    <item.icon className={cn("w-3 h-3", item.color)} />
                  ) : item.imageSrc ? (
                    <OptimizedImage src={item.imageSrc} alt={item.label} width={12} height={12} />
                  ) : null}
                  <span className={cn("text-[9px] font-bold", item.color)}>{item.price}</span>
                </div>
              </Tooltip>
            ))}

            <Tooltip content={`Price of ${chainName} in USD`}>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <ChainLogo width={12} height={12} />
                <span className="text-[#14f195] text-[9px] font-bold">$135.99</span>
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          <div className="flex items-center gap-3">
            {FEE_DATA.map(item => (
              <Tooltip content={item.tooltip} key={item.label}>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <item.icon className="w-3.5 h-3.5 text-[#6b6b7a]" />
                  <span className="text-[#6b6b7a] text-[9px] font-medium">{item.price}</span>
                </div>
              </Tooltip>
            ))}
          </div>

          <div className="w-[1px] h-3 bg-white/10 shrink-0" />

          <div className="flex items-center gap-1.5 px-2 py-[2px] bg-emerald-500/10 rounded-full whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-emerald-500 text-[9px] font-medium">Connection is stable</span>
          </div>

          <div className="flex items-center gap-1 text-white cursor-pointer hover:text-white/80 transition-colors">
            <span className="font-bold text-[9px]">GLOBAL</span>
            <RiArrowDownSLine className="w-3 h-3" />
          </div>

          <div className="w-[1px] h-3 bg-white/10 shrink-0" />

          <div className="flex items-center gap-2.5">
            {UTILITY_ICONS.map((item, idx) => (
              <Tooltip content={item.tooltip} key={idx}>
                <button className="text-[#6b6b7a] hover:text-white transition-colors">
                  <item.icon className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
            ))}
          </div>

          <div className="w-[1px] h-3 bg-white/10 shrink-0" />

          <div className="flex items-center gap-2.5">
            {SOCIAL_ICONS.map((item, idx) => (
              <Tooltip content={item.tooltip} key={idx}>
                <button className="text-[#6b6b7a] hover:text-white transition-colors">
                  <item.icon className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
            ))}
            <Tooltip content="Documentation">
              <button className="flex items-center gap-1 text-[#6b6b7a] hover:text-white transition-colors">
                <RiBookOpenLine className="w-3.5 h-3.5" />
                <span className="text-[9px] font-medium">Docs</span>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {renderScrollButton('left', canScrollLeft)}
      {renderScrollButton('right', canScrollRight)}
    </div>
  );
}

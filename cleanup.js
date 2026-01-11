const fs = require('fs');
const path = require('path');

const files = [
    'src/types/token.types.ts',
    'src/types/ui.types.ts',
    'src/types/index.ts',
    'src/app/pulse/page.tsx',
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/utils/tokenCardHelpers.ts',
    'src/utils/constants.ts',
    'src/utils/index.ts',
    'src/utils/formatters.ts',
    'src/utils/mockData.ts',
    'src/components/molecules/FilterModal.tsx',
    'src/components/molecules/ChainDropdown.tsx',
    'src/components/molecules/MetricPill.tsx',
    'src/components/molecules/PresetPill.tsx',
    'src/components/molecules/WalletSolPill.tsx',
    'src/components/molecules/AvatarDropdown.tsx',
    'src/components/molecules/WalletDropdown.tsx',
    'src/components/molecules/ChainSelector.tsx',
    'src/components/molecules/MultiChainBadge.tsx',
    'src/components/molecules/index.ts',
    'src/components/molecules/TokenAvatarCard.tsx',
    'src/components/molecules/AccountSettingsDropdown.tsx',
    'src/components/PulseContentLazy.tsx',
    'src/components/atoms/MetricBlock.tsx',
    'src/components/atoms/ChainText.tsx',
    'src/components/atoms/ChainLogo.tsx',
    'src/components/atoms/Tooltip.tsx',
    'src/components/atoms/AxiomLogo.tsx',
    'src/components/atoms/SolanaLogo.tsx',
    'src/components/atoms/Badge.tsx',
    'src/components/atoms/index.ts',
    'src/components/atoms/Button.tsx',
    'src/components/atoms/NotificationDot.tsx',
    'src/components/atoms/NavButton.tsx',
    'src/components/atoms/Skeleton.tsx',
    'src/components/atoms/OptimizedImage.tsx',
    'src/components/skeletons/TokenColumnSkeleton.tsx',
    'src/components/skeletons/PulseToolbarSkeleton.tsx',
    'src/components/skeletons/index.ts',
    'src/components/skeletons/HeaderSkeleton.tsx',
    'src/components/PulseContent.tsx',
    'src/components/organisms/TokenCard.tsx',
    'src/components/organisms/TokenColumn.tsx',
    'src/components/organisms/PulseToolbar.tsx',
    'src/components/organisms/Header.tsx',
    'src/components/organisms/index.ts',
    'src/components/organisms/MobileNavBar.tsx',
    'src/components/organisms/MobileMenu.tsx',
    'src/components/organisms/BottomStatusBar.tsx',
    'src/components/Providers.tsx',
    'src/hooks/useTokens.ts',
    'src/hooks/usePerformance.ts',
    'src/hooks/useRedux.ts',
    'src/hooks/useTokenCardState.ts',
    'src/hooks/index.ts',
    'src/hooks/useWebSocket.ts',
    'src/hooks/useChain.ts',
    'src/hooks/useIsMobile.ts',
    'src/lib/utils.ts',
    'src/store/filterSlice.ts',
    'src/store/uiSlice.ts',
    'src/store/index.ts',
    'src/store/store.ts',
    'src/store/tokenSlice.ts'
];

const root = '/Users/souravpander/Downloads/axiom-trade-pulse-clone-master';

files.forEach(file => {
    const filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove multi-line comments
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove single-line comments (but not URLs)
    // This regex matches // followed by anything, but not if preceded by :
    content = content.split('\n').map(line => {
        // Simple check: if line contains // and not http:// or https://
        if (line.includes('//') && !line.includes('http://') && !line.includes('https://')) {
            return line.split('//')[0].trimEnd();
        }
        return line;
    }).join('\n');

    // Remove console.log
    content = content.replace(/console\.log\(.*?\);?/g, '');

    // Remove empty lines created by comment removal (optional but cleaner)
    content = content.replace(/^\s*[\r\n]/gm, '\n').replace(/\n\n+/g, '\n\n');

    fs.writeFileSync(filePath, content);
    console.log(`Cleaned: ${file}`);
});

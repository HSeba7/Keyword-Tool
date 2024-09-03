import { Box } from '@mui/material';
import DashboardTextCard from './components/DashboardTextCard';
import FilterTextFeild from './components/FilterTextFeild';
import KeywordsManager from './components/KewordsManger';
import SearchWebsites from './components/SearchWebsites';
import { KeywordContextProvider } from './components/KeywordContext';
import { useState } from 'react';

export default function DashboardFirstPage() {
  const [allowedToSend, setAllowedToSend] = useState(true);

  return (
    <KeywordContextProvider>
      <Box>
        <DashboardTextCard></DashboardTextCard>
        <SearchWebsites setAllowedToSend={setAllowedToSend}></SearchWebsites>
        <FilterTextFeild></FilterTextFeild>

        <KeywordsManager allowedToSend={allowedToSend}></KeywordsManager>
        {/* <SettingsBrushCol></SettingsBrushCol> */}
      </Box>
    </KeywordContextProvider>
  );
}

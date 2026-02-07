'use client';

import { MOCK_FORM_STATS } from '@/modules/form/types/mock.data';
import StatsCards from './StatsCards';

const CardStatsWrapper = () => {
  const stats = MOCK_FORM_STATS;
  return <StatsCards loading={false} stats={stats} />;
};
export default CardStatsWrapper;

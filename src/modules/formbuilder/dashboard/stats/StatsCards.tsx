import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';
import StatsCard from './StatsCard';
import { formStatsType } from '@/modules/formbuilder/types/form.types';

interface StatsCardProps {
  loading: boolean;
  stats?: formStatsType;
}

const StatsCards = ({ loading, stats }: StatsCardProps) => {
  const {
    submissions = 0,
    submissionRate = 0,
    bounceRate = 0,
    visits = 0,
  } = stats || {};
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<LuView className="text-blue-600" />}
        helperText="All time form visits"
        value={visits.toLocaleString() || ''}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="All time form submissions"
        value={submissions.toLocaleString() || ''}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submission Rate"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Visits that result in form submissions"
        value={submissionRate.toLocaleString() + '%' || ''}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bonuce Rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        value={bounceRate.toLocaleString() + '%' || ''}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
};

export default StatsCards;

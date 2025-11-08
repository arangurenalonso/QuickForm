import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/common/libs/ui/card';
import { Skeleton } from '@/common/libs/ui/skeleton';
import { ReactNode } from 'react';

type StatsCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  helperText: string;
  loading: boolean;
  className: string;
};

const StatsCard = ({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: StatsCardProps) => {
  return (
    <Card className={`${className || ''} shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

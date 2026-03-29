import { Card, CardContent } from '@/common/libs/ui/card';
import { motion } from 'framer-motion';
import { ElementType } from 'react';

type SectionCardProps = {
  title: string;
  description: string;
  factor: number;
  icon?: ElementType;
};

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  factor,
  icon: Icon,
}) => {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay: factor * 0.05 }}
    >
      <Card className="h-full rounded-[24px] border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="p-6">
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <h3 className="mt-5 text-xl font-semibold text-card-foreground">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SectionCard;

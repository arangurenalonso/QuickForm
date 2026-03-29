import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/common/libs/ui/card';
import HeroPreviewForm from './HeroPreviewForm';
import CardAlert from '../../../../../common/components/CardAlert';

const HeroContactCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
    >
      <div className="absolute -left-8 top-10 hidden h-24 w-24 rounded-full bg-primary/10 blur-2xl lg:block" />

      <Card className="overflow-hidden rounded-[28px] border-border shadow-xl shadow-black/5 dark:shadow-black/25">
        <CardHeader className="border-b border-border bg-muted/50 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Request a demo
              </p>
              <CardTitle className="mt-1 text-xl text-card-foreground">
                Talk to our team
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 p-6">
          <HeroPreviewForm />
          <CardAlert
            title="Talk to our team"
            description="Share your contact information and we’ll reach out to show you how QuickForm can simplify form creation, automate collection, and improve your workflow."
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HeroContactCard;

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/common/libs/ui/card';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { Badge } from '@/common/libs/ui/badge';
import { Button } from '@/common/libs/ui/button';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { COLOR_BADGE_CLASSES } from '@/modules/ui/type/ui.type';
import ActionGuard from '@/common/components/atoms/guard/ActionGuard';
import { FORM_ACTION } from '@/modules/form/enum/form.enum';
import { FormType } from '@/modules/form/types/form.types';

type FormCardProps = {
  form: FormType;
};

const FormCard = ({ form }: FormCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          <Badge className={COLOR_BADGE_CLASSES[form.status.color]}>
            {form.status.name}
          </Badge>
        </CardTitle>

        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || 'No description'}
      </CardContent>

      <CardFooter className="flex items-center gap-2">
        <ActionGuard
          currentActions={form.status.allowedActions}
          allowedActions={[FORM_ACTION.Edit]}
        >
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/dashboard/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        </ActionGuard>

        <ActionGuard
          currentActions={form.status.allowedActions}
          allowedActions={[FORM_ACTION.ViewSubmissions]}
        >
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/dashboard/forms/${form.id}/submissions`}>
              Submissions <BiRightArrowAlt />
            </Link>
          </Button>
        </ActionGuard>
      </CardFooter>
    </Card>
  );
};

export default FormCard;

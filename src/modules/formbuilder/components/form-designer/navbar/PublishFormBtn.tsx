import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/common/libs/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { Button } from '@/common/libs/ui/button';
import { FaIcons } from 'react-icons/fa';
import { MdOutlinePublish } from 'react-icons/md';

const PublishFormBtn = () => {
  const [loading, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  async function publishForm() {
    try {
      // await PublishForm(id);
      toast({
        title: 'Success',
        description: 'Your form is now available to the public',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Something went wrong, please try again later ${error}`,
        variant: 'destructive',
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form.
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <FaIcons className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;

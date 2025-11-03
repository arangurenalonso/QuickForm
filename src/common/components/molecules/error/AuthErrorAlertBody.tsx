import { AuthError } from '@/common/libs/axios/type/error.type';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type AuthErrorAlertBodyProps = {
  error: AuthError | null | undefined;
  showProperties?: boolean;
};

const AuthErrorAlertBody = ({
  error,
  showProperties,
}: AuthErrorAlertBodyProps) => {
  if (!error) return null;
  const hasDetails = Array.isArray(error.details) && error.details.length > 0;

  return (
    <>
      {!hasDetails && (
        <p className="text-sm leading-relaxed">{error.message}</p>
      )}
      {hasDetails && (
        <div className="">
          <ul className="space-y-2">
            {error.details!.map((d, idx) => (
              <li
                key={`${d.propertyName}-${idx}`}
                className="flex flex-col gap-1 rounded-md border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2">
                  {showProperties && (
                    <Badge variant="secondary" className="font-mono">
                      {d.propertyName}
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {d.description}
                  </span>
                </div>
                {d.redirectUrl && (
                  <Button asChild size="sm" className="mt-2 sm:mt-0">
                    <Link href={d.redirectUrl}>Open link</Link>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AuthErrorAlertBody;

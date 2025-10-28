'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CheckCircle2, TriangleAlert, Loader2 } from 'lucide-react';
import useAuthStore from '../../hooks/useAuthStore';
import CustomAlert from '@/common/components/atoms/CustomAlert';

type VerifyStatus = 'idle' | 'verifying' | 'success' | 'error';

export default function EmailConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // token desde querystring ?token=...
  const {
    // confirmEmail,
    errorMessage,
  } = useAuthStore();

  const [status, setStatus] = useState<VerifyStatus>('idle');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // setStatus('verifying');
    setStatus('success');
    // setStatus('error');
  }, []);
  //   useEffect(() => {
  //     let cancelled = false;

  //     const verify = async () => {
  //       if (!token) {
  //         setStatus('error');
  //         setMessage('Invalid or missing verification token.');
  //         return;
  //       }

  //       setStatus('verifying');
  //       try {
  //         // Ajusta el contrato según tu store:
  //         // ideal: confirmEmail devuelve { ok: boolean; message?: string }
  //         // const result: any = await confirmEmail(token);

  //         if (cancelled) return;

  //         const ok =
  //           (typeof result === 'boolean' && result) ||
  //           (typeof result === 'object' && result?.ok);

  //         if (ok) {
  //           setStatus('success');
  //           setMessage(
  //             (typeof result === 'object' && result?.message) ||
  //               'Your email has been successfully verified. You can now log in to your account.'
  //           );
  //         } else {
  //           setStatus('error');
  //           setMessage(
  //             (typeof result === 'object' && result?.message) ||
  //               errorMessage ||
  //               'We could not verify your email. Please try again.'
  //           );
  //         }
  //       } catch {
  //         if (cancelled) return;
  //         setStatus('error');
  //         setMessage(errorMessage || 'We could not verify your email. Please try again.');
  //       }
  //     };

  //     verify();
  //     return () => {
  //       cancelled = true;
  //     };
  //   }, [token, confirmEmail, errorMessage]);

  const handleLoginRedirect = () => {
    router.replace('/auth/login');
  };

  return (
    <div className=" ">
      {status === 'verifying' && (
        <CustomAlert
          title="Verifying email…"
          message="We are confirming your email. Please wait."
          variant="info"
          icon={Loader2}
          iconClassName="animate-spin"
        />
      )}

      {status === 'success' && (
        <>
          <CustomAlert
            title="Email verified"
            message="Success! Your email has been verified."
            variant="success"
          />

          <Button className="mt-4 w-full" onClick={handleLoginRedirect}>
            Go to Login
          </Button>
        </>
      )}

      {status === 'error' && (
        <CustomAlert
          title="Verification failed"
          message={
            message || 'We could not verify your email. Please try again.'
          }
          variant="error"
        />
      )}
    </div>
  );
}

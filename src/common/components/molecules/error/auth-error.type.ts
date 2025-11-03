import {
  AlertTriangle,
  CircleHelp,
  Clock,
  Lock,
  ShieldX,
  Server,
  WifiOff,
  OctagonX,
  SearchX,
  Ban,
} from 'lucide-react';

import { AuthErrorKind } from '@/common/libs/axios/type/error.type';
const KIND_UI: Record<
  AuthErrorKind,
  {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    variant: 'default' | 'error' | 'success' | 'info' | 'warning';
  }
> = {
  InvalidCredentials: {
    title: 'Invalid email or password',
    icon: Lock,
    variant: 'error',
  },
  Unauthorized: {
    title: "You don't have access",
    icon: ShieldX,
    variant: 'error',
  },
  NotFound: {
    title: "We couldn't find that",
    icon: SearchX,
    variant: 'default',
  },
  Validation: {
    title: 'Please fix the highlighted fields',
    icon: AlertTriangle,
    variant: 'error',
  },
  RateLimited: {
    title: 'Too many attempts',
    icon: Ban,
    variant: 'default',
  },
  Network: {
    title: 'Network error',
    icon: WifiOff,
    variant: 'default',
  },
  Timeout: {
    title: 'This is taking longer than expected',
    icon: Clock,
    variant: 'default',
  },
  Canceled: {
    title: 'Request canceled',
    icon: OctagonX,
    variant: 'default',
  },
  Server: {
    title: 'Something went wrong on our end',
    icon: Server,
    variant: 'error',
  },
  BadRequest: {
    title: "We couldn't process that",
    icon: CircleHelp,
    variant: 'default',
  },
  Unknown: {
    title: 'Unexpected error',
    icon: CircleHelp,
    variant: 'default',
  },
};
export { KIND_UI };

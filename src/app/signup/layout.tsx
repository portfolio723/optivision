import AuthLayout from '../auth-layout';
import type { ReactNode } from 'react';

export default function SignupLayout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}

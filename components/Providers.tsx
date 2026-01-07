'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

// We make children optional to satisfy strict TypeScript checks in some environments
// where the JSX children mapping might not be immediately apparent to the compiler.
export function Providers({ children }: { children?: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
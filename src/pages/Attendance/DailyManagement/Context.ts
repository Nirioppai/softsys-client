import React, { createContext } from 'react';
interface DMContextInterface {
  [key: string]: any;
}

export const DMContext = createContext<DMContextInterface>({});
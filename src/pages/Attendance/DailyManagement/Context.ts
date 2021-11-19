import React, { createContext } from 'react';
interface DMContextInterface {
  [key: string]: any;
}

const DMContext = createContext<DMContextInterface>({});
export default DMContext;
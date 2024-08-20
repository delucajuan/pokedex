import { useEffect } from 'react';

export const usePageTitle = (pageTitle: string) => {
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | Pokédex`;
    } else {
      document.title = 'Pokédex';
    }
  }, [pageTitle]);
};

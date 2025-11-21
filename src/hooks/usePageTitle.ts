import { useEffect } from "react";

const DEFAULT_TITLE = "Bamboo Reports - Actionable Insights On Global Capability Centers";

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    const previousTitle = document.title;

    if (title) {
      document.title = `${title} - Bamboo Reports`;
    } else {
      document.title = DEFAULT_TITLE;
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default usePageTitle;

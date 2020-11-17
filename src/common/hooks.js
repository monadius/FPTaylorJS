import { useLocation } from 'react-router-dom';

export function useQuery() {
  const location = useLocation();
  try {
    return new URLSearchParams(location.search);
  }
  catch (e) {
    return { get() {} };
  }
}
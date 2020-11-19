import { useLocation } from 'react-router-dom';
import { getSearchParams } from './utils';

export function useQuery() {
  const location = useLocation();
  return getSearchParams(location);
}
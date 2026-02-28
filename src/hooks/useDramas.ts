import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../store/language';

interface Drama {
  bookId: string;
  bookName: string;
  introduction: string;
  cover: string;
  chapterCount: number;
  playCount: string;
  tags: string[];
  corner?: {
    cornerType: number;
    name: string;
    color: string;
  };
  rank?: {
    rankType: number;
    hotCode: string;
    recCopy: string;
    sort: number;
  };
}

interface ApiResponse {
  success: boolean;
  data: {
    list: Drama[];
  };
}

export const useDramas = () => {
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const response = await fetch(`/api/foryou/1?lang=${lang}`);
        const data: ApiResponse = await response.json();
        if (data.success) {
          setDramas(data.data.list);
        }
      } catch (error) {
        console.error('Failed to fetch dramas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDramas();
  }, [lang]);

  return { dramas, loading };
};

export const useInfiniteDramas = () => {
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { lang } = useLanguage();

  const fetchDramas = useCallback(async (pageNum: number, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch(`/api/new/${pageNum}?lang=${lang}&pageSize=50`);
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        const newDramas = data.data.list;
        
        if (isLoadMore) {
          setDramas(prev => [...prev, ...newDramas]);
        } else {
          setDramas(newDramas);
        }
        
        setHasMore(newDramas.length >= 50);
      }
    } catch (error) {
      console.error('Failed to fetch dramas:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchDramas(1);
  }, [fetchDramas]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchDramas(nextPage, true);
    }
  }, [page, loadingMore, hasMore, fetchDramas]);

  return { dramas, loading, loadingMore, hasMore, loadMore };
};

export const useRankDramas = () => {
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const response = await fetch('/api/rank/1?lang=en');
        const data: ApiResponse = await response.json();
        if (data.success) {
          setDramas(data.data.list);
        }
      } catch (error) {
        console.error('Failed to fetch rank dramas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDramas();
  }, []);

  return { dramas, loading };
};

export const useSearchDramas = (query: string) => {
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setDramas([]);
      return;
    }

    const fetchDramas = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search/${encodeURIComponent(query)}/1?lang=en&pageSize=20`);
        const data: ApiResponse = await response.json();
        if (data.success) {
          setDramas(data.data.list);
        }
      } catch (error) {
        console.error('Failed to search dramas:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchDramas, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return { dramas, loading };
};

import { useState, useEffect, useCallback } from 'react'
import api from '@/api/client'
import type { Drama, Chapter, WatchData } from '@/types'

export function useForYou(page = 1) {
  const [data, setData] = useState<Drama[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/foryou/${page}?lang=en`)
      .then(res => setData(res.data.data?.list || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [page])

  return { data, loading }
}

export function useRank(type: 1 | 2 | 3) {
  const [data, setData] = useState<Drama[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/rank/${type}?lang=en`)
      .then(res => setData(res.data.data?.list || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [type])

  return { data, loading }
}

export function useCategory(tagId: number, page = 1) {
  const [data, setData] = useState<Drama[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/classify?lang=en&pageNo=${page}&pageSize=15&sort=1&tag=${tagId}`)
      .then(res => setData(res.data.data?.list || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [tagId, page])

  return { data, loading }
}

export function useChapters(bookId: string) {
  const [data, setData] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/chapters/${bookId}?lang=en`)
      .then(res => setData(res.data.data?.chapterList || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [bookId])

  return { data, loading }
}

export function useWatch(bookId: string, chapter: number) {
  const [data, setData] = useState<WatchData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/watch/${bookId}/${chapter}?lang=en&direction=1`)
      .then(res => setData(res.data.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [bookId, chapter])

  return { data, loading }
}

export function useSearch(keyword: string) {
  const [data, setData] = useState<Drama[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!keyword) { setData([]); return }
    setLoading(true)
    api.get(`/search/${keyword}/1?lang=en&pageSize=20`)
      .then(res => setData(res.data.data?.list || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [keyword])

  return { data, loading }
}

export function useSuggest(keyword: string) {
  const [data, setData] = useState<Drama[]>([])

  useEffect(() => {
    if (!keyword) { setData([]); return }
    api.get(`/suggest/${keyword}?lang=en`)
      .then(res => setData(res.data.data?.suggestList || []))
      .catch(() => setData([]))
  }, [keyword])

  return data
}

export function useNewInfinite() {
  const [data, setData] = useState<Drama[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    api.get(`/new/1?lang=en&pageSize=50`)
      .then(res => {
        const list = res.data.data?.list || []
        setData(list)
        setHasMore(list.length >= 50)
        setPage(2)
      })
      .finally(() => setLoading(false))
  }, [])

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    setLoading(true)
    api.get(`/new/${page}?lang=en&pageSize=50`)
      .then(res => {
        const list = res.data.data?.list || []
        setData(prev => [...prev, ...list])
        setHasMore(list.length >= 50)
        setPage(p => p + 1)
      })
      .finally(() => setLoading(false))
  }, [page, loading, hasMore])

  return { data, loading, hasMore, loadMore }
}

export interface Tag {
  tagId: number
  tagName: string
  tagEnName: string
}

export interface Drama {
  bookId: string
  bookName: string
  introduction: string
  cover: string
  chapterCount: number
  playCount: string
  tags: string[]
  tagDetails: Tag[]
}

export interface Chapter {
  chapterId: string
  chapterIndex: number
  isCharge: number
  isPay: number
}

export interface VideoQuality {
  quality: number
  videoPath: string
  isDefault: number
}

export interface WatchData {
  bookId: string
  chapterIndex: number
  videoUrl: string
  qualities: VideoQuality[]
  cover: string
  bookName: string
}

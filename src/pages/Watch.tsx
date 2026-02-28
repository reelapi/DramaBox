import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Chapter {
  chapterId: string;
  chapterIndex: number;
  isCharge: number;
  isPay: number;
}

interface WatchData {
  bookName: string;
  bookCover: string;
  videoUrl: string;
  introduction: string;
}

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [watchData, setWatchData] = useState<WatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsTransitioning(true);
      try {
        // Fetch chapters only once
        if (chapters.length === 0) {
          const chaptersResponse = await fetch(`/api/chapters/${id}?lang=${lang}`);
          const chaptersData = await chaptersResponse.json();
          if (chaptersData.success) {
            setChapters(chaptersData.data.chapterList);
          }
        }

        // Fetch watch data
        const watchResponse = await fetch(`/api/watch/${id}/${currentChapter}?lang=${lang}&direction=1`);
        const watchDataResponse = await watchResponse.json();
        if (watchDataResponse.success) {
          setWatchData(watchDataResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch watch data:', error);
      } finally {
        setLoading(false);
        setIsTransitioning(false);
      }
    };

    fetchData();
  }, [id, currentChapter, lang]);

  const handleChapterChange = (chapterIndex: number) => {
    setCurrentChapter(chapterIndex);
  };

  const handlePrevious = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleNext = () => {
    if (currentChapter < chapters.length) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handleVideoEnded = () => {
    if (currentChapter < chapters.length) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!watchData) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">Drama tidak ditemukan</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="flex items-center justify-between h-16 px-4 max-w-md mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="font-semibold text-white line-clamp-1 flex-1 mx-4">
            {watchData.bookName}
          </h1>
        </div>
      </div>

      {/* Video Player */}
      <div className="pt-16 relative">
        {isTransitioning && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-white">Loading episode {currentChapter}...</p>
            </div>
          </div>
        )}
        
        <div className="relative bg-black">
          <video
            key={watchData.videoUrl}
            src={watchData.videoUrl}
            poster={watchData.bookCover}
            controls
            autoPlay
            playsInline
            onEnded={handleVideoEnded}
            className="w-full aspect-[9/16] object-contain bg-black"
          />
        </div>

        {/* Content */}
        <div className="p-4 max-w-md mx-auto space-y-6">
          {/* Episode Info */}
          <div>
            <h2 className="text-lg font-bold mb-2">{watchData.bookName}</h2>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-zinc-400">
                Episode {currentChapter} of {chapters.length}
              </span>
            </div>
            {watchData.introduction && (
              <p className="text-sm text-zinc-300 line-clamp-3">
                {watchData.introduction}
              </p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentChapter <= 1 || isTransitioning}
              className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ChevronLeft size={18} />
              <span className="font-medium">Sebelumnya</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentChapter >= chapters.length || isTransitioning}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center gap-2 transition-colors text-white font-medium"
            >
              <span>Selanjutnya</span>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Episode List */}
          <div>
            <h3 className="font-semibold mb-3">All Episodes</h3>
            <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
              {chapters.map((chapter) => {
                const episodeNum = chapter.chapterIndex + 1;
                return (
                  <button
                    key={chapter.chapterId}
                    onClick={() => handleChapterChange(episodeNum)}
                    disabled={isTransitioning}
                    className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                      currentChapter === episodeNum
                        ? 'bg-red-500 text-white scale-105'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {episodeNum}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;

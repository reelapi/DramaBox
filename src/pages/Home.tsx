import { Play, Users } from 'lucide-react';
import { useDramas, useInfiniteDramas } from '../hooks/useDramas';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useCallback } from 'react';

const Home = () => {
  const { dramas: featuredDramas, loading: featuredLoading } = useDramas();
  const { dramas, loading, loadingMore, hasMore, loadMore } = useInfiniteDramas();
  const observerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
      if (hasMore && !loadingMore) {
        loadMore();
      }
    }
  }, [hasMore, loadingMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (featuredLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-2">
      {/* Featured Drama from ForYou */}
      {featuredDramas[0] && (
        <Link to={`/watch/${featuredDramas[0].bookId}`} className="block">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
            <img 
              src={featuredDramas[0].cover} 
              alt={featuredDramas[0].bookName} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
                For You
              </div>
              <h1 className="text-xl font-bold mb-2 line-clamp-2">
                {featuredDramas[0].bookName.trim()}
              </h1>
              <p className="text-sm text-zinc-300 mb-3 line-clamp-2">
                {featuredDramas[0].introduction}
              </p>
              <div className="btn-primary inline-flex items-center gap-2">
                <Play size={16} />
                Watch Now
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* For You Section */}
      {featuredDramas.length > 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">For You</h2>
          <div className="grid grid-cols-3 gap-3">
            {featuredDramas.slice(1, 7).map((drama, index) => (
              <Link key={`foryou-${drama.bookId}-${index}`} to={`/watch/${drama.bookId}`} className="group">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <img 
                    src={drama.cover} 
                    alt={drama.bookName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {/* Corner Badge */}
                  {drama.corner && (
                    <div 
                      className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg"
                      style={{ backgroundColor: drama.corner.color }}
                    >
                      {drama.corner.name}
                    </div>
                  )}
                  {/* Rank Badge */}
                  {drama.rank && (
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg">
                      🔥 {drama.rank.hotCode}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play size={20} className="text-white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium line-clamp-2 mb-1">
                  {drama.bookName.trim()}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <Users size={12} />
                  <span>{drama.playCount}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* New Dramas Section with Infinite Scroll */}
      <div>
        <h2 className="text-lg font-semibold mb-4">New Dramas ({dramas.length})</h2>
        
        {loading && dramas.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3">
              {dramas.map((drama, index) => (
                <Link key={`${drama.bookId}-${index}`} to={`/watch/${drama.bookId}`} className="group">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                    <img 
                      src={drama.cover} 
                      alt={drama.bookName} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {/* Corner Badge */}
                    {drama.corner && (
                      <div 
                        className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg"
                        style={{ backgroundColor: drama.corner.color }}
                      >
                        {drama.corner.name}
                      </div>
                    )}
                    {/* Rank Badge */}
                    {drama.rank && (
                      <div className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg">
                        🔥 {drama.rank.hotCode}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play size={20} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium line-clamp-2 mb-1">
                    {drama.bookName.trim()}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <Users size={12} />
                    <span>{drama.playCount}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Loading More Indicator */}
            {loadingMore && (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full"></div>
                <span className="ml-2 text-sm text-muted">Loading more...</span>
              </div>
            )}

            {/* Manual Load More Button for Debug */}
            {hasMore && !loadingMore && (
              <div className="text-center py-6">
                <button 
                  onClick={loadMore}
                  className="btn-primary"
                >
                  Load More ({dramas.length} loaded)
                </button>
              </div>
            )}

            {/* End of Content */}
            {!hasMore && dramas.length > 0 && (
              <div className="text-center py-6 text-sm text-muted">
                All dramas loaded ({dramas.length} total)
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

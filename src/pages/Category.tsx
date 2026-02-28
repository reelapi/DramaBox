import { Grid, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../store/language';

interface Drama {
  bookId: string;
  bookName: string;
  cover: string;
  playCount: string;
  tagDetails?: Array<{
    tagId: number;
    tagName: string;
  }>;
}

interface Tag {
  tagId: number;
  tagName: string;
}

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [categories, setCategories] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  // Fetch popular tags from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/foryou/1?lang=${lang}`);
        const data = await response.json();
        if (data.success && data.data.list.length > 0) {
          // Extract unique tags from first few dramas
          const allTags = new Map<number, string>();
          data.data.list.slice(0, 5).forEach((drama: Drama) => {
            drama.tagDetails?.forEach(tag => {
              if (!allTags.has(tag.tagId)) {
                allTags.set(tag.tagId, tag.tagName);
              }
            });
          });
          
          const tagArray = Array.from(allTags, ([tagId, tagName]) => ({ tagId, tagName })).slice(0, 6);
          setCategories(tagArray);
          
          // Always set first tag when language changes
          if (tagArray.length > 0) {
            setSelectedCategory(tagArray[0].tagId);
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, [lang]);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchCategoryDramas = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/classify?lang=${lang}&pageNo=1&pageSize=15&sort=1&tag=${selectedCategory}`);
        const data = await response.json();
        if (data.success) {
          setDramas(data.data.list);
        }
      } catch (error) {
        console.error('Failed to fetch category dramas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDramas();
  }, [selectedCategory, lang]);

  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-center gap-2">
        <Grid size={20} className="text-red-500" />
        <h1 className="text-xl font-bold">Category</h1>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.tagId}
            onClick={() => setSelectedCategory(category.tagId)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.tagId
                ? 'bg-red-500 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {category.tagName}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Drama Grid */}
      {!loading && (
        <div className="grid grid-cols-3 gap-3">
          {dramas.map((drama) => (
            <Link key={drama.bookId} to={`/watch/${drama.bookId}`} className="group">
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2">
                <img 
                  src={drama.cover} 
                  alt={drama.bookName} 
                  className="w-full h-full object-cover"
                />
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
      )}
    </div>
  );
};

export default Category;

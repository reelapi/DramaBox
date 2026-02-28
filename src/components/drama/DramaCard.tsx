import { Play, Star, Clock, Heart } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

interface Drama {
  id: number;
  title: string;
  rating: number;
  year: number;
  genre: string;
  image: string;
  description: string;
  duration?: string;
}

interface DramaCardProps {
  drama: Drama;
  size?: 'sm' | 'md' | 'lg';
}

const DramaCard = ({ drama, size = 'md' }: DramaCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-48 h-64',
    md: 'w-64 h-80',
    lg: 'w-80 h-96'
  };

  return (
    <div className={`group cursor-pointer ${sizeClasses[size]} flex-shrink-0`}>
      <div className="relative overflow-hidden rounded-2xl glass hover:scale-105 transition-all duration-300 h-full">
        {/* Image */}
        <div className="relative h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 animate-pulse" />
          )}
          <img 
            src={drama.image} 
            alt={drama.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 p-4 w-full">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{drama.rating}</span>
              <span className="text-sm text-gray-300">• {drama.year}</span>
              {drama.duration && (
                <>
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{drama.duration}</span>
                </>
              )}
            </div>
            <h3 className="text-lg font-bold mb-1 line-clamp-2">{drama.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{drama.genre}</p>
            <p className="text-xs text-gray-400 line-clamp-2">{drama.description}</p>
          </div>

          {/* Hover Actions */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`w-10 h-10 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform ${
                isLiked ? 'text-red-500' : 'text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="w-10 h-10 glass rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="w-4 h-4" />
            </button>
          </div>

          {/* Play Button Center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="glass" size="lg" className="w-16 h-16 rounded-full">
              <Play className="w-6 h-6 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DramaCard;

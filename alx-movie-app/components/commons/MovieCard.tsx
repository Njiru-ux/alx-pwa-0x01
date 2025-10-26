interface MovieCardProps {
  title: string;
  posterImage: string;
  releaseYear: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterImage, releaseYear }) => {
  return (
    <div className="relative group cursor-pointer transition-transform hover:scale-105">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={posterImage} 
          alt={title}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <p className="text-xs text-gray-400">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;
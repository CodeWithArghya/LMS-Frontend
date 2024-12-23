import StarRating from './StarRating';

export default function TestimonialCard({ name, role, content, image }) {
  return (
    <div className="bg-[#1a1f2e] p-4 md:p-8 rounded-lg h-[300px] flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-white font-semibold text-base md:text-lg">{name}</h3>
          <p className="text-gray-400 text-sm md:text-base">{role}</p>
        </div>
      </div>
      <div className="mb-4">
        <StarRating />
      </div>
      <p className="text-gray-300 text-base md:text-lg leading-relaxed overflow-hidden line-clamp-4">{content}</p>
    </div>
  );
}
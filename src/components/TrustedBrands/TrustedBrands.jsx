import { 
  Apple, 
  Microsoft, 
  Google, 
  Facebook, 
  Amazon, 
  Netflix, 
  Tesla, 
  Spotify, 
  Twitter, 
  Slack,
  Github,
  Figma
} from 'lucide-react';

export default function TrustedBrands() {
  const brands = [
    { icon: Apple, name: 'Apple' },
    { icon: Microsoft, name: 'Microsoft' },
    { icon: Google, name: 'Google' },
    { icon: Facebook, name: 'Facebook' },
    { icon: Amazon, name: 'Amazon' },
    { icon: Netflix, name: 'Netflix' },
    { icon: Tesla, name: 'Tesla' },
    { icon: Spotify, name: 'Spotify' },
    { icon: Twitter, name: 'Twitter' },
    { icon: Slack, name: 'Slack' },
    { icon: Github, name: 'Github' },
    { icon: Figma, name: 'Figma' }
  ];

  return (
    <div className="bg-gray-800 py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Trusted By Industry Leaders
        </h2>
      </div>
      
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {brands.map((Brand, index) => (
            <div key={index} className="mx-8 flex items-center">
              <Brand.icon className="w-12 h-12 text-gray-400 hover:text-purple-400 transition-colors" />
            </div>
          ))}
          {brands.map((Brand, index) => (
            <div key={`duplicate-${index}`} className="mx-8 flex items-center">
              <Brand.icon className="w-12 h-12 text-gray-400 hover:text-purple-400 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function TrustedBrands() {
  return (
    <div className="bg-gray-800 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Trusted By Leading Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {[1, 2, 3, 4].map((brand) => (
            <div key={brand} className="flex justify-center">
              <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Brand {brand}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
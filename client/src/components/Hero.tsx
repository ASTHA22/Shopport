import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1652517457739-9443343b803d"
          alt="Fashion model"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Voice-Assisted Shopping Experience
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Browse our collection using voice commands. Just say "Hey, show me
              dresses" or "Search for jackets" to get started.
            </p>
            <div className="space-x-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100"
                onClick={() => window.location.href = '/products'}
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

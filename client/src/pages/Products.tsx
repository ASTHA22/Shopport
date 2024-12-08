import { ProductGrid } from "../components/ProductGrid";
import { VoiceControl } from "../components/VoiceControl";
import { CartDrawer } from "../components/CartDrawer";
import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";
import { useLocation } from "wouter";

export function Products() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleAddToCart = async (productId: number) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity: 1,
          sessionId: "temp-session",
        }),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const handleSearch = useCallback((query: string) => {
    toast({
      title: "Searching",
      description: `Searching for: ${query}`,
    });
    // Implement search functionality
  }, [toast]);

  const handleNavigate = useCallback((path: string) => {
    setLocation(`/${path}`);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">All Products</h1>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <ProductGrid onAddToCart={handleAddToCart} />
        <VoiceControl
          onSearch={handleSearch}
          onNavigate={handleNavigate}
        />
      </main>
    </div>
  );
}

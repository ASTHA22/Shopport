import { ProductCard } from "./ProductCard";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductGridProps {
  onAddToCart: (id: number) => void;
  searchQuery?: string;
}

export function ProductGrid({ onAddToCart, searchQuery = "" }: ProductGridProps) {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: async () => {
      console.log("Fetching products with search query:", searchQuery);
      const url = searchQuery 
        ? `/api/products?search=${encodeURIComponent(searchQuery)}`
        : "/api/products";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json() as Product[];
      console.log("Fetched products:", data);
      return data;
    },
    staleTime: 1000 * 60, // Cache for 1 minute
  });

  if (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading products. Please try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[400px] bg-gray-100 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onAddToCart: (id: number) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(id);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full hover:scale-105 transition-transform"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>${Number(price).toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

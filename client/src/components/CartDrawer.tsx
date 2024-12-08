import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    name: string;
    price: number;
  };
}

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const sessionId = "temp-session"; // In a real app, this would be a proper session ID

  const { data: cartItems, isLoading: isLoadingCart } = useQuery({
    queryKey: ["cart", sessionId],
    queryFn: async () => {
      const response = await fetch(`/api/cart/${sessionId}`);
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      console.log('Fetched cart items:', data);
      return data as CartItem[];
    },
    refetchOnWindowFocus: true,
    staleTime: 1000, // Refetch after 1 second
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const response = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) throw new Error("Failed to update quantity");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeItem = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const total = cartItems?.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  ) ?? 0;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2"
            >
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">
                  ${Number(item.product.price).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateQuantity.mutate({
                      id: item.id,
                      quantity: item.quantity - 1,
                    })
                  }
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateQuantity.mutate({
                      id: item.id,
                      quantity: item.quantity + 1,
                    })
                  }
                >
                  +
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem.mutate(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" disabled={!cartItems?.length}>
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SmartphoneIcon } from "lucide-react";

export function InstallPrompt() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SmartphoneIcon className="h-4 w-4" />
          Install App
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Install Voice Shop on your phone</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <img
            src="/qr.png"
            alt="QR Code to install app"
            className="w-48 h-48"
          />
          <div className="space-y-4 text-center">
            <div>
              <h3 className="font-semibold mb-2">For Android Users:</h3>
              <ol className="text-sm text-gray-600 space-y-1 text-left">
                <li>1. Scan this QR code with your phone</li>
                <li>2. Open in Chrome browser</li>
                <li>3. Tap the menu (⋮) in top-right</li>
                <li>4. Select "Add to Home screen"</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2">For iPhone Users:</h3>
              <ol className="text-sm text-gray-600 space-y-1 text-left">
                <li>1. Scan this QR code with your phone</li>
                <li>2. Open in Safari browser</li>
                <li>3. Tap the share button (square with arrow)</li>
                <li>4. Select "Add to Home Screen"</li>
              </ol>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

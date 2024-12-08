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
          <DialogTitle>Install Shopport on your device</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="relative w-48 h-48 bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-center text-gray-500 absolute inset-0 flex items-center justify-center">
              Scan with your phone's camera
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-center">Installation Instructions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Direct Installation:</h4>
                  <p className="text-sm text-gray-600">
                    Simply visit this website on your mobile device and follow the installation prompts in your browser.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Android (Chrome):</h4>
                  <ol className="text-sm text-gray-600 list-decimal pl-4 space-y-1">
                    <li>Tap the menu (⋮) in top-right</li>
                    <li>Select "Install app" or "Add to Home screen"</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">iPhone (Safari):</h4>
                  <ol className="text-sm text-gray-600 list-decimal pl-4 space-y-1">
                    <li>Tap the share button (square with arrow)</li>
                    <li>Select "Add to Home Screen"</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

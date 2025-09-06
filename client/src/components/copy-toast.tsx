import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface CopyToastProps {
  show: boolean;
}

export function CopyToast({ show }: CopyToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div
      className={`fixed bottom-6 right-6 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        isVisible 
          ? "transform translate-y-0 opacity-100" 
          : "transform translate-y-20 opacity-0 pointer-events-none"
      }`}
      data-testid="toast-copy-success"
    >
      <div className="flex items-center space-x-2">
        <Check className="h-4 w-4" />
        <span className="font-medium">Copied to clipboard!</span>
      </div>
    </div>
  );
}

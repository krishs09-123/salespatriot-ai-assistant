import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Moon, Sun, Monitor, Settings } from "lucide-react";

interface ThemeSettingsProps {
  children: React.ReactNode;
}

export const ThemeSettings = ({ children }: ThemeSettingsProps) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const themeOptions = [
    { 
      id: 'light', 
      label: 'Light', 
      icon: Sun,
      description: 'Clean and bright interface'
    },
    { 
      id: 'dark', 
      label: 'Dark', 
      icon: Moon,
      description: 'Easy on the eyes'
    },
    { 
      id: 'system', 
      label: 'System', 
      icon: Monitor,
      description: 'Matches your device settings'
    }
  ] as const;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.id}
                    variant={theme === option.id ? "default" : "outline"}
                    className="w-full justify-start gap-3 h-auto p-3"
                    onClick={() => applyTheme(option.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, BarChart3, Globe, Settings2 } from "lucide-react";
import { Button } from "@repo/ui/shadcn/button";
import { Switch } from "@repo/ui/shadcn/switch";
import { HoverBorderGradient } from "./hover-border-gradient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/shadcn/dialog";
import { cn } from "@repo/ui/lib/utils";

/**
 * Cookie Consent Component
 * Fully GDPR compliant with granular controls.
 */

interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultSettings: CookieSettings = {
  necessary: true, // Always true and disabled
  functional: false, // Default off (opt-in)
  analytics: false, // Default off (opt-in)
  marketing: false, // Default off (opt-in)
};

export function CookieConsent() {
  const [open, setOpen] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [settings, setSettings] = React.useState<CookieSettings>(defaultSettings);
  const [isSaved, setIsSaved] = React.useState(false);

  // Check local storage on mount
  React.useEffect(() => {
    try {
      const savedConsent = localStorage.getItem("cookie-consent-settings");
      if (savedConsent) {
        setSettings(JSON.parse(savedConsent));
        setIsSaved(true);
      } else {
        // Show banner if no consent found
        // Small delay for animation
        setTimeout(() => setOpen(true), 100);
      }

      // Listen for custom event to open settings
      const handleOpenSettings = () => setShowSettings(true);
      window.addEventListener('open-cookie-settings', handleOpenSettings);

      return () => {
        window.removeEventListener('open-cookie-settings', handleOpenSettings);
      };
    } catch (e) {
      console.error("Cookie consent error", e);
    }
  }, []);

  const savePreferences = (newSettings: CookieSettings) => {
    localStorage.setItem("cookie-consent-settings", JSON.stringify(newSettings));
    localStorage.setItem("cookie-consent-timestamp", new Date().toISOString());
    setSettings(newSettings);
    setIsSaved(true);
    setOpen(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    savePreferences({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };

  const handleSaveSettings = () => {
    savePreferences(settings);
  };

  const toggleSetting = (key: keyof CookieSettings) => {
    if (key === "necessary") return;
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Allow reopening to withdraw/change
  const openSettings = () => {
    setShowSettings(true);
  };

  if (!open && !isSaved && !showSettings) return null;

  return (
    <>
      {/* Main Banner */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[200] p-4 backdrop-blur-xl border-t border-border shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.1)] transition-transform duration-500",
          open && !isSaved ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="container mx-auto flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-between">
          <div className="flex-1 space-y-2 text-center lg:text-left">
            <h3 className="text-lg font-semibold flex items-center justify-center lg:justify-start gap-2">
              <Cookie className="w-5 h-5 text-[#7777f1]" /> We value your privacy
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of all cookies. You can manage your preferences or withdraw your consent at any time.
              <br />
              Read our <Link href="/privacy" className="underline text-foreground hover:text-[#7777f1]">Privacy Policy</Link> and <Link href="/privacy" className="underline text-foreground hover:text-[#7777f1]">Cookie Policy</Link>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 min-w-fit w-full lg:w-auto">
            <Button variant="outline" onClick={() => setShowSettings(true)} className="flex-1 lg:flex-none rounded-3xl font-geistSans border-white/30 hover:bg-white/10 hover:text-white">
              Customize
            </Button>
            <Button variant="outline" onClick={handleRejectAll} className="flex-1 lg:flex-none rounded-3xl font-geistSans border-white/30 hover:bg-white/10 hover:text-white">
              Reject All
            </Button>
            <HoverBorderGradient
              containerClassName="rounded-full flex-1 lg:flex-none cursor-pointer"
              onClick={handleAcceptAll}
              className="w-full flex justify-center items-center px-6"
            >
              Accept All
            </HoverBorderGradient>
          </div>
        </div>
      </div>

      {/* Detailed Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#7777f1]" /> Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Manage your cookie settings. You can enable or disable specific categories of cookies below. 
              Changes will apply to your browser for this website.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Strictly Necessary */}
            <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted/30">
              <ShieldCheck className="w-6 h-6 mt-1 text-[#7777f1] shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-base font-semibold">Strictly Necessary</label>
                  <Switch checked={true} disabled aria-label="Strictly necessary cookies" className="data-[state=checked]:bg-[#7777f1]" />
                </div>
                <p className="text-sm text-muted-foreground pr-10">
                  These cookies are essential for the website to function properly. They ensure basic functionalities and security features of the website. They cannot be disabled.
                </p>
              </div>
            </div>

            {/* Functional */}
            <div className="flex items-start gap-4 p-4 rounded-lg border border-border">
              <Globe className="w-6 h-6 mt-1 text-[#7777f1] shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="functional" className="text-base font-semibold cursor-pointer">Functional & Preferences</label>
                  <Switch 
                    id="functional"
                    checked={settings.functional} 
                    onCheckedChange={() => toggleSetting("functional")}
                    className="data-[state=checked]:bg-[#7777f1]"
                  />
                </div>
                <p className="text-sm text-muted-foreground pr-10">
                  These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers.
                </p>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-4 p-4 rounded-lg border border-border">
              <BarChart3 className="w-6 h-6 mt-1 text-[#7777f1] shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="analytics" className="text-base font-semibold cursor-pointer">Statistics & Analytics</label>
                  <Switch 
                    id="analytics"
                    checked={settings.analytics} 
                    onCheckedChange={() => toggleSetting("analytics")}
                    className="data-[state=checked]:bg-[#7777f1]"
                  />
                </div>
                <p className="text-sm text-muted-foreground pr-10">
                  These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously.
                </p>
              </div>
            </div>

            {/* Marketing */}
            <div className="flex items-start gap-4 p-4 rounded-lg border border-border">
              <Cookie className="w-6 h-6 mt-1 text-[#7777f1] shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="marketing" className="text-base font-semibold cursor-pointer">Marketing & Targeting</label>
                  <Switch 
                    id="marketing"
                    checked={settings.marketing}
                    onCheckedChange={() => toggleSetting("marketing")}
                    className="data-[state=checked]:bg-[#7777f1]"
                  />
                </div>
                <p className="text-sm text-muted-foreground pr-10">
                  These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 flex-col sm:flex-row">
            <Button variant="outline" onClick={handleRejectAll} className="w-full sm:w-auto rounded-3xl font-geistSans border-white/30 hover:bg-white/10 hover:text-white">
              Reject All
            </Button>
            <Button variant="secondary" onClick={handleSaveSettings} className="w-full sm:w-auto rounded-3xl font-geistSans border-white/30 hover:bg-white/10 hover:text-white">
              Save Preferences
            </Button>
            <HoverBorderGradient
              containerClassName="rounded-full w-full sm:w-auto cursor-pointer"
              onClick={handleAcceptAll}
              className="w-full px-6 flex justify-center items-center"
            >
              Accept All
            </HoverBorderGradient>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

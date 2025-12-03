"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { supabase } from "@/src/integrations/supabase/client";
import { toast } from "sonner";

interface DownloadGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideTitle: string;
  guideFile: string;
}

const DownloadGuideModal = ({ isOpen, onClose, guideTitle, guideFile }: DownloadGuideModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save lead to database
      const { error } = await supabase
        .from("leads")
        .insert({
          first_name: firstName.trim(),
          email: email.trim(),
          guide_downloaded: guideTitle,
        });

      if (error) throw error;

      // Trigger download
      const link = document.createElement("a");
      link.href = guideFile;
      link.download = guideFile.split("/").pop() || "guide.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started! Check your email for more resources.");
      
      // Reset form and close modal
      setFirstName("");
      setEmail("");
      onClose();
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Your Free Guide</DialogTitle>
          <DialogDescription>
            Enter your details below to download "{guideTitle}"
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name / Nickname *</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Download Guide"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadGuideModal;

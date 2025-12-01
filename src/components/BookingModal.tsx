import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { toast } from "@/src/hooks/use-toast";
import { supabase } from "@/src/integrations/supabase/client";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: "natal_chart" | "natal_chart_30" | "compatibility";
  serviceTitle: string;
  price: number;
}

const BookingModal = ({ isOpen, onClose, serviceType, serviceTitle, price }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    person1Name: "",
    person1BirthDate: "",
    person1BirthTime: "",
    person1BirthCity: "",
    person1BirthCountry: "",
    person1Questions: "",
    person2Name: "",
    person2BirthDate: "",
    person2BirthTime: "",
    person2BirthCity: "",
    person2BirthCountry: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create Stripe Checkout Session
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: {
          serviceType: serviceType,
          serviceTitle: serviceTitle,
          price: price,
          customerEmail: formData.customerEmail,
          customerName: formData.customerName,
          bookingData: {
            person1Name: formData.person1Name,
            person1BirthDate: formData.person1BirthDate,
            person1BirthTime: formData.person1BirthTime,
            person1BirthCity: formData.person1BirthCity,
            person1BirthCountry: formData.person1BirthCountry,
            person1Questions: formData.person1Questions,
            person2Name: serviceType === "compatibility" ? formData.person2Name : undefined,
            person2BirthDate: serviceType === "compatibility" ? formData.person2BirthDate : undefined,
            person2BirthTime: serviceType === "compatibility" ? formData.person2BirthTime : undefined,
            person2BirthCity: serviceType === "compatibility" ? formData.person2BirthCity : undefined,
            person2BirthCountry: serviceType === "compatibility" ? formData.person2BirthCountry : undefined,
          },
        },
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Payment Error",
        description: error.message || "There was an error starting the payment process. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{serviceTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form below to book your reading. Price: ${price}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Customer Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Your Name *</Label>
                <Input
                  id="customerName"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Your Email *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Person 1 Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {serviceType === "compatibility" ? "Person 1 Birth Details" : "Your Birth Details"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="person1Name">Name *</Label>
                <Input
                  id="person1Name"
                  required
                  value={formData.person1Name}
                  onChange={(e) => setFormData({ ...formData, person1Name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="person1BirthDate">Birth Date *</Label>
                <Input
                  id="person1BirthDate"
                  type="date"
                  required
                  value={formData.person1BirthDate}
                  onChange={(e) => setFormData({ ...formData, person1BirthDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="person1BirthTime">Birth Time *</Label>
                <Input
                  id="person1BirthTime"
                  type="time"
                  required
                  value={formData.person1BirthTime}
                  onChange={(e) => setFormData({ ...formData, person1BirthTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="person1BirthCity">Birth City *</Label>
                <Input
                  id="person1BirthCity"
                  required
                  value={formData.person1BirthCity}
                  onChange={(e) => setFormData({ ...formData, person1BirthCity: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="person1BirthCountry">Birth Country *</Label>
                <Input
                  id="person1BirthCountry"
                  required
                  value={formData.person1BirthCountry}
                  onChange={(e) => setFormData({ ...formData, person1BirthCountry: e.target.value })}
                />
              </div>
            </div>
            {serviceType === "natal_chart" && (
              <div className="space-y-2">
                <Label htmlFor="person1Questions">Your Questions (Optional)</Label>
                <Textarea
                  id="person1Questions"
                  rows={3}
                  placeholder="Any specific questions or areas you'd like me to focus on..."
                  value={formData.person1Questions}
                  onChange={(e) => setFormData({ ...formData, person1Questions: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Person 2 Details (Compatibility only) */}
          {serviceType === "compatibility" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Person 2 Birth Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="person2Name">Name *</Label>
                  <Input
                    id="person2Name"
                    required
                    value={formData.person2Name}
                    onChange={(e) => setFormData({ ...formData, person2Name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="person2BirthDate">Birth Date *</Label>
                  <Input
                    id="person2BirthDate"
                    type="date"
                    required
                    value={formData.person2BirthDate}
                    onChange={(e) => setFormData({ ...formData, person2BirthDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="person2BirthTime">Birth Time *</Label>
                  <Input
                    id="person2BirthTime"
                    type="time"
                    required
                    value={formData.person2BirthTime}
                    onChange={(e) => setFormData({ ...formData, person2BirthTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="person2BirthCity">Birth City *</Label>
                  <Input
                    id="person2BirthCity"
                    required
                    value={formData.person2BirthCity}
                    onChange={(e) => setFormData({ ...formData, person2BirthCity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="person2BirthCountry">Birth Country *</Label>
                  <Input
                    id="person2BirthCountry"
                    required
                    value={formData.person2BirthCountry}
                    onChange={(e) => setFormData({ ...formData, person2BirthCountry: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : `Book Now - $${price}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;

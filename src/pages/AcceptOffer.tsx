import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Loader2, Mail, ArrowLeft, PartyPopper } from "lucide-react";

const AcceptOffer = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();

  const [step, setStep] = useState<"verify" | "accept" | "success" | "error" | "already_accepted">("verify");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [applicationData, setApplicationData] = useState<{
    name: string;
    position: string;
    email: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStep("error");
      setErrorMessage("Invalid or missing acceptance token. Please use the link from your selection email.");
    }
  }, [token]);

  const handleVerifyEmail = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to verify.",
        variant: "destructive",
      });
      return;
    }

    setVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-offer-acceptance", {
        body: { token, email: email.trim().toLowerCase() },
      });

      if (error) throw error;

      if (data.error) {
        if (data.error === "already_accepted") {
          setStep("already_accepted");
          setApplicationData({
            name: data.name,
            position: data.position,
            email: data.email,
          });
        } else {
          toast({
            title: "Verification Failed",
            description: data.error,
            variant: "destructive",
          });
        }
      } else if (data.verified) {
        setApplicationData({
          name: data.name,
          position: data.position,
          email: data.email,
        });
        setStep("accept");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast({
        title: "Verification Error",
        description: "Failed to verify. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleAcceptOffer = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("accept-offer", {
        body: { token, email: email.trim().toLowerCase() },
      });

      if (error) throw error;

      if (data.success) {
        setStep("success");
        toast({
          title: "Offer Accepted!",
          description: "Welcome to Nirikshan AI! We're excited to have you on board.",
        });
      } else {
        throw new Error(data.error || "Failed to accept offer");
      }
    } catch (error: any) {
      console.error("Accept offer error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to accept offer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-lg mx-auto">
          {step === "verify" && (
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
                <CardDescription>
                  Please enter the email address you used in your job application to verify your identity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyEmail()}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleVerifyEmail}
                  disabled={verifying}
                >
                  {verifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {step === "accept" && applicationData && (
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Accept Your Offer</CardTitle>
                <CardDescription>
                  Congratulations! You've been selected for the following position.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Candidate Name</p>
                    <p className="font-semibold">{applicationData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Position</p>
                    <p className="font-semibold">{applicationData.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{applicationData.email}</p>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    By clicking "Accept Offer", you confirm that you accept the internship offer from Nirikshan AI and agree to join the team. Our HR team will contact you with further onboarding details.
                  </p>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  size="lg"
                  onClick={handleAcceptOffer}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Yes, I Accept the Offer
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {step === "success" && applicationData && (
            <Card className="border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <PartyPopper className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-700 dark:text-green-400">
                  Welcome to Nirikshan AI!
                </CardTitle>
                <CardDescription className="text-base">
                  You have successfully accepted the offer for <strong>{applicationData.position}</strong>.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-muted-foreground">
                  We're thrilled to have you join our team! Our HR team will reach out to you shortly with onboarding details and next steps.
                </p>
                <Link to="/">
                  <Button variant="outline" className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {step === "already_accepted" && applicationData && (
            <Card className="border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">
                  Offer Already Accepted
                </CardTitle>
                <CardDescription className="text-base">
                  You have already accepted the offer for <strong>{applicationData.position}</strong>.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-muted-foreground">
                  No further action is needed. Our HR team will contact you with onboarding details.
                </p>
                <Link to="/">
                  <Button variant="outline" className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {step === "error" && (
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle className="text-2xl text-destructive">Invalid Link</CardTitle>
                <CardDescription className="text-base">
                  {errorMessage}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/contact">
                  <Button variant="outline" className="mt-4">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AcceptOffer;

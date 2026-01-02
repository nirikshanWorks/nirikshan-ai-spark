import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Shield, Calendar, FileText, Lock, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface Certificate {
  id: string;
  certificate_number: string;
  recipient_name: string;
  issue_date: string;
  nda_signed: boolean;
  created_at: string;
}

const CertificateVerify = () => {
  const { certificateNumber } = useParams<{ certificateNumber: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (certificateNumber) {
      fetchCertificate(certificateNumber);
    } else {
      setLoading(false);
    }
  }, [certificateNumber]);

  const fetchCertificate = async (certNumber: string) => {
    setLoading(true);
    setNotFound(false);
    
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_number", certNumber)
      .maybeSingle();

    if (error || !data) {
      setNotFound(true);
      setCertificate(null);
    } else {
      setCertificate(data);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/verify/${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Certificate Verification</h1>
            <p className="text-muted-foreground text-lg">
              Verify the authenticity of certificates issued by Nirikshan AI
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSearch} className="flex gap-4">
                  <Input
                    placeholder="Enter Certificate Number (e.g., CERT-2024-001)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Verify</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Certificate Found */}
          {!loading && certificate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-green-500/50 bg-green-500/5">
                <CardHeader className="text-center border-b">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                    <CardTitle className="text-2xl text-green-600 dark:text-green-400">
                      Certificate Verified
                    </CardTitle>
                  </div>
                  <p className="text-muted-foreground">
                    This certificate is authentic and was issued by Nirikshan AI
                  </p>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Certificate Number */}
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <FileText className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Certificate Number</p>
                        <p className="font-semibold text-lg">{certificate.certificate_number}</p>
                      </div>
                    </div>

                    {/* Recipient Name */}
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <Shield className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Recipient Name</p>
                        <p className="font-semibold text-lg">{certificate.recipient_name}</p>
                      </div>
                    </div>

                    {/* Issue Date */}
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Issue Date</p>
                        <p className="font-semibold text-lg">
                          {new Date(certificate.issue_date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* NDA Status */}
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <Lock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">NDA Status</p>
                        <Badge 
                          variant={certificate.nda_signed ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {certificate.nda_signed ? "NDA Signed" : "No NDA"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-center">
                    <p className="text-sm text-muted-foreground">
                      Verified on {new Date().toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Certificate Not Found */}
          {!loading && notFound && certificateNumber && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-red-500/50 bg-red-500/5">
                <CardContent className="py-12 text-center">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                    Certificate Not Found
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    No certificate with number "<span className="font-mono">{certificateNumber}</span>" was found in our records.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please double-check the certificate number and try again. If you believe this is an error, please contact us.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* No Search Yet */}
          {!loading && !certificate && !notFound && !certificateNumber && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="py-12 text-center">
                  <Shield className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Enter a Certificate Number</h2>
                  <p className="text-muted-foreground">
                    Use the search box above to verify a certificate's authenticity
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CertificateVerify;

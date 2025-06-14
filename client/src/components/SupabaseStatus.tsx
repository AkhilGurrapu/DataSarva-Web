import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";

export const SupabaseStatus = () => {
  const isConfigured = isSupabaseConfigured();

  if (isConfigured) {
    return (
      <Alert className="mb-4 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Supabase is configured and ready. Contact form will use Supabase Edge Functions.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-4 border-amber-200 bg-amber-50">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        Supabase not configured yet. Contact form is using the Express API fallback. 
        See SUPABASE_MIGRATION_GUIDE.md for setup instructions.
      </AlertDescription>
    </Alert>
  );
};
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

export const SupabaseStatus = () => {
  return (
    <Alert className="mb-4 border-green-200 bg-green-50">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800">
        Migration Complete: Application now running on Supabase with Edge Functions and PostgreSQL database.
      </AlertDescription>
    </Alert>
  );
};
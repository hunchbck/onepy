import { LoaderCircle } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";

interface ButtonSubmittingProps extends React.ComponentProps<typeof Button> {
  type?: "submit" | "button";
  isSubmitting?: boolean;
  message: string;
  className?: string;
}

export function ButtonSubmitting({
  type = "submit",
  className,
  isSubmitting,
  message
}: ButtonSubmittingProps) {
  return (
    <Button
      type={type}
      className={cn("w-full", className)}
      disabled={isSubmitting}
    >
      {isSubmitting ? <LoaderCircle className="animate-spin" /> : message}
    </Button>
  );
}

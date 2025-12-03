import BookingSuccess from "@/src/page-components/BookingSuccess";

// Force dynamic rendering for this page since it uses useSearchParams
export const dynamic = 'force-dynamic'

export default function BookingSuccessPage() {
  return <BookingSuccess />;
}

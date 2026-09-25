import { CartView } from "@/components/cart/CartView";
import { pageMetadata, type LocaleParams } from "@/lib/i18n/server";

export const generateMetadata = (props: LocaleParams) => pageMetadata(props, "cart", "/cart", { robots: { index: false } });

export default function CartPage() {
  return <CartView />;
}

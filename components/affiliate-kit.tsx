const AMAZON_TAG = "biteforecas00-21";

export type AffiliateProduct = {
  key: "smidge" | "avon" | "head-net";
  name: string;
  description: string;
  href: string;
  cta: string;
};

export const AFFILIATE_PRODUCTS: Record<AffiliateProduct["key"], AffiliateProduct> = {
  smidge: {
    key: "smidge",
    name: "Smidge That Midge Insect Repellent",
    description: "The practical Scottish default when midges are active and you need dedicated repellent.",
    href: `https://www.amazon.co.uk/s?k=Smidge+insect+repellent&tag=${AMAZON_TAG}`,
    cta: "View on Amazon",
  },
  avon: {
    key: "avon",
    name: "Avon Skin So Soft Original Dry Oil Spray",
    description: "The long-running Scottish alternative. Some people swear by it; it is not a dedicated repellent.",
    href: `https://www.amazon.co.uk/s?k=Avon+Skin+So+Soft+midge&tag=${AMAZON_TAG}`,
    cta: "View on Amazon",
  },
  "head-net": {
    key: "head-net",
    name: "Midge head net",
    description: "Looks excessive until the air goes still. Useful backup for dusk, camping and sheltered west coast stops.",
    href: `https://www.amazon.co.uk/s?k=midge+head+net+Scotland&tag=${AMAZON_TAG}`,
    cta: "View on Amazon",
  },
};

export function getForecastAffiliateProducts(index: number): AffiliateProduct[] {
  if (index <= 2) return [];

  if (index <= 5) {
    return [AFFILIATE_PRODUCTS.smidge, AFFILIATE_PRODUCTS.avon];
  }

  return [AFFILIATE_PRODUCTS.smidge, AFFILIATE_PRODUCTS.avon, AFFILIATE_PRODUCTS["head-net"]];
}

export function getForecastAffiliateCopy(index: number): string | null {
  if (index <= 2) return null;
  if (index <= 5) return "Midge activity is possible. A repellent in your bag is sensible precaution.";
  if (index <= 8) return "Conditions favour midges. Repellent is worth having, especially in sheltered spots.";
  return "Midges are active and intense here right now. These are worth having before you leave the car.";
}

const cardClass = "rounded-2xl border border-amber-300/20 bg-stone-950/70 p-4 transition hover:border-amber-200/50";
const disclosure = "Some links are affiliate links. BiteForecast earns a small commission at no extra cost to you.";

export function AffiliateProductCards({ products }: { products: AffiliateProduct[] }) {
  return (
    <div className="mt-5 grid gap-4 md:grid-cols-3">
      {products.map((product) => (
        <a className={cardClass} href={product.href} key={product.key} rel="sponsored nofollow noopener" target="_blank">
          <p className="font-bold text-stone-100">{product.name}</p>
          <p className="mt-2 text-sm leading-5 text-stone-400">{product.description}</p>
          <p className="mt-4 text-sm font-bold text-amber-200">{product.cta} →</p>
        </a>
      ))}
    </div>
  );
}

export function ForecastWhatToBring({ index }: { index: number }) {
  const products = getForecastAffiliateProducts(index);
  const copy = getForecastAffiliateCopy(index);

  if (!copy || products.length === 0) return null;

  return (
    <section className="rounded-3xl border border-amber-300/20 bg-amber-500/10 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">What to bring</p>
      <h2 className="mt-2 text-2xl font-black">Midge kit for these conditions</h2>
      <p className="mt-3 max-w-2xl text-stone-200">{copy}</p>
      <AffiliateProductCards products={products} />
      <p className="mt-4 text-xs leading-5 text-stone-500">{disclosure}</p>
    </section>
  );
}

export function GuideAffiliatePlacement({ intro }: { intro: string }) {
  const products = [AFFILIATE_PRODUCTS.smidge, AFFILIATE_PRODUCTS.avon, AFFILIATE_PRODUCTS["head-net"]];

  return (
    <section className="rounded-3xl border border-amber-300/20 bg-amber-500/10 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">What to bring</p>
      <h2 className="mt-2 text-2xl font-semibold text-stone-50">A simple Scottish midge kit</h2>
      <p className="mt-3 text-stone-200">{intro}</p>
      <AffiliateProductCards products={products} />
      <p className="mt-4 text-xs leading-5 text-stone-500">{disclosure}</p>
    </section>
  );
}

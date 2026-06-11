interface MorishSnackPromoProps {
  show: boolean;
}

export function MorishSnackPromo({ show }: MorishSnackPromoProps) {
  if (!show) return null;
  const affiliateUrl = "http://www.awin1.com/cread.php?awinmid=126437&awinaffid=2860477";
  return (
    <div className="morish-promo mt-8 pt-6 border-t border-gray-200">
      <p>You checked the forecast. It&apos;s a six.</p>
      <p>A six means they&apos;re waiting. They know you&apos;re coming. They&apos;ve told their friends.</p>
      <p>Hooligan has been out in worse. The secret isn&apos;t speed. It&apos;s preparation. You need something in your pocket that rewards the suffering.</p>
      <p><strong>Morish air-dried beef.</strong> One ingredient. No crumbs. No fuss. Nothing to unwrap while something is eating your neck.</p>
      <p>Some people come back from the hills changed. Most of them had snacks.</p>
      <a href={affiliateUrl} target="_blank" rel="noopener noreferrer"
         className="inline-block mt-3 text-sm opacity-70 hover:opacity-100">
        Shop Morish Snacks →
      </a>
    </div>
  );
}

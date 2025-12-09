import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gift Cards",
  description: "Purchase Rochester Foam Dart League gift cards for the ultimate Nerf battle experience!",
}

const GIFT_CARD_URL = "https://www.rochesterfoamdartleague.com/checkout/giftcard?websiteId=55f5a47fe4b0bfc8befab492&giftCardProductId=62977014165fee684efeb647"

export default function GiftCardsPage() {
  redirect(GIFT_CARD_URL)
}


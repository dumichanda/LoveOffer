"use client"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export function OfferCard() {
  const { currentOffer, likeOffer, passOffer } = useAppStore()

  if (!currentOffer) {
    return <div>No offers available</div>
  }

  const slot = currentOffer.availableSlots?.[0]

  return (
    <div>
      <h2>{currentOffer.title}</h2>
      <p>{currentOffer.description}</p>
      <p>{currentOffer.location}</p>
      <p>R{currentOffer.price}</p>
      <p>by {currentOffer.hostName}</p>
      {currentOffer.isVerified && <span>Verified Host</span>}
      <p>{currentOffer.hostRating}</p>
      <p>{currentOffer.hostReviews} reviews</p>
      {slot && (
        <div>
          <span>{slot.startTime}</span>
          <span>{slot.endTime}</span>
        </div>
      )}
      {currentOffer.tags?.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
      <p>Max {currentOffer.maxGuests} guests</p>
      <Button onClick={() => likeOffer(currentOffer.id)}>Like</Button>
      <Button onClick={() => passOffer(currentOffer.id)}>Pass</Button>
    </div>
  )
}

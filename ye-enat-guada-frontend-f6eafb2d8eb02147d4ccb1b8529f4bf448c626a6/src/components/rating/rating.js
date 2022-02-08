import { StarIcon } from "@heroicons/react/outline"
import { StarIcon as StarIconFilled } from "@heroicons/react/solid"

export const Rating = ({ rating, isInteractive, onRate }) => {
    const rate = (rating) => {
        if (isInteractive) {
            onRate(rating)
        }
    }
    return (
        <div className="flex flex-row content-center items-center gap-3">
            <div className="flex flex-row content-center items-center gap-1 text-yellow-400">
                {

                    Math.floor(rating) >= 1 ? <StarIconFilled className="h-6 w-6" onClick={() => rate(1)} /> : <StarIcon className="h-6 w-6" />
                }
                {

                    Math.floor(rating) >= 2 ? <StarIconFilled className="h-6 w-6" onClick={() => rate(2)} /> : <StarIcon className="h-6 w-6" />
                }
                {

                    Math.floor(rating) >= 3 ? <StarIconFilled className="h-6 w-6" onClick={() => rate(3)} /> : <StarIcon className="h-6 w-6" />
                }
                {

                    Math.floor(rating) >= 4 ? <StarIconFilled className="h-6 w-6" onClick={() => rate(4)} /> : <StarIcon className="h-6 w-6" />
                }
                {

                    Math.floor(rating) >= 5 ? <StarIconFilled className="h-6 w-6" onClick={() => rate(5)} /> : <StarIcon className="h-6 w-6" />
                }
            </div>
            <span className="text-lg">{rating}</span>
        </div>
    )
}
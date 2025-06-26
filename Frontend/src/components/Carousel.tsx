import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { SlideCarousel } from "./SlideCarousel"
import { useCallback } from "react"
import { Button, Flex, Heading } from "@radix-ui/themes"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"

export const Carousel = ({ popularMovies, title }) => {

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: false },
        [Autoplay({
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })]
    )

    const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev() }, [emblaApi])
    const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext() }, [emblaApi])

    return (
        <div className="embla">
            <Flex justify="between" align="center" mb="2">
                <Heading>{title}</Heading>
                <Flex justify="end" gap="2" my="2">
                    <Button className="embla__prev" onClick={scrollPrev}>
                        <ArrowLeftIcon width="20px" height="20px" />
                    </Button>
                    <Button className="embla__prev" onClick={scrollNext}>
                        <ArrowRightIcon width="20px" height="20px" />
                    </Button>
                </Flex>
            </Flex>

            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {
                        popularMovies && popularMovies.map(movie => (
                            <SlideCarousel
                                key={movie.id}
                                movie={movie}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

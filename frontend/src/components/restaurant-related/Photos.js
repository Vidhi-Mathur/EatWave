import { useRef } from "react"
import { Arrow } from "../UI/Arrow"
import Slider from "react-slick"

export const Photos = ({images}) => {
    const dialog = useRef()
    const slick = useRef()

    const openModalHandler = (idx) => {
        slick.current.slickGoTo(idx)
        dialog.current.showModal()
    }

    const closeModalHandler = () => {
        dialog.current.close()
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <Arrow direction="left"/>,
        nextArrow: <Arrow direction="right" />,
    }

    return (
        <div className="py-4 flex flex-wrap gap-3">
            {images.map((image, idx) => (
              <div key={idx} className='relative w-48 h-48'>
                <img src={image} alt={`Restaurant ${idx + 1}`} className="w-full h-full object-cover rounded border" onClick={() => openModalHandler(idx)}/>
              </div>
            ))}
            <dialog ref={dialog} className="w-full max-w-3xl p-0 rounded-md bg-transparent overflow-hidden">
                <div className="relative bg-black">
                    <button className="absolute top-2 right-2 text-white text-2xl z-50" onClick={closeModalHandler}>&times;</button>
                    <Slider {...settings} ref={slick}>
                    {images.map((image, idx) => (
                        <div key={idx} className="relative flex items-center justify-center bg-black">
                            <img src={image} alt={`Restaurant ${idx + 1}`} className="w-full h-[600px] object-contain"/>
                            <div className="absolute bottom-2 right-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded ">
                                {idx + 1}/{images.length}
                            </div>
                        </div>
                    ))}
                </Slider>
                </div>
            </dialog>
        </div>
    )
}
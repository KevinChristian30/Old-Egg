import getAllPromotionPictures from "@/pages/api-calls/promotion-pictures/getAllPromotionPictures";
import { useEffect, useState } from "react";
import style from "../../../styles/components/Home/CustomerHome/ImageCarousel.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PromotionPicture from "@/types/PromotionPicture";

const ImageCarousel = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [promotionPictures , setPromotionPictures] = useState(Array<PromotionPicture>);
  
  useEffect(() => {

    const get = async () => {

      const promotionPictures = await getAllPromotionPictures();
      return promotionPictures;

    }

    get().then((promotionPictures) => setPromotionPictures(promotionPictures))
    
  }, [])
  
  const handlePrevClicked = () => {
    
    if (currentImageIndex === 0) setCurrentImageIndex(promotionPictures.length - 1);
    else setCurrentImageIndex(currentImageIndex - 1);
    
  }
  
  const handleNextClicked = () => {
    
    if (currentImageIndex === promotionPictures.length - 1) setCurrentImageIndex(0);
    else setCurrentImageIndex(currentImageIndex + 1);
    
  } 
  
  if (!promotionPictures) return <div>Loading ...</div>;
  if (!promotionPictures[currentImageIndex]) return <div>Loading ...</div>;

  // setInterval(handleNextClicked, 10000);

  return (
    <div className={style.image_carousel}>
      <div className={style.prev} onClick={handlePrevClicked}>
        <FontAwesomeIcon icon={faChevronLeft} className={style.icon} />
      </div>
      <div className={style.next} onClick={handleNextClicked}>
        <FontAwesomeIcon icon={faChevronRight} className={style.icon} />
      </div>
      <div className={style.image}>
        <img src={promotionPictures[currentImageIndex].url} className={style.image}/>
      </div>
    </div>
  );

}

export default ImageCarousel;
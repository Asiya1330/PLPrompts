//@ts-nocheck
import { Swiper, SwiperSlide } from 'swiper/react';
import { IPromptEngineer, Prompt } from '@/helpers/interface';
import SlideNextButton from './SlideNextButton';
import SlidePrevButton from './SlidePrevButton';
import PromptCard from './PromptCard';
import PromptEngineer from './PromptEngineer';
import { useContext } from 'react';
import { ResposnsivenessContext } from '@/contexts/responsiveWidthContext';

interface CustomSwiperProps {
  title: string;
  type?: 'prompt' | 'engineer';
  data: IPromptEngineer[] | Prompt[];
}

export default function CustomSwiper({ title, type = 'prompt', data }: CustomSwiperProps) {
  const { chatBreakPoint, removeSiteName } = useContext(ResposnsivenessContext)
  return (
    <Swiper className="relative py-20 w-full" slidesPerView={chatBreakPoint ? (removeSiteName ? 3 : 2) : 4} spaceBetween={24} loop={true}>
      <div className="prompts-swiper-action">
        <div>
          <h3>{title}</h3>
          <div>
            <SlidePrevButton />
            <SlideNextButton />
          </div>
        </div>
      </div>

      {type === 'prompt' &&
        (data as Prompt[]).map(({ name, title, price, tag, images, rating, type }, index) => (
          
          <SwiperSlide key={index} className="flex items-center justify-center">
            <PromptCard name={name} title={title} price={price} tag={type} image={images?.length ? images[0] : ''} rating={rating} />
          </SwiperSlide>
        ))}

      {type === 'engineer' &&

        (data as IPromptEngineer[]).map(({ engineerId, avatar, tag, image, viewer }) => (
          <SwiperSlide key={engineerId}>
            <PromptEngineer engineerId={engineerId} avatar={avatar} tag={tag} image={image} viewer={viewer} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

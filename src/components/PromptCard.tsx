import { Prompt } from '@/helpers/interface';
import TagCard from '@/components/TagCard';
import { useRouter } from 'next/router';
import { useContext } from 'react'
import { ResposnsivenessContext } from '../contexts/responsiveWidthContext'
import { PromptType } from '@/utils/Constants';

export interface PromptCardProps extends Prompt { }

export default function PromptCard({ name, price, tag, image, rating, clickable = true }: PromptCardProps) {
  const { showBurgerMenu,removeSiteName } = useContext(ResposnsivenessContext)
  const getDirection = (rating: number | undefined) => (rating ? 'row' : 'row-reverse');
  const router = useRouter();
  // console.log(name);
  
  const handlePromptRoute = () => {    
    if (clickable)
    router.push(
      `/prompt/${name}`,
    )
  }
  return (

    <div
      onClick={handlePromptRoute}
      className={`flex flex-col relative ${showBurgerMenu ? 'w-[150px] h-[150px]' : 'w-[270px] h-[240px]'}  bg-no-repeat bg-cover bg-center border-2 border-[#FFFFFF4D] rounded-lg ${clickable && 'cursor-pointer'} `}
    >
      {tag === PromptType.Midjourney ?
      
      <div className={`absolute flex rounded-lg ${showBurgerMenu ? 'w-[150px] h-[150px]' : 'w-[270px] h-[230px]'}`}>

      <img className={`h-[100%] flex w-[35%] overflow-hidden border-2`} src={`${image[0]}`} alt="" />
      <img className={`h-[100%] flex w-[28%] overflow-hidden border-2`} src={`${image[1]}`} alt="" />
      <img className={`h-[100%] flex w-[35%] overflow-hidden border-2`} src={`${image[2]}`} alt="" />
      </div> :
      (tag !== PromptType.GPT) ? 
      <div className={`absolute flex rounded-lg ${showBurgerMenu ? 'w-[150px] h-[150px]' : 'w-[270px] h-[230px]'}`}>
        <img className={`h-[100%] flex w-[100%] overflow-hidden border-2`} src={`${image[0]}`} alt="" />
      </div> :
      <div className={`absolute flex rounded-lg ${showBurgerMenu ? 'w-[150px] h-[150px]' : 'w-[270px] h-[230px]'}`}>
        <img className={`h-[100%] flex w-[100%] overflow-hidden border-2`} src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqS5LrOuT4ZRx1JNLOiOsEasceszJJ1Rjo6w&usqp=CAU`} alt="" />
      </div> 
      }
     
      <div className={`p-3.5 flex justify-between  absolute`} style={{ flexDirection: getDirection(rating) }}>
        <TagCard type={tag} />
        {rating && <TagCard type="rating" value={rating.toString()} />}
      </div>

      <div className="absolute bottom-0 flex items-end w-full h-1/2 p-3.5 mt-auto bg-gradient-to-b from-[#00000000] to-black">
        <p className={`${showBurgerMenu ? 'text-sm' : 'text-lg'} grow w-[62px]  overflow-hidden overflow-ellipsis`}>{name}</p>
        <span className={`${showBurgerMenu ? 'text-sm' : 'text-lg'} font-medium leading-6`}>${price}</span>
      </div>
    </div>
  );
}

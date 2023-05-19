import { Prompt } from '@/helpers/interface';
import TagCard from '@/components/TagCard';
import { useRouter } from 'next/router';
import { useContext } from 'react'
import { ResposnsivenessContext } from '../contexts/responsiveWidthContext'

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
      className={`flex flex-col ${showBurgerMenu ? 'w-[150px] h-[150px]' : 'w-[270px] h-[240px]'}  bg-no-repeat bg-cover bg-center border-2 border-[#FFFFFF4D] rounded-lg ${clickable && 'cursor-pointer'} `}
      style={{ backgroundImage: `url('${image ? image : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqS5LrOuT4ZRx1JNLOiOsEasceszJJ1Rjo6w&usqp=CAU`}')` }}
    >
      <div className={`p-3.5 flex justify-between `} style={{ flexDirection: getDirection(rating) }}>
        <TagCard type={tag} />
        {rating && <TagCard type="rating" value={rating.toString()} />}
      </div>

      <div className="flex items-end w-full h-1/2 p-3.5 mt-auto bg-gradient-to-b from-[#00000000] to-black">
        <p className={`${showBurgerMenu ? 'text-sm' : 'text-lg'} grow w-[62px]  overflow-hidden overflow-ellipsis`}>{name}</p>
        <span className={`${showBurgerMenu ? 'text-sm' : 'text-lg'} font-medium leading-6`}>${price}</span>
      </div>
    </div>
  );
}

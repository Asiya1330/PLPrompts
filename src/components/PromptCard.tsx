import { Prompt } from '@/helpers/interface';
import TagCard from '@/components/TagCard';
import { useRouter } from 'next/router';
export interface PromptCardProps extends Prompt { }

export default function PromptCard({ name, price, tag, image, rating, clickable = true }: PromptCardProps) {
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
      className={`flex flex-col w-[270px] h-[240px] bg-no-repeat bg-cover bg-center border-2 border-[#FFFFFF4D] rounded-lg ${clickable && 'cursor-pointer transition hover:mt-5'} `}
      style={{ backgroundImage: `url('${image ? image : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqS5LrOuT4ZRx1JNLOiOsEasceszJJ1Rjo6w&usqp=CAU`}')` }}
    >
      <div className="flex justify-between p-3.5" style={{ flexDirection: getDirection(rating) }}>
        <TagCard type={tag} />
        {rating && <TagCard type="rating" value={rating.toString()} />}
      </div>

      <div className="flex items-end w-full h-1/2 p-3.5 mt-auto bg-gradient-to-b from-[#00000000] to-black">
        <span className="grow mr-5">{name}</span>
        <span className="font-medium text-xl leading-6">${price}</span>
      </div>
    </div>
  );
}

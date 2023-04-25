import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { SOCIAL_LINKS, ROUTE_MAP } from '@/helpers/constants';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';

export default function Header() {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <header className="flex h-[80px] border-b-[0.5px] border-[#FFFFFF66]">
        <Link href="/" className="flex items-center justify-center w-[275px] border-r-[0.5px] border-[#FFFFFF66]">
          <Image className="mr-3" src="/logo.png" alt="logo" width="54" height="54" />
          <Image src="/title.svg" alt="prompts" width="110" height="25" />
        </Link>

        <div className="grow flex items-center px-5 border-r-[0.5px] border-[#FFFFFF66]">
          <div className="container flex items-center mx-auto">
            <div className="grow flex items-center px-4 py-3 mr-9 border-[0.5px] border-[#FFFFFF99] rounded-full">
              <input
                className="grow bg-transparent outline-none placeholder:text-white placeholder:text-sm placeholder:leading-4"
                type="text"
                placeholder="Search Prompts..."
              />
              <Icon>search</Icon>
            </div>

            <nav className="flex opacity-70">
              {ROUTE_MAP.map(({ title, href, icon }) => (
                <Link key={title} className="flex items-center mr-6 last:mr-0" href={href}>
                  {title}
                  {icon && <Icon className="ml-1">{icon}</Icon>}
                </Link>
              ))}
              <Link key='Chat' className="flex items-center mr-6 last:mr-0" href='/chat'>
                Chat
              </Link>
              {
                //@ts-ignore
                !(currentUser && currentUser.email) ?
                  <Link key='Login' className="flex items-center mr-6 last:mr-0" href='/login'>
                    Login
                  </Link>
                  :
                  <>
                    <Link key='PromptsOwned' className="flex items-center mr-6 last:mr-0" href='/prompts-owned'>
                      Account
                    </Link>
                    {
                      (currentUser?.role === 'admin') &&
                      <Link key='Approval' className="flex items-center mr-6 last:mr-0" href='/approval'>
                        Approval
                      </Link>
                    }
                  </>
              }
            </nav>
          </div>
        </div>

        <div className="flex items-center px-9">
          {SOCIAL_LINKS.map(({ type, icon, href }) => (
            <Link key={type} className="mr-7 last:mr-0" href={href}>
              <Image src={icon} alt={type} width="30" height="30" />
            </Link>
          ))}
        </div>
      </header>
    </>
  );
}

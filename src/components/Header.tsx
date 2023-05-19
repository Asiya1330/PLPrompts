//@ts-nocheck

import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { SOCIAL_LINKS, ROUTE_MAP } from '@/helpers/constants';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { ResposnsivenessContext } from '@/contexts/responsiveWidthContext';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter()
  const { currentUser } = useContext(UserContext);
  const { removeSocialIcons, showBurgerMenu, removeSiteName } = useContext(ResposnsivenessContext)
  const [isBurgerMenuIconVisible, setBurgerMenuIconVisible] = useState(false);

  return (
    <>
      <header className={`flex ${isBurgerMenuIconVisible ? '' : 'h-[80px]'} border-b-[0.5px] border-[#FFFFFF66]`}>
        <Link href="/" className="flex items-center justify-center border-r-[0.5px] border-[#FFFFFF66]">
          <div className='flex w-full'>
            <img className="mr-3 w-10 flex" src="/logo.png" alt="logo" />
            {removeSiteName &&
              <img className='flex mr-3 w-20 ' src="/title.svg" alt="prompts" />
            }
          </div>
        </Link>

        <div className="grow flex items-center px-3 border-r-[0.5px] border-[#FFFFFF66]">
          <div className="container flex items-center mx-auto">
            <div className="grow flex items-center px-4 py-3 mr-4 border-[0.5px] border-[#FFFFFF99] rounded-full">
              { }
              <input
                className={` ${!removeSiteName ? 'w-20' : ''} grow bg-transparent outline-none placeholder:text-white placeholder:text-sm placeholder:leading-4`}
                type="text"
                placeholder="Search Prompts..."
              />
              <Icon>search</Icon>
            </div>

            {!showBurgerMenu ?
              <nav className="flex opacity-70">
                {ROUTE_MAP.map(({ title, href, icon }) => (
                  <Link key={title} className="flex text-sm items-center mx-2 last:mr-0" href={href}>
                    {title}
                    {icon && <Icon className="ml-1">{icon}</Icon>}
                  </Link>
                ))}
                <Link key='Chat' className="flex items-center text-sm mx-2 last:mr-0" href='/chat'>
                  Chat
                </Link>
                {
                  //@ts-ignore
                  !(currentUser && currentUser.email) ?
                    <Link key='Login' className="flex items-center text-sm mx-2 last:mr-0" href='/login'>
                      Login
                    </Link>
                    :
                    <>
                      <Link key='PromptsOwned' className="flex text-sm items-center mx-2 last:mr-0" href='/prompts-owned'>
                        Account
                      </Link>
                      {
                        (currentUser?.role === 'admin') &&
                        <Link key='Approval' className="flex text-sm items-center mx-2 last:mr-0" href='/approval'>
                          Approval
                        </Link>
                      }
                    </>
                }
              </nav>

              :

              <div className='z-10 '>
                <div className='gap-1 flex flex-col cursor-pointer' onClick={() => setBurgerMenuIconVisible(!isBurgerMenuIconVisible)}>
                  <span className="burger-line h-0.5 w-4 flex bg-gray-200"></span>
                  <span className="burger-line h-0.5 w-4 flex bg-gray-200"></span>
                  <span className="burger-line h-0.5 w-4 flex bg-gray-200"></span>
                </div>

                <nav className={`burger-menu h-screen w-screen fixed top-0 left-0 bg-slate-900 items-center justify-center z-20 m-auto ${isBurgerMenuIconVisible ? '' : 'hidden'} `}>

                  <div
                    className='gap-1 flex left-0 w-full mt-[4%] cursor-pointer flex-row justify-between'
                    onClick={() => setBurgerMenuIconVisible(!isBurgerMenuIconVisible)}
                  >
                    <img src="/logo.png" alt=""
                      className='w-10 h-10 m-2'
                      onClick={() => {

                        router.push('/')
                      }} />
                    <svg
                      className='w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>


                  <ul className="text-center flex  justify-center items-center h-[80vh]" onClick={() => setBurgerMenuIconVisible(false)}>
                    <nav className="flex opacity-70  gap-3 flex-col text-center items-center  justify-center">
                      {ROUTE_MAP.map(({ title, href, icon }) => (
                        <Link key={title} className="flex text-xl items-center mx-2 last:mr-0" href={href}>
                          {title}
                          {icon && <Icon className="ml-1">{icon}</Icon>}
                        </Link>
                      ))}
                      <Link key='Chat' className="flex items-center text-xl mx-2 last:mr-0" href='/chat'>
                        Chat
                      </Link>
                      {
                        //@ts-ignore
                        !(currentUser && currentUser.email) ?
                          <Link key='Login' className="flex items-center text-xl mx-2 last:mr-0" href='/login'>
                            Login
                          </Link>
                          :
                          <>
                            <Link key='PromptsOwned' className="flex text-xl items-center mx-2 last:mr-0" href='/prompts-owned'>
                              Account
                            </Link>
                            {
                              (currentUser?.role === 'admin') &&
                              <Link key='Approval' className="flex text-xl items-center mx-2 last:mr-0" href='/approval'>
                                Approval
                              </Link>
                            }
                          </>
                      }
                    </nav>
                  </ul>
                </nav>
              </div>
            }
          </div>
        </div>
        {removeSocialIcons &&
          <div className="flex items-center px-2">
            {SOCIAL_LINKS.map(({ type, icon, href }) => (
              <Link key={type} className="mr-2 last:mr-0" href={href}>
                <Image src={icon} alt={type} width="30" height="30" />
              </Link>
            ))}
          </div>
        }
      </header>
    </>
  );
}

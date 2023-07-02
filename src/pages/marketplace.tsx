//@ts-nocheck

import FilterSection from '@/components/FilterSection';
import { FilterSections } from '@/helpers/mock';
import Icon from '@/components/Icon';
import { useState, useEffect, useContext } from 'react';
import PromptCard from '@/components/PromptCard';
import clsx from 'classnames';
import { PromptsContext } from '@/contexts/PromptsContext';
import axios from 'axios';
import { getAllPrompts, getAllPromptsByHourlyFactor } from '@/utils/apis';
import { ResposnsivenessContext } from '@/contexts/responsiveWidthContext';

export default function Marketplace() {
  const { showBurgerMenu, removeSiteName } = useContext(ResposnsivenessContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByCaption, setSortByCaption] = useState('Trending');

  const [categoryKey, setCategoryKey] = useState('All');
  const [promptKey, setPromptKey] = useState('All');
  const [filteredPrompts, setFilteredPrompts] = useState();
  const [loading, setLoading] = useState()

  const [filterList, setFilterList] = useState<{
    [section: string]: { [key: string]: boolean };
  }>({
    sortBy: {
      Trending: true,
    },
    prompts: {
      All: true,
    },
    categories: {
      All: true,
    },
  });

  const { prompts, setPrompts } = useContext(PromptsContext);

  const handleUpdateFilter = async (section: string, key: string, value: boolean) => {
    setLoading(true)
    if (section === 'prompts') {
      // setSectionPrompts(section)
      setPromptKey(key)
    }
    else if (section === 'categories') {
      setCategoryKey(key)
      // setSectionCats(section)
    }
    else {
      if (key !== 'Trending') {
        const { data } = await axios.get(`${getAllPrompts}?condition=popular`);
        setPrompts(data);
      }
      else {
        const { data } = await axios.get(getAllPromptsByHourlyFactor);
        setPrompts(data);
      }
      setSortByCaption(key)
    }
    setFilterList((preFilter) => ({
      ...preFilter,
      [section]: {
        [key]: value,
      },
    }));
    setLoading(false)
  };

  useEffect(() => {
    if (prompts?.length) {
      const updateFilterPrompts = prompts.filter((prompt: any) => {
        if (prompt?.categories && promptKey !== 'All' && categoryKey !== 'All')
          return prompt?.categories.includes(categoryKey) && prompt.type === promptKey
        else if (prompt?.categories && promptKey === 'All' && categoryKey !== 'All')
          return prompt?.categories.includes(categoryKey)
        else if (promptKey !== 'All' && categoryKey === 'All')
          return prompt.type === promptKey
        else if (promptKey === 'All' && categoryKey === 'All') {
          return true
        }
        else
          return false
      }
      );
      setFilteredPrompts(updateFilterPrompts)
    }
  }, [promptKey, categoryKey, prompts])

  const handleClick = (direction: string) => {
    let newPage = currentPage;
    direction === 'next' ? newPage++ : newPage--;
    newPage > 0 && setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex">
        <div id="filterSection" className={`${showBurgerMenu ? 'w-[150px]' : ' w-[275px]'} shrink-0 border-r-[0.5px] border-[#FFFFFF66]`}>
          <div className="flex flex-col">
            {Object.entries(FilterSections).map(([section, { tagImg, tagTitle, filterLists }], index) => (
              <>
                <FilterSection
                  key={section}
                  filter={filterList[section]}
                  tagImg={tagImg}
                  tag={tagTitle}
                  filterLists={filterLists}
                  onChange={(key, value) => handleUpdateFilter(section, key, value)}
                />
              </>
            ))}
          </div>
        </div>
        {(loading) ? <div className='mr-auto ml-auto text-xl mt-10'>Loading...</div> :


          <div id="trendingPrompts" className={`${!removeSiteName ? 'p-[2px]' : (showBurgerMenu ? 'p-4' : 'pt-8 px-8')} flex flex-col  w-full mx-auto`}>
            <h3 className={`${showBurgerMenu ? 'text-xl' : ''} pb-8`}>{sortByCaption === 'Trending' ? 'Trending Prompts' : 'Most Popular Prompts'}</h3>
            <div className={`m-2 w-full flex flex-row  gap-2 mb-16 justify-start align-middle flex-wrap`}>

              { //@ts-ignore
                filteredPrompts && filteredPrompts?.map(({ name, price, type, images }: any, idx: number) => (
                  <PromptCard key={idx} name={name} price={price} tag={type} image={images.length ? images : null} />
                ))}
            </div>
            {//@ts-ignore
              filteredPrompts && filteredPrompts.length === 0 && (
                <div className="w-full">
                  <h3 className="text-center mx-auto">No Prompts</h3>
                </div>
              )}

            {/* <div className=" flex gap-x-2 pb-14 ml-auto flex-wrap">
              <button className="slider-button" onClick={() => handleClick('back')}>
                <Icon>left</Icon>
              </button>
              <button
                className={clsx('slider-button', { 'bg-white text-black': currentPage === 1 })}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className={clsx('slider-button', { 'bg-white text-black': currentPage === 2 })}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                className={clsx('slider-button', { 'bg-white text-black': currentPage === 3 })}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button
                className={clsx('slider-button', { 'bg-white text-black': currentPage === 4 })}
                onClick={() => setCurrentPage(4)}
              >
                4
              </button>
              <button
                className={clsx('slider-button', { 'bg-white text-black': currentPage === 5 })}
                onClick={() => setCurrentPage(5)}
              >
                5
              </button>
              <button
                className={clsx('slider-button', { 'bg-white text-black': currentPage === 6 })}
                onClick={() => setCurrentPage(6)}
              >
                6
              </button>
              <button
                className={clsx('slider-button', { 'bg-white text-black': currentPage === 7 })}
                onClick={() => setCurrentPage(7)}
              >
                7
              </button>
              <button className="slider-button" onClick={() => handleClick('next')}>
                <Icon>right</Icon>
              </button>
            </div> */}
          </div>
        }
      </div>
    </>
  );
}

// Marketplace.auth = true;

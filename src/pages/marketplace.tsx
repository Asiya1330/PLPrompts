import FilterSection from '@/components/FilterSection';
import { FilterSections } from '@/helpers/mock';
import Icon from '@/components/Icon';
import { Tag } from '@/helpers/interface';
import { useState, useEffect, useContext } from 'react';
import PromptCard from '@/components/PromptCard';
import { trendingPrompts } from '@/helpers/mock';
import PromptService from '../supabase/Prompt';
import clsx from 'classnames';
import { PromptsContext } from '@/contexts/PromptsContext';

export default function Marketplace() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByCaption, setSortByCaption] = useState('trending');
  const [filterList, setFilterList] = useState<{
    [section: string]: { [key: string]: boolean };
  }>({
    sortBy: {
      trending: true,
    },
    prompts: {
      dalle: true,
    },
    categories: {
      threeD: true,
    },
  });
  // const [prompts, setPrompts] = useState<any>([]);

  const { prompts } = useContext(PromptsContext);
  console.log(prompts, 'promscd ');


  useEffect(() => {
    // const getAllPromps = async (newObj: any) => {
    //   await PromptService.find(newObj).then((result: any) => {
    //       const newPrompts = result.data.map((p: any) => ({
    //       ...p,
    //       type: Tag[p.type as string],
    //     }));
    //     setPrompts(newPrompts);
    //   });
    // };

    // const findKeys = [];
    // for (let key in filterList) {
    //   for (let nestedKey in filterList[key]) {
    //     if (filterList[key][nestedKey] === true) {
    //       findKeys.push(nestedKey);
    //     }
    //   }
    // }
    // const [sortby, type, category] = findKeys;
    // console.log(findKeys);
    // const newObj = {
    //   sortby,
    //   type,
    //   category,
    //   page: currentPage,
    // };

    // setSortByCaption(newObj.sortby);

    // getAllPromps(newObj);
  }, [filterList, currentPage]);

  const handleUpdateFilter = (section: string, key: string, value: boolean) => {
    setFilterList((preFilter) => ({
      ...preFilter,
      [section]: {
        [key]: value,
      },
    }));
  };

  const handleClick = (direction: string) => {
    let newPage = currentPage;
    direction === 'next' ? newPage++ : newPage--;
    newPage > 0 && setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex">
        <div id="filterSection" className="w-[275px] shrink-0 border-r-[0.5px] border-[#FFFFFF66]">
          <div className="flex flex-col">
            {Object.entries(FilterSections).map(([section, { tagImg, tagTitle, filterLists }], index) => (
              <FilterSection
                key={section}
                filter={filterList[section]}
                tagImg={tagImg}
                tag={tagTitle}
                filterLists={filterLists}
                onChange={(key, value) => handleUpdateFilter(section, key, value)}
              />
            ))}
          </div>
        </div>
        <div id="trendingPrompts" className="flex flex-col pt-8 px-8 w-full mx-auto">
          <h3 className="pb-8">{sortByCaption === 'trending' ? 'Trending Prompts' : 'Most Popular Prompts'}</h3>
          <div className="w-full flex flex-row m-2 gap-2 mb-16 justify-start align-middle flex-wrap">
            {prompts && prompts?.map(({ name, price, type, images }: any, idx: number) => (
              <PromptCard key={idx} name={name} price={price} tag={type} image={images[0]} />
            ))}
          </div>
          {prompts && prompts.length === 0 && (
            <div className="w-full">
              <h3 className="text-center mx-auto">No Prompts</h3>
            </div>
          )}
          <div className=" flex gap-x-2 pb-14 ml-auto">
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
          </div>
        </div>
      </div>
    </>
  );
}

Marketplace.auth = true;

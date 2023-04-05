import Dashboard from '@/components/Dashboard';
import Favourites from '@/components/Favourites';
import Prompts from '@/components/Prompts';
import Purchase from '@/components/Purchase';
import Sales from '@/components/Sales';
import Settings from '@/components/Settings';
import { PromptsContext } from '@/contexts/PromptsContext';
import React, { useContext, useState } from 'react'

export default function Profile() {
    const [render, setRender] = useState('prompts');

    const renderProfileSection: any = {
        purchase: <Purchase />,
        favs: <Favourites />,
        settings: <Settings />,
        dashboard: <Dashboard />,
        sales: <Sales />,
        prompts: <Prompts />
    }

    const renderPurchases = () => setRender('purchase')
    const renderFavs = () => setRender('favs')
    const renderDashboard = () => setRender('dashboard')
    const renderPrompts = () => setRender('prompts')
    const renderSales = () => setRender('sales')
    const renderSettings = () => setRender('settings')

    const { prompts } = useContext(PromptsContext);

    return (
        <div className='m-20'>
            <div className='mb-10 gap-2 flex '>
                <button className='active:bg-gray-200 active:text-black' onClick={renderDashboard}>Dashboard</button>
                <button className='active:bg-gray-200 active:text-black' onClick={renderPrompts}>Prompts</button>
                <button className='active:bg-gray-200 active:text-black' onClick={renderSales}>Sales</button>
                <button className='active:bg-gray-200 active:text-black' onClick={renderPurchases}>Purchases</button>
                <button className='active:bg-gray-200 active:text-black' onClick={renderFavs}>Favorites</button>
                <button className='active:bg-gray-200 active:text-black' onClick={renderSettings}>Settings</button>
            </div>
            <div>
                {renderProfileSection[render]}
            </div>
        </div>
    )
}

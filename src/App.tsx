import { useState, useEffect } from 'react';
import './styles/main.css';
import logoImg from './assets/Logo.svg'
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios("http://localhost:3333/games").then(response => {
      setGames(response.data);
    })
  }, [])


  return (
    <div className='max-w-[1250px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>

        {games.map(game => {
          return (<GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads} />)
        })}



        {/* <a href="" className='relative rounded-lg overflow-hidden'>
          <img src="game6.png" alt="" />
          <div className='w-full pt-16 bg-game-gradient pb-4 px-4 absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>WoW</strong>
            <span className='text-zinc-300 text-sm block mt-1'>5 anúncios</span>
          </div>
        </a> */}

      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />

      </Dialog.Root>


    </div>
  )
}

export default App

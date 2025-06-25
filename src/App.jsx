import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyClock from './02/MyClock'
import MyDiv from './03/MyDiv'
import MyListItem from './04/MyListItem'

function App() {
   
  return ( 
    <div className="w-full xl:w-8/10 h-screen mx-auto
                    flex flex-col justify-start items-start
                    bg-amber-50">
      <header className="w-full min-h-20
                         bg-amber-100
                         flex justify-between items-center">

      </header>
      <main className="w-full flex-grow
                       overflow-y-auto py-10
                       flex flex-col justify-start items-center">
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
          <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </main>
      <footer className="w-full min-h-20
                        bg-black text-white
                         flex justify-between items-center">

      </footer>
    </div>   
  )
}

export default App

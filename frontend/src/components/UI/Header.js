
import logo from '../../assets/EatWaveLogo2.png';
import NavigationBar from './NavigationBar';

const Header = (props) => {
  return (
    <header className='sticky top-0 z-50 mx-auto flex w-full max-w-8xl items-center justify-between border-b border-orange-400 bg-transparent p-[1em] text-black font-sans font-bold backdrop-blur-[100px] dark:border-gray-800 dark:bg-black dark:text-white'>
      <div className="flex items-center">
            <img src={logo} alt='logo' className="w-16 h-16 mr-2" />
            <span className="font-sans font-bold text-3xl text-gray-800">EatWave</span>
      </div>
      <NavigationBar />
    </header>
  )
}

export default Header;
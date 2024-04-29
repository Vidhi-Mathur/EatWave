import Logo from './Logo';
import NavigationBar from './NavigationBar';

const Header = (props) => {
  return (
    <header className='sticky top-0 z-[1] mx-auto flex w-full max-w-8xl items-center justify-between border-b border-orange-400 bg-transparent p-[1em] text-black font-sans font-bold backdrop-blur-[100px] dark:border-gray-800 dark:bg-black dark:text-white'>
      <Logo />
      <NavigationBar />
    </header>
  )
}

export default Header;
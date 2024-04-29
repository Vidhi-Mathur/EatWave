import logo from '../../assets/EatWaveLogo2.jpg';

const Logo = () => {
    return (
        <div className="flex items-center">
            <img src={logo} alt='logo' className="w-16 h-16 mr-2" />
            <span className="font-sans font-bold text-3xl text-gray-800">EatWave</span>
        </div>
    );
};

export default Logo;
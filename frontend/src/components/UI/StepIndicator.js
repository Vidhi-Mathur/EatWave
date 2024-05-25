import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const StepIndicator = ({ steps, currentStep }) => {
  const getIcons = (idx) => {
    if(idx < currentStep) return <CheckCircleIcon color='success' />
    if(idx === 0) return <InfoIcon />
    if(idx === 1) return <ArticleIcon />
    if(idx === 2) return <MenuBookIcon />
    return null
  }
  return (
    <div className="w-1/4 p-4">
     <ol className='relative text-gray-500 border-s border-gray-200'>
        {steps.map((step, idx) => (
            <li key={idx} className='mb-10 ms-6'>
                <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ${idx < currentStep? 'ring-green-500 shadow-green-500': 'ring-white'}`}>
                    {getIcons(idx)}
                </span>
                <h3 className={`font-medium leading-tight ${idx <= currentStep ? 'text-black' : 'text-gray-500'}`}>{step}</h3>
            </li>
        ))}
     </ol>
    </div>
  );
};


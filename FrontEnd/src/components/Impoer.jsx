import { useRef } from 'react';         
import { Plus } from 'lucide-react';

export const FileUploader = ({handleFile}) => { 
  const hiddenFileInput = useRef(null); 

  const handleClick = event => {
    hiddenFileInput.current.click();   
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);    
    console.log(fileUploaded)              
  };

  return (
    <>
      <button 
        className="button-upload bg-[#d3d5d6] h-[100px] w-[100px] flex items-center justify-center border-dotted border-black border-[2px] rounded-lg"
        onClick={handleClick}  
    
      >
        <Plus width={30} height={30}/>
      </button>
      <input 
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{display:'none'}}
      />
    </>
  );
};
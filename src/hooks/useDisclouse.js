import {useState} from 'react'

export const useDisclouse = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
      setIsOpen(true);
    };
  
    const close = () => {
      setIsOpen(false);
    }; 
  return {close,open,isOpen}
}

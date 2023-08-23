import {doc, collection, deleteDoc } from "firebase/firestore"
import {AiOutlineUser} from "react-icons/ai"
import {IoMdTrash} from "react-icons/io"
import {RiEditCircleFill} from "react-icons/ri"
import { db } from "../config/firebase"
import { useDisclouse } from "../hooks/useDisclouse"
import { AddAndUpdateContact } from "./AddAndUpdateContact"
import { toast } from "react-toastify"
export const ContactCard = ({contact}) => {

    const {close,open,isOpen} = useDisclouse();

    const DeleteContact=async(id)=>{
      try {
        const contactRef = collection(db,"Contacts");
        await deleteDoc(doc(contactRef,id));
        toast.success("Contact Deleted Successfully");
      } catch (error) {
        console.error(error);
      }
    }
  return (
    <div key={contact.id} className="flex rounded-lg p-2 my-2 justify-between items-center bg-yellow">
          <div className="flex gap-3">
          <AiOutlineUser className="text-orange text-4xl"/>
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
          </div>
          <div className="flex gap-2 items-center">
            <RiEditCircleFill onClick={open} className="text-3xl cursor-pointer text-orange"/>
            <IoMdTrash onClick={()=>DeleteContact(contact.id)} className="text-3xl cursor-pointer text-orange"/>
          </div>
          <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={close}/>
        </div>
  )
}

// import './App.css';

import { Navbar } from "./components/Navbar";
import { ImSearch } from "react-icons/im";
import { AiFillPlusCircle } from "react-icons/ai";
import { ContactCard } from "./components/ContactCard";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { AddAndUpdateContact } from "./components/AddAndUpdateContact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotFoundContact } from "./components/NotFoundContact";

function App() {

  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };


  const filtered=(e)=>{
    const value=e.target.value;
    const contactsRef = collection(db, "Contacts");


       onSnapshot(contactsRef,(snapshot)=>{
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

       const data= contactLists.filter(contact=>
           contact.name.toLowerCase().includes(value.toLowerCase())
        )
        setContacts(data);
        return data;
       })
    
  }

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "Contacts");


       onSnapshot(contactsRef,(snapshot)=>{
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
        return contactLists;
       })

        
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <>
      <div className="max-w-[370px] mx-auto">
        <Navbar />
        <div className="flex relative items-center ">
          <ImSearch className="absolute ml-1 text-white text-2xl font-bold " />
          <input
          onChange={filtered}
            type="text"
            className="border text-white pl-9 flex-grow border-white rounded-md bg-transparent h-[40px] "
          />
          <div>
            <AiFillPlusCircle
              onClick={open}
              className="text-5xl cursor-pointer r pl-2 text-white"
            />
          </div>
        </div>
        <div>
          { contacts.length===0?<NotFoundContact/>: contacts.map((contact) => {
            return <ContactCard key={contact.id} contact={contact} />;
          })}
        </div>
      </div>
     <AddAndUpdateContact  isOpen={isOpen} onClose={close}/>
     <ToastContainer position="bottom-center"/>
    </>
  );
}

export default App;

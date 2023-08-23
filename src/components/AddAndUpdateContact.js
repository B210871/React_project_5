import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal } from "./Modal";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});
export const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "Contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "Contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field className=" border rounded-md h-10" name="name" />
              <div className="text-xs text-red-500">
              <ErrorMessage  name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field className=" border rounded-md h-10" name="email" />
              {/* <div className="text-xs text-red-500">
              <ErrorMessage email="email" />
              </div> */}
            </div>
            <button className="self-end rounded-lg bg-orange px-3 py-1.5 border ">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

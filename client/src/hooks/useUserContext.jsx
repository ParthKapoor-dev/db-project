import { useContext } from "react";
import { userContext } from "../context/UserContext";

export default function useUserContext() {
  const context = useContext(userContext);
  if (!context) throw Error('Error In User Context hook , userContext doesnot exists')

  return context
}
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

const uploadFile = async (file: File, folder: string) => {

  const id = uuidv4();
  const fileRef = ref(storage, folder + '/' + id);

  await uploadBytes(fileRef, file);

  return await getDownloadURL(fileRef);

}

export default uploadFile;
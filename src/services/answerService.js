import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import axios from "axios";
import { getOpenIAAnswer } from "./openIAService";

export const getSuggestedAnswer = async (question) => {
  try {
    const docRef = ref(
      storage,
      "gs://audio-medical-assistant-85c9e.appspot.com/medical-info.txt"
    );
    const url = await getDownloadURL(docRef);

    try {
      /** Fetch the file content using Fetch API */
      const response = await axios.get(url);

      const documentText = response.data;

      const openIAAnswer = await getOpenIAAnswer(
        question.toLowerCase(),
        documentText
      );

      return openIAAnswer;
    } catch (error) {
      console.error("Error reading document:", error);
      return "Error reading the medical document.";
    }
  } catch (firebaseError) {
    console.error("Error fetching document from Firebase:", firebaseError);
    return "Failed to fetch the medical document.";
  }
};

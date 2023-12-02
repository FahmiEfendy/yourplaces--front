import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const useFetchImage = (imagePath) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAvnbvHMwGAwlP04KLnoS__hJHRLH6E5Ko",
      authDomain: "yourplaces-back.firebaseapp.com",
      projectId: "yourplaces-back",
      storageBucket: "yourplaces-back.appspot.com",
      messagingSenderId: "655725087036",
      appId: "1:655725087036:web:2728c4780dc0b36e84b639",
    };

    const firebaseApp = initializeApp(firebaseConfig);

    const storage = getStorage(firebaseApp);
    const imageRef = ref(storage, imagePath);

    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [imagePath]);

  return { imageUrl };
};

export default useFetchImage;

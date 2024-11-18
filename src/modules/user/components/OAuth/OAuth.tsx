import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../../redux/slices/userSlice/userSlice";
import { googleAuthentication } from "../../../../services/axios.PostMethods";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { app, provider } from "../../../../services/firebaseConfig";
import { getAuth, signInWithPopup } from "firebase/auth";


export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleGoogleAuthentication = async () => {
        try {
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const email = user.email as string;
            const name = user.displayName as string;
            const photo = user.photoURL as string;

        const response = await googleAuthentication({
            email,
            name,
            photo,
        });
            dispatch(login(response.user));
            toast.success(response?.message);
            navigate("/");
        } catch (error: any) {
            console.error('Google Authentication Error:', error.message);
        }
  };

  return (
    <button
      onClick={handleGoogleAuthentication}
      type="button"
      className="flex items-center justify-center w-full bg-gray-50 border border-gray-500 opacity-95 text-black py-2 font-semibold rounded"
    >
      <FaGoogle className="text-red-800 text-xl mr-2" />
      Login with Google
    </button>
  );
}

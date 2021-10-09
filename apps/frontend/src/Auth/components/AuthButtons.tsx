import "../authButtons.scss";
import Button from "@/components/Button";
import { loginWithGoogle } from "@/firebase/client";
import Google from "@/components/Icons/Google";
import Facebook from "@/components/Icons/Facebook";

export default function AuthButtons() {
  return (
    <div className="auth__buttons">
      <Button
        className="auth__buttons-google"
        onClick={() => loginWithGoogle()}
      >
        <Google />
        Google
      </Button>
      <Button
        className="auth__buttons-facebook"
        onClick={() =>
          alert(
            "Todavía estamos trabajando en eso. \n Por el momento no está disponible."
          )
        }
      >
        <Facebook />
        Facebook
      </Button>
    </div>
  );
}

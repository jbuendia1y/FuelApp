import "../authButtons.scss";
import Button from "@/components/Button";
import { loginWithGoogle } from "@/firebase/client";
import Google from "@/components/Icons/Google";
import Facebook from "@/components/Icons/Facebook";
import { useHistory } from "react-router";

export default function AuthButtons() {
  const history = useHistory();

  return (
    <div className="auth__buttons">
      <Button
        className="auth__buttons-google"
        onClick={() =>
          loginWithGoogle().then((res) => {
            history.push("/compose/fuel-form");
          })
        }
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

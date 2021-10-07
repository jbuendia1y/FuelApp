import { FormInput } from "@/components/Form";
import "./enterprises.scss";

export default function Enterprises() {
  return (
    <div className="enterprises">
      <div className="enterprises-box">
        <div className="enterprises__search">
          <FormInput
            type="text"
            name="enterprise"
            id="enterprise"
            placeholder="En cuál empresa trabaja ?"
          />
        </div>
        <div className="enterprises-grid">
          <div className="enterprises__item">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

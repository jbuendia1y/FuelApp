import dateTimeFormat from "@/utils/dateTimeFormat";
import useFuelForms from "@/FuelForms/hooks/useFuelForms";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import Button from "@/components/Button";
import { colors } from "@/constants";

const fuelFormsItemStyles = css`
  width: 360px;
  background-color: #fff;
  padding: 8px 8px 8px 15px;
  border-radius: 5px;

  margin-bottom: 5px;

  h2 {
    margin-top: 0;
  }

  h2 span {
    display: block;
    opacity: 0.5;
    font-size: 0.8em;
  }
`;

const fuelFormsReviewStyles = css`
  p {
    margin: 0;
  }
`;

export default function FuelForms() {
  const { fuelForms } = useFuelForms({
    reverse: true,
  });

  return (
    <div>
      {fuelForms?.map((fuelForm) => {
        return (
          <div css={fuelFormsItemStyles} key={fuelForm.id}>
            <h2>
              Reporte Nº{fuelForm.id}
              <span>{dateTimeFormat(fuelForm.createdAt)}</span>
            </h2>
            <div css={fuelFormsReviewStyles}>
              <p>
                Recorrió : <span>{fuelForm.kmTraveled} km</span>
              </p>
              <p>
                Total : S/<span>{fuelForm.fullPayment}</span>
              </p>
            </div>
            <Button
              css={{
                display: "block",
                marginLeft: "auto",
              }}
            >
              <Link
                css={{ color: colors.white }}
                to={"/fuel-forms/" + fuelForm.id}
              >
                Ver más
              </Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

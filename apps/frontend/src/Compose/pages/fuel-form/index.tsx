import "./fuel-form.scss";
import Button from "@/components/Button";
import { addRegister } from "@/firebase/firestore";
import { FuelPerformanceForm } from "@/firebase/firestore/interfaces";
import useUser from "@/hooks/useUser";
import { FormEvent, useEffect, useState } from "react";
import { FormField, FormInput, FormLabel } from "@/components/Form";
import ModalPortal from "@/components/ModalPortal";

export default function ComposeFPForm() {
  const [horometro, setHorometro] = useState<null | number>(null);
  const [galones, setGalones] = useState<null | number>(null);
  const [precioPorGalon, setPrecioPorGalon] = useState<null | number>(null);

  const [onSubmit, setOnSubmit] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const user = useUser();

  const [showModal, setShowModal] = useState(true);

  const computeValue = (value: string) =>
    parseFloat(value.replaceAll(",", "."));

  useEffect(() => {
    if (onSubmit === false) return;
    if (!horometro || !galones || !precioPorGalon)
      return alert(
        "Faltan datos en el formulario. \nPor favor ingrese los datos para evaluar correctamente los datos."
      );

    setButtonDisabled(true);

    const data: FuelPerformanceForm = {
      horometro,
      galones,
      precioPorGalon,
      userId: user.uid,
    };

    addRegister(data).then((res) => {
      setOnSubmit(false);
    });
    setTimeout(() => {
      setOnSubmit(false);
    }, 2000);
  }, [onSubmit]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOnSubmit(true);
  };

  const handleOnChange = (e: any, setState: any) => {
    setState(computeValue(e.target.value));
    if (!horometro || !galones || !precioPorGalon) setButtonDisabled(false);
    if (e.target.value.length === 0) setButtonDisabled(true);
  };

  return (
    <form className="compose__form" onSubmit={handleSubmit}>
      <FormField>
        <label htmlFor="horometro">Horometro</label>
        <FormInput
          id="horometro"
          onChange={(e) => {
            handleOnChange(e, setHorometro);
          }}
          name="horometro"
          type="text"
        />
      </FormField>
      <FormField>
        <label htmlFor="galones">Galones</label>
        <FormInput
          id="galones"
          name="galones"
          onChange={(e) => {
            handleOnChange(e, setGalones);
          }}
          type="text"
        />
      </FormField>
      <FormField>
        <FormLabel htmlFor="precioPorGalon">Precio X Galon</FormLabel>
        <FormInput
          id="precioPorGalon"
          name="precioPorGalon"
          onChange={(e) => {
            handleOnChange(e, setPrecioPorGalon);
          }}
          type="text"
        />
      </FormField>
      <Button
        className="compose__button"
        type="submit"
        disabled={buttonDisabled}
      >
        Enviar Registro
      </Button>
    </form>
  );
}

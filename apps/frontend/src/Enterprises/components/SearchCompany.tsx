import { FormInput } from "@/components/Form";
import useEnterprises from "@/hooks/useEnterprises";
import { ChangeEvent, useEffect, useState } from "react";
import EnterprisesList from "./EnterpriseList";

export default function SearchCompany() {
  const { enterprises } = useEnterprises();
  const [data, setData] = useState([] as any[]);
  const [enterpriseName, setEnterpriseName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnterpriseName(e.target.value);
  };

  useEffect(() => {
    if (!enterprises) return;
    setData(
      enterprises.filter((item) => {
        if (enterpriseName.length > 0) {
          if (
            (item.name as string)
              .toLocaleLowerCase()
              .includes(enterpriseName.toLocaleLowerCase())
          )
            return true;
        } else return true;
      })
    );
  }, [enterpriseName]);

  return (
    <>
      {enterprises && (
        <>
          <div className="enterprises__search">
            <FormInput
              type="text"
              name="enterprise"
              id="enterprise"
              placeholder="En cuál empresa trabaja ?"
              onChange={handleChange}
            />
          </div>
          <div className="enterprises-grid">
            {enterpriseName.length === 0 ? (
              <EnterprisesList data={enterprises} />
            ) : (
              <EnterprisesList data={data} />
            )}
          </div>
        </>
      )}
    </>
  );
}

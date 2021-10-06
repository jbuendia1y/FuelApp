import { useState } from "react";

export default function EditProfile(user: any = {}) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  return (
    <form>
      <input type="text" name="name" />
      <input type="tel" name="phone" />
      <input type="text" name="phone" />
    </form>
  );
}

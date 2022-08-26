import { useState } from "react";

export default function useToggle() {
  const [status, setStatus] = useState(false);
  const toggleStatus = () => setStatus((prevStatus) => !prevStatus);
  return {status, toggleStatus};
}

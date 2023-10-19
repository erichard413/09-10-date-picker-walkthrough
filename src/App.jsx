import { useState } from "react";
import "./styles/styles.css";
import { DatePicker } from "./components/DatePicker";

function App() {
  const [value, setValue] = useState(new Date());
  return (
    <>
      <DatePicker value={value} onChange={setValue} />
    </>
  );
}

export default App;

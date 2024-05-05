// import React, { useState } from 'react';

// export default function About() {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   return (
//     <>
//       <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <form >
//           <input style={{ marginBottom: '5px'}} type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
//           <br />
//           <input style={{ marginBottom: '5px'}} type="number" id="number" name="number" required value={number} onChange={(e) => setNumber(e.target.value)} />
//           <br />
//           <button style={{ backgroundColor: "green", display: "flex", justifyContent: "center" }} type="submit"> Submit </button>
//         </form>
//       </div>
//     </>
//   );
// }


import React, { useState } from 'react';

export default function About() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    setNameError('');
    setNumberError('');

    // Perform validation
    if (!name) {
      setNameError('This field is required');
    }
    if (!number) {
      setNumberError('This field is required');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input style={{ marginBottom: '1px', width: "25%" }} type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
        <br />
        <input style={{ marginBottom: '1px', width: "25%" }} type="number" id="number" name="number" value={number} onChange={(e) => setNumber(e.target.value)} />
        {numberError && <span style={{ color: 'red' }}>{numberError}</span>}
        <br />
        <button type="submit" style={{ backgroundColor: "green", width: "15%", display: "flex", justifyContent: "center" }}> Submit </button>
      </div>
    </form>
  );
}


import React, { useState } from "react";

export default function App() {
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({
    name: "",
    shiftPref: "",
    unavailable: "",
    satPrefs: "",
    sunPrefs: "",
  });

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.shiftPref) {
      alert("Please enter name and shift preference");
      return;
    }
    setSubmissions([...submissions, form]);
    setForm({ name: "", shiftPref: "", unavailable: "", satPrefs: "", sunPrefs: "" });
  };

  const exportCSV = () => {
    const header = ["Name", "ShiftPref", "Unavailable", "SatPrefs", "SunPrefs"];
    const rows = submissions.map((s) => [
      s.name,
      s.shiftPref,
      s.unavailable,
      s.satPrefs,
      s.sunPrefs,
    ]);
    const csv = header.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "csr_submissions.csv";
    a.click();
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>CSR Employee Questionnaire</h1>
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Full Name" value={form.name} onChange={(e) => updateForm("name", e.target.value)} /><br />
        <select value={form.shiftPref} onChange={(e) => updateForm("shiftPref", e.target.value)}>
          <option value="">Shift Preference</option>
          <option value="Day">Day</option>
          <option value="Night">Night</option>
          <option value="Any">Any</option>
        </select><br />
        <input placeholder="Unavailable Dates (e.g. 5,12-14)" value={form.unavailable} onChange={(e) => updateForm("unavailable", e.target.value)} /><br />
        <input placeholder="Preferred Saturday(s) (e.g. 1,15)" value={form.satPrefs} onChange={(e) => updateForm("satPrefs", e.target.value)} /><br />
        <input placeholder="Preferred Sunday(s) (e.g. 2,16)" value={form.sunPrefs} onChange={(e) => updateForm("sunPrefs", e.target.value)} /><br />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {submissions.length > 0 && (
        <>
          <h2>Submissions</h2>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Name</th><th>Shift</th><th>Unavailable</th><th>Sat Pref</th><th>Sun Pref</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td><td>{s.shiftPref}</td><td>{s.unavailable}</td>
                  <td>{s.satPrefs}</td><td>{s.sunPrefs}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{ marginTop: 10 }} onClick={exportCSV}>Export CSV</button>
        </>
      )}
    </div>
  );
}

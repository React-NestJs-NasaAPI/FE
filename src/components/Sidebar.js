import React from "react";

function Sidebar({
  selectedCenter,
  onCenterSelect,
  onStartChange,
  onEndChange,
}) {
  const centers = [
    { value: "", label: "All" },
    { value: "ARC", label: "Ames Research Center(ARC)" },
    { value: "GSFC", label: "Goddard Space Flight Center(GSFC)" },
    { value: "JPL", label: "Jet Propulsion Laboratory(JPL)" },
    { value: "JSC", label: "Johnson Space Center(JSC)" },
    { value: "KSC", label: "Kennedy Space Center" },
    { value: "MSFC", label: "Marshall Space Flight Center(MSFC)" },
    { value: "HQ", label: "NASA Headquarters(HQ)" },
    { value: "LaRC", label: "Langley Research Center(LaRC)" },
    { value: "SSC", label: "Stennis Space Center(SSC)" },
    { value: "SSCD", label: "Science Systems and Applications, Inc.(SSCD)" },
  ];

  const handleCenterChange = (e) => {
    const selectedCenter = e.target.value;
    onCenterSelect(selectedCenter);
  };

  return (
    <aside className="sidebar">
      <h2>Filter by Center</h2>
      <select value={selectedCenter} onChange={handleCenterChange}>
        {centers.map((center) => (
          <option key={center.value} value={center.value}>
            {center.label}
          </option>
        ))}
      </select>
    </aside>
  );
}

export default Sidebar;

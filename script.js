document.getElementById("generate-flyer").addEventListener("click", async () => {
  const input = document.getElementById("property-input").value;
  const output = document.getElementById("flyer-output");
  output.textContent = "Generating...";

  const res = await fetch("/api/flyers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ propertyDetails: input }),
  });

  const data = await res.json();
  output.textContent = data.flyer;
});

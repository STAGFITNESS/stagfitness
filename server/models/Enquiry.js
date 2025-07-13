document.getElementById("enquiryForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form reload

    const enquiryData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        message: document.getElementById("message").value.trim(),
    };

    try {
        const res = await fetch("http://localhost:5000/enquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enquiryData),
        });

        if (res.ok) {
            const text = await res.text();
            document.getElementById("responseMsg").innerText = text;
            document.getElementById("enquiryForm").reset();
        } else {
            const errText = await res.text();
            document.getElementById("responseMsg").innerText = errText || "Something went wrong.";
            console.error("❌ Server responded with error:", errText);
        }
    } catch (err) {
        console.error("❌ Network or code error:", err);
        document.getElementById("responseMsg").innerText = "Failed to submit enquiry.";
    }
});

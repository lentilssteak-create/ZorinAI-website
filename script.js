const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1468295462669779004/t7SBMQhdzCaoNrgWDlNRGYRe8iplgYnJDz4h4favBjbokgp1Rgk9dvlB8mWxodT3iVgK";

// 1. LOAD SAVED CREDENTIALS
window.onload = () => {
    const savedName = localStorage.getItem('zorin_username');
    if (savedName) {
        document.getElementById('username').value = savedName;
    }
};

document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 2. SAVE CREDENTIALS FOR NEXT TIME
    const name = document.getElementById('username').value;
    localStorage.setItem('zorin_username', name);

    // 3. GET VALUES
    const subject = document.getElementById('subject').value;
    const urgency = document.querySelector('input[name="urgency"]:checked').value;
    const details = document.getElementById('details').value || "No details provided.";

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    // 4. PREPARE DISCORD MESSAGE
    const payload = {
        embeds: [{
            title: "🚀 New ZorinAI Request",
            color: urgency === "High" ? 15548997 : 5763719, // Red if high, Green if not
            fields: [
                { name: "Student", value: name, inline: true },
                { name: "Subject", value: subject, inline: true },
                { name: "Urgency", value: urgency, inline: true },
                { name: "Details", value: details }
            ],
            footer: { text: "ZorinAI Web Portal" }
        }]
    };

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        document.getElementById('status').innerText = "Request Sent! Check Discord.";
    } catch (err) {
        document.getElementById('status').innerText = "Failed to send.";
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit to Discord";
    }
});

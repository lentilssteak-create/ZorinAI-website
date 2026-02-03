// Replace this with your actual Discord Webhook URL
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1468295462669779004/t7SBMQhdzCaoNrgWDlNRGYRe8iplgYnJDz4h4favBjbokgp1Rgk9dvlB8mWxodT3iVgK";

const form = document.getElementById('requestForm');
const usernameInput = document.getElementById('username');
const statusDiv = document.getElementById('status');

// Load saved credentials on page load
window.onload = () => {
    const savedName = localStorage.getItem('zorin_user');
    if (savedName) {
        usernameInput.value = savedName;
    }
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value;
    const requestText = document.getElementById('request').value;
    const submitBtn = document.getElementById('submitBtn');

    // Save name for next time
    localStorage.setItem('zorin_user', username);

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const payload = {
        embeds: [{
            title: "📚 New Homework Request",
            color: 6511345, // Indigo color
            fields: [
                { name: "User", value: username, inline: true },
                { name: "Request", value: requestText }
            ],
            timestamp: new Date()
        }]
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            statusDiv.style.color = "#4ade80";
            statusDiv.innerText = "Sent successfully!";
            form.reset();
            usernameInput.value = username; // Keep name after reset
        } else {
            throw new Error();
        }
    } catch (err) {
        statusDiv.style.color = "#f87171";
        statusDiv.innerText = "Error sending request.";
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Request";
    }
});

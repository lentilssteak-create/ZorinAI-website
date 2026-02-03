const WEBHOOK_URL = "https://discord.com/api/webhooks/1468295462669779004/t7SBMQhdzCaoNrgWDlNRGYRe8iplgYnJDz4h4favBjbokgp1Rgk9dvlB8mWxodT3iVgK";

// 1. Check Saved Credentials
window.onload = () => {
    const savedName = localStorage.getItem('zorin_name');
    if (savedName) {
        document.getElementById('username').value = savedName;
        document.getElementById('rememberMe').checked = true;
    }
};

function nextStep() {
    const name = document.getElementById('username').value;
    if (!name) return alert("Please enter a name");
    
    // Save/Clear Credentials logic
    if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('zorin_name', name);
    } else {
        localStorage.removeItem('zorin_name');
    }

    document.getElementById('setup-step').classList.add('hidden');
    document.getElementById('request-step').classList.remove('hidden');
}

function prevStep() {
    document.getElementById('setup-step').classList.remove('hidden');
    document.getElementById('request-step').classList.add('hidden');
}

function toggleSubOptions() {
    const sub = document.getElementById('subject').value;
    const subOptions = document.getElementById('subOptions');
    const grindOpt = document.getElementById('grindOption');
    const amountGroup = document.getElementById('amountGroup');

    subOptions.classList.remove('hidden');
    
    if (sub === "Science") {
        grindOpt.style.display = "none"; // Science only does homework
        document.getElementById('serviceType').value = "Homework";
        amountGroup.classList.add('hidden');
    } else {
        grindOpt.style.display = "block";
        grindOpt.innerText = sub === "Maths" ? "XP Grinding" : "SRP Grinding";
    }
}

function toggleAmountInput() {
    const type = document.getElementById('serviceType').value;
    const sub = document.getElementById('subject').value;
    const amountGroup = document.getElementById('amountGroup');
    const amountInput = document.getElementById('amount');

    if (type === "Grind") {
        amountGroup.classList.remove('hidden');
        amountInput.max = (sub === "Maths") ? 999999 : 9999;
        amountInput.placeholder = `Max ${amountInput.max}`;
    } else {
        amountGroup.classList.add('hidden');
    }
}

document.getElementById('zorinForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;

    const data = {
        name: document.getElementById('username').value,
        subject: document.getElementById('subject').value,
        type: document.getElementById('serviceType').value,
        amount: document.getElementById('amount').value || "N/A"
    };

    const payload = {
        embeds: [{
            title: "New ZorinAI Request",
            color: 9142518,
            fields: [
                { name: "Student", value: data.name, inline: true },
                { name: "Subject", value: data.subject, inline: true },
                { name: "Type", value: data.type, inline: true },
                { name: "Value", value: data.amount }
            ]
        }]
    };

    await fetch(WEBHOOK_URL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
    alert("Request Sent!");
    btn.disabled = false;
});

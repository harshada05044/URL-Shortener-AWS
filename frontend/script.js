async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;

    if (!longUrl) {
        alert("Please enter a valid URL!");
        return;
    }

    const requestBody = JSON.stringify({ longUrl });  // Ensure correct key

    console.log("Request Body:", requestBody); // Debugging: Check if the request body is correct

    try {
        const response = await fetch("https://lvr7vfvj3b.execute-api.eu-north-1.amazonaws.com/prod/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody
        });

        const data = await response.json();
        console.log("Response Data:", data); // Debugging: Check API response

        if (response.ok && data.shortUrl) {
            document.getElementById("shortUrl").value = data.shortUrl;
            document.getElementById("result").classList.remove("hidden");
        } else {
            alert("Error: " + (data.error || "Failed to shorten URL."));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}

// Function to copy the short URL to clipboard
function copyUrl() {
    const shortUrlInput = document.getElementById("shortUrl");

    if (!shortUrlInput.value) {
        alert("No short URL to copy!");
        return;
    }

    // Create a temporary textarea to copy text (fallback for older browsers)
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = shortUrlInput.value;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);

    // Use modern Clipboard API
    navigator.clipboard.writeText(shortUrlInput.value)
        .then(() => {
            alert("Short URL copied to clipboard!");
        })
        .catch(err => {
            console.error("Error copying URL:", err);
            alert("Failed to copy URL. Please try manually.");
        });
}


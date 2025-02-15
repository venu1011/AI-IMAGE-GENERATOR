async function fetchImages() {
    const query = document.getElementById("query").value.trim();
    const gallery = document.getElementById("image-gallery");
    if (!query) return;
    gallery.innerHTML = "Loading...";
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=9`, {
            headers: { Authorization: '8SYF6ZaHLdOGpluDJzxpiezPye9FscaKUHi2TA9iyu1gxlcw5MQoRkK1' }
        });
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        gallery.innerHTML = data.photos.map(img => `
            <div class="card image-card" onclick="openModal('${img.src.original}', '${img.width}x${img.height}', '${img.photographer}')">
                <img src="${img.src.medium}" class="card-img-top" alt="AI Generated">
                <div class="metadata">${img.width}x${img.height} | Photographer: <a href="${img.photographer_url}" target="_blank">${img.photographer}</a></div>
            </div>
        `).join('');
    } catch (error) {
        gallery.innerHTML = "Error loading images. Please check your API key or try again later.";
    }
}

function downloadImage(imageUrl) {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "downloaded_image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function openModal(imageUrl, dimensions, photographer) {
    document.getElementById("modalImage").src = imageUrl;
    document.getElementById("imageDetails").innerText = `Size: ${dimensions}, Photographer: ${photographer}`;
    document.getElementById("downloadBtn").href = imageUrl;
    document.getElementById("downloadBtn").setAttribute("download", "ai_image.jpg");
    new bootstrap.Modal(document.getElementById("imageModal")).show();
}
function zoomImage(scale) {
    const img = document.getElementById("modalImage");
    img.style.transform = `scale(${scale})`;
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

 // 💻 कस्टमाइज्ड हैवी ब्रांड्स इन्वेंटरी डेटाबेस (Dell 5400, 3400, 7400, HP, Lenovo Series)
const laptopInventory = [
    { 
        id: 1, 
        name: "Dell Latitude 5400 Enterprise", 
        price: 31500, 
        specs: "Core i5 8th Gen | 16GB RAM | 512GB NVMe SSD | 14' FHD Anti-Glare Display | HD Camera | Win 11 Pro", 
        img: "https://i.postimg.cc/cLckTFD2/download-(1).jpg" 
    },
    { 
        id: 2, 
        name: "Dell Vostro 3400 Corporate", 
        price: 34999, 
        specs: "Core i3 11th Gen | 8GB DDR4 RAM | 256GB SSD + 1TB HDD | 14' Sleek Screen | Intel UHD Graphics", 
        img: "https://i.postimg.cc/gkWK5v6W/download.jpg" 
    },
    { 
        id: 3, 
        name: "Dell Latitude 7400 Premium Ultrabook", 
        price: 39999, 
        specs: "Core i7 8th Gen | 16GB High-Speed RAM | 512GB Ultra SSD | Carbon Fiber Body | Backlit Keyboard", 
        img: "https://i.postimg.cc/Gh4sXtXx/images-(1).jpg" 
    },
    { 
        id: 4, 
        name: "HP ProBook 440 G9 Series", 
        price: 43500, 
        specs: "Core i5 12th Gen | 16GB DDR4 Memory | 512GB PCIe SSD | Aluminum Chassis | Long Battery Life", 
        img: "https://i.postimg.cc/Cxt7c9CF/download-(2).jpg" 
    },
    { 
        id: 5, 
        name: "Lenovo ThinkPad L14 Business", 
        price: 36000, 
        specs: "AMD Ryzen 5 Pro | 16GB RAM | 512GB Secure SSD | Legendary Ergonomic Keyboard | Fingerprint Sensor", 
        img: "https://i.postimg.cc/RZzKq9TM/images-(2).jpg" 
    },
    { 
        id: 6, 
        name: "Apple MacBook Air Apple-Silicon", 
        price: 74990, 
        specs: "Apple M1 Chipset | 8GB Unified Architecture Memory | 256GB SuperFast SSD | 13.3' Premium Retina Display", 
        img: "https://i.postimg.cc/fb82Q50P/download.webp" 
    }
];

let selectedItem = null;

// ग्रिड रेंडरर फंक्शन
function drawStoreCatalog(itemsList) {
    const grid = document.getElementById('laptopGrid');
    if (!grid) return; grid.innerHTML = "";

    if (itemsList.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #9ca3af; padding: 40px; font-size: 1.2rem;">❌ No matching laptops found! Try searching another brand.</div>`;
        return;
    }

    itemsList.forEach(item => {
        const card = document.createElement('div');
        card.className = "laptop-card";
        card.innerHTML = `
            <div class="laptop-img-frame">
                <img src="${item.img}" alt="${item.name}" onerror="this.src='https://placeholder.com'">
            </div>
            <div class="laptop-info">
                <h3 class="laptop-title">${item.name}</h3>
                <p class="laptop-specs">${item.specs}</p>
                <p class="laptop-price">₹${item.price.toLocaleString('en-IN')}</p>
                <button class="buy-btn" onclick="openOrderModal(${item.id})">Order via WhatsApp</button>
            </div>`;
        grid.appendChild(card);
    });
}

// 🔍 लाइव रियल-टाइम सर्च फ़िल्टर लॉजिक
function executeLiveSearch() {
    const query = document.getElementById('storeSearchInput').value.toLowerCase().trim();
    const filteredList = laptopInventory.filter(laptop => {
        return laptop.name.toLowerCase().includes(query) || laptop.specs.toLowerCase().includes(query);
    });
    drawStoreCatalog(filteredList);
}

if(document.getElementById('storeSearchInput')) {
    document.getElementById('storeSearchInput').addEventListener('input', executeLiveSearch);
}

// 🛎️ मॉडल पॉपअप मैनेजमेंट
function openOrderModal(id) {
    selectedItem = laptopInventory.find(l => l.id === id);
    document.getElementById('modalLaptopDetails').innerText = `Product: ${selectedItem.name}\nPrice: ₹${selectedItem.price.toLocaleString('en-IN')}`;
    document.getElementById('orderModal').style.display = "flex";
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = "none";
}

// 📲 फॉर्म सबमिशन व्हाट्सएप रीडायरेक्शन
if(document.getElementById('orderForm')) {
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const clientName = document.getElementById('custName').value;
        const clientPhone = document.getElementById('custPhone').value;
        
        const targetStoreWhatsApp = "918690662087"; // क्लाइंट का असली नंबर
        const messageText = `💻 *NEW LAPTOP ORDER - HYNEX TECHNOLOGY* 💻\n\n🔥 *Laptop Model:* ${selectedItem.name}\n💰 *Price:* ₹${selectedItem.price.toLocaleString('en-IN')}\n📋 *Specs:* ${selectedItem.specs}\n\n👤 *Customer Name:* ${clientName}\n📞 *Customer Phone:* ${clientPhone}\n\n⚡ _Order Network Maintained by Mayank Suite_`;
        
        window.open(`https://wa.me{targetStoreWhatsApp}?text=${encodeURIComponent(messageText)}`, '_blank');
        closeOrderModal();
    });
}

window.onload = function() {
    drawStoreCatalog(laptopInventory);
};

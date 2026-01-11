// Load data from LocalStorage on startup
let contacts = JSON.parse(localStorage.getItem('crm_contacts')) || [];

function renderContacts(data = contacts) {
    const list = document.getElementById('contactList');
    list.innerHTML = '';
    
    data.forEach((contact, index) => {
        list.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td><strong>${contact.status}</strong></td>
                <td><button class="delete-btn" onclick="deleteContact(${index})">Delete</button></td>
            </tr>
        `;
    });
}

function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const status = document.getElementById('status').value;

    if (name && email) {
        contacts.push({ name, email, status });
        localStorage.setItem('crm_contacts', JSON.stringify(contacts));
        renderContacts();
        // Clear inputs
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    } else {
        alert("Please fill in all fields");
    }
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('crm_contacts', JSON.stringify(contacts));
    renderContacts();
}

function filterContacts() {
    const term = document.getElementById('search').value.toLowerCase();
    const filtered = contacts.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.email.toLowerCase().includes(term)
    );
    renderContacts(filtered);
}

// Initial render
renderContacts();
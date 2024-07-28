// Function to generate and display the resume
function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    // Create the resume HTML
    const resumeOutput = `
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Education</h3>
        <p>${education.replace(/\n/g, '<br>')}</p>
        <h3>Experience</h3>
        <p>${experience.replace(/\n/g, '<br>')}</p>
        <h3>Skills</h3>
        <p>${skills.replace(/\n/g, '<br>')}</p>
    `;

    document.getElementById('resume-output').innerHTML = resumeOutput;

    let pdfButton = document.getElementById('generate-pdf-button');
    if (!pdfButton) {
        pdfButton = document.createElement('button');
        pdfButton.id = 'generate-pdf-button';
        pdfButton.innerText = 'Generate PDF';
        pdfButton.onclick = generatePDF;
        document.getElementById('builder-buttons').appendChild(pdfButton);
    }
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    doc.setFont('helvetica');

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Resume', 10, 10);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Name:', 10, 30);
    doc.text('Email:', 10, 40);
    doc.text('Phone:', 10, 50);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(name, 40, 30);
    doc.text(email, 40, 40);
    doc.text(phone, 40, 50);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Education', 10, 70);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(education, 10, 80, { maxWidth: 180 });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Experience', 10, 100);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(experience, 10, 110, { maxWidth: 180 });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Skills', 10, 130);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(skills, 10, 140, { maxWidth: 180 });

    doc.save('resume.pdf');
}

// async function sendPostRequest(user) {
//     // Get the value from the input field
//     let user = document.getElementById('myButton').value;

//     // Create the payload
//     const data = { "username": `"${user}"` };

//     // Define the URL to which the POST request will be sent
//     const url = 'https://githubresume.onrender.com'; // Replace with your actual API endpoint

//     try {
//         // Send the POST request using fetch
//         const response = await fetch(url, {
//             method: 'POST', // Use the POST method
//             headers: {
//                 'Content-Type': 'application/json' // Specify the content type
//             },
//             body: JSON.parse(data) // Convert the payload to a JSON string
//         });

//         // Parse the JSON response
//         const data = await response.json();

//         // Log the response data
//         console.log('Success:', data);
//     } catch (error) {
//         // Log any errors
//         console.error('Error:', error);
//     }
// }




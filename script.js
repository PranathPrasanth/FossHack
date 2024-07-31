function sendPostRequest() {
  const username = document.getElementById("usernameInput").value;
  const data = { username: username };
  const url = "https://githubresume.onrender.com"; // Replace with your actual API endpoint

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Full API Response:", data); // Log the entire response

      // Directly handle the array of objects if `repos` is not present
      if (Array.isArray(data)) {
        updateResumeWithGitHubData(data);
      } else {
        console.error("Expected an array of repositories, but found:", data);
        document.getElementById("resume-output").innerHTML =
          "<p>No repositories available</p>";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error: " + error);
    });
}

function updateResumeWithGitHubData(repos) {
  console.log("GitHub Data:", repos); // Debugging output

  let githubSection = "<h3>GitHub Repositories</h3>";

  if (Array.isArray(repos) && repos.length > 0) {
    repos.forEach((repo) => {
      console.log("Processing Repo:", repo); // Debugging output

      if (repo.name) {
        githubSection += `
                    <div>
                        <h4>${repo.name}</h4>
                        <p><strong>Stars:</strong> ${repo.stars}</p>
                        <p><strong>Description:</strong> ${
                          repo.description ? repo.description : "No description"
                        }</p>
                    </div>
                `;
      }
    });

    if (githubSection === "<h3>GitHub Repositories</h3>") {
      githubSection += "<p>No repositories available</p>";
    }
  } else {
    githubSection += "<p>No repositories available</p>";
  }

  document.getElementById("resume-output").innerHTML += githubSection;
}

function generateResume() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value;

  const resumeOutput = `
      <h2>${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <h3>Education</h3>
      <p>${education.replace(/\n/g, "<br>")}</p>
      <h3>Experience</h3>
      <p>${experience.replace(/\n/g, "<br>")}</p>
      <h3>Skills</h3>
      <p>${skills.replace(/\n/g, "<br>")}</p>
  `;

  document.getElementById("resume-output").innerHTML = resumeOutput;

  let pdfButton = document.getElementById("generate-pdf-button");
  if (!pdfButton) {
      pdfButton = document.createElement("button");
      pdfButton.id = "generate-pdf-button";
      pdfButton.innerText = "Download PDF";
      pdfButton.onclick = generatePDF;
      document.getElementById("builder-buttons").appendChild(pdfButton);
  }
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) {
      console.error("jsPDF library is not loaded.");
      return;
  }

  const doc = new jsPDF();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value;
  const resumeOutput = document.getElementById("resume-output").innerHTML;

  // Create the PDF layout
  doc.setFont("helvetica");
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Resume", 10, 10);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Name:", 10, 30);
  doc.text(name, 50, 30);

  doc.text("Email:", 10, 40);
  doc.text(email, 50, 40);

  doc.text("Phone:", 10, 50);
  doc.text(phone, 50, 50);

  doc.setFontSize(16);
  doc.text("Education", 10, 70);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(education, 10, 80, { maxWidth: 180 });

  doc.setFontSize(16);
  doc.text("Experience", 10, 100);
  doc.setFontSize(12);
  doc.text(experience, 10, 110, { maxWidth: 180 });

  doc.setFontSize(16);
  doc.text("Skills", 10, 130);
  doc.setFontSize(12);
  doc.text(skills, 10, 140, { maxWidth: 180 });

  // Add GitHub Repositories
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("GitHub Repositories", 10, 160);

  // Parse the GitHub section
  const parser = new DOMParser();
  const docHtml = parser.parseFromString(resumeOutput, "text/html");
  const repos = docHtml.querySelectorAll("div");

  let yPosition = 170;
  repos.forEach((repo) => {
      if (yPosition > 280) {  // Check if the content exceeds the page height
          doc.addPage();
          yPosition = 10;
      }

      const repoName = repo.querySelector("h4") ? repo.querySelector("h4").innerText : '';
      const repoDescription = repo.querySelector("p").nextSibling ? repo.querySelector("p").nextSibling.nodeValue.trim() : '';

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(repoName, 10, yPosition);
      yPosition += 10;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
    //  doc.text(`Description: ${repoDescription}`, 10, yPosition);
      yPosition += 20;
  });

  doc.save("resume.pdf");
}






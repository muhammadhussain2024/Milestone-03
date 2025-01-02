document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeContent = document.getElementById('resumeContent') as HTMLElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLElement;

    interface Experience {
        title: string;
        company: string;
        dates: string;
        description: string;
    }

    interface Education {
        degree: string;
        institution: string;
        year: string;
    }

    // Add experience section
    document.getElementById('addExperience')?.addEventListener('click', () => {
        const experienceList = document.getElementById('experienceList') as HTMLElement;
        const newExperience = document.createElement('div');
        newExperience.classList.add('experienceItem');
        newExperience.innerHTML = `
            <label for="expTitle">Job Title:</label>
            <input type="text" class="expTitle" required>
            <label for="expCompany">Company:</label>
            <input type="text" class="expCompany" required>
            <label for="expDates">Dates:</label>
            <input type="text" class="expDates" required>
            <label for="expDesc">Description:</label>
            <textarea class="expDesc" required></textarea>
        `;
        experienceList.appendChild(newExperience);
    });

    // Add education section
    document.getElementById('addEducation')?.addEventListener('click', () => {
        const educationList = document.getElementById('educationList') as HTMLElement;
        const newEducation = document.createElement('div');
        newEducation.classList.add('educationItem');
        newEducation.innerHTML = `
            <label for="eduDegree">Degree:</label>
            <input type="text" class="eduDegree" required>
            <label for="eduInstitution">Institution:</label>
            <input type="text" class="eduInstitution" required>
            <label for="eduYear">Year:</label>
            <input type="text" class="eduYear" required>
        `;
        educationList.appendChild(newEducation);
    });

    // Add skill section
    document.getElementById('addSkill')?.addEventListener('click', () => {
        const skillsList = document.getElementById('skillsList') as HTMLElement;
        const newSkill = document.createElement('input');
        newSkill.type = 'text';
        newSkill.classList.add('skill');
        newSkill.placeholder = 'Skill';
        skillsList.appendChild(newSkill);
    });

    // Handle form submission
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        // Get input values
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const tagline = (document.getElementById('tagline') as HTMLInputElement).value;

        // Get experience data
        const experiences: Experience[] = Array.from(document.querySelectorAll('.experienceItem')).map(item => ({
            title: (item.querySelector('.expTitle') as HTMLInputElement).value,
            company: (item.querySelector('.expCompany') as HTMLInputElement).value,
            dates: (item.querySelector('.expDates') as HTMLInputElement).value,
            description: (item.querySelector('.expDesc') as HTMLTextAreaElement).value,
        }));

        // Get education data
        const educations: Education[] = Array.from(document.querySelectorAll('.educationItem')).map(item => ({
            degree: (item.querySelector('.eduDegree') as HTMLInputElement).value,
            institution: (item.querySelector('.eduInstitution') as HTMLInputElement).value,
            year: (item.querySelector('.eduYear') as HTMLInputElement).value,
        }));

        // Get skills data
        const skills: string[] = Array.from(document.querySelectorAll('.skill')).map(skill => (skill as HTMLInputElement).value.trim()).filter(value => value !== '');

        // Generate resume content
        resumeContent.innerHTML = `
            <header>
                <h1>${name}</h1>
                <p>${tagline}</p>
            </header>
            <section id="experience">
                <h2>Experience</h2>
                ${experiences.map(exp => `
                    <div>
                        <h3>${exp.title} at ${exp.company}</h3>
                        <p>${exp.dates}</p>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </section>
            <section id="education">
                <h2>Education</h2>
                ${educations.map(edu => `
                    <div>
                        <h3>${edu.degree}</h3>
                        <p>${edu.institution}</p>
                        <p>${edu.year}</p>
                    </div>
                `).join('')}
            </section>
            <section id="skills">
                <h2>Skills</h2>
                <ul>
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </section>
        `;

        resumeOutput.style.display = 'block';
    });

    // Download resume functionality
    document.getElementById('downloadResume')?.addEventListener('click', () => {
        const blob = new Blob([resumeContent.innerHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        a.click();
        URL.revokeObjectURL(url);
    });
});

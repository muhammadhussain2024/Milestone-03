document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d;
    var form = document.getElementById('resumeForm');
    var resumeContent = document.getElementById('resumeContent');
    var resumeOutput = document.getElementById('resumeOutput');
    // Add experience section
    (_a = document.getElementById('addExperience')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        var experienceList = document.getElementById('experienceList');
        var newExperience = document.createElement('div');
        newExperience.classList.add('experienceItem');
        newExperience.innerHTML = "\n            <label for=\"expTitle\">Job Title:</label>\n            <input type=\"text\" class=\"expTitle\" required>\n            <label for=\"expCompany\">Company:</label>\n            <input type=\"text\" class=\"expCompany\" required>\n            <label for=\"expDates\">Dates:</label>\n            <input type=\"text\" class=\"expDates\" required>\n            <label for=\"expDesc\">Description:</label>\n            <textarea class=\"expDesc\" required></textarea>\n        ";
        experienceList.appendChild(newExperience);
    });
    // Add education section
    (_b = document.getElementById('addEducation')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        var educationList = document.getElementById('educationList');
        var newEducation = document.createElement('div');
        newEducation.classList.add('educationItem');
        newEducation.innerHTML = "\n            <label for=\"eduDegree\">Degree:</label>\n            <input type=\"text\" class=\"eduDegree\" required>\n            <label for=\"eduInstitution\">Institution:</label>\n            <input type=\"text\" class=\"eduInstitution\" required>\n            <label for=\"eduYear\">Year:</label>\n            <input type=\"text\" class=\"eduYear\" required>\n        ";
        educationList.appendChild(newEducation);
    });
    // Add skill section
    (_c = document.getElementById('addSkill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        var skillsList = document.getElementById('skillsList');
        var newSkill = document.createElement('input');
        newSkill.type = 'text';
        newSkill.classList.add('skill');
        newSkill.placeholder = 'Skill';
        skillsList.appendChild(newSkill);
    });
    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // Get input values
        var name = document.getElementById('name').value;
        var tagline = document.getElementById('tagline').value;
        // Get experience data
        var experiences = Array.from(document.querySelectorAll('.experienceItem')).map(function (item) { return ({
            title: item.querySelector('.expTitle').value,
            company: item.querySelector('.expCompany').value,
            dates: item.querySelector('.expDates').value,
            description: item.querySelector('.expDesc').value,
        }); });
        // Get education data
        var educations = Array.from(document.querySelectorAll('.educationItem')).map(function (item) { return ({
            degree: item.querySelector('.eduDegree').value,
            institution: item.querySelector('.eduInstitution').value,
            year: item.querySelector('.eduYear').value,
        }); });
        // Get skills data
        var skills = Array.from(document.querySelectorAll('.skill')).map(function (skill) { return skill.value.trim(); }).filter(function (value) { return value !== ''; });
        // Generate resume content
        resumeContent.innerHTML = "\n            <header>\n                <h1>".concat(name, "</h1>\n                <p>").concat(tagline, "</p>\n            </header>\n            <section id=\"experience\">\n                <h2>Experience</h2>\n                ").concat(experiences.map(function (exp) { return "\n                    <div>\n                        <h3>".concat(exp.title, " at ").concat(exp.company, "</h3>\n                        <p>").concat(exp.dates, "</p>\n                        <p>").concat(exp.description, "</p>\n                    </div>\n                "); }).join(''), "\n            </section>\n            <section id=\"education\">\n                <h2>Education</h2>\n                ").concat(educations.map(function (edu) { return "\n                    <div>\n                        <h3>".concat(edu.degree, "</h3>\n                        <p>").concat(edu.institution, "</p>\n                        <p>").concat(edu.year, "</p>\n                    </div>\n                "); }).join(''), "\n            </section>\n            <section id=\"skills\">\n                <h2>Skills</h2>\n                <ul>\n                    ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                </ul>\n            </section>\n        ");
        resumeOutput.style.display = 'block';
    });
    // Download resume functionality
    (_d = document.getElementById('downloadResume')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        var blob = new Blob([resumeContent.innerHTML], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        a.click();
        URL.revokeObjectURL(url);
    });
});

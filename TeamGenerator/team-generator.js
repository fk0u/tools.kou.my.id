function generateTeams() {
    const namesInput = document.getElementById('names').value.trim();
    const teamCountInput = document.getElementById('teamCount').value.trim();
    const output = document.getElementById('output');

    const namesError = document.getElementById('names-error');
    const teamCountError = document.getElementById('teamCount-error');

    // Reset error messages
    namesError.textContent = '';
    teamCountError.textContent = '';

    // Validate inputs
    if (namesInput === '') {
        namesError.textContent = 'Please enter names separated by new lines.';
        return;
    }

    if (teamCountInput === '' || isNaN(teamCountInput) || teamCountInput <= 0) {
        teamCountError.textContent = 'Please enter a valid number of teams.';
        return;
    }

    const names = namesInput.split('\n').map(name => name.trim()).filter(name => name !== '');
    const teamCount = parseInt(teamCountInput, 10);

    if (names.length < teamCount) {
        teamCountError.textContent = 'Number of teams cannot exceed number of names.';
        return;
    }

    // Shuffle names
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    // Generate teams
    const teams = Array.from({ length: teamCount }, () => []);
    for (let i = 0; i < names.length; i++) {
        teams[i % teamCount].push(names[i]);
    }

    // Display teams
    output.innerHTML = '';
    teams.forEach((team, index) => {
        const teamElement = document.createElement('div');
        teamElement.innerHTML = `<h3>Team ${index + 1}</h3><p>${team.join(', ')}</p>`;
        output.appendChild(teamElement);
    });
}

function importNames() {
    const fileInput = document.getElementById('fileInput');
    const fileError = document.getElementById('file-error');
    fileError.textContent = '';

    if (fileInput.files.length === 0) {
        fileError.textContent = 'Please select a file.';
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const content = event.target.result;
        if (file.name.endsWith('.txt')) {
            document.getElementById('names').value = content;
        } else if (file.name.endsWith('.csv')) {
            const parsedData = Papa.parse(content, { delimiter: ',', header: false });
            document.getElementById('names').value = parsedData.data.join('\n');
        } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
            const workbook = XLSX.read(content, { type: 'binary' });
            const firstSheet = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_csv(workbook.Sheets[firstSheet]);
            const parsedData = Papa.parse(sheetData, { delimiter: ',', header: false });
            document.getElementById('names').value = parsedData.data.join('\n');
        } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
            // Placeholder for reading Word documents
            alert('Reading Word documents is not supported yet.');
        }
    };

    if (file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
        reader.readAsText(file);
    } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        reader.readAsBinaryString(file);
    } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
        // Placeholder for reading Word documents
        alert('Reading Word documents is not supported yet.');
    }
}

function goBack() {
    window.history.back();
}

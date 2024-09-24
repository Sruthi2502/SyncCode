// Handle registration form submission
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Optionally, reset the form after submission
    document.getElementById('registerForm').reset();

    // Redirect to the thankyou.html page
    window.location.href = './thankyou.html';
});

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Redirect to the dashboard page after login
    window.location.href = './dashboard.html'; // Ensure the path is correct
});

// Dashboard functionality
// Get references to the buttons and the editor
const codeEditor = document.getElementById('codeEditor');
const outputBox = document.getElementById('output');

// Handle the "New File" button
document.getElementById('newFile')?.addEventListener('click', function() {
    if (confirm('Are you sure you want to create a new file? Unsaved changes will be lost.')) {
        // Clear the editor for a new file
        codeEditor.value = '';
        outputBox.textContent = 'Output will appear here...';
    }
});

// Handle the "Save File" button
document.getElementById('saveFile')?.addEventListener('click', function() {
    const fileName = prompt('Enter a name for your file:', 'code.txt');
    if (fileName) {
        const blob = new Blob([codeEditor.value], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        alert('File saved as ' + fileName);
    }
});

// Handle the "Open File" button
document.getElementById('openFile')?.addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.js,.html,.css,.c'; // Add accepted file types
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                codeEditor.value = e.target.result;
            };
            reader.readAsText(file);
        }
    };
    input.click();
});

// Handle the "Delete File" button
document.getElementById('deleteFile')?.addEventListener('click', function() {
    if (confirm('Are you sure you want to delete the current file?')) {
        // Clear the editor
        codeEditor.value = '';
        outputBox.textContent = 'Output will appear here...';
    }
});

// Handle the "Run Code" button
document.getElementById('runCode')?.addEventListener('click', function() {
    runCode(); // Call the runCode function
});

// Handle the "Download ZIP" button
document.getElementById('downloadCode')?.addEventListener('click', function() {
    const zip = new JSZip();
    const fileName = prompt('Enter a name for your ZIP file:', 'code.zip');
    if (fileName) {
        zip.file('code.txt', codeEditor.value); // Add the current code to the ZIP
        zip.generateAsync({ type: 'blob' }).then(function(content) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = fileName;
            link.click();
            alert('ZIP file downloaded as ' + fileName);
        });
    }
});

// Function to simulate running code
function runCode() {
    const code = document.getElementById('codeEditor').value;
    const outputBox = document.getElementById('output');

    // Simple logic to simulate output based on the code entered
    if (code.trim().length === 0) {
        outputBox.innerHTML = "<p style='color: red;'>Please enter some code!</p>";
    } else if (code.includes("print") || code.includes("System.out.println")) {
        // Simulate output for Python or Java
        let output = "Simulated Output: ";
        const match = code.match(/"(.*?)"/);
        if (match) {
            output += match[1];
        } else {
            output += "No output found.";
        }
        outputBox.innerHTML = `<p style='color: green;'>${output}</p>`;
    } else if (code.toLowerCase().includes("python")) {
        outputBox.innerHTML = "<p style='color: green;'>Python Code Detected!</p>";
    } else if (code.toLowerCase().includes("java")) {
        outputBox.innerHTML = "<p style='color: green;'>Java Code Detected!</p>";
    } else if (code.toLowerCase().includes("c++")) {
        outputBox.innerHTML = "<p style='color: green;'>C++ Code Detected!</p>";
    } else if (code.toLowerCase().includes("c")) {
        outputBox.innerHTML = "<p style='color: green;'>C Code Detected!</p>";
    } else {
        outputBox.innerHTML = "<p style='color: blue;'>Code detected, but no specific action taken!</p>";
    }
}

// Core script for jsTableBuilder standalone demo
// This script handles drag-and-drop, file reading, CSV/JSON parsing, sample data, and rendering tables using the TableBuilder library loaded via CDN.

const dropZone = document.getElementById('dropZone');
const fileSelector = document.getElementById('fileSelector');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const jsonTextarea = document.getElementById('jsonTextarea');
const renderJsonBtn = document.getElementById('renderJsonBtn');
const clearJsonBtn = document.getElementById('clearJsonBtn');
const loadEsgBtn = document.getElementById('loadEsgBtn');
const loadEmployeesBtn = document.getElementById('loadEmployeesBtn');
const statusAlert = document.getElementById('statusAlert');
const tableRoot = document.getElementById('table-root');

// Sample Backup Datasets
const sampleEsgData = [
    { id: "ESG-101", facility: "Plant Alpha", carbonEmissions_MT: 1250.45, energyUse_kWh: 450000, renewableRatio: "65%", status: "Verified", auditDate: "2026-01-15" },
    { id: "ESG-102", facility: "Plant Beta", carbonEmissions_MT: 890.12, energyUse_kWh: 320000, renewableRatio: "80%", status: "Verified", auditDate: "2026-02-01" },
    { id: "ESG-103", facility: "Logistics Hub North", carbonEmissions_MT: 2100.80, energyUse_kWh: 610000, renewableRatio: "45%", status: "Pending Audit", auditDate: "2026-02-18" },
    { id: "ESG-104", facility: "Solar Park East", carbonEmissions_MT: 45.20, energyUse_kWh: 950000, renewableRatio: "100%", status: "Verified", auditDate: "2026-02-20" },
    { id: "ESG-105", facility: "HQ Tech Campus", carbonEmissions_MT: 310.60, energyUse_kWh: 180000, renewableRatio: "90%", status: "Verified", auditDate: "2026-02-21" }
];

const sampleEmployeeData = [
    { empId: 1001, name: "Srinivas K", department: "Engineering", role: "Lead Architect", city: "Bengaluru", salary: 145000 },
    { empId: 1002, name: "Ananya Sharma", department: "Data Science", role: "Senior Analyst", city: "Hyderabad", salary: 120000 },
    { empId: 1003, name: "Rahul Verma", department: "Product", role: "Product Manager", city: "Mumbai", salary: 135000 },
    { empId: 1004, name: "Priya Patel", department: "Design", role: "UX Lead", city: "Pune", salary: 115000 },
    { empId: 1005, name: "Vikram Reddy", department: "Engineering", role: "DevOps Engineer", city: "Bengaluru", salary: 128000 }
];

function autoGenerateColumns(data) {
    if (!Array.isArray(data) || data.length === 0) return [];
    const keys = Object.keys(data[0] || {}).filter(k => k !== '$serial');
    return keys.map(k => ({
        header: k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        dataKey: k,
        options: { sortable: true, table: { isVisible: true } }
    }));
}

function showStatus(msg, isError = false) {
    statusAlert.classList.remove('hidden', 'bg-red-50', 'text-red-700', 'bg-blue-50', 'text-blue-700');
    statusAlert.classList.add(isError ? 'bg-red-50' : 'bg-blue-50', isError ? 'text-red-700' : 'text-blue-700');
    statusAlert.textContent = msg;
}

// CSV Parser Utility
function parseCSV(text) {
    const lines = text.trim().split(/\r\n|\n/);
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
    return lines.slice(1).filter(l => l.trim()).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        const obj = {};
        headers.forEach((h, i) => {
            const raw = values[i] || '';
            const num = Number(raw);
            obj[h] = (!isNaN(num) && raw !== '') ? num : raw;
        });
        return obj;
    });
}

function renderTable(data, fileName = "Data") {
    try {
        tableRoot.innerHTML = '';
        tableRoot.classList.remove('flex', 'flex-col', 'items-center', 'justify-center', 'min-h-[240px]', 'text-gray-400', 'border-dashed');

        const TableBuilderClass = (window.ks && window.ks.TableBuilder);
        if (!TableBuilderClass) {
            throw new Error("TableBuilder library is not loaded.");
        }

        const columns = autoGenerateColumns(data);

        const tableBuilder = new TableBuilderClass({
            htmlId: "table-root",
            data: data,
            columns: columns,
            tableOptions: {
                commonOptions: { tableWidth: "100%", showSerialNo: true },
                footOptions: { showFooter: true }
            },
            topHeader: { show: true, label: `${fileName} (${data.length} records)`, placeholder: "Filter or search records..." }
        });

        tableBuilder.appendToDom();
        showStatus(`Successfully rendered ${data.length} records from "${fileName}".`);
    } catch (err) {
        console.error("Error rendering table:", err);
        showStatus(`Failed to render table: ${err.message}`, true);
    }
}

// Drag & Drop Handlers
dropZone.addEventListener('click', () => fileSelector.click());

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('border-blue-500', 'bg-blue-50');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-blue-500', 'bg-blue-50');
});

dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-5', 'bg-blue-50');
    if (e.dataTransfer.files.length > 0) {
        processSelectedFile(e.dataTransfer.files[0]);
    }
});

fileSelector.addEventListener('change', e => {
    if (e.target.files.length > 0) {
        processSelectedFile(e.target.files[0]);
    }
});

function processSelectedFile(file) {
    fileNameDisplay.textContent = `Selected: ${file.name}`;
    fileNameDisplay.classList.remove('hidden');
    showStatus(`Reading "${file.name}"...`);

    const reader = new FileReader();
    reader.onload = evt => {
        try {
            let parsedData;
            if (file.name.endsWith('.csv')) {
                parsedData = parseCSV(evt.target.result);
            } else {
                const json = JSON.parse(evt.target.result);
                parsedData = Array.isArray(json) ? json : (json.data || json.records || [json]);
            }
            if (!Array.isArray(parsedData) || parsedData.length === 0) {
                throw new Error("File contains no array data.");
            }
            renderTable(parsedData, file.name);
        } catch (err) {
            showStatus(`Error reading file: ${err.message}`, true);
        }
    };
    reader.readAsText(file);
}

function processPastedJson() {
    const rawText = jsonTextarea.value.trim();
    if (!rawText) {
        showStatus("Please paste a JSON array into the textarea.", true);
        return;
    }
    try {
        const parsed = JSON.parse(rawText);
        const data = Array.isArray(parsed) ? parsed : (parsed.data || parsed.records || [parsed]);
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("JSON must be an array of objects.");
        }
        renderTable(data, "Pasted JSON Data");
    } catch (err) {
        showStatus(`Invalid JSON: ${err.message}`, true);
    }
}

renderJsonBtn.addEventListener('click', processPastedJson);
clearJsonBtn.addEventListener('click', () => { jsonTextarea.value = ''; });

loadEsgBtn.addEventListener('click', () => renderTable(sampleEsgData, "Sample ESG Data"));
loadEmployeesBtn.addEventListener('click', () => renderTable(sampleEmployeeData, "Employee Dataset"));

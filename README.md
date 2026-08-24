# jsTableBuilder Standalone

> A lightweight, standalone JavaScript table viewer for converting raw JSON arrays and CSV data into interactive HTML tables.

## 🚀 Live Demo

**GitHub Pages:**  
https://tech-solomanu.github.io/test_js_builder/

---

## 📋 Features

### 📂 Instant File Import

Select or drag & drop a supported file directly into the application.

Supported formats:

- `.json`
- `.csv`
- `.txt`

JSON files can contain:

- A JSON array
- An object containing a `data` array
- An object containing a `records` array
- A single JSON object

---

### 📝 Raw JSON Paste

Paste a JSON array directly into the textarea without creating a file.

Example:

```json
[
    {
        "id": 101,
        "name": "Product A",
        "price": 29.99,
        "status": "Available"
    },
    {
        "id": 102,
        "name": "Product B",
        "price": 49.99,
        "status": "In Stock"
    }
]
````

Click **Render Pasted JSON** to instantly display the data as an interactive table.

---

### ⚡ Sample Datasets

The application includes built-in datasets for quick testing.

Available samples:

* **Sample ESG Data**
* **Sample Employee Dataset**

These can be loaded without uploading an external file.

---

### 🔄 Automatic Column Detection

Columns are generated automatically from the keys of the input data.

There is no requirement for a manual `config.json`.

For example:

```json
{
    "empId": 1001,
    "firstName": "Srinivas",
    "department": "Engineering"
}
```

Automatically generates columns such as:

* Emp Id
* First Name
* Department

Column names are formatted from camelCase, snake_case, and hyphen-separated keys into readable headers.

---

### 🔍 Search & Sort

The generated table supports:

* Global search/filter
* Column sorting
* Auto-incrementing serial numbers
* Record count
* Dynamically generated columns

---

### 🧩 Standalone Runtime

The project is designed to work as a simple standalone web application.

The table engine is loaded through the `tableBuilder.js` runtime, while `app.js` handles:

* File selection
* Drag & drop
* JSON parsing
* CSV parsing
* Sample data
* Table rendering
* Status messages

---

## 📁 Repository Structure

```text
jsTableBuilder/
│
├── index.html              # Main web viewer interface
├── howtodo.html            # User guide / How to Use page
├── app.js                  # Application logic and data processing
├── tableBuilder.js         # TableBuilder engine
├── .nojekyll               # GitHub Pages static asset bypass
└── README.md               # Project documentation
```

---

## 🛠️ How to Use

### 1. Open the Application

Open the live demo:

[https://tech-solomanu.github.io/test_js_builder/](https://tech-solomanu.github.io/test_js_builder/)

---

### 2. Upload a File

Click the file upload area and select a JSON, CSV, or TXT file.

The application automatically reads and processes the file.

---

### 3. Drag & Drop

You can also drag a supported file from your computer and drop it into the upload area.

The table will be rendered automatically after the file is processed.

---

### 4. Paste JSON

Alternatively, paste a JSON array into the **Paste Raw JSON Array** textarea.

Then click:

**🚀 Render Pasted JSON**

---

### 5. Try Sample Data

Use either of the built-in sample buttons:

* ⚡ Sample ESG Data
* 📁 Sample Employee Dataset

These are useful for testing the table without uploading a file.

---

## 📄 Supported JSON Formats

### JSON Array

```json
[
    {
        "id": 1,
        "name": "Item A"
    },
    {
        "id": 2,
        "name": "Item B"
    }
]
```

### JSON Object with `data`

```json
{
    "data": [
        {
            "id": 1,
            "name": "Item A"
        },
        {
            "id": 2,
            "name": "Item B"
        }
    ]
}
```

### JSON Object with `records`

```json
{
    "records": [
        {
            "id": 1,
            "name": "Item A"
        },
        {
            "id": 2,
            "name": "Item B"
        }
    ]
}
```

### Single JSON Object

```json
{
    "id": 1,
    "name": "Item A",
    "status": "Available"
}
```

---

## 📊 CSV Format

The first row should contain the column headers.

Example:

```csv
id,name,department,salary
1001,Srinivas K,Engineering,145000
1002,Ananya Sharma,Data Science,120000
1003,Rahul Verma,Product,135000
```

The application automatically converts the CSV rows into objects and generates the table columns.

---

## 💻 Quick Usage Example

The `tableBuilder.js` engine can also be used directly:

```html
<script src="./tableBuilder.js"></script>

<div id="table-root"></div>

<script>
    const data = [
        {
            id: 101,
            name: "Product A",
            price: 29.99,
            status: "Available"
        },
        {
            id: 102,
            name: "Product B",
            price: 49.99,
            status: "In Stock"
        }
    ];

    const columns = Object.keys(data[0]).map(key => ({
        header: key,
        dataKey: key,
        options: {
            sortable: true,
            table: {
                isVisible: true
            }
        }
    }));

    const tableBuilder = new window.ks.TableBuilder({
        htmlId: "table-root",
        data: data,
        columns: columns,
        tableOptions: {
            commonOptions: {
                tableWidth: "100%",
                showSerialNo: true
            },
            footOptions: {
                showFooter: true
            }
        },
        topHeader: {
            show: true,
            label: `Products (${data.length} records)`,
            placeholder: "Filter or search records..."
        }
    });

    tableBuilder.appendToDom();
</script>
```

---

## 🔧 Application Flow

```text
User Input
    │
    ├── JSON File
    │
    ├── CSV File
    │
    ├── TXT File
    │
    ├── Drag & Drop
    │
    ├── Pasted JSON
    │
    └── Sample Dataset
            │
            ▼
       Data Parsing
            │
            ▼
   Automatic Column Detection
            │
            ▼
      TableBuilder Engine
            │
            ▼
     Interactive HTML Table
```

---

## 🧠 Main Components

### `index.html`

Provides the main user interface, including:

* File upload area
* Drag & drop area
* JSON textarea
* Render button
* Sample dataset buttons
* Status messages
* Table container
* Link to the How to Use page

---

### `app.js`

Handles the application logic.

Responsibilities include:

* File selection
* Drag & drop events
* File reading
* JSON parsing
* CSV parsing
* Automatic column generation
* Sample datasets
* Table rendering
* Error handling
* Status notifications

---

### `tableBuilder.js`

Contains the core `TableBuilder` engine responsible for generating the interactive table.

---

### `howtodo.html`

Provides a dedicated user guide explaining:

* Supported file formats
* File upload
* Drag & drop
* JSON paste
* Sample datasets
* Automatic column generation
* Search and sorting
* JSON structure
* CSV structure
* Basic application workflow

---

## ⚠️ Error Handling

The application displays an error message when:

* Invalid JSON is provided
* The uploaded file cannot be parsed
* The file contains no usable data
* The TableBuilder engine is unavailable

Example:

```text
Invalid JSON: Unexpected token...
```

---

## 🌐 GitHub Pages

The project can be hosted directly using GitHub Pages because it is a static web application.

No backend server is required.

### Deployment

1. Push the project to GitHub.
2. Open the repository's **Settings**.
3. Go to **Pages**.
4. Select the required branch.
5. Select the root folder.
6. Save the configuration.
7. Open the generated GitHub Pages URL.

---

## 📌 Project Goal

The goal of this project is to provide a simple way to preview raw JSON and CSV data as interactive HTML tables without requiring users to manually configure table columns.

The application automatically detects the structure of the input data and renders it using the `TableBuilder` engine.

---

## 📜 License

This project is intended for demonstration and development purposes.


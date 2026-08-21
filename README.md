# jsTableBuilder Standalone

> A lightweight, zero-dependency JavaScript table builder for converting raw JSON arrays and CSV data into interactive HTML tables.

## 🚀 Live Demo
- **GitHub Pages:** [https://tech-solomanu.github.io/test_js_builder/](https://tech-solomanu.github.io/test_js_builder/)

## 📋 Features
- **Instant File Import:** Select or drag & drop any raw JSON or CSV file.
- **Raw JSON Paste Input:** Directly paste raw JSON arrays into the text area to render dynamic tables instantly.
- **Automatic Column Detection:** Auto-detects data keys and formats headers, alignment, and sorting options without requiring a manual `config.json`.
- **Search & Sort:** Built-in global search filter, column header sorting, and auto-incrementing serial numbers.
- **Standalone Runtime:** Driven by a single self-contained `tableBuilder.js` engine without complex module dependencies.

## 📁 Repository Structure
```text
├── index.html         # Main web viewer interface
├── tableBuilder.js    # Self-contained table builder engine
├── .nojekyll          # GitHub Pages static asset bypass
└── README.md          # Project documentation
```

## 🛠️ Quick Usage Example
```html
<script src="./tableBuilder.js"></script>

<div id="table-root"></div>

<script>
  const data = [
    { id: 101, name: "Product A", price: 29.99, status: "Available" },
    { id: 102, name: "Product B", price: 49.99, status: "In Stock" }
  ];

  const tableBuilder = new window.ks.TableBuilder({
    htmlId: "table-root",
    data: data,
    tableOptions: {
      commonOptions: { showSerialNo: true }
    }
  });

  tableBuilder.appendToDom();
</script>
```

const markdownInput = document.getElementById('markdown-input');
const htmlPreview = document.getElementById('html-preview');
const downloadBtn = document.getElementById('download-btn');

function convertMarkdownToHTML(markdown) {
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/!(.*?)(.*?)/gim, "<img alt='$1' src='$2' />")
    .replace(/(.*?)(.*?)/gim, "<a href='$2' target='_blank'>$1</a>")
    .replace(/\n$/gim, '<br />');
}

markdownInput.addEventListener('input', () => {
  const markdown = markdownInput.value;
  const html = convertMarkdownToHTML(markdown);
  htmlPreview.innerHTML = html;
});

downloadBtn.addEventListener('click', () => {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Converted HTML</title></head>
<body>${htmlPreview.innerHTML}</body></html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'converted.html';
  a.click();
  URL.revokeObjectURL(url);
});


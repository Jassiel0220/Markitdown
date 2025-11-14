from flask import Flask, request, render_template, send_file
import os
import tempfile
from werkzeug.utils import secure_filename
from markitdown import MarkItDown
from PIL import Image
import pytesseract

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

def convert_to_markdown(file_path, filename):
    """Convert file to markdown using Microsoft's MarkItDown with OCR fallback"""
    try:
        md = MarkItDown()
        result = md.convert(file_path)
        
        # If result is empty or very short for images, try OCR fallback
        if result.text_content.strip() == "" or (len(result.text_content.strip()) < 10 and filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'))):
            return ocr_fallback(file_path, filename)
        
        return result.text_content
    except Exception as e:
        # Try OCR fallback for images
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff')):
            return ocr_fallback(file_path, filename)
        
        # Fallback for other unsupported files
        return f"# {os.path.splitext(filename)[0]}\n\n> **Error:** Could not convert this file type.\n> \n> Error: {str(e)}\n> File type: `{os.path.splitext(filename)[1]}`"

def ocr_fallback(file_path, filename):
    """OCR fallback using pytesseract"""
    try:
        image = Image.open(file_path)
        text = pytesseract.image_to_string(image)
        
        if text.strip():
            return f"# {os.path.splitext(filename)[0]}\n\n## Extracted Text (OCR)\n\n{text.strip()}"
        else:
            return f"# {os.path.splitext(filename)[0]}\n\n> **Note:** No text could be extracted from this image."
    except Exception as e:
        return f"# {os.path.splitext(filename)[0]}\n\n> **Error:** OCR failed.\n> \n> Error: {str(e)}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'files' not in request.files:
        return 'No files selected', 400
    
    files = request.files.getlist('files')
    if not files or all(f.filename == '' for f in files):
        return 'No files selected', 400
    
    markdown_files = []
    
    for file in files:
        if file.filename == '':
            continue
            
        filename = secure_filename(file.filename)
        
        # Create temp file and save uploaded file
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        temp_file.close()
        file.save(temp_file.name)
        
        try:
            markdown_content = convert_to_markdown(temp_file.name, filename)
        finally:
            os.unlink(temp_file.name)
        
        # Save markdown file
        md_filename = os.path.splitext(filename)[0] + '.md'
        md_path = os.path.join(tempfile.gettempdir(), md_filename)
        
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        markdown_files.append((md_path, md_filename))
    
    if len(markdown_files) == 1:
        return send_file(markdown_files[0][0], as_attachment=True, download_name=markdown_files[0][1])
    else:
        # Create ZIP file for multiple files
        import zipfile
        zip_path = os.path.join(tempfile.gettempdir(), 'converted_files.zip')
        
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            for file_path, file_name in markdown_files:
                zipf.write(file_path, file_name)
        
        return send_file(zip_path, as_attachment=True, download_name='converted_files.zip')

if __name__ == '__main__':
    app.run(debug=True, port=5001)

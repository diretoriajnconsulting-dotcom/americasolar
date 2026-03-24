import PyPDF2

try:
    with open('CNPJ SOLAR AMÉRICA ATUALIZADO.pdf', 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text() + '\n'
        print(text)
except Exception as e:
    print(f"Error: {e}")

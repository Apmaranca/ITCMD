import os

def gerar_index_por_estado(normas_path):
    for estado in os.listdir(normas_path):
        estado_path = os.path.join(normas_path, estado)
        if os.path.isdir(estado_path):
            arquivos = [arq for arq in os.listdir(estado_path) if arq.endswith(".html") and arq != "index.html"]
            with open(os.path.join(estado_path, "index.html"), "w", encoding="utf-8") as f:
                f.write(f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Legislação ITCMD - {estado.upper()}</title>
</head>
<body>
    <h1>Legislação do ITCMD - {estado.upper()}</h1>
    <p>Documentos disponíveis:</p>
    <ul>\n""")
                for doc in arquivos:
                    f.write(f'        <li><a href="{doc}">{doc}</a></li>\n')
                f.write("""    </ul>
    <p><a href="../../index.html">Voltar à página principal</a></p>
</body>
</html>""")

def gerar_index_geral(normas_path):
    estados = sorted([d for d in os.listdir(normas_path) if os.path.isdir(os.path.join(normas_path, d))])
    with open(os.path.join(normas_path, "index.html"), "w", encoding="utf-8") as f:
        f.write("""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Índice de Estados - Legislação ITCMD</title>
</head>
<body>
    <h1>Legislação do ITCMD por Estado</h1>
    <ul>\n""")
        for estado in estados:
            f.write(f'        <li><a href="{estado}/index.html">{estado.upper()}</a></li>\n')
        f.write("""    </ul>
    <p><a href="../index.html">Voltar à página principal</a></p>
</body>
</html>""")

# Caminho relativo ao repositório clonado localmente
normas_dir = "./normas"
gerar_index_por_estado(normas_dir)
gerar_index_geral(normas_dir)

# ITCMD Brasil - Legislação e Comparativos

Este repositório contém um site completo sobre a legislação do Imposto sobre Transmissão Causa Mortis e Doação de Quaisquer Bens ou Direitos (ITCMD) no Brasil, incluindo a legislação federal e as legislações específicas de cada estado.

## Estrutura do Repositório

- **`/`**: Arquivos HTML, CSS e JavaScript do site
- **`/css/`**: Estilos CSS do site
- **`/js/`**: Scripts JavaScript do site
- **`/estados/`**: Páginas HTML específicas para cada estado
- **`/src/`**: Código fonte para geração do site
- **`/original_markdown/`**: Arquivos markdown originais com a legislação compilada

## Conteúdo

O site apresenta:

- **Legislação Federal**: Constituição Federal (Art. 155), Resolução do Senado Federal nº 9/1992, Código Tributário Nacional
- **Legislação Estadual**: Documentação completa da legislação sobre ITCMD de todos os 27 estados brasileiros
- **Quadros Comparativos**: Tabelas comparativas das principais características do ITCMD nos diferentes estados

## Tecnologias Utilizadas

- HTML5
- CSS3 (Bootstrap)
- JavaScript
- Node.js (para geração do site)

## Como Executar Localmente

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Para reconstruir o site a partir dos arquivos markdown:
   ```
   npm run build
   ```
4. Para visualizar o site localmente:
   ```
   cd public
   python -m http.server 8080
   ```
5. Acesse `http://localhost:8080` no seu navegador

## Site Público

O site está disponível publicamente em: [https://seeehlct.manus.space](https://seeehlct.manus.space)

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contribuições

Contribuições são bem-vindas! Se você identificar informações desatualizadas ou incorretas, ou quiser adicionar novas informações, sinta-se à vontade para abrir um pull request.

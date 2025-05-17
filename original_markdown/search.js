// Script para funcionalidade de busca no site

document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const searchForm = document.querySelector('form.form-inline');
  const searchInput = document.getElementById('searchInput');
  const contentDiv = document.querySelector('.content');
  
  // Dados para busca (serão carregados sob demanda)
  let searchData = null;
  
  // Função para carregar os dados de busca
  const loadSearchData = async () => {
    if (searchData === null) {
      try {
        const response = await fetch('/search-data.json');
        searchData = await response.json();
        console.log('Dados de busca carregados com sucesso');
      } catch (error) {
        console.error('Erro ao carregar dados de busca:', error);
        searchData = { pages: [] };
      }
    }
    return searchData;
  };
  
  // Função para realizar a busca
  const performSearch = async (query) => {
    // Normalizar a consulta (remover acentos, converter para minúsculas)
    const normalizedQuery = query.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    
    // Carregar dados de busca
    const data = await loadSearchData();
    
    // Filtrar páginas que contêm a consulta
    const results = data.pages.filter(page => {
      const normalizedContent = page.content.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      
      const normalizedTitle = page.title.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      
      return normalizedContent.includes(normalizedQuery) || 
             normalizedTitle.includes(normalizedQuery);
    });
    
    return results;
  };
  
  // Função para destacar termos de busca no texto
  const highlightText = (text, query) => {
    if (!query || query.trim() === '') return text;
    
    const normalizedQuery = query.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    
    const normalizedText = text.normalize('NFD');
    
    // Encontrar índices onde o termo de busca aparece
    let startIndex = normalizedText.toLowerCase().indexOf(normalizedQuery);
    if (startIndex === -1) return text;
    
    // Extrair um trecho do texto ao redor do termo encontrado
    let start = Math.max(0, startIndex - 50);
    let end = Math.min(text.length, startIndex + normalizedQuery.length + 100);
    
    // Ajustar para não cortar palavras
    while (start > 0 && text[start] !== ' ') start--;
    while (end < text.length && text[end] !== ' ') end++;
    
    let excerpt = text.substring(start, end);
    
    // Adicionar reticências se necessário
    if (start > 0) excerpt = '...' + excerpt;
    if (end < text.length) excerpt = excerpt + '...';
    
    // Destacar o termo de busca
    const regex = new RegExp(normalizedQuery, 'gi');
    return excerpt.replace(regex, match => `<span class="search-highlight">${match}</span>`);
  };
  
  // Função para exibir resultados da busca
  const displaySearchResults = (results, query) => {
    // Criar elemento para resultados
    const searchResultsDiv = document.createElement('div');
    searchResultsDiv.className = 'search-results';
    
    // Adicionar título dos resultados
    const resultsTitle = document.createElement('h2');
    resultsTitle.textContent = `Resultados da busca por "${query}" (${results.length} encontrados)`;
    searchResultsDiv.appendChild(resultsTitle);
    
    if (results.length === 0) {
      // Mensagem para nenhum resultado
      const noResults = document.createElement('p');
      noResults.textContent = 'Nenhum resultado encontrado. Tente outros termos de busca.';
      searchResultsDiv.appendChild(noResults);
    } else {
      // Listar resultados
      results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        
        const resultTitle = document.createElement('h3');
        const resultLink = document.createElement('a');
        resultLink.href = result.url;
        resultLink.textContent = result.title;
        resultTitle.appendChild(resultLink);
        resultItem.appendChild(resultTitle);
        
        const resultExcerpt = document.createElement('p');
        resultExcerpt.innerHTML = highlightText(result.content, query);
        resultItem.appendChild(resultExcerpt);
        
        searchResultsDiv.appendChild(resultItem);
      });
    }
    
    // Adicionar botão para limpar resultados
    const clearButton = document.createElement('button');
    clearButton.className = 'btn btn-secondary mt-3';
    clearButton.textContent = 'Limpar resultados';
    clearButton.addEventListener('click', () => {
      // Remover resultados e restaurar conteúdo original
      searchResultsDiv.remove();
      if (window.originalContent) {
        contentDiv.innerHTML = window.originalContent;
        window.originalContent = null;
      }
    });
    searchResultsDiv.appendChild(clearButton);
    
    // Salvar conteúdo original e exibir resultados
    if (!window.originalContent) {
      window.originalContent = contentDiv.innerHTML;
    }
    contentDiv.innerHTML = '';
    contentDiv.appendChild(searchResultsDiv);
    
    // Rolar para o topo
    window.scrollTo(0, 0);
  };
  
  // Manipulador de evento para o formulário de busca
  if (searchForm) {
    searchForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const query = searchInput.value.trim();
      if (query === '') return;
      
      // Realizar busca
      const results = await performSearch(query);
      
      // Exibir resultados
      displaySearchResults(results, query);
    });
  }
});

// Aqui você pode adicionar funções úteis para o aprendizado de idiomas
// como detectar idioma, analisar erros comuns, etc.

function detectLanguage(text) {
  // Implementação simplificada - considere usar uma biblioteca como franc para detecção real
  const englishWords = ['the', 'and', 'you', 'that', 'have'];
  const spanishWords = ['el', 'la', 'que', 'y', 'en'];
  
  const enCount = englishWords.filter(word => text.toLowerCase().includes(word)).length;
  const esCount = spanishWords.filter(word => text.toLowerCase().includes(word)).length;
  
  if (enCount > esCount) return 'english';
  if (esCount > enCount) return 'spanish';
  return 'portuguese'; // padrão
}

module.exports = {
  detectLanguage
};
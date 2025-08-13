const deepseekAPI = require('./deepseekAPI');
const languageUtils = require('./languageUtils');

async function handleMessage(client, msg) {
  const userMessage = msg.body;
  const sender = msg.from;
  
  try {
    // Verifica se a mensagem é um comando especial
    if (userMessage.startsWith('!')) {
      return handleCommand(client, msg);
    }
    
    // Se não for comando, processa como prática de idioma
    const response = await processLanguageLearning(sender, userMessage);
    await client.sendMessage(msg.from, response);
  } catch (error) {
    console.error('Error handling message:', error);
    await client.sendMessage(msg.from, 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.');
  }
}

async function handleCommand(client, msg) {
  const command = msg.body.split(' ')[0].toLowerCase();
  const args = msg.body.split(' ').slice(1).join(' ');
  
  switch(command) {
    case '!ajuda':
      return showHelpMenu(client, msg);
    case '!idioma':
      return setLanguagePreference(client, msg, args);
    case '!nivel':
      return setProficiencyLevel(client, msg, args);
    default:
      return client.sendMessage(msg.from, 'Comando não reconhecido. Digite !ajuda para ver os comandos disponíveis.');
  }
}

async function processLanguageLearning(sender, message) {
  // Aqui você pode adicionar lógica para verificar o progresso do usuário
  // e ajustar as respostas conforme o nível de proficiência
  
  // Chama a API do DeepSeek para gerar uma resposta educativa
  const prompt = `Atue como um tutor de idiomas. O aluno enviou a seguinte mensagem para prática: "${message}". 
  Forneça uma resposta educativa que: 
  1. Corrija gentilmente quaisquer erros 
  2. Explique conceitos gramaticais relevantes 
  3. Ofereça alternativas mais naturais 
  4. Inclua exemplos adicionais 
  5. Mantenha um tom encorajador`;
  
  return await deepseekAPI.generateResponse(prompt);
}

async function showHelpMenu(client, msg) {
  const helpText = `📚 *Menu de Ajuda* 📚
  
  *Comandos disponíveis:*
  !ajuda - Mostra este menu
  !idioma [idioma] - Define o idioma que deseja praticar (ex: !idioma inglês)
  !nivel [básico|intermediário|avançado] - Define seu nível de proficiência
  
  *Como praticar:*
  Basta enviar mensagens no idioma que está aprendendo e receberá feedback e explicações.`;
  
  await client.sendMessage(msg.from, helpText);
}

async function setLanguagePreference(client, msg, language) {
  // Aqui você implementaria a lógica para salvar a preferência no banco de dados
  await client.sendMessage(msg.from, `Ótimo! Vamos praticar ${language}. Envie mensagens nesse idioma para receber feedback.`);
}

async function setProficiencyLevel(client, msg, level) {
  // Implemente a lógica para salvar o nível no banco de dados
  await client.sendMessage(msg.from, `Seu nível foi definido como ${level}. Vou adaptar minhas respostas de acordo.`);
}

module.exports = handleMessage;
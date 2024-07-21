chrome.runtime.onMessage.addListener((message) => {
  const { url, format } = message;
  fetch('http://localhost:3000/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url, format })
  })
  .then(response => response.text()) 
  .then(text => {
    try {
      const data = JSON.parse(text);
      console.log('Download iniciado:', data);
    } catch (error) {
      console.error('Erro ao processar JSON:', error);
      console.log('Resposta bruta:', text);
    }
  })
  .catch(error => console.error('Erro:', error));
});

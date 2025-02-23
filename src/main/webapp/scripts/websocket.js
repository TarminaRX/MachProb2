const setupHotReload = () => {
  const socket = new WebSocket(`ws://localhost:8080/WebReload/`);
  
  socket.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === 'reload') {
          location.reload();
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  });
  
  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed. Attempting to reconnect...');
    setTimeout(setupHotReload, 1000);
  });
  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });
};

document.addEventListener('DOMContentLoaded', () => {
    setupHotReload();
});

const sendMessage = async (from: string, to: string, message: string) => {

  try{

    const socket = new WebSocket('ws://localhost:8080/send-message', from);

    const body = {
      from: from,
      to: to,
      message: message
    }
    
    socket.send(JSON.stringify(body));

  } catch (error){

    return -1;

  }
  
}
 
export default sendMessage;
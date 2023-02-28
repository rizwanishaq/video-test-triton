const inferenceRequest = require("../img_prc_service/ImageProcess");

const processWebSocket = (ws) => {
  ws.on("message", async (data) => {
    if (data.length > 6) {
      const image = data.toString().split(",")[1];
      const { output_image } = await inferenceRequest(image);

      try {
        ws.send(
          JSON.stringify({
            image: output_image.toString(),
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  });

  ws.on("close", () => {
    console.log("websocket connection close");
  });

  ws.on("error", () => {
    console.log("websocket close due to error");
    ws.close();
  });
};

module.exports = processWebSocket;

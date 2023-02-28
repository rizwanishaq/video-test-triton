const grpc = require("@grpc/grpc-js");
const fs = require("fs");
const path = require("path");

const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "proto", "grpc_service.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const identifierPackage = protoDescriptor.inference;
const client = new identifierPackage.GRPCInferenceService(
  "0.0.0.0:8001",
  grpc.credentials.createInsecure()
);

const inferenceRequest = (image) => {
  return new Promise((resolve, reject) => {
    const request = {
      model_name: "base64_model",
      inputs: [
        {
          name: "image",
          datatype: "BYTES",
          shape: [1],
          contents: {
            byte_contents: [Buffer.from(image)],
          },
        },
      ],
      outputs: [{ name: "output_image" }],
    };

    client.ModelInfer(request, (err, response) => {
      if (err) {
        console.log(err);
        return reject(`Error during request -> ${err}`);
      }
      output_image = response.raw_output_contents[0].toString("utf8", 4);
      return resolve({
        output_image,
      });
    });
  });
};

module.exports = inferenceRequest;

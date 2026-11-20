// ONNX Runtime 1.21 ships declarations but omits their conditional export.
// Both browser entry points implement the shared, published runtime contract.
declare module 'onnxruntime-web' { export * from 'onnxruntime-common'; }
declare module 'onnxruntime-web/wasm' { export * from 'onnxruntime-common'; }

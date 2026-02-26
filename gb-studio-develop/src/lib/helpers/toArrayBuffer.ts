const toArrayBuffer = (buf: Buffer): ArrayBuffer => {
  // Always return a concrete ArrayBuffer (not ArrayBufferLike) for strict TS consumers.
  const bytes = new Uint8Array(buf.length);
  bytes.set(buf);
  return bytes.buffer;
};

export default toArrayBuffer;

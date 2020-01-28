function writeHeaders(res, headers, other) {
  if (typeof other !== 'undefined') {
    res.writeHeader(headers, other.toString());
  } else {
    for (const n in headers) {
      res.writeHeader(n, headers[n].toString());
    }
  }
}

function extend(who, from, overwrite = true) {
  const ownProps = Object.getOwnPropertyNames(Object.getPrototypeOf(from)).concat(
    Object.keys(from)
  );
  ownProps.forEach(prop => {
    if (prop === 'constructor') return;
    if (who[prop] && overwrite) {
      who[`_${prop}`] = who[prop];
    }
    if (typeof from[prop] === 'function') who[prop] = from[prop].bind(who);
    else who[prop] = from[prop];
  });
}

function stob(stream) {
  return new Promise(resolve => {
    const buffers = [];
    stream.on('data', buffers.push.bind(buffers));

    stream.on('end', () => {
      switch (buffers.length) {
        case 0:
          resolve(Buffer.allocUnsafe(0));
          break;
        case 1:
          resolve(buffers[0]);
          break;
        default:
          resolve(Buffer.concat(buffers));
      }
    });
  });
}

module.exports = {
  writeHeaders,
  extend,
  stob
};

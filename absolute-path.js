/*
 * getAbsoluteFSPath
 * @return {string} When run in NodeJS env, returns the absolute path to the current directory
 *                  When run outside of NodeJS, will return an error message
 */
const getAbsoluteFSPath = function () {
  // detect whether we are running in a browser or nodejs
  if (typeof module !== "undefined" && module.exports) {
    const stack = new Error()
      .stack.split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("at "));
    const i1 = stack[0].indexOf("(");
    const i1b = stack[0].indexOf("/", (i1 > -1 ? i1 + 1 : "at ".length) + "webpack://".length) + 1;
    const i2 = stack[0].indexOf(":", i1 + "webpack://".length);
    return require("path").resolve(__dirname + "/../" + stack[0].substring(i1b, stack[0].lastIndexOf("/", i2)).replace(/\\/g, "/"))
  }
  throw new Error('getAbsoluteFSPath can only be called within a Nodejs environment');
}

module.exports = getAbsoluteFSPath

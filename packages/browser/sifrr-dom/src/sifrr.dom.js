let SifrrDOM = {};
SifrrDOM.elements = {};
SifrrDOM.Element = require('./dom/element');
SifrrDOM.Parser = require('./dom/parser');
SifrrDOM.makeEqual = require('./dom/makeequal');
SifrrDOM.Loader = require('./dom/loader');
SifrrDOM.register = function(Element) {
  Element.useShadowRoot = SifrrDOM.config.useShadowRoot;
  const name = Element.elementName;
  if (!name) {
    window.console.warn('Error creating Custom Element: No name given.', Element);
  } else if (window.customElements.get(name)) {
    window.console.warn(`Error creating Element: ${name} - Custom Element with this name is already defined.`);
  } else if (name.indexOf('-') < 1) {
    window.console.warn(`Error creating Element: ${name} - Custom Element name must have one dash '-'`);
  } else {
    try {
      window.customElements.define(name, Element);
      SifrrDOM.elements[name] = Element;
      return true;
    } catch (error) {
      window.console.warn(`Error creating Custom Element: ${name} - ${error}`);
      return false;
    }
  }
  return false;
};
SifrrDOM.addEvent = require('./dom/event');
SifrrDOM.setup = function(config) {
  SifrrDOM.config = Object.assign({
    baseUrl: '/',
    useShadowRoot: true
  }, config);
  SifrrDOM.addEvent('input');
  SifrrDOM.addEvent('change');
  window.document.$input = SifrrDOM.Parser.twoWayBind;
  window.document.$change = SifrrDOM.Parser.twoWayBind;
};
SifrrDOM.SimpleElement = require('./dom/simpleelement');
SifrrDOM.load = function(elemName, config = { baseUrl: SifrrDOM.config.baseUrl }) {
  let loader = new SifrrDOM.Loader(elemName, config);
  loader.executeScripts();
};

module.exports = SifrrDOM;
function noop() { return null; }

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.md'] = noop;

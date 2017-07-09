System.register("node_modules/preact/src/vnode", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /** Virtual DOM Node */
    function VNode(nodeName, attributes, children) {
        /** @type {string|function} */
        this.nodeName = nodeName;
        /** @type {object<string>|undefined} */
        this.attributes = attributes;
        /** @type {array<VNode>|undefined} */
        this.children = children;
        /** Reference to the given key. */
        this.key = attributes && attributes.key;
    }
    exports_1("VNode", VNode);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("node_modules/preact/src/options", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("default", {});
        }
    };
});
System.register("node_modules/preact/src/h", ["node_modules/preact/src/vnode", "node_modules/preact/src/options"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    /** JSX/hyperscript reviver
    *	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
     *	@see http://jasonformat.com/wtf-is-jsx
     *	@public
     *  @example
     *  /** @jsx h *\/
     *  import { render, h } from 'preact';
     *  render(<span>foo</span>, document.body);
     */
    function h(nodeName, attributes) {
        var children = [], lastSimple, child, simple, i;
        for (i = arguments.length; i-- > 2;) {
            stack.push(arguments[i]);
        }
        if (attributes && attributes.children) {
            if (!stack.length)
                stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) {
            if ((child = stack.pop()) instanceof Array) {
                for (i = child.length; i--;)
                    stack.push(child[i]);
            }
            else if (child != null && child !== false) {
                if (typeof child == 'number' || child === true)
                    child = String(child);
                simple = typeof child == 'string';
                if (simple && lastSimple) {
                    children[children.length - 1] += child;
                }
                else {
                    children.push(child);
                    lastSimple = simple;
                }
            }
        }
        var p = new vnode_1.VNode(nodeName, attributes || undefined, children);
        // if a "vnode hook" is defined, pass every created VNode to it
        if (options_1.default.vnode)
            options_1.default.vnode(p);
        return p;
    }
    exports_3("h", h);
    var vnode_1, options_1, stack;
    return {
        setters: [
            function (vnode_1_1) {
                vnode_1 = vnode_1_1;
            },
            function (options_1_1) {
                options_1 = options_1_1;
            }
        ],
        execute: function () {
            stack = [];
        }
    };
});
System.register("node_modules/preact/src/util", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    /** Copy own-properties from `props` onto `obj`.
     *	@returns obj
     *	@private
     */
    function extend(obj, props) {
        if (props) {
            for (var i in props)
                obj[i] = props[i];
        }
        return obj;
    }
    exports_4("extend", extend);
    /** Fast clone. Note: does not filter out non-own properties.
     *	@see https://esbench.com/bench/56baa34f45df6895002e03b6
     */
    function clone(obj) {
        return extend({}, obj);
    }
    exports_4("clone", clone);
    /** Get a deep property value from the given object, expressed in dot-notation.
     *	@private
     */
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) {
            obj = obj[p[i]];
        }
        return obj;
    }
    exports_4("delve", delve);
    /** @private is the given object a Function? */
    function isFunction(obj) {
        return 'function' === typeof obj;
    }
    exports_4("isFunction", isFunction);
    /** @private is the given object a String? */
    function isString(obj) {
        return 'string' === typeof obj;
    }
    exports_4("isString", isString);
    /** Convert a hashmap of CSS classes to a space-delimited className string
     *	@private
     */
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) {
            if (c[prop]) {
                if (str)
                    str += ' ';
                str += prop;
            }
        }
        return str;
    }
    exports_4("hashToClassName", hashToClassName);
    var lcCache, toLowerCase, resolved, defer;
    return {
        setters: [],
        execute: function () {
            /** Just a memoized String#toLowerCase */
            lcCache = {};
            exports_4("toLowerCase", toLowerCase = function (s) { return lcCache[s] || (lcCache[s] = s.toLowerCase()); });
            /** Call a function asynchronously, as soon as possible.
             *	@param {Function} callback
             */
            resolved = typeof Promise !== 'undefined' && Promise.resolve();
            exports_4("defer", defer = resolved ? (function (f) { resolved.then(f); }) : setTimeout);
        }
    };
});
System.register("node_modules/preact/src/clone-element", ["node_modules/preact/src/util", "node_modules/preact/src/h"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function cloneElement(vnode, props) {
        return h_1.h(vnode.nodeName, util_1.extend(util_1.clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    exports_5("cloneElement", cloneElement);
    var util_1, h_1;
    return {
        setters: [
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (h_1_1) {
                h_1 = h_1_1;
            }
        ],
        execute: function () {
        }
    };
});
// render modes
System.register("node_modules/preact/src/constants", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var NO_RENDER, SYNC_RENDER, FORCE_RENDER, ASYNC_RENDER, EMPTY, ATTR_KEY, NON_DIMENSION_PROPS, NON_BUBBLING_EVENTS;
    return {
        setters: [],
        execute: function () {// render modes
            exports_6("NO_RENDER", NO_RENDER = 0);
            exports_6("SYNC_RENDER", SYNC_RENDER = 1);
            exports_6("FORCE_RENDER", FORCE_RENDER = 2);
            exports_6("ASYNC_RENDER", ASYNC_RENDER = 3);
            exports_6("EMPTY", EMPTY = {});
            exports_6("ATTR_KEY", ATTR_KEY = typeof Symbol !== 'undefined' ? Symbol.for('preactattr') : '__preactattr_');
            // DOM properties that should NOT have "px" added when numeric
            exports_6("NON_DIMENSION_PROPS", NON_DIMENSION_PROPS = {
                boxFlex: 1, boxFlexGroup: 1, columnCount: 1, fillOpacity: 1, flex: 1, flexGrow: 1,
                flexPositive: 1, flexShrink: 1, flexNegative: 1, fontWeight: 1, lineClamp: 1, lineHeight: 1,
                opacity: 1, order: 1, orphans: 1, strokeOpacity: 1, widows: 1, zIndex: 1, zoom: 1
            });
            // DOM event types that do not bubble and should be attached via useCapture
            exports_6("NON_BUBBLING_EVENTS", NON_BUBBLING_EVENTS = { blur: 1, error: 1, focus: 1, load: 1, resize: 1, scroll: 1 });
        }
    };
});
System.register("node_modules/preact/src/linked-state", ["node_modules/preact/src/util"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    /** Create an Event handler function that sets a given state property.
     *	@param {Component} component	The component whose state should be updated
     *	@param {string} key				A dot-notated key path to update in the component's state
     *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
     *	@returns {function} linkedStateHandler
     *	@private
     */
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function (e) {
            var t = e && e.target || this, state = {}, obj = state, v = util_2.isString(eventPath) ? util_2.delve(e, eventPath) : t.nodeName ? (t.type.match(/^che|rad/) ? t.checked : t.value) : e, i = 0;
            for (; i < path.length - 1; i++) {
                obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            }
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    exports_7("createLinkedState", createLinkedState);
    var util_2;
    return {
        setters: [
            function (util_2_1) {
                util_2 = util_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("node_modules/preact/src/render-queue", ["node_modules/preact/src/options", "node_modules/preact/src/util", "node_modules/preact/src/vdom/component"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
            (options_2.default.debounceRendering || util_3.defer)(rerender);
        }
    }
    exports_8("enqueueRender", enqueueRender);
    function rerender() {
        var p, list = items;
        items = [];
        while ((p = list.pop())) {
            if (p._dirty)
                component_1.renderComponent(p);
        }
    }
    exports_8("rerender", rerender);
    var options_2, util_3, component_1, items;
    return {
        setters: [
            function (options_2_1) {
                options_2 = options_2_1;
            },
            function (util_3_1) {
                util_3 = util_3_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }
        ],
        execute: function () {
            /** Managed queue of dirty components to be re-rendered */
            // items/itemsOffline swap on each rerender() call (just a simple pool technique)
            items = [];
        }
    };
});
System.register("node_modules/preact/src/vdom/functional-component", ["node_modules/preact/src/constants", "node_modules/preact/src/vdom/index", "node_modules/preact/src/util"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    /** Check if a VNode is a reference to a stateless functional component.
     *	A function component is represented as a VNode whose `nodeName` property is a reference to a function.
     *	If that function is not a Component (ie, has no `.render()` method on a prototype), it is considered a stateless functional component.
     *	@param {VNode} vnode	A VNode
     *	@private
     */
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && util_4.isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    exports_9("isFunctionalComponent", isFunctionalComponent);
    /** Construct a resultant VNode from a VNode referencing a stateless functional component.
     *	@param {VNode} vnode	A VNode with a `nodeName` property that is a reference to a function.
     *	@private
     */
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(index_1.getNodeProps(vnode), context || constants_1.EMPTY);
    }
    exports_9("buildFunctionalComponent", buildFunctionalComponent);
    var constants_1, index_1, util_4;
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (util_4_1) {
                util_4 = util_4_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("node_modules/preact/src/vdom/index", ["node_modules/preact/src/util", "node_modules/preact/src/vdom/functional-component"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    /** Check if two nodes are equivalent.
     *	@param {Element} node
     *	@param {VNode} vnode
     *	@private
     */
    function isSameNodeType(node, vnode) {
        if (util_5.isString(vnode)) {
            return node instanceof Text;
        }
        if (util_5.isString(vnode.nodeName)) {
            return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        }
        if (util_5.isFunction(vnode.nodeName)) {
            return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : true) || functional_component_1.isFunctionalComponent(vnode);
        }
    }
    exports_10("isSameNodeType", isSameNodeType);
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || util_5.toLowerCase(node.nodeName) === util_5.toLowerCase(nodeName);
    }
    exports_10("isNamedNode", isNamedNode);
    /**
     * Reconstruct Component-style `props` from a VNode.
     * Ensures default/fallback values from `defaultProps`:
     * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
     * @param {VNode} vnode
     * @returns {Object} props
     */
    function getNodeProps(vnode) {
        var props = util_5.clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) {
            for (var i in defaultProps) {
                if (props[i] === undefined) {
                    props[i] = defaultProps[i];
                }
            }
        }
        return props;
    }
    exports_10("getNodeProps", getNodeProps);
    var util_5, functional_component_1;
    return {
        setters: [
            function (util_5_1) {
                util_5 = util_5_1;
            },
            function (functional_component_1_1) {
                functional_component_1 = functional_component_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("node_modules/preact/src/dom/index", ["node_modules/preact/src/constants", "node_modules/preact/src/options", "node_modules/preact/src/util"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    /** Removes a given DOM Node from its parent. */
    function removeNode(node) {
        var p = node.parentNode;
        if (p)
            p.removeChild(node);
    }
    exports_11("removeNode", removeNode);
    /** Set a named attribute on the given Node, with special behavior for some names and event handlers.
     *	If `value` is `null`, the attribute/handler will be removed.
     *	@param {Element} node	An element to mutate
     *	@param {string} name	The name/key to set, such as an event or attribute name
     *	@param {any} value		An attribute value, such as a function to be used as an event handler
     *	@param {any} previousValue	The last value that was set for this name/node pair
     *	@private
     */
    function setAccessor(node, name, old, value, isSvg) {
        if (name === 'className')
            name = 'class';
        if (name === 'class' && value && typeof value === 'object') {
            value = util_6.hashToClassName(value);
        }
        if (name === 'key') {
        }
        else if (name === 'class' && !isSvg) {
            node.className = value || '';
        }
        else if (name === 'style') {
            if (!value || util_6.isString(value) || util_6.isString(old)) {
                node.style.cssText = value || '';
            }
            if (value && typeof value === 'object') {
                if (!util_6.isString(old)) {
                    for (var i in old)
                        if (!(i in value))
                            node.style[i] = '';
                }
                for (var i in value) {
                    node.style[i] = typeof value[i] === 'number' && !constants_2.NON_DIMENSION_PROPS[i] ? (value[i] + 'px') : value[i];
                }
            }
        }
        else if (name === 'dangerouslySetInnerHTML') {
            node.innerHTML = value && value.__html || '';
        }
        else if (name[0] == 'o' && name[1] == 'n') {
            var l = node._listeners || (node._listeners = {});
            name = util_6.toLowerCase(name.substring(2));
            // @TODO: this might be worth it later, un-breaks focus/blur bubbling in IE9:
            // if (node.attachEvent) name = name=='focus'?'focusin':name=='blur'?'focusout':name;
            if (value) {
                if (!l[name])
                    node.addEventListener(name, eventProxy, !!constants_2.NON_BUBBLING_EVENTS[name]);
            }
            else if (l[name]) {
                node.removeEventListener(name, eventProxy, !!constants_2.NON_BUBBLING_EVENTS[name]);
            }
            l[name] = value;
        }
        else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
            setProperty(node, name, value == null ? '' : value);
            if (value == null || value === false)
                node.removeAttribute(name);
        }
        else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (value == null || value === false) {
                if (ns)
                    node.removeAttributeNS('http://www.w3.org/1999/xlink', util_6.toLowerCase(ns[1]));
                else
                    node.removeAttribute(name);
            }
            else if (typeof value !== 'object' && !util_6.isFunction(value)) {
                if (ns)
                    node.setAttributeNS('http://www.w3.org/1999/xlink', util_6.toLowerCase(ns[1]), value);
                else
                    node.setAttribute(name, value);
            }
        }
    }
    exports_11("setAccessor", setAccessor);
    /** Attempt to set a DOM property to the given value.
     *	IE & FF throw for certain property-value combinations.
     */
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        }
        catch (e) { }
    }
    /** Proxy an event to hooked event handlers
     *	@private
     */
    function eventProxy(e) {
        return this._listeners[e.type](options_3.default.event && options_3.default.event(e) || e);
    }
    var constants_2, options_3, util_6;
    return {
        setters: [
            function (constants_2_1) {
                constants_2 = constants_2_1;
            },
            function (options_3_1) {
                options_3 = options_3_1;
            },
            function (util_6_1) {
                util_6 = util_6_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("node_modules/preact/src/dom/recycler", ["node_modules/preact/src/util", "node_modules/preact/src/dom/index"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    function collectNode(node) {
        index_2.removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var name_1 = node.normalizedNodeName || util_7.toLowerCase(node.nodeName);
            (nodes[name_1] || (nodes[name_1] = [])).push(node);
        }
    }
    exports_12("collectNode", collectNode);
    function createNode(nodeName, isSvg) {
        var name = util_7.toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    exports_12("createNode", createNode);
    var util_7, index_2, nodes;
    return {
        setters: [
            function (util_7_1) {
                util_7 = util_7_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            /** DOM node pool, keyed on nodeName. */
            nodes = {};
        }
    };
});
System.register("node_modules/preact/src/vdom/diff", ["node_modules/preact/src/constants", "node_modules/preact/src/util", "node_modules/preact/src/vdom/index", "node_modules/preact/src/vdom/functional-component", "node_modules/preact/src/vdom/component", "node_modules/preact/src/dom/index", "node_modules/preact/src/dom/recycler", "node_modules/preact/src/options"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    /** Invoke queued componentDidMount lifecycle methods */
    function flushMounts() {
        var c;
        while ((c = mounts.pop())) {
            if (options_4.default.afterMount)
                options_4.default.afterMount(c);
            if (c.componentDidMount)
                c.componentDidMount();
        }
    }
    exports_13("flushMounts", flushMounts);
    /** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
     *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
     *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
     *	@returns {Element} dom			The created/mutated element
     *	@private
     */
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        // diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
        if (!exports_13("diffLevel", ++diffLevel) - 1) {
            // when first starting the diff, check if we're diffing an SVG or within an SVG
            isSvgMode = parent instanceof SVGElement;
            // hydration is inidicated by the existing element to be diffed not having a prop cache
            hydrating = dom && !(constants_3.ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        // append the element if its a new parent
        if (parent && ret.parentNode !== parent)
            parent.appendChild(ret);
        // diffLevel being reduced to 0 means we're exiting the diff
        if (!exports_13("diffLevel", --diffLevel)) {
            hydrating = false;
            // invoke queued componentDidMount lifecycle methods
            if (!componentRoot)
                flushMounts();
        }
        return ret;
    }
    exports_13("diff", diff);
    function idiff(dom, vnode, context, mountAll) {
        var originalAttributes = vnode && vnode.attributes;
        // Resolve ephemeral Pure Functional Components
        while (functional_component_2.isFunctionalComponent(vnode)) {
            vnode = functional_component_2.buildFunctionalComponent(vnode, context);
        }
        // empty values (null & undefined) render as empty Text nodes
        if (vnode == null)
            vnode = '';
        // Fast case: Strings create/update Text nodes.
        if (util_8.isString(vnode)) {
            // update if it's already a Text node
            if (dom && dom instanceof Text) {
                if (dom.nodeValue != vnode) {
                    dom.nodeValue = vnode;
                }
            }
            else {
                // it wasn't a Text node: replace it with one and recycle the old Element
                if (dom)
                    recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            // Mark for non-hydration updates
            dom[constants_3.ATTR_KEY] = true;
            return dom;
        }
        // If the VNode represents a Component, perform a component diff.
        if (util_8.isFunction(vnode.nodeName)) {
            return component_2.buildComponentFromVNode(dom, vnode, context, mountAll);
        }
        var out = dom, nodeName = String(vnode.nodeName), // @TODO this masks undefined component errors as `<undefined>`
        prevSvgMode = isSvgMode, vchildren = vnode.children;
        // SVGs have special namespace stuff.
        // This tracks entering and exiting that namespace when descending through the tree.
        isSvgMode = nodeName === 'svg' ? true : nodeName === 'foreignObject' ? false : isSvgMode;
        if (!dom) {
            // case: we had no element to begin with
            // - create an element to with the nodeName from VNode
            out = recycler_1.createNode(nodeName, isSvgMode);
        }
        else if (!index_3.isNamedNode(dom, nodeName)) {
            // case: Element and VNode had different nodeNames
            // - need to create the correct Element to match VNode
            // - then migrate children from old to new
            out = recycler_1.createNode(nodeName, isSvgMode);
            // move children into the replacement node
            while (dom.firstChild)
                out.appendChild(dom.firstChild);
            // if the previous Element was mounted into the DOM, replace it inline
            if (dom.parentNode)
                dom.parentNode.replaceChild(out, dom);
            // recycle the old element (skips non-Element node types)
            recollectNodeTree(dom);
        }
        var fc = out.firstChild, props = out[constants_3.ATTR_KEY];
        // Attribute Hydration: if there is no prop cache on the element,
        // ...create it and populate it with the element's attributes.
        if (!props) {
            out[constants_3.ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--;)
                props[a[i].name] = a[i].value;
        }
        // Apply attributes/props from VNode to the DOM Element:
        diffAttributes(out, vnode.attributes, props);
        // Optimization: fast-path for elements containing a single TextNode:
        if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) {
                fc.nodeValue = vchildren[0];
            }
        }
        else if (vchildren && vchildren.length || fc) {
            innerDiffNode(out, vchildren, context, mountAll);
        }
        // invoke original ref (from before resolving Pure Functional Components):
        if (originalAttributes && typeof originalAttributes.ref === 'function') {
            (props.ref = originalAttributes.ref)(out);
        }
        isSvgMode = prevSvgMode;
        return out;
    }
    /** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
     *	@param {Element} dom		Element whose children should be compared & mutated
     *	@param {Array} vchildren	Array of VNodes to compare to `dom.childNodes`
     *	@param {Object} context		Implicitly descendant context object (from most recent `getChildContext()`)
     *	@param {Boolean} moutAll
     */
    function innerDiffNode(dom, vchildren, context, mountAll) {
        var originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length, j, c, vchild, child;
        if (len) {
            for (var i = 0; i < len; i++) {
                var child_1 = originalChildren[i], props = child_1[constants_3.ATTR_KEY], key = vlen ? ((c = child_1._component) ? c.__key : props ? props.key : null) : null;
                if (key != null) {
                    keyedLen++;
                    keyed[key] = child_1;
                }
                else if (hydrating || props) {
                    children[childrenLen++] = child_1;
                }
            }
        }
        if (vlen) {
            for (var i = 0; i < vlen; i++) {
                vchild = vchildren[i];
                child = null;
                // if (isFunctionalComponent(vchild)) {
                // 	vchild = buildFunctionalComponent(vchild);
                // }
                // attempt to find a node based on key matching
                var key = vchild.key;
                if (key != null) {
                    if (keyedLen && key in keyed) {
                        child = keyed[key];
                        keyed[key] = undefined;
                        keyedLen--;
                    }
                }
                else if (!child && min < childrenLen) {
                    for (j = min; j < childrenLen; j++) {
                        c = children[j];
                        if (c && index_3.isSameNodeType(c, vchild)) {
                            child = c;
                            children[j] = undefined;
                            if (j === childrenLen - 1)
                                childrenLen--;
                            if (j === min)
                                min++;
                            break;
                        }
                    }
                }
                // morph the matched/found/created DOM child to match vchild (deep)
                child = idiff(child, vchild, context, mountAll);
                if (child && child !== dom) {
                    if (i >= len) {
                        dom.appendChild(child);
                    }
                    else if (child !== originalChildren[i]) {
                        if (child === originalChildren[i + 1]) {
                            index_4.removeNode(originalChildren[i]);
                        }
                        dom.insertBefore(child, originalChildren[i] || null);
                    }
                }
            }
        }
        if (keyedLen) {
            for (var i in keyed)
                if (keyed[i])
                    recollectNodeTree(keyed[i]);
        }
        // remove orphaned children
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child)
                recollectNodeTree(child);
        }
    }
    /** Recursively recycle (or just unmount) a node an its descendants.
     *	@param {Node} node						DOM node to start unmount/removal from
     *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
     */
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) {
            // if node is owned by a Component, unmount that component (ends up recursing back here)
            component_3.unmountComponent(component, !unmountOnly);
        }
        else {
            // If the node's VNode had a ref function, invoke it with null here.
            // (this is part of the React spec, and smart for unsetting references)
            if (node[constants_3.ATTR_KEY] && node[constants_3.ATTR_KEY].ref)
                node[constants_3.ATTR_KEY].ref(null);
            if (!unmountOnly) {
                recycler_1.collectNode(node);
            }
            // Recollect/unmount all children.
            // - we use .lastChild here because it causes less reflow than .firstChild
            // - it's also cheaper than accessing the .childNodes Live NodeList
            var c = void 0;
            while ((c = node.lastChild))
                recollectNodeTree(c, unmountOnly);
        }
    }
    exports_13("recollectNodeTree", recollectNodeTree);
    /** Apply differences in attributes from a VNode to the given DOM Element.
     *	@param {Element} dom		Element with attributes to diff `attrs` against
     *	@param {Object} attrs		The desired end-state key-value attribute pairs
     *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
     */
    function diffAttributes(dom, attrs, old) {
        // remove attributes no longer present on the vnode by setting them to undefined
        for (var name_2 in old) {
            if (!(attrs && name_2 in attrs) && old[name_2] != null) {
                index_4.setAccessor(dom, name_2, old[name_2], old[name_2] = undefined, isSvgMode);
            }
        }
        // add new & update changed attributes
        if (attrs) {
            for (var name_3 in attrs) {
                if (name_3 !== 'children' && name_3 !== 'innerHTML' && (!(name_3 in old) || attrs[name_3] !== (name_3 === 'value' || name_3 === 'checked' ? dom[name_3] : old[name_3]))) {
                    index_4.setAccessor(dom, name_3, old[name_3], old[name_3] = attrs[name_3], isSvgMode);
                }
            }
        }
    }
    var constants_3, util_8, index_3, functional_component_2, component_2, index_4, recycler_1, component_3, options_4, mounts, diffLevel, isSvgMode, hydrating;
    return {
        setters: [
            function (constants_3_1) {
                constants_3 = constants_3_1;
            },
            function (util_8_1) {
                util_8 = util_8_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (functional_component_2_1) {
                functional_component_2 = functional_component_2_1;
            },
            function (component_2_1) {
                component_2 = component_2_1;
                component_3 = component_2_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (recycler_1_1) {
                recycler_1 = recycler_1_1;
            },
            function (options_4_1) {
                options_4 = options_4_1;
            }
        ],
        execute: function () {
            /** Queue of components that have been mounted and are awaiting componentDidMount */
            exports_13("mounts", mounts = []);
            /** Diff recursion count, used to track the end of the diff cycle. */
            exports_13("diffLevel", diffLevel = 0);
            /** Global flag indicating if the diff is currently within an SVG */
            isSvgMode = false;
            /** Global flag indicating if the diff is performing hydration */
            hydrating = false;
        }
    };
});
System.register("node_modules/preact/src/vdom/component-recycler", ["node_modules/preact/src/component"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list)
            list.push(component);
        else
            components[name] = [component];
    }
    exports_14("collectComponent", collectComponent);
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        component_4.Component.call(inst, props, context);
        if (list) {
            for (var i = list.length; i--;) {
                if (list[i].constructor === Ctor) {
                    inst.nextBase = list[i].nextBase;
                    list.splice(i, 1);
                    break;
                }
            }
        }
        return inst;
    }
    exports_14("createComponent", createComponent);
    var component_4, components;
    return {
        setters: [
            function (component_4_1) {
                component_4 = component_4_1;
            }
        ],
        execute: function () {
            /** Retains a pool of Components for re-use, keyed on component name.
             *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
             *	@private
             */
            components = {};
        }
    };
});
System.register("node_modules/preact/src/vdom/component", ["node_modules/preact/src/constants", "node_modules/preact/src/options", "node_modules/preact/src/util", "node_modules/preact/src/render-queue", "node_modules/preact/src/vdom/index", "node_modules/preact/src/vdom/diff", "node_modules/preact/src/vdom/functional-component", "node_modules/preact/src/vdom/component-recycler", "node_modules/preact/src/dom/index"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    /** Set a component's `props` (generally derived from JSX attributes).
     *	@param {Object} props
     *	@param {Object} [opts]
     *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
     *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
     */
    function setComponentProps(component, props, opts, context, mountAll) {
        if (component._disable)
            return;
        component._disable = true;
        if ((component.__ref = props.ref))
            delete props.ref;
        if ((component.__key = props.key))
            delete props.key;
        if (!component.base || mountAll) {
            if (component.componentWillMount)
                component.componentWillMount();
        }
        else if (component.componentWillReceiveProps) {
            component.componentWillReceiveProps(props, context);
        }
        if (context && context !== component.context) {
            if (!component.prevContext)
                component.prevContext = component.context;
            component.context = context;
        }
        if (!component.prevProps)
            component.prevProps = component.props;
        component.props = props;
        component._disable = false;
        if (opts !== constants_4.NO_RENDER) {
            if (opts === constants_4.SYNC_RENDER || options_5.default.syncComponentUpdates !== false || !component.base) {
                renderComponent(component, constants_4.SYNC_RENDER, mountAll);
            }
            else {
                render_queue_1.enqueueRender(component);
            }
        }
        if (component.__ref)
            component.__ref(component);
    }
    exports_15("setComponentProps", setComponentProps);
    /** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
     *	@param {Component} component
     *	@param {Object} [opts]
     *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
     *	@private
     */
    function renderComponent(component, opts, mountAll, isChild) {
        if (component._disable)
            return;
        var skip, rendered, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component, inst, cbase;
        // if updating
        if (isUpdate) {
            component.props = previousProps;
            component.state = previousState;
            component.context = previousContext;
            if (opts !== constants_4.FORCE_RENDER
                && component.shouldComponentUpdate
                && component.shouldComponentUpdate(props, state, context) === false) {
                skip = true;
            }
            else if (component.componentWillUpdate) {
                component.componentWillUpdate(props, state, context);
            }
            component.props = props;
            component.state = state;
            component.context = context;
        }
        component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
        component._dirty = false;
        if (!skip) {
            if (component.render)
                rendered = component.render(props, state, context);
            // context to pass to the child, can be updated via (grand-)parent component
            if (component.getChildContext) {
                context = util_9.extend(util_9.clone(context), component.getChildContext());
            }
            while (functional_component_3.isFunctionalComponent(rendered)) {
                rendered = functional_component_3.buildFunctionalComponent(rendered, context);
            }
            var childComponent = rendered && rendered.nodeName, toUnmount = void 0, base = void 0;
            if (util_9.isFunction(childComponent)) {
                // set up high order component link
                var childProps = index_5.getNodeProps(rendered);
                inst = initialChildComponent;
                if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
                    setComponentProps(inst, childProps, constants_4.SYNC_RENDER, context);
                }
                else {
                    toUnmount = inst;
                    inst = component_recycler_1.createComponent(childComponent, childProps, context);
                    inst.nextBase = inst.nextBase || nextBase;
                    inst._parentComponent = component;
                    component._component = inst;
                    setComponentProps(inst, childProps, constants_4.NO_RENDER, context);
                    renderComponent(inst, constants_4.SYNC_RENDER, mountAll, true);
                }
                base = inst.base;
            }
            else {
                cbase = initialBase;
                // destroy high order component link
                toUnmount = initialChildComponent;
                if (toUnmount) {
                    cbase = component._component = null;
                }
                if (initialBase || opts === constants_4.SYNC_RENDER) {
                    if (cbase)
                        cbase._component = null;
                    base = diff_1.diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
                }
            }
            if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                var baseParent = initialBase.parentNode;
                if (baseParent && base !== baseParent) {
                    baseParent.replaceChild(base, initialBase);
                    if (!toUnmount) {
                        initialBase._component = null;
                        diff_1.recollectNodeTree(initialBase);
                    }
                }
            }
            if (toUnmount) {
                unmountComponent(toUnmount, base !== initialBase);
            }
            component.base = base;
            if (base && !isChild) {
                var componentRef = component, t = component;
                while ((t = t._parentComponent)) {
                    (componentRef = t).base = base;
                }
                base._component = componentRef;
                base._componentConstructor = componentRef.constructor;
            }
        }
        if (!isUpdate || mountAll) {
            diff_1.mounts.unshift(component);
        }
        else if (!skip) {
            if (component.componentDidUpdate) {
                component.componentDidUpdate(previousProps, previousState, previousContext);
            }
            if (options_5.default.afterUpdate)
                options_5.default.afterUpdate(component);
        }
        var cb = component._renderCallbacks, fn;
        if (cb)
            while ((fn = cb.pop()))
                fn.call(component);
        if (!diff_1.diffLevel && !isChild)
            diff_1.flushMounts();
    }
    exports_15("renderComponent", renderComponent);
    /** Apply the Component referenced by a VNode to the DOM.
     *	@param {Element} dom	The DOM node to mutate
     *	@param {VNode} vnode	A Component-referencing VNode
     *	@returns {Element} dom	The created/mutated element
     *	@private
     */
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = index_5.getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) {
            isOwner = c.constructor === vnode.nodeName;
        }
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, constants_4.ASYNC_RENDER, context, mountAll);
            dom = c.base;
        }
        else {
            if (c && !isDirectOwner) {
                unmountComponent(c, true);
                dom = oldDom = null;
            }
            c = component_recycler_1.createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                // passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L241:
                oldDom = null;
            }
            setComponentProps(c, props, constants_4.SYNC_RENDER, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                diff_1.recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    exports_15("buildComponentFromVNode", buildComponentFromVNode);
    /** Remove a component from the DOM and recycle it.
     *	@param {Element} dom			A DOM node from which to unmount the given Component
     *	@param {Component} component	The Component instance to unmount
     *	@private
     */
    function unmountComponent(component, remove) {
        if (options_5.default.beforeUnmount)
            options_5.default.beforeUnmount(component);
        // console.log(`${remove?'Removing':'Unmounting'} component: ${component.constructor.name}`);
        var base = component.base;
        component._disable = true;
        if (component.componentWillUnmount)
            component.componentWillUnmount();
        component.base = null;
        // recursively tear down & recollect high-order component children:
        var inner = component._component;
        if (inner) {
            unmountComponent(inner, remove);
        }
        else if (base) {
            if (base[constants_4.ATTR_KEY] && base[constants_4.ATTR_KEY].ref)
                base[constants_4.ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                index_6.removeNode(base);
                component_recycler_1.collectComponent(component);
            }
            var c = void 0;
            while ((c = base.lastChild))
                diff_1.recollectNodeTree(c, !remove);
        }
        if (component.__ref)
            component.__ref(null);
        if (component.componentDidUnmount)
            component.componentDidUnmount();
    }
    exports_15("unmountComponent", unmountComponent);
    var constants_4, options_5, util_9, render_queue_1, index_5, diff_1, functional_component_3, component_recycler_1, index_6;
    return {
        setters: [
            function (constants_4_1) {
                constants_4 = constants_4_1;
            },
            function (options_5_1) {
                options_5 = options_5_1;
            },
            function (util_9_1) {
                util_9 = util_9_1;
            },
            function (render_queue_1_1) {
                render_queue_1 = render_queue_1_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            },
            function (diff_1_1) {
                diff_1 = diff_1_1;
            },
            function (functional_component_3_1) {
                functional_component_3 = functional_component_3_1;
            },
            function (component_recycler_1_1) {
                component_recycler_1 = component_recycler_1_1;
            },
            function (index_6_1) {
                index_6 = index_6_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("node_modules/preact/src/component", ["node_modules/preact/src/constants", "node_modules/preact/src/util", "node_modules/preact/src/linked-state", "node_modules/preact/src/vdom/component", "node_modules/preact/src/render-queue"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    /** Base Component class, for he ES6 Class method of creating Components
     *	@public
     *
     *	@example
     *	class MyFoo extends Component {
     *		render(props, state) {
     *			return <div />;
     *		}
     *	}
     */
    function Component(props, context) {
        /** @private */
        this._dirty = true;
        // /** @public */
        // this._disableRendering = false;
        // /** @public */
        // this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;
        /** @public */
        this.context = context;
        /** @type {object} */
        this.props = props;
        /** @type {object} */
        if (!this.state)
            this.state = {};
    }
    exports_16("Component", Component);
    var constants_5, util_10, linked_state_1, component_5, render_queue_2;
    return {
        setters: [
            function (constants_5_1) {
                constants_5 = constants_5_1;
            },
            function (util_10_1) {
                util_10 = util_10_1;
            },
            function (linked_state_1_1) {
                linked_state_1 = linked_state_1_1;
            },
            function (component_5_1) {
                component_5 = component_5_1;
            },
            function (render_queue_2_1) {
                render_queue_2 = render_queue_2_1;
            }
        ],
        execute: function () {
            util_10.extend(Component.prototype, {
                /** Returns a `boolean` value indicating if the component should re-render when receiving the given `props` and `state`.
                 *	@param {object} nextProps
                 *	@param {object} nextState
                 *	@param {object} nextContext
                 *	@returns {Boolean} should the component re-render
                 *	@name shouldComponentUpdate
                 *	@function
                 */
                // shouldComponentUpdate() {
                // 	return true;
                // },
                /** Returns a function that sets a state property when called.
                 *	Calling linkState() repeatedly with the same arguments returns a cached link function.
                 *
                 *	Provides some built-in special cases:
                 *		- Checkboxes and radio buttons link their boolean `checked` value
                 *		- Inputs automatically link their `value` property
                 *		- Event paths fall back to any associated Component if not found on an element
                 *		- If linked value is a function, will invoke it and use the result
                 *
                 *	@param {string} key				The path to set - can be a dot-notated deep key
                 *	@param {string} [eventPath]		If set, attempts to find the new state value at a given dot-notated path within the object passed to the linkedState setter.
                 *	@returns {function} linkStateSetter(e)
                 *
                 *	@example Update a "text" state value when an input changes:
                 *		<input onChange={ this.linkState('text') } />
                 *
                 *	@example Set a deep state value on click
                 *		<button onClick={ this.linkState('touch.coords', 'touches.0') }>Tap</button
                 */
                linkState: function (key, eventPath) {
                    var c = this._linkedStates || (this._linkedStates = {});
                    return c[key + eventPath] || (c[key + eventPath] = linked_state_1.createLinkedState(this, key, eventPath));
                },
                /** Update component state by copying properties from `state` to `this.state`.
                 *	@param {object} state		A hash of state properties to update with new values
                 */
                setState: function (state, callback) {
                    var s = this.state;
                    if (!this.prevState)
                        this.prevState = util_10.clone(s);
                    util_10.extend(s, util_10.isFunction(state) ? state(s, this.props) : state);
                    if (callback)
                        (this._renderCallbacks = (this._renderCallbacks || [])).push(callback);
                    render_queue_2.enqueueRender(this);
                },
                /** Immediately perform a synchronous re-render of the component.
                 *	@private
                 */
                forceUpdate: function () {
                    component_5.renderComponent(this, constants_5.FORCE_RENDER);
                },
                /** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
                 *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
                 *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
                 *	@param {object} state		The component's current state
                 *	@param {object} context		Context object (if a parent component has provided context)
                 *	@returns VNode
                 */
                render: function () { }
            });
        }
    };
});
System.register("node_modules/preact/src/render", ["node_modules/preact/src/vdom/diff"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    /** Render JSX into a `parent` Element.
     *	@param {VNode} vnode		A (JSX) VNode to render
     *	@param {Element} parent		DOM element to render into
     *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
     *	@public
     *
     *	@example
     *	// render a div into <body>:
     *	render(<div id="hello">hello!</div>, document.body);
     *
     *	@example
     *	// render a "Thing" component into #foo:
     *	const Thing = ({ name }) => <span>{ name }</span>;
     *	render(<Thing name="one" />, document.querySelector('#foo'));
     */
    function render(vnode, parent, merge) {
        return diff_2.diff(merge, vnode, {}, false, parent);
    }
    exports_17("render", render);
    var diff_2;
    return {
        setters: [
            function (diff_2_1) {
                diff_2 = diff_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("node_modules/preact/src/preact", ["node_modules/preact/src/h", "node_modules/preact/src/clone-element", "node_modules/preact/src/component", "node_modules/preact/src/render", "node_modules/preact/src/render-queue", "node_modules/preact/src/options"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var h_2, clone_element_1, component_6, render_1, render_queue_3, options_6;
    return {
        setters: [
            function (h_2_1) {
                h_2 = h_2_1;
            },
            function (clone_element_1_1) {
                clone_element_1 = clone_element_1_1;
            },
            function (component_6_1) {
                component_6 = component_6_1;
            },
            function (render_1_1) {
                render_1 = render_1_1;
            },
            function (render_queue_3_1) {
                render_queue_3 = render_queue_3_1;
            },
            function (options_6_1) {
                options_6 = options_6_1;
            }
        ],
        execute: function () {
            exports_18("h", h_2.h);
            exports_18("cloneElement", clone_element_1.cloneElement);
            exports_18("Component", component_6.Component);
            exports_18("render", render_1.render);
            exports_18("rerender", render_queue_3.rerender);
            exports_18("options", options_6.default);
            exports_18("default", {
                h: h_2.h,
                cloneElement: clone_element_1.cloneElement,
                Component: component_6.Component,
                render: render_1.render,
                rerender: render_queue_3.rerender,
                options: options_6.default
            });
        }
    };
});
System.register("src/main", ["node_modules/preact/src/preact"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var preact_1;
    return {
        setters: [
            function (preact_1_1) {
                preact_1 = preact_1_1;
            }
        ],
        execute: function () {
            window.console.log('?');
            preact_1.render(preact_1.h("div", null, "Test"), document.body);
        }
    };
});

/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */
! function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w)
    } : factory(global)
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj
    }

    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements)
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 !== not
        })
    }

    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
        return cur
    }

    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0
        }), object
    }

    function detach() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1)) : (document.detachEvent("onreadystatechange", completed), window.detachEvent("onload", completed))
    }

    function completed() {
        (document.addEventListener || "load" === event.type || "complete" === document.readyState) && (detach(), jQuery.ready())
    }

    function dataAttr(elem, key, data) {
        if (void 0 === data && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {}
                jQuery.data(elem, key, data)
            } else data = void 0
        }
        return data
    }

    function isEmptyDataObject(obj) {
        var name;
        for (name in obj)
            if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
        return !0
    }

    function internalData(elem, name, data, pvt) {
        if (jQuery.acceptData(elem)) {
            var ret, thisCache, internalKey = jQuery.expando,
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if (id && cache[id] && (pvt || cache[id].data) || void 0 !== data || "string" != typeof name) return id || (id = isNode ? elem[internalKey] = deletedIds.pop() || jQuery.guid++ : internalKey), cache[id] || (cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            }), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), void 0 !== data && (thisCache[jQuery.camelCase(name)] = data), "string" == typeof name ? (ret = thisCache[name], null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret
        }
    }

    function internalRemoveData(elem, name, pvt) {
        if (jQuery.acceptData(elem)) {
            var thisCache, i, isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (cache[id]) {
                if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                    jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [name] : (name = jQuery.camelCase(name), name = name in thisCache ? [name] : name.split(" ")), i = name.length;
                    for (; i--;) delete thisCache[name[i]];
                    if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return
                }(pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([elem], !0) : support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null)
            }
        }
    }

    function returnTrue() {
        return !0
    }

    function returnFalse() {
        return !1
    }

    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (err) {}
    }

    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement)
            for (; list.length;) safeFrag.createElement(list.pop());
        return safeFrag
    }

    function getAll(context, tag) {
        var elems, elem, i = 0,
            found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") : void 0;
        if (!found)
            for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found
    }

    function fixDefaultChecked(elem) {
        rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked)
    }

    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
    }

    function disableScript(elem) {
        return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type, elem
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem
    }

    function setGlobalEval(elems, refElements) {
        for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"))
    }

    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src),
                curData = jQuery._data(dest, oldData),
                events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events)
                    for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i])
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data))
        }
    }

    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (1 === dest.nodeType) {
            if (nodeName = dest.nodeName.toLowerCase(), !support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                dest.removeAttribute(jQuery.expando)
            }
            "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text, restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue)
        }
    }

    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body),
            display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(), display
    }

    function defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display
    }

    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                var condition = conditionFn();
                if (null != condition) return condition ? void delete this.get : (this.get = hookFn).apply(this, arguments)
            }
        }
    }

    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--;)
            if (name = cssPrefixes[i] + capName, name in style) return name;
        return origName
    }

    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val
    }

    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0,
            val = "width" === name ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), val = parseFloat(val) || 0
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
    }

    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing)
    }

    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0
        }), fxNow = jQuery.now()
    }

    function genFx(type, includeWidth) {
        var which, attrs = {
                height: type
            },
            i = 0;
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs
    }

    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++)
            if (tween = collection[index].call(animation, prop, value)) return tween
    }

    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden(elem),
            dataShow = jQuery._data(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire()
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire()
            })
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (support.inlineBlockNeedsLayout && "inline" !== defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", support.shrinkWrapBlocks() || anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2]
        }));
        for (prop in props)
            if (value = props[prop], rfxtypes.exec(value)) {
                if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                    if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                    hidden = !0
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
            } else display = void 0;
        if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display);
        else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = jQuery._data(elem, "fxshow", {}), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide()
            }), anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop])
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
        }
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props)
            if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
                value = hooks.expand(value), delete props[name];
                for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing)
            } else specialEasing[name] = easing
    }

    function Animation(elem, properties, options) {
        var result, stopped, index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function() {
                delete tick.elem
            }),
            tick = function() {
                if (stopped) return !1;
                for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
                return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), !1)
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(!0, {
                    specialEasing: {}
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    return animation.tweens.push(tween), tween
                },
                stop: function(gotoEnd) {
                    var index = 0,
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) return this;
                    for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                    return gotoEnd ? deferred.resolveWith(elem, [animation, gotoEnd]) : deferred.rejectWith(elem, [animation, gotoEnd]), this
                }
            }),
            props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++)
            if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }

    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func))
                for (; dataType = dataTypes[i++];) "+" === dataType.charAt(0) ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
        }
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1)
            }), selected
        }
        var inspected = {},
            seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
    }

    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target
    }

    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes;
            "*" === dataTypes[0];) dataTypes.shift(), void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct)
            for (type in contents)
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0];
        else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                firstDataType || (firstDataType = type)
            }
            finalDataType = finalDataType || firstDataType
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : void 0
    }

    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {},
            dataTypes = s.dataTypes.slice();
        if (dataTypes[1])
            for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current;)
            if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = dataTypes.shift())
                if ("*" === current) current = prev;
                else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv)
                for (conv2 in converters)
                    if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                        conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.unshift(tmp[1]));
                        break
                    }
            if (conv !== !0)
                if (conv && s["throws"]) response = conv(response);
                else try {
                    response = conv(response)
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                    }
                }
        }
        return {
            state: "success",
            data: response
        }
    }

    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add)
        });
        else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
        else
            for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
    }

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1
    }
    var deletedIds = [],
        slice = deletedIds.slice,
        concat = deletedIds.concat,
        push = deletedIds.push,
        indexOf = deletedIds.indexOf,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        support = {},
        version = "1.11.1",
        jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context)
        },
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(all, letter) {
            return letter.toUpperCase()
        };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this)
        },
        get: function(num) {
            return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this)
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args)
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem)
            }))
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(i) {
            var len = this.length,
                j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [this[j]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, i--); length > i; i++)
            if (null != (options = arguments[i]))
                for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg)
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj)
        },
        isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj)
        },
        isWindow: function(obj) {
            return null != obj && obj == obj.window
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            if (support.ownLast)
                for (key in obj) return hasOwn.call(obj, key);
            for (key in obj);
            return void 0 === key || hasOwn.call(obj, key)
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj
        },
        globalEval: function(data) {
            data && jQuery.trim(data) && (window.execScript || function(data) {
                window.eval.call(window, data)
            })(data)
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback, args) {
            var value, i = 0,
                length = obj.length,
                isArray = isArraylike(obj);
            if (args) {
                if (isArray)
                    for (; length > i && (value = callback.apply(obj[i], args), value !== !1); i++);
                else
                    for (i in obj)
                        if (value = callback.apply(obj[i], args), value === !1) break
            } else if (isArray)
                for (; length > i && (value = callback.call(obj[i], i, obj[i]), value !== !1); i++);
            else
                for (i in obj)
                    if (value = callback.call(obj[i], i, obj[i]), value === !1) break;
            return obj
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "")
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)), ret
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) return indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++)
                    if (i in arr && arr[i] === elem) return i
            }
            return -1
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j;) first[i++] = second[j++];
            if (len !== len)
                for (; void 0 !== second[j];) first[i++] = second[j++];
            return first.length = i, first
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches
        },
        map: function(elems, callback, arg) {
            var value, i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];
            if (isArray)
                for (; length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value);
            else
                for (i in elems) value = callback(elems[i], i, arg), null != value && ret.push(value);
            return concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)))
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0
        },
        now: function() {
            return +new Date
        },
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    });
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v1.10.19
         * http://sizzlejs.com/
         *
         * Copyright 2013 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-04-18
         */
        function(window) {
            function Sizzle(selector, context, results, seed) {
                var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
                if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
                if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
                if (documentIsHTML && !seed) {
                    if (match = rquickExpr.exec(selector))
                        if (m = match[1]) {
                            if (9 === nodeType) {
                                if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                                if (elem.id === m) return results.push(elem), results
                            } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results
                        } else {
                            if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), results;
                            if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), results
                        }
                    if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        if (nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                            for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), nid = "[id='" + nid + "'] ", i = groups.length; i--;) groups[i] = nid + toSelector(groups[i]);
                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context, newSelector = groups.join(",")
                        }
                        if (newSelector) try {
                            return push.apply(results, newContext.querySelectorAll(newSelector)), results
                        } catch (qsaError) {} finally {
                            old || context.removeAttribute("id")
                        }
                    }
                }
                return select(selector.replace(rtrim, "$1"), context, results, seed)
            }

            function createCache() {
                function cache(key, value) {
                    return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value
                }
                var keys = [];
                return cache
            }

            function markFunction(fn) {
                return fn[expando] = !0, fn
            }

            function assert(fn) {
                var div = document.createElement("div");
                try {
                    return !!fn(div)
                } catch (e) {
                    return !1
                } finally {
                    div.parentNode && div.parentNode.removeChild(div), div = null
                }
            }

            function addHandle(attrs, handler) {
                for (var arr = attrs.split("|"), i = attrs.length; i--;) Expr.attrHandle[arr[i]] = handler
            }

            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                if (diff) return diff;
                if (cur)
                    for (; cur = cur.nextSibling;)
                        if (cur === b) return -1;
                return a ? 1 : -1
            }

            function createInputPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && elem.type === type
                }
            }

            function createButtonPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return ("input" === name || "button" === name) && elem.type === type
                }
            }

            function createPositionalPseudo(fn) {
                return markFunction(function(argument) {
                    return argument = +argument, markFunction(function(seed, matches) {
                        for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]))
                    })
                })
            }

            function testContext(context) {
                return context && typeof context.getElementsByTagName !== strundefined && context
            }

            function setFilters() {}

            function toSelector(tokens) {
                for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
                return selector
            }

            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    checkNonElements = base && "parentNode" === dir,
                    doneName = done++;
                return combinator.first ? function(elem, context, xml) {
                    for (; elem = elem[dir];)
                        if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml)
                } : function(elem, context, xml) {
                    var oldCache, outerCache, newCache = [dirruns, doneName];
                    if (xml) {
                        for (; elem = elem[dir];)
                            if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0
                    } else
                        for (; elem = elem[dir];)
                            if (1 === elem.nodeType || checkNonElements) {
                                if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                                if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0
                            }
                }
            }

            function elementMatcher(matchers) {
                return matchers.length > 1 ? function(elem, context, xml) {
                    for (var i = matchers.length; i--;)
                        if (!matchers[i](elem, context, xml)) return !1;
                    return !0
                } : matchers[0]
            }

            function multipleContexts(selector, contexts, results) {
                for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
                return results
            }

            function condense(unmatched, map, filter, context, xml) {
                for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++)(elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), mapped && map.push(i));
                return newUnmatched
            }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function(seed, results, context, xml) {
                    var temp, i, elem, preMap = [],
                        postMap = [],
                        preexisting = results.length,
                        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                        matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
                        matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                    if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
                        for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                for (temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                                postFinder(null, matcherOut = [], temp, xml)
                            }
                            for (i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                        }
                    } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
                })
            }

            function matcherFromTokens(tokens) {
                for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                        return elem === checkContext
                    }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                        return indexOf.call(checkContext, elem) > -1
                    }, implicitRelative, !0), matchers = [function(elem, context, xml) {
                        return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
                    }]; len > i; i++)
                    if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    else {
                        if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                            for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++);
                            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                                value: " " === tokens[i - 2].type ? "*" : ""
                            })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens))
                        }
                        matchers.push(matcher)
                    }
                return elementMatcher(matchers)
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function(seed, context, xml, results, outermost) {
                        var elem, j, matcher, matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            elems = seed || byElement && Expr.find.TAG("*", outermost),
                            dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1,
                            len = elems.length;
                        for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                            if (byElement && elem) {
                                for (j = 0; matcher = elementMatchers[j++];)
                                    if (matcher(elem, context, xml)) {
                                        results.push(elem);
                                        break
                                    }
                                outermost && (dirruns = dirrunsUnique)
                            }
                            bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem))
                        }
                        if (matchedCount += i, bySet && i !== matchedCount) {
                            for (j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml);
                            if (seed) {
                                if (matchedCount > 0)
                                    for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                                setMatched = condense(setMatched)
                            }
                            push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                        }
                        return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
                    };
                return bySet ? markFunction(superMatcher) : superMatcher
            }
            var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date,
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function(a, b) {
                    return a === b && (hasDuplicate = !0), 0
                },
                strundefined = "undefined",
                MAX_NEGATIVE = 1 << 31,
                hasOwn = {}.hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                indexOf = arr.indexOf || function(elem) {
                    for (var i = 0, len = this.length; len > i; i++)
                        if (this[i] === elem) return i;
                    return -1
                },
                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                whitespace = "[\\x20\\t\\r\\n\\f]",
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                identifier = characterEncoding.replace("w", "w#"),
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
                pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)",
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),
                matchExpr = {
                    ID: new RegExp("^#(" + characterEncoding + ")"),
                    CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
                    TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + attributes),
                    PSEUDO: new RegExp("^" + pseudos),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + booleans + ")$", "i"),
                    needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },
                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,
                rnative = /^[^{]+\{\s*\[native \w/,
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                rsibling = /[+~]/,
                rescape = /'|\\/g,
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function(_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 65536;
                    return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320)
                };
            try {
                push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), arr[preferredDoc.childNodes.length].nodeType
            } catch (e) {
                push = {
                    apply: arr.length ? function(target, els) {
                        push_native.apply(target, slice.call(els))
                    } : function(target, els) {
                        for (var j = target.length, i = 0; target[j++] = els[i++];);
                        target.length = j - 1
                    }
                }
            }
            support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? "HTML" !== documentElement.nodeName : !1
            }, setDocument = Sizzle.setDocument = function(node) {
                var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc,
                    parent = doc.defaultView;
                return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, documentIsHTML = !isXML(doc), parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", function() {
                    setDocument()
                }, !1) : parent.attachEvent && parent.attachEvent("onunload", function() {
                    setDocument()
                })), support.attributes = assert(function(div) {
                    return div.className = "i", !div.getAttribute("className")
                }), support.getElementsByTagName = assert(function(div) {
                    return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length
                }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                    return div.innerHTML = "<div class='a'></div><div class='a i'></div>", div.firstChild.className = "i", 2 === div.getElementsByClassName("i").length
                }), support.getById = assert(function(div) {
                    return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length
                }), support.getById ? (Expr.find.ID = function(id, context) {
                    if (typeof context.getElementById !== strundefined && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : []
                    }
                }, Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId
                    }
                }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId
                    }
                }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                    return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0
                } : function(tag, context) {
                    var elem, tmp = [],
                        i = 0,
                        results = context.getElementsByTagName(tag);
                    if ("*" === tag) {
                        for (; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem);
                        return tmp
                    }
                    return results
                }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                    return typeof context.getElementsByClassName !== strundefined && documentIsHTML ? context.getElementsByClassName(className) : void 0
                }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                    div.innerHTML = "<select msallowclip=''><option selected=''></option></select>", div.querySelectorAll("[msallowclip^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked")
                }), assert(function(div) {
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:")
                })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                    support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), rbuggyMatches.push("!=", pseudos)
                }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                    var adown = 9 === a.nodeType ? a.documentElement : a,
                        bup = b && b.parentNode;
                    return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
                } : function(a, b) {
                    if (b)
                        for (; b = b.parentNode;)
                            if (b === a) return !0;
                    return !1
                }, sortOrder = hasCompare ? function(a, b) {
                    if (a === b) return hasDuplicate = !0, 0;
                    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1)
                } : function(a, b) {
                    if (a === b) return hasDuplicate = !0, 0;
                    var cur, i = 0,
                        aup = a.parentNode,
                        bup = b.parentNode,
                        ap = [a],
                        bp = [b];
                    if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                    if (aup === bup) return siblingCheck(a, b);
                    for (cur = a; cur = cur.parentNode;) ap.unshift(cur);
                    for (cur = b; cur = cur.parentNode;) bp.unshift(cur);
                    for (; ap[i] === bp[i];) i++;
                    return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
                }, doc) : document
            }, Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements)
            }, Sizzle.matchesSelector = function(elem, expr) {
                if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret
                } catch (e) {}
                return Sizzle(expr, document, null, [elem]).length > 0
            }, Sizzle.contains = function(context, elem) {
                return (context.ownerDocument || context) !== document && setDocument(context), contains(context, elem)
            }, Sizzle.attr = function(elem, name) {
                (elem.ownerDocument || elem) !== document && setDocument(elem);
                var fn = Expr.attrHandle[name.toLowerCase()],
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
                return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
            }, Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg)
            }, Sizzle.uniqueSort = function(results) {
                var elem, duplicates = [],
                    j = 0,
                    i = 0;
                if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), hasDuplicate) {
                    for (; elem = results[i++];) elem === results[i] && (j = duplicates.push(i));
                    for (; j--;) results.splice(duplicates[j], 1)
                }
                return sortInput = null, results
            }, getText = Sizzle.getText = function(elem) {
                var node, ret = "",
                    i = 0,
                    nodeType = elem.nodeType;
                if (nodeType) {
                    if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                        if ("string" == typeof elem.textContent) return elem.textContent;
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem)
                    } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue
                } else
                    for (; node = elem[i++];) ret += getText(node);
                return ret
            }, Expr = Sizzle.selectors = {
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(match) {
                        return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4)
                    },
                    CHILD: function(match) {
                        return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match
                    },
                    PSEUDO: function(match) {
                        var excess, unquoted = !match[6] && match[2];
                        return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return "*" === nodeNameSelector ? function() {
                            return !0
                        } : function(elem) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                        }
                    },
                    CLASS: function(className) {
                        var pattern = classCache[className + " "];
                        return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                            return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(name, operator, check) {
                        return function(elem) {
                            var result = Sizzle.attr(elem, name);
                            return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0
                        }
                    },
                    CHILD: function(type, what, argument, first, last) {
                        var simple = "nth" !== type.slice(0, 3),
                            forward = "last" !== type.slice(-4),
                            ofType = "of-type" === what;
                        return 1 === first && 0 === last ? function(elem) {
                            return !!elem.parentNode
                        } : function(elem, context, xml) {
                            var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                                parent = elem.parentNode,
                                name = ofType && elem.nodeName.toLowerCase(),
                                useCache = !xml && !ofType;
                            if (parent) {
                                if (simple) {
                                    for (; dir;) {
                                        for (node = elem; node = node[dir];)
                                            if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                        start = dir = "only" === type && !start && "nextSibling"
                                    }
                                    return !0
                                }
                                if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                                    for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();)
                                        if (1 === node.nodeType && ++diff && node === elem) {
                                            outerCache[type] = [dirruns, nodeIndex, diff];
                                            break
                                        }
                                } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1];
                                else
                                    for (;
                                        (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node !== elem)););
                                return diff -= last, diff === first || diff % first === 0 && diff / first >= 0
                            }
                        }
                    },
                    PSEUDO: function(pseudo, argument) {
                        var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                        return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf.call(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i])
                        }) : function(elem) {
                            return fn(elem, 0, args)
                        }) : fn
                    }
                },
                pseudos: {
                    not: markFunction(function(selector) {
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));
                        return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                            for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)(elem = unmatched[i]) && (seed[i] = !(matches[i] = elem))
                        }) : function(elem, context, xml) {
                            return input[0] = elem, matcher(input, null, xml, results), !results.pop()
                        }
                    }),
                    has: markFunction(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem).length > 0
                        }
                    }),
                    contains: markFunction(function(text) {
                        return function(elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                        }
                    }),
                    lang: markFunction(function(lang) {
                        return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(),
                            function(elem) {
                                var elemLang;
                                do
                                    if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                                return !1
                            }
                    }),
                    target: function(elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id
                    },
                    root: function(elem) {
                        return elem === docElem
                    },
                    focus: function(elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
                    },
                    enabled: function(elem) {
                        return elem.disabled === !1
                    },
                    disabled: function(elem) {
                        return elem.disabled === !0
                    },
                    checked: function(elem) {
                        var nodeName = elem.nodeName.toLowerCase();
                        return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected
                    },
                    selected: function(elem) {
                        return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0
                    },
                    empty: function(elem) {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                            if (elem.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(elem) {
                        return !Expr.pseudos.empty(elem)
                    },
                    header: function(elem) {
                        return rheader.test(elem.nodeName)
                    },
                    input: function(elem) {
                        return rinputs.test(elem.nodeName)
                    },
                    button: function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return "input" === name && "button" === elem.type || "button" === name
                    },
                    text: function(elem) {
                        var attr;
                        return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase())
                    },
                    first: createPositionalPseudo(function() {
                        return [0]
                    }),
                    last: createPositionalPseudo(function(matchIndexes, length) {
                        return [length - 1]
                    }),
                    eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                        return [0 > argument ? argument + length : argument]
                    }),
                    even: createPositionalPseudo(function(matchIndexes, length) {
                        for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                        return matchIndexes
                    }),
                    odd: createPositionalPseudo(function(matchIndexes, length) {
                        for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                        return matchIndexes
                    }),
                    lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                        for (var i = 0 > argument ? argument + length : argument; --i >= 0;) matchIndexes.push(i);
                        return matchIndexes
                    }),
                    gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                        for (var i = 0 > argument ? argument + length : argument; ++i < length;) matchIndexes.push(i);
                        return matchIndexes
                    })
                }
            }, Expr.pseudos.nth = Expr.pseudos.eq;
            for (i in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) Expr.pseudos[i] = createInputPseudo(i);
            for (i in {
                    submit: !0,
                    reset: !0
                }) Expr.pseudos[i] = createButtonPseudo(i);
            return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                if (cached) return parseOnly ? 0 : cached.slice(0);
                for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) {
                    (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    }), soFar = soFar.slice(matched.length));
                    for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({
                        value: matched,
                        type: type,
                        matches: match
                    }), soFar = soFar.slice(matched.length));
                    if (!matched) break
                }
                return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
            }, compile = Sizzle.compile = function(selector, match) {
                var i, setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];
                if (!cached) {
                    for (match || (match = tokenize(selector)), i = match.length; i--;) cached = matcherFromTokens(match[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), cached.selector = selector
                }
                return cached
            }, select = Sizzle.select = function(selector, context, results, seed) {
                var i, tokens, token, type, find, compiled = "function" == typeof selector && selector,
                    match = !seed && tokenize(selector = compiled.selector || selector);
                if (results = results || [], 1 === match.length) {
                    if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                        if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) return results;
                        compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length)
                    }
                    for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], !Expr.relative[type = token.type]);)
                        if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                            if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), results;
                            break
                        }
                }
                return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), results
            }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
                return 1 & div1.compareDocumentPosition(document.createElement("div"))
            }), assert(function(div) {
                return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href")
            }) || addHandle("type|href|height|width", function(elem, name, isXML) {
                return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2)
            }), support.attributes && assert(function(div) {
                return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value")
            }) || addHandle("value", function(elem, name, isXML) {
                return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue
            }), assert(function(div) {
                return null == div.getAttribute("disabled")
            }) || addHandle(booleans, function(elem, name, isXML) {
                var val;
                return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
            }), Sizzle
        }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType
        }))
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [],
                self = this,
                len = self.length;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++)
                    if (jQuery.contains(self[i], this)) return !0
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1))
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0))
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length
        }
    });
    var rootjQuery, document = window.document,
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        init = jQuery.fn.init = function(selector, context) {
            var match, elem;
            if (!selector) return this;
            if ("string" == typeof selector) {
                if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                if (match[1]) {
                    if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                        for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                    return this
                }
                if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                    if (elem.id !== match[2]) return rootjQuery.find(selector);
                    this.length = 1, this[0] = elem
                }
                return this.context = document, this.selector = selector, this
            }
            return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
        };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        guaranteedUnique = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (void 0 === until || 1 !== cur.nodeType || !jQuery(cur).is(until));) 1 === cur.nodeType && matched.push(cur), cur = cur[dir];
            return matched
        },
        sibling: function(n, elem) {
            for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
            return r
        }
    }), jQuery.fn.extend({
        has: function(target) {
            var i, targets = jQuery(target, this),
                len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++)
                    if (jQuery.contains(this, targets[i])) return !0
            })
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++)
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break
                    }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return sibling(elem, "nextSibling")
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling")
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild)
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.unique(ret)), rparentsprev.test(name) && (ret = ret.reverse())), this.pushStack(ret)
        }
    });
    var rnotwhite = /\S+/g,
        optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
            stack = !options.once && [],
            fire = function(data) {
                for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++)
                    if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                        memory = !1;
                        break
                    }
                firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable())
            },
            self = {
                add: function() {
                    if (list) {
                        var start = list.length;
                        ! function add(args) {
                            jQuery.each(args, function(_, arg) {
                                var type = jQuery.type(arg);
                                "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg)
                            })
                        }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, fire(memory))
                    }
                    return this
                },
                remove: function() {
                    return list && jQuery.each(arguments, function(_, arg) {
                        for (var index;
                            (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--)
                    }), this
                },
                has: function(fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length)
                },
                empty: function() {
                    return list = [], firingLength = 0, this
                },
                disable: function() {
                    return list = stack = memory = void 0, this
                },
                disabled: function() {
                    return !list
                },
                lock: function() {
                    return stack = void 0, memory || self.disable(), this
                },
                locked: function() {
                    return !stack
                },
                fireWith: function(context, args) {
                    return !list || fired && !stack || (args = args || [], args = [context, args.slice ? args.slice() : args], firing ? stack.push(args) : fire(args)), this
                },
                fire: function() {
                    return self.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!fired
                }
            };
        return self
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state
                    },
                    always: function() {
                        return deferred.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                                })
                            }), fns = null
                        }).promise()
                    },
                    promise: function(obj) {
                        return null != obj ? jQuery.extend(obj, promise) : promise
                    }
                },
                deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this
                }, deferred[tuple[0] + "With"] = list.fireWith
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0,
                resolveValues = slice.call(arguments),
                length = resolveValues.length,
                remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
                deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
                updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values)
                    }
                };
            if (length > 1)
                for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0)
        },
        ready: function(wait) {
            if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                if (!document.body) return setTimeout(jQuery.ready);
                jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready")))
            }
        }
    }), jQuery.ready.promise = function(obj) {
        if (!readyList)
            if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready);
            else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1);
        else {
            document.attachEvent("onreadystatechange", completed), window.attachEvent("onload", completed);
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement
            } catch (e) {}
            top && top.doScroll && ! function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        top.doScroll("left")
                    } catch (e) {
                        return setTimeout(doScrollCheck, 50)
                    }
                    detach(), jQuery.ready()
                }
            }()
        }
        return readyList.promise(obj)
    };
    var i, strundefined = "undefined";
    for (i in jQuery(support)) break;
    support.ownLast = "0" !== i, support.inlineBlockNeedsLayout = !1, jQuery(function() {
            var val, div, body, container;
            body = document.getElementsByTagName("body")[0], body && body.style && (div = document.createElement("div"), container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", body.appendChild(container).appendChild(div), typeof div.style.zoom !== strundefined && (div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", support.inlineBlockNeedsLayout = val = 3 === div.offsetWidth, val && (body.style.zoom = 1)), body.removeChild(container))
        }),
        function() {
            var div = document.createElement("div");
            if (null == support.deleteExpando) {
                support.deleteExpando = !0;
                try {
                    delete div.test
                } catch (e) {
                    support.deleteExpando = !1
                }
            }
            div = null
        }(), jQuery.acceptData = function(elem) {
            var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
                nodeType = +elem.nodeType || 1;
            return 1 !== nodeType && 9 !== nodeType ? !1 : !noData || noData !== !0 && elem.getAttribute("classid") === noData
        };
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], !!elem && !isEmptyDataObject(elem)
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data)
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name)
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, !0)
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, !0)
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0],
                attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (i = attrs.length; i--;) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name])));
                    jQuery._data(elem, "parsedAttrs", !0)
                }
                return data
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key)
            }) : arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value)
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : void 0
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key)
            })
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || []) : void 0
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function() {
                    jQuery.dequeue(elem, type)
                };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue"), jQuery._removeData(elem, key)
                })
            })
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp, count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    --count || defer.resolveWith(elements, [elements])
                };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--;) tmp = jQuery._data(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj)
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        isHidden = function(elem, el) {
            return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem)
        },
        access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
                length = elems.length,
                bulk = null == key;
            if ("object" === jQuery.type(key)) {
                chainable = !0;
                for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw)
            } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                    return bulk.call(jQuery(elem), value)
                })), fn))
                for (; length > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
        },
        rcheckableType = /^(?:checkbox|radio)$/i;
    ! function() {
        var input = document.createElement("input"),
            div = document.createElement("div"),
            fragment = document.createDocumentFragment();
        if (div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", support.leadingWhitespace = 3 === div.firstChild.nodeType, support.tbody = !div.getElementsByTagName("tbody").length, support.htmlSerialize = !!div.getElementsByTagName("link").length, support.html5Clone = "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML, input.type = "checkbox", input.checked = !0, fragment.appendChild(input), support.appendChecked = input.checked, div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue, fragment.appendChild(div), div.innerHTML = "<input type='radio' checked='checked' name='t'/>", support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, support.noCloneEvent = !0, div.attachEvent && (div.attachEvent("onclick", function() {
                support.noCloneEvent = !1
            }), div.cloneNode(!0).click()), null == support.deleteExpando) {
            support.deleteExpando = !0;
            try {
                delete div.test
            } catch (e) {
                support.deleteExpando = !1
            }
        }
    }(),
    function() {
        var i, eventName, div = document.createElement("div");
        for (i in {
                submit: !0,
                change: !0,
                focusin: !0
            }) eventName = "on" + i, (support[i + "Bubbles"] = eventName in window) || (div.setAttribute(eventName, "t"), support[i + "Bubbles"] = div.attributes[eventName].expando === !1);
        div = null
    }();
    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (elemData) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                        return typeof jQuery === strundefined || e && jQuery.event.triggered === e.type ? void 0 : jQuery.event.dispatch.apply(eventHandle.elem, arguments)
                    }, eventHandle.elem = elem), types = (types || "").match(rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0);
                elem = null
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [""], t = types.length; t--;)
                    if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                        for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                        origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                    } else
                        for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"))
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                }
                for (i = 0;
                    (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType : special.bindType || type, handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), event.result === !1 && event.preventDefault());
                if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === !1) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                    tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type;
                    try {
                        elem[type]()
                    } catch (e) {}
                    jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp)
                }
                return event.result
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [],
                args = slice.call(arguments),
                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0;
                    (matched = handlerQueue[i++]) && !event.isPropagationStopped();)
                    for (event.currentTarget = matched.elem, j = 0;
                        (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();)(!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result
            }
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type))
                for (; cur != this; cur = cur.parentNode || this)
                    if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                        for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length), matches[sel] && matches.push(handleObj);
                        matches.length && handlerQueue.push({
                            elem: cur,
                            handlers: matches
                        })
                    }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button,
                    fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result)
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event, event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), e.isDefaultPrevented() && event.preventDefault()
        }
    }, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1)
    } : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && (typeof elem[name] === strundefined && (elem[name] = null), elem.detachEvent(name, handle))
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void(this[jQuery.expando] = !0)) : new jQuery.Event(src, props)
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
            }
        }
    }), support.submitBubbles || (jQuery.event.special.submit = {
        setup: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target,
                    form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : void 0;
                form && !jQuery._data(form, "submitBubbles") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submit_bubble = !0
                }), jQuery._data(form, "submitBubbles", !0))
            })
        },
        postDispatch: function(event) {
            event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0))
        },
        teardown: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit")
        }
    }), support.changeBubbles || (jQuery.event.special.change = {
        setup: function() {
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0)
            }), jQuery.event.add(this, "click._change", function(event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0)
            })), !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0)
                }), jQuery._data(elem, "changeBubbles", !0))
            })
        },
        handle: function(event) {
            var elem = event.target;
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName)
        }
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0)
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this,
                    attaches = jQuery._data(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), jQuery._data(doc, fix, (attaches || 0) + 1)
            },
            teardown: function() {
                var doc = this.ownerDocument || this,
                    attaches = jQuery._data(doc, fix) - 1;
                attaches ? jQuery._data(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), jQuery._removeData(doc, fix))
            }
        }
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse;
            else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments)
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0
        }
    });
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(support.noCloneEvent && support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                for (destElements = getAll(clone), srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
            if (dataAndEvents)
                if (deepDataAndEvents)
                    for (srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]);
                else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), destElements = srcElements = node = null, clone
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; l > i; i++)
                if (elem = elems[i], elem || 0 === elem)
                    if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                    else if (rhtml.test(elem)) {
                for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
                if (!support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), !support.tbody)
                    for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild, j = elem && elem.childNodes.length; j--;) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild;) tmp.removeChild(tmp.firstChild);
                tmp = safe.lastChild
            } else nodes.push(context.createTextNode(elem));
            for (tmp && safe.removeChild(tmp), support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), i = 0; elem = nodes[i++];)
                if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts))
                    for (j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem);
            return tmp = null, safe
        },
        cleanData: function(elems, acceptData) {
            for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++)
                if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], data = id && cache[id])) {
                    if (data.events)
                        for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : typeof elem.removeAttribute !== strundefined ? elem.removeAttribute(internalKey) : elem[internalKey] = null, deletedIds.push(id))
                }
        }
    }), jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
            }, null, value, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling)
            })
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), elem.parentNode.removeChild(elem));
            return this
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) {
                for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild;) elem.removeChild(elem.firstChild);
                elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0)
            }
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;
                if (void 0 === value) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : void 0;
                if (!("string" != typeof value || rnoInnerhtml.test(value) || !support.htmlSerialize && rnoshimcache.test(value) || !support.leadingWhitespace && rleadingWhitespace.test(value) || wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()])) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
                        elem = 0
                    } catch (e) {}
                }
                elem && this.empty().append(value)
            }, null, value, arguments.length)
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this)
            }), arg && (arg.length || arg.nodeType) ? this : this.remove()
        },
        detach: function(selector) {
            return this.remove(selector, !0)
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback)
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(this[i], node, i);
                if (hasScripts)
                    for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
                fragment = first = null
            }
            return this
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; last >= i; i++) elems = i === last ? this : this.clone(!0), jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret)
        }
    });
    var iframe, elemdisplay = {};
    ! function() {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function() {
            if (null != shrinkWrapBlocksVal) return shrinkWrapBlocksVal;
            shrinkWrapBlocksVal = !1;
            var div, body, container;
            return body = document.getElementsByTagName("body")[0], body && body.style ? (div = document.createElement("div"), container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", body.appendChild(container).appendChild(div), typeof div.style.zoom !== strundefined && (div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", div.appendChild(document.createElement("div")).style.width = "5px", shrinkWrapBlocksVal = 3 !== div.offsetWidth), body.removeChild(container), shrinkWrapBlocksVal) : void 0
        }
    }();
    var getStyles, curCSS, rmargin = /^margin/,
        rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
        rposition = /^(top|right|bottom|left)$/;
    window.getComputedStyle ? (getStyles = function(elem) {
            return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
        }, curCSS = function(elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            return computed = computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : void 0, computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), void 0 === ret ? ret : ret + ""
        }) : document.documentElement.currentStyle && (getStyles = function(elem) {
            return elem.currentStyle
        }, curCSS = function(elem, name, computed) {
            var left, rs, rsLeft, ret, style = elem.style;
            return computed = computed || getStyles(elem), ret = computed ? computed[name] : void 0, null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, rsLeft && (rs.left = rsLeft)), void 0 === ret ? ret : ret + "" || "auto"
        }),
        function() {
            function computeStyleTests() {
                var div, body, container, contents;
                body = document.getElementsByTagName("body")[0], body && body.style && (div = document.createElement("div"), container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", body.appendChild(container).appendChild(div), div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", pixelPositionVal = boxSizingReliableVal = !1, reliableMarginRightVal = !0, window.getComputedStyle && (pixelPositionVal = "1%" !== (window.getComputedStyle(div, null) || {}).top, boxSizingReliableVal = "4px" === (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width, contents = div.appendChild(document.createElement("div")), contents.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", contents.style.marginRight = contents.style.width = "0", div.style.width = "1px", reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents, null) || {}).marginRight)), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", contents = div.getElementsByTagName("td"), contents[0].style.cssText = "margin:0;border:0;padding:0;display:none", reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight, reliableHiddenOffsetsVal && (contents[0].style.display = "", contents[1].style.display = "none", reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight), body.removeChild(container))
            }
            var div, style, a, pixelPositionVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal;
            div = document.createElement("div"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = div.getElementsByTagName("a")[0], style = a && a.style, style && (style.cssText = "float:left;opacity:.5", support.opacity = "0.5" === style.opacity, support.cssFloat = !!style.cssFloat, div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, support.boxSizing = "" === style.boxSizing || "" === style.MozBoxSizing || "" === style.WebkitBoxSizing, jQuery.extend(support, {
                reliableHiddenOffsets: function() {
                    return null == reliableHiddenOffsetsVal && computeStyleTests(), reliableHiddenOffsetsVal
                },
                boxSizingReliable: function() {
                    return null == boxSizingReliableVal && computeStyleTests(), boxSizingReliableVal
                },
                pixelPosition: function() {
                    return null == pixelPositionVal && computeStyleTests(), pixelPositionVal
                },
                reliableMarginRight: function() {
                    return null == reliableMarginRightVal && computeStyleTests(), reliableMarginRightVal
                }
            }))
        }(), jQuery.swap = function(elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
            ret = callback.apply(elem, args || []);
            for (name in options) elem.style[name] = old[name];
            return ret
        };
    var ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
        rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name),
                    style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value) return hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name];
                if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), !(hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra))))) try {
                    style[name] = value
                } catch (e) {}
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val
        }
    }), jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra)
                }) : getWidthOrHeight(elem, name, extra) : void 0
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0)
            }
        }
    }), support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : ""
        },
        set: function(elem, value) {
            var style = elem.style,
                currentStyle = elem.currentStyle,
                opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "",
                filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1, (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity)
        }
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [elem, "marginRight"]) : void 0
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber)
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {},
                    i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }, name, value, arguments.length > 1)
        },
        show: function() {
            return showHide(this, !0)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result : 0) : tween.elem[tween.prop]
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now)
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function(prop, value) {
                var tween = this.createTween(prop, value),
                    target = tween.cur(),
                    parts = rfxnum.exec(value),
                    unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                    start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
                    scale = 1,
                    maxIterations = 20;
                if (start && start[3] !== unit) {
                    unit = unit || start[3], parts = parts || [], start = +target || 1;
                    do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations)
                }
                return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween
            }]
        };
    jQuery.Animation = jQuery.extend(Animation, {
            tweener: function(props, callback) {
                jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.split(" ");
                for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback)
            },
            prefilter: function(callback, prepend) {
                prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback)
            }
        }), jQuery.speed = function(speed, easing, fn) {
            var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
                jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue)
            }, opt
        }, jQuery.fn.extend({
            fadeTo: function(speed, to, easing, callback) {
                return this.filter(isHidden).css("opacity", 0).show().end().animate({
                    opacity: to
                }, speed, easing, callback)
            },
            animate: function(prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop),
                    optall = jQuery.speed(speed, easing, callback),
                    doAnimation = function() {
                        var anim = Animation(this, jQuery.extend({}, prop), optall);
                        (empty || jQuery._data(this, "finish")) && anim.stop(!0)
                    };
                return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
            },
            stop: function(type, clearQueue, gotoEnd) {
                var stopQueue = function(hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop, stop(gotoEnd)
                };
                return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                    var dequeue = !0,
                        index = null != type && type + "queueHooks",
                        timers = jQuery.timers,
                        data = jQuery._data(this);
                    if (index) data[index] && data[index].stop && stopQueue(data[index]);
                    else
                        for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                    for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1));
                    (dequeue || !gotoEnd) && jQuery.dequeue(this, type)
                })
            },
            finish: function(type) {
                return type !== !1 && (type = type || "fx"), this.each(function() {
                    var index, data = jQuery._data(this),
                        queue = data[type + "queue"],
                        hooks = data[type + "queueHooks"],
                        timers = jQuery.timers,
                        length = queue ? queue.length : 0;
                    for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1));
                    for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                    delete data.finish
                })
            }
        }), jQuery.each(["toggle", "show", "hide"], function(i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function(speed, easing, callback) {
                return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback)
            }
        }), jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(name, props) {
            jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback)
            }
        }), jQuery.timers = [], jQuery.fx.tick = function() {
            var timer, timers = jQuery.timers,
                i = 0;
            for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
            timers.length || jQuery.fx.stop(), fxNow = void 0
        }, jQuery.fx.timer = function(timer) {
            jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop()
        }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
            timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
        }, jQuery.fx.stop = function() {
            clearInterval(timerId), timerId = null
        }, jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, jQuery.fn.delay = function(time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout)
                }
            })
        },
        function() {
            var input, div, select, a, opt;
            div = document.createElement("div"), div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = div.getElementsByTagName("a")[0], select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], a.style.cssText = "top:1px", support.getSetAttribute = "t" !== div.className, support.style = /top/.test(a.getAttribute("style")), support.hrefNormalized = "/a" === a.getAttribute("href"), support.checkOn = !!input.value, support.optSelected = opt.selected, support.enctype = !!document.createElement("form").enctype, select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), input.setAttribute("value", ""), support.input = "" === input.getAttribute("value"), input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value
        }();
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0]; {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + ""
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val))
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem))
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++)
                        if (option = options[i], !(!option.selected && i !== index || (support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                            if (value = jQuery(option).val(), one) return value;
                            values.push(value)
                        }
                    return values
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--;)
                        if (option = options[i], jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) try {
                            option.selected = optionSet = !0
                        } catch (_) {
                            option.scrollHeight
                        } else option.selected = !1;
                    return optionSet || (elem.selectedIndex = -1), options
                }
            }
        }
    }), jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value
        })
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = support.getSetAttribute,
        getSetInput = support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), value) : void jQuery.removeAttr(elem, name))
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0,
                attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType)
                for (; name = attrNames[i++];) propName = jQuery.propFix[name] || name, jQuery.expr.match.bool.test(name) ? getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem[propName] = !1 : elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : jQuery.attr(elem, name, ""), elem.removeAttribute(getSetAttribute ? name : propName)
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value
                    }
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0, name
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, attrHandle[name] = handle), ret
        } : function(elem, name, isXML) {
            return isXML ? void 0 : elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null
        }
    }), getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
        set: function(elem, value, name) {
            return jQuery.nodeName(elem, "input") ? void(elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name)
        }
    }), getSetAttribute || (nodeHook = {
        set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), ret.value = value += "", "value" === name || value === elem.getAttribute(name) ? value : void 0
        }
    }, attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
        var ret;
        return isXML ? void 0 : (ret = elem.getAttributeNode(name)) && "" !== ret.value ? ret.value : null
    }, jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            return ret && ret.specified ? ret.value : void 0
        },
        set: nodeHook.set
    }, jQuery.attrHooks.contenteditable = {
        set: function(elem, value, name) {
            nodeHook.set(elem, "" === value ? !1 : value, name)
        }
    }, jQuery.each(["width", "height"], function(i, name) {
        jQuery.attrHooks[name] = {
            set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0
            }
        }
    })), support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || void 0
        },
        set: function(elem, value) {
            return elem.style.cssText = value + ""
        }
    });
    var rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name, this.each(function() {
                try {
                    this[name] = void 0, delete this[name]
                } catch (e) {}
            })
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name]
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1
                }
            }
        }
    }), support.hrefNormalized || jQuery.each(["href", "src"], function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4)
            }
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), null
        }
    }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this
    }), support.enctype || (jQuery.propFix.enctype = "encoding");
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0,
                len = this.length,
                proceed = "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className))
            });
            if (proceed)
                for (classes = (value || "").match(rnotwhite) || []; len > i; i++)
                    if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                        for (j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                        finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue)
                    }
            return this
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0,
                len = this.length,
                proceed = 0 === arguments.length || "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className))
            });
            if (proceed)
                for (classes = (value || "").match(rnotwhite) || []; len > i; i++)
                    if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                        for (j = 0; clazz = classes[j++];)
                            for (; cur.indexOf(" " + clazz + " ") >= 0;) cur = cur.replace(" " + clazz + " ", " ");
                        finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue)
                    }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
            } : function() {
                if ("string" === type)
                    for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++];) self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                else(type === strundefined || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "")
            })
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++)
                if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1
        }
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
        }
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn)
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        }
    });
    var nonce = jQuery.now(),
        rquery = /\?/,
        rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function(data) {
        if (window.JSON && window.JSON.parse) return window.JSON.parse(data + "");
        var requireNonComma, depth = null,
            str = jQuery.trim(data + "");
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            return requireNonComma && comma && (depth = 0), 0 === depth ? token : (requireNonComma = open || comma, depth += !close - !open, "")
        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data)
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            window.DOMParser ? (tmp = new DOMParser, xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), xml.async = "false", xml.loadXML(data))
        } catch (e) {
            xml = void 0
        }
        return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), xml
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                requestHeaders = {},
                requestHeadersNames = {},
                state = 0,
                strAbort = "canceled",
                jqXHR = {
                    readyState: 0,
                    getResponseHeader: function(key) {
                        var match;
                        if (2 === state) {
                            if (!responseHeaders)
                                for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                            match = responseHeaders[key.toLowerCase()]
                        }
                        return null == match ? null : match
                    },
                    getAllResponseHeaders: function() {
                        return 2 === state ? responseHeadersString : null
                    },
                    setRequestHeader: function(name, value) {
                        var lname = name.toLowerCase();
                        return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this
                    },
                    overrideMimeType: function(type) {
                        return state || (s.mimeType = type), this
                    },
                    statusCode: function(map) {
                        var code;
                        if (map)
                            if (2 > state)
                                for (code in map) statusCode[code] = [statusCode[code], map[code]];
                            else jqXHR.always(map[jqXHR.status]);
                        return this
                    },
                    abort: function(statusText) {
                        var finalText = statusText || strAbort;
                        return transport && transport.abort(finalText), done(0, finalText), this
                    }
                };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""], null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout")
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done)
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e)
                }
            } else done(-1, "No Transport");
            return jqXHR
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script")
        }
    }), jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            })
        }
    }), jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn)
        }
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i))
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType;) elem = elem.firstChild;
                    return elem
                }).append(this)
            }
            return this
        },
        wrapInner: function(html) {
            return this.each(jQuery.isFunction(html) ? function(i) {
                jQuery(this).wrapInner(html.call(this, i))
            } : function() {
                var self = jQuery(this),
                    contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html)
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !support.reliableHiddenOffsets() && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"))
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem)
    };
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [],
            add = function(key, value) {
                value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
            };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value)
        });
        else
            for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+")
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    }), jQuery.ajaxSettings.xhr = void 0 !== window.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR()
    } : createStandardXHR;
    var xhrId = 0,
        xhrCallbacks = {},
        xhrSupported = jQuery.ajaxSettings.xhr();
    window.ActiveXObject && jQuery(window).on("unload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key](void 0, !0)
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, xhrSupported = support.ajax = !!xhrSupported, xhrSupported && jQuery.ajaxTransport(function(options) {
        if (!options.crossDomain || support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(),
                        id = ++xhrId;
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields)
                        for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                    options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    for (i in headers) void 0 !== headers[i] && xhr.setRequestHeader(i, headers[i] + "");
                    xhr.send(options.hasContent && options.data || null), callback = function(_, isAbort) {
                        var status, statusText, responses;
                        if (callback && (isAbort || 4 === xhr.readyState))
                            if (delete xhrCallbacks[id], callback = void 0, xhr.onreadystatechange = jQuery.noop, isAbort) 4 !== xhr.readyState && xhr.abort();
                            else {
                                responses = {}, status = xhr.status, "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                                try {
                                    statusText = xhr.statusText
                                } catch (e) {
                                    statusText = ""
                                }
                                status || !options.isLocal || options.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404
                            }
                        responses && complete(status, statusText, responses, xhr.getAllResponseHeaders())
                    }, options.async ? 4 === xhr.readyState ? setTimeout(callback) : xhr.onreadystatechange = xhrCallbacks[id] = callback : callback()
                },
                abort: function() {
                    callback && callback(void 0, !0)
                }
            }
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1)
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"), script.async = !0, s.scriptCharset && (script.charset = s.scriptCharset), script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"))
                    }, head.insertBefore(script, head.firstChild)
                },
                abort: function() {
                    script && script.onload(void 0, !0)
                }
            }
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0]
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = void 0
        }), "script") : void 0
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];
        return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes))
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, response, type, self = this,
            off = url.indexOf(" ");
        return off >= 0 && (selector = jQuery.trim(url.slice(off, url.length)), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [jqXHR.responseText, status, jqXHR])
        }), this
    }, jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem
        }).length
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1, calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i)
            });
            var docElem, win, box = {
                    top: 0,
                    left: 0
                },
                elem = this[0],
                doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), win = getWindow(doc), {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            }) : box
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, parentOffset = {
                        top: 0,
                        left: 0
                    },
                    elem = this[0];
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem
            })
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void(win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val)
            }, method, val, arguments.length, null)
        }
    }), jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0
        })
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
                    extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                }, type, chainable ? margin : void 0, chainable, null)
            }
        })
    }), jQuery.fn.size = function() {
        return this.length
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery
    });
    var _jQuery = window.jQuery,
        _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery
}),
/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
}(function($) {
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        return "area" === nodeName ? (map = element.parentNode, mapName = map.name, element.href && mapName && "map" === map.nodeName.toLowerCase() ? (img = $("img[usemap='#" + mapName + "']")[0], !!img && visible(img)) : !1) : (/^(input|select|textarea|button|object)$/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element)
    }

    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
            return "hidden" === $.css(this, "visibility")
        }).length
    }
    $.ui = $.ui || {}, $.extend($.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), $.fn.extend({
        scrollParent: function(includeHidden) {
            var position = this.css("position"),
                excludeStaticParent = "absolute" === position,
                overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                scrollParent = this.parents().filter(function() {
                    var parent = $(this);
                    return excludeStaticParent && "static" === parent.css("position") ? !1 : overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"))
                }).eq(0);
            return "fixed" !== position && scrollParent.length ? scrollParent : $(this[0].ownerDocument || document)
        },
        uniqueId: function() {
            var uuid = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++uuid)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && $(this).removeAttr("id")
            })
        }
    }), $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName)
            }
        }) : function(elem, i, match) {
            return !!$.data(elem, match[3])
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")))
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
        }
    }), $("<a>").outerWidth(1).jquery || $.each(["Width", "Height"], function(i, name) {
        function reduce(elem, size, border, margin) {
            return $.each(side, function() {
                size -= parseFloat($.css(elem, "padding" + this)) || 0, border && (size -= parseFloat($.css(elem, "border" + this + "Width")) || 0), margin && (size -= parseFloat($.css(elem, "margin" + this)) || 0)
            }), size
        }
        var side = "Width" === name ? ["Left", "Right"] : ["Top", "Bottom"],
            type = name.toLowerCase(),
            orig = {
                innerWidth: $.fn.innerWidth,
                innerHeight: $.fn.innerHeight,
                outerWidth: $.fn.outerWidth,
                outerHeight: $.fn.outerHeight
            };
        $.fn["inner" + name] = function(size) {
            return void 0 === size ? orig["inner" + name].call(this) : this.each(function() {
                $(this).css(type, reduce(this, size) + "px")
            })
        }, $.fn["outer" + name] = function(size, margin) {
            return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function() {
                $(this).css(type, reduce(this, size, !0, margin) + "px")
            })
        }
    }), $.fn.addBack || ($.fn.addBack = function(selector) {
        return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
    }), $("<a>").data("a-b", "a").removeData("a-b").data("a-b") && ($.fn.removeData = function(removeData) {
        return function(key) {
            return arguments.length ? removeData.call(this, $.camelCase(key)) : removeData.call(this)
        }
    }($.fn.removeData)), $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), $.fn.extend({
        focus: function(orig) {
            return function(delay, fn) {
                return "number" == typeof delay ? this.each(function() {
                    var elem = this;
                    setTimeout(function() {
                        $(elem).focus(), fn && fn.call(elem)
                    }, delay)
                }) : orig.apply(this, arguments)
            }
        }($.fn.focus),
        disableSelection: function() {
            var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(eventType + ".ui-disableSelection", function(event) {
                    event.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(zIndex) {
            if (void 0 !== zIndex) return this.css("zIndex", zIndex);
            if (this.length)
                for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document;) {
                    if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), !isNaN(value) && 0 !== value)) return value;
                    elem = elem.parent()
                }
            return 0
        }
    }), $.ui.plugin = {
        add: function(module, option, set) {
            var i, proto = $.ui[module].prototype;
            for (i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([option, set[i]])
        },
        call: function(instance, name, args, allowDisconnected) {
            var i, set = instance.plugins[name];
            if (set && (allowDisconnected || instance.element[0].parentNode && 11 !== instance.element[0].parentNode.nodeType))
                for (i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args)
        }
    }
}),
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
}(function($) {
    var widget_uuid = 0,
        widget_slice = Array.prototype.slice;
    return $.cleanData = function(orig) {
        return function(elems) {
            var events, elem, i;
            for (i = 0; null != (elem = elems[i]); i++) try {
                events = $._data(elem, "events"), events && events.remove && $(elem).triggerHandler("remove")
            } catch (e) {}
            orig(elems)
        }
    }($.cleanData), $.widget = function(name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {},
            namespace = name.split(".")[0];
        return name = name.split(".")[1], fullName = namespace + "-" + name, prototype || (prototype = base, base = $.Widget), $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName)
        }, $[namespace] = $[namespace] || {}, existingConstructor = $[namespace][name], constructor = $[namespace][name] = function(options, element) {
            return this._createWidget ? void(arguments.length && this._createWidget(options, element)) : new constructor(options, element)
        }, $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        }), basePrototype = new base, basePrototype.options = $.widget.extend({}, basePrototype.options), $.each(prototype, function(prop, value) {
            return $.isFunction(value) ? void(proxiedPrototype[prop] = function() {
                var _super = function() {
                        return base.prototype[prop].apply(this, arguments)
                    },
                    _superApply = function(args) {
                        return base.prototype[prop].apply(this, args)
                    };
                return function() {
                    var returnValue, __super = this._super,
                        __superApply = this._superApply;
                    return this._super = _super, this._superApply = _superApply, returnValue = value.apply(this, arguments), this._super = __super, this._superApply = __superApply, returnValue
                }
            }()) : void(proxiedPrototype[prop] = value)
        }), constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        }), existingConstructor ? ($.each(existingConstructor._childConstructors, function(i, child) {
            var childPrototype = child.prototype;
            $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto)
        }), delete existingConstructor._childConstructors) : base._childConstructors.push(constructor), $.widget.bridge(name, constructor), constructor
    }, $.widget.extend = function(target) {
        for (var key, value, input = widget_slice.call(arguments, 1), inputIndex = 0, inputLength = input.length; inputLength > inputIndex; inputIndex++)
            for (key in input[inputIndex]) value = input[inputIndex][key], input[inputIndex].hasOwnProperty(key) && void 0 !== value && (target[key] = $.isPlainObject(value) ? $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value) : value);
        return target
    }, $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = "string" == typeof options,
                args = widget_slice.call(arguments, 1),
                returnValue = this;
            return isMethodCall ? this.each(function() {
                var methodValue, instance = $.data(this, fullName);
                return "instance" === options ? (returnValue = instance, !1) : instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? (methodValue = instance[options].apply(instance, args), methodValue !== instance && void 0 !== methodValue ? (returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue, !1) : void 0) : $.error("no such method '" + options + "' for " + name + " widget instance") : $.error("cannot call methods on " + name + " prior to initialization; attempted to call method '" + options + "'")
            }) : (args.length && (options = $.widget.extend.apply(null, [options].concat(args))), this.each(function() {
                var instance = $.data(this, fullName);
                instance ? (instance.option(options || {}), instance._init && instance._init()) : $.data(this, fullName, new object(options, this))
            })), returnValue
        }
    }, $.Widget = function() {}, $.Widget._childConstructors = [], $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0], this.element = $(element), this.uuid = widget_uuid++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = $(), this.hoverable = $(), this.focusable = $(), element !== this && ($.data(element, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(event) {
                    event.target === element && this.destroy()
                }
            }), this.document = $(element.style ? element.ownerDocument : element.document || element), this.window = $(this.document[0].defaultView || this.document[0].parentWindow)), this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: $.noop,
        widget: function() {
            return this.element
        },
        option: function(key, value) {
            var parts, curOption, i, options = key;
            if (0 === arguments.length) return $.widget.extend({}, this.options);
            if ("string" == typeof key)
                if (options = {}, parts = key.split("."), key = parts.shift(), parts.length) {
                    for (curOption = options[key] = $.widget.extend({}, this.options[key]), i = 0; i < parts.length - 1; i++) curOption[parts[i]] = curOption[parts[i]] || {}, curOption = curOption[parts[i]];
                    if (key = parts.pop(), 1 === arguments.length) return void 0 === curOption[key] ? null : curOption[key];
                    curOption[key] = value
                } else {
                    if (1 === arguments.length) return void 0 === this.options[key] ? null : this.options[key];
                    options[key] = value
                }
            return this._setOptions(options), this
        },
        _setOptions: function(options) {
            var key;
            for (key in options) this._setOption(key, options[key]);
            return this
        },
        _setOption: function(key, value) {
            return this.options[key] = value, "disabled" === key && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!value), value && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            "boolean" != typeof suppressDisabledCheck && (handlers = element, element = suppressDisabledCheck, suppressDisabledCheck = !1), handlers ? (element = delegateElement = $(element), this.bindings = this.bindings.add(element)) : (handlers = element, element = this.element, delegateElement = this.widget()), $.each(handlers, function(event, handler) {
                function handlerProxy() {
                    return suppressDisabledCheck || instance.options.disabled !== !0 && !$(this).hasClass("ui-state-disabled") ? ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments) : void 0
                }
                "string" != typeof handler && (handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++);
                var match = event.match(/^([\w:-]*)\s*(.*)$/),
                    eventName = match[1] + instance.eventNamespace,
                    selector = match[2];
                selector ? delegateElement.delegate(selector, eventName, handlerProxy) : element.bind(eventName, handlerProxy)
            })
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, element.unbind(eventName).undelegate(eventName), this.bindings = $(this.bindings.not(element).get()), this.focusable = $(this.focusable.not(element).get()), this.hoverable = $(this.hoverable.not(element).get())
        },
        _delay: function(handler, delay) {
            function handlerProxy() {
                return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments)
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0)
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element), this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element), this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(), event.target = this.element[0], orig = event.originalEvent)
                for (prop in orig) prop in event || (event[prop] = orig[prop]);
            return this.element.trigger(event, data), !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === !1 || event.isDefaultPrevented())
        }
    }, $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            "string" == typeof options && (options = {
                effect: options
            });
            var hasOptions, effectName = options ? options === !0 || "number" == typeof options ? defaultEffect : options.effect || defaultEffect : method;
            options = options || {}, "number" == typeof options && (options = {
                duration: options
            }), hasOptions = !$.isEmptyObject(options), options.complete = callback, options.delay && element.delay(options.delay), hasOptions && $.effects && $.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function(next) {
                $(this)[method](), callback && callback.call(element[0]), next()
            })
        }
    }), $.widget
}),
/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
}(function($) {
    return function() {
        function getOffsets(offsets, width, height) {
            return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)]
        }

        function parseCss(element, property) {
            return parseInt($.css(element, property), 10) || 0
        }

        function getDimensions(elem) {
            var raw = elem[0];
            return 9 === raw.nodeType ? {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : $.isWindow(raw) ? {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: elem.scrollTop(),
                    left: elem.scrollLeft()
                }
            } : raw.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: raw.pageY,
                    left: raw.pageX
                }
            } : {
                width: elem.outerWidth(),
                height: elem.outerHeight(),
                offset: elem.offset()
            }
        }
        $.ui = $.ui || {};
        var cachedScrollbarWidth, supportsOffsetFractions, max = Math.max,
            abs = Math.abs,
            round = Math.round,
            rhorizontal = /left|center|right/,
            rvertical = /top|center|bottom/,
            roffset = /[\+\-]\d+(\.[\d]+)?%?/,
            rposition = /^\w+/,
            rpercent = /%$/,
            _position = $.fn.position;
        $.position = {
                scrollbarWidth: function() {
                    if (void 0 !== cachedScrollbarWidth) return cachedScrollbarWidth;
                    var w1, w2, div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        innerDiv = div.children()[0];
                    return $("body").append(div), w1 = innerDiv.offsetWidth, div.css("overflow", "scroll"), w2 = innerDiv.offsetWidth, w1 === w2 && (w2 = div[0].clientWidth), div.remove(), cachedScrollbarWidth = w1 - w2
                },
                getScrollInfo: function(within) {
                    var overflowX = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x"),
                        overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y"),
                        hasOverflowX = "scroll" === overflowX || "auto" === overflowX && within.width < within.element[0].scrollWidth,
                        hasOverflowY = "scroll" === overflowY || "auto" === overflowY && within.height < within.element[0].scrollHeight;
                    return {
                        width: hasOverflowY ? $.position.scrollbarWidth() : 0,
                        height: hasOverflowX ? $.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(element) {
                    var withinElement = $(element || window),
                        isWindow = $.isWindow(withinElement[0]),
                        isDocument = !!withinElement[0] && 9 === withinElement[0].nodeType;
                    return {
                        element: withinElement,
                        isWindow: isWindow,
                        isDocument: isDocument,
                        offset: withinElement.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: withinElement.scrollLeft(),
                        scrollTop: withinElement.scrollTop(),
                        width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
                        height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
                    }
                }
            }, $.fn.position = function(options) {
                if (!options || !options.of) return _position.apply(this, arguments);
                options = $.extend({}, options);
                var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions, target = $(options.of),
                    within = $.position.getWithinInfo(options.within),
                    scrollInfo = $.position.getScrollInfo(within),
                    collision = (options.collision || "flip").split(" "),
                    offsets = {};
                return dimensions = getDimensions(target), target[0].preventDefault && (options.at = "left top"), targetWidth = dimensions.width, targetHeight = dimensions.height, targetOffset = dimensions.offset, basePosition = $.extend({}, targetOffset), $.each(["my", "at"], function() {
                    var horizontalOffset, verticalOffset, pos = (options[this] || "").split(" ");
                    1 === pos.length && (pos = rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"]), pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center", pos[1] = rvertical.test(pos[1]) ? pos[1] : "center", horizontalOffset = roffset.exec(pos[0]), verticalOffset = roffset.exec(pos[1]), offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0], options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]]
                }), 1 === collision.length && (collision[1] = collision[0]), "right" === options.at[0] ? basePosition.left += targetWidth : "center" === options.at[0] && (basePosition.left += targetWidth / 2), "bottom" === options.at[1] ? basePosition.top += targetHeight : "center" === options.at[1] && (basePosition.top += targetHeight / 2), atOffset = getOffsets(offsets.at, targetWidth, targetHeight), basePosition.left += atOffset[0], basePosition.top += atOffset[1], this.each(function() {
                    var collisionPosition, using, elem = $(this),
                        elemWidth = elem.outerWidth(),
                        elemHeight = elem.outerHeight(),
                        marginLeft = parseCss(this, "marginLeft"),
                        marginTop = parseCss(this, "marginTop"),
                        collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width,
                        collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height,
                        position = $.extend({}, basePosition),
                        myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
                    "right" === options.my[0] ? position.left -= elemWidth : "center" === options.my[0] && (position.left -= elemWidth / 2), "bottom" === options.my[1] ? position.top -= elemHeight : "center" === options.my[1] && (position.top -= elemHeight / 2), position.left += myOffset[0], position.top += myOffset[1], supportsOffsetFractions || (position.left = round(position.left), position.top = round(position.top)), collisionPosition = {
                        marginLeft: marginLeft,
                        marginTop: marginTop
                    }, $.each(["left", "top"], function(i, dir) {
                        $.ui.position[collision[i]] && $.ui.position[collision[i]][dir](position, {
                            targetWidth: targetWidth,
                            targetHeight: targetHeight,
                            elemWidth: elemWidth,
                            elemHeight: elemHeight,
                            collisionPosition: collisionPosition,
                            collisionWidth: collisionWidth,
                            collisionHeight: collisionHeight,
                            offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                            my: options.my,
                            at: options.at,
                            within: within,
                            elem: elem
                        })
                    }), options.using && (using = function(props) {
                        var left = targetOffset.left - position.left,
                            right = left + targetWidth - elemWidth,
                            top = targetOffset.top - position.top,
                            bottom = top + targetHeight - elemHeight,
                            feedback = {
                                target: {
                                    element: target,
                                    left: targetOffset.left,
                                    top: targetOffset.top,
                                    width: targetWidth,
                                    height: targetHeight
                                },
                                element: {
                                    element: elem,
                                    left: position.left,
                                    top: position.top,
                                    width: elemWidth,
                                    height: elemHeight
                                },
                                horizontal: 0 > right ? "left" : left > 0 ? "right" : "center",
                                vertical: 0 > bottom ? "top" : top > 0 ? "bottom" : "middle"
                            };
                        elemWidth > targetWidth && abs(left + right) < targetWidth && (feedback.horizontal = "center"), elemHeight > targetHeight && abs(top + bottom) < targetHeight && (feedback.vertical = "middle"), feedback.important = max(abs(left), abs(right)) > max(abs(top), abs(bottom)) ? "horizontal" : "vertical", options.using.call(this, props, feedback)
                    }), elem.offset($.extend(position, {
                        using: using
                    }))
                })
            }, $.ui.position = {
                fit: {
                    left: function(position, data) {
                        var newOverRight, within = data.within,
                            withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                            outerWidth = within.width,
                            collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                            overLeft = withinOffset - collisionPosLeft,
                            overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
                        data.collisionWidth > outerWidth ? overLeft > 0 && 0 >= overRight ? (newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset, position.left += overLeft - newOverRight) : position.left = overRight > 0 && 0 >= overLeft ? withinOffset : overLeft > overRight ? withinOffset + outerWidth - data.collisionWidth : withinOffset : overLeft > 0 ? position.left += overLeft : overRight > 0 ? position.left -= overRight : position.left = max(position.left - collisionPosLeft, position.left)
                    },
                    top: function(position, data) {
                        var newOverBottom, within = data.within,
                            withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                            outerHeight = data.within.height,
                            collisionPosTop = position.top - data.collisionPosition.marginTop,
                            overTop = withinOffset - collisionPosTop,
                            overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
                        data.collisionHeight > outerHeight ? overTop > 0 && 0 >= overBottom ? (newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset, position.top += overTop - newOverBottom) : position.top = overBottom > 0 && 0 >= overTop ? withinOffset : overTop > overBottom ? withinOffset + outerHeight - data.collisionHeight : withinOffset : overTop > 0 ? position.top += overTop : overBottom > 0 ? position.top -= overBottom : position.top = max(position.top - collisionPosTop, position.top)
                    }
                },
                flip: {
                    left: function(position, data) {
                        var newOverRight, newOverLeft, within = data.within,
                            withinOffset = within.offset.left + within.scrollLeft,
                            outerWidth = within.width,
                            offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                            collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                            overLeft = collisionPosLeft - offsetLeft,
                            overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                            myOffset = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0,
                            atOffset = "left" === data.at[0] ? data.targetWidth : "right" === data.at[0] ? -data.targetWidth : 0,
                            offset = -2 * data.offset[0];
                        0 > overLeft ? (newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset, (0 > newOverRight || newOverRight < abs(overLeft)) && (position.left += myOffset + atOffset + offset)) : overRight > 0 && (newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft, (newOverLeft > 0 || abs(newOverLeft) < overRight) && (position.left += myOffset + atOffset + offset))
                    },
                    top: function(position, data) {
                        var newOverTop, newOverBottom, within = data.within,
                            withinOffset = within.offset.top + within.scrollTop,
                            outerHeight = within.height,
                            offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                            collisionPosTop = position.top - data.collisionPosition.marginTop,
                            overTop = collisionPosTop - offsetTop,
                            overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                            top = "top" === data.my[1],
                            myOffset = top ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0,
                            atOffset = "top" === data.at[1] ? data.targetHeight : "bottom" === data.at[1] ? -data.targetHeight : 0,
                            offset = -2 * data.offset[1];
                        0 > overTop ? (newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset, (0 > newOverBottom || newOverBottom < abs(overTop)) && (position.top += myOffset + atOffset + offset)) : overBottom > 0 && (newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop, (newOverTop > 0 || abs(newOverTop) < overBottom) && (position.top += myOffset + atOffset + offset))
                    }
                },
                flipfit: {
                    left: function() {
                        $.ui.position.flip.left.apply(this, arguments), $.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        $.ui.position.flip.top.apply(this, arguments), $.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
            function() {
                var testElement, testElementParent, testElementStyle, offsetLeft, i, body = document.getElementsByTagName("body")[0],
                    div = document.createElement("div");
                testElement = document.createElement(body ? "div" : "body"), testElementStyle = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, body && $.extend(testElementStyle, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (i in testElementStyle) testElement.style[i] = testElementStyle[i];
                testElement.appendChild(div), testElementParent = body || document.documentElement, testElementParent.insertBefore(testElement, testElementParent.firstChild), div.style.cssText = "position: absolute; left: 10.7432222px;", offsetLeft = $(div).offset().left, supportsOffsetFractions = offsetLeft > 10 && 11 > offsetLeft, testElement.innerHTML = "", testElementParent.removeChild(testElement)
            }()
    }(), $.ui.position
}),
/*!
 * jQuery UI Menu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 */
function(factory) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget", "./position"], factory) : factory(jQuery)
}(function($) {
    return $.widget("ui.menu", {
        version: "1.11.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left-1 top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item": function(event) {
                    event.preventDefault()
                },
                "click .ui-menu-item": function(event) {
                    var target = $(event.target);
                    !this.mouseHandled && target.not(".ui-state-disabled").length && (this.select(event), event.isPropagationStopped() || (this.mouseHandled = !0), target.has(".ui-menu").length ? this.expand(event) : !this.element.is(":focus") && $(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(event) {
                    if (!this.previousFilter) {
                        var target = $(event.currentTarget);
                        target.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(event, target)
                    }
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(event, keepActiveItem) {
                    var item = this.active || this.element.find(this.options.items).eq(0);
                    keepActiveItem || this.focus(event, item)
                },
                blur: function(event) {
                    this._delay(function() {
                        $.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(event)
                    })
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function(event) {
                    this._closeOnDocumentClick(event) && this.collapseAll(event), this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var elem = $(this);
                elem.data("ui-menu-submenu-carat") && elem.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(event) {
            var match, prev, character, skip, preventDefault = !0;
            switch (event.keyCode) {
                case $.ui.keyCode.PAGE_UP:
                    this.previousPage(event);
                    break;
                case $.ui.keyCode.PAGE_DOWN:
                    this.nextPage(event);
                    break;
                case $.ui.keyCode.HOME:
                    this._move("first", "first", event);
                    break;
                case $.ui.keyCode.END:
                    this._move("last", "last", event);
                    break;
                case $.ui.keyCode.UP:
                    this.previous(event);
                    break;
                case $.ui.keyCode.DOWN:
                    this.next(event);
                    break;
                case $.ui.keyCode.LEFT:
                    this.collapse(event);
                    break;
                case $.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(event);
                    break;
                case $.ui.keyCode.ENTER:
                case $.ui.keyCode.SPACE:
                    this._activate(event);
                    break;
                case $.ui.keyCode.ESCAPE:
                    this.collapse(event);
                    break;
                default:
                    preventDefault = !1, prev = this.previousFilter || "", character = String.fromCharCode(event.keyCode), skip = !1, clearTimeout(this.filterTimer), character === prev ? skip = !0 : character = prev + character, match = this._filterMenuItems(character), match = skip && -1 !== match.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : match, match.length || (character = String.fromCharCode(event.keyCode), match = this._filterMenuItems(character)), match.length ? (this.focus(event, match), this.previousFilter = character, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter
            }
            preventDefault && event.preventDefault()
        },
        _activate: function(event) {
            this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(event) : this.select(event))
        },
        refresh: function() {
            var menus, items, that = this,
                icon = this.options.icons.submenu,
                submenus = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), submenus.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var menu = $(this),
                    item = menu.parent(),
                    submenuCarat = $("<span>").addClass("ui-menu-icon ui-icon " + icon).data("ui-menu-submenu-carat", !0);
                item.attr("aria-haspopup", "true").prepend(submenuCarat), menu.attr("aria-labelledby", item.attr("id"))
            }), menus = submenus.add(this.element), items = menus.find(this.options.items), items.not(".ui-menu-item").each(function() {
                var item = $(this);
                that._isDivider(item) && item.addClass("ui-widget-content ui-menu-divider")
            }), items.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            }), items.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !$.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            } [this.options.role]
        },
        _setOption: function(key, value) {
            "icons" === key && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(value.submenu), "disabled" === key && this.element.toggleClass("ui-state-disabled", !!value).attr("aria-disabled", value), this._super(key, value)
        },
        focus: function(event, item) {
            var nested, focused;
            this.blur(event, event && "focus" === event.type), this._scrollIntoView(item), this.active = item.first(), focused = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", focused.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), event && "keydown" === event.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay), nested = item.children(".ui-menu"), nested.length && event && /^mouse/.test(event.type) && this._startOpening(nested), this.activeMenu = item.parent(), this._trigger("focus", event, {
                item: item
            })
        },
        _scrollIntoView: function(item) {
            var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
            this._hasScroll() && (borderTop = parseFloat($.css(this.activeMenu[0], "borderTopWidth")) || 0, paddingTop = parseFloat($.css(this.activeMenu[0], "paddingTop")) || 0, offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop, scroll = this.activeMenu.scrollTop(), elementHeight = this.activeMenu.height(), itemHeight = item.outerHeight(), 0 > offset ? this.activeMenu.scrollTop(scroll + offset) : offset + itemHeight > elementHeight && this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight))
        },
        blur: function(event, fromFocus) {
            fromFocus || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", event, {
                item: this.active
            }))
        },
        _startOpening: function(submenu) {
            clearTimeout(this.timer), "true" === submenu.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(), this._open(submenu)
            }, this.delay))
        },
        _open: function(submenu) {
            var position = $.extend({ of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden", "true"), submenu.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(position)
        },
        collapseAll: function(event, all) {
            clearTimeout(this.timer), this.timer = this._delay(function() {
                var currentMenu = all ? this.element : $(event && event.target).closest(this.element.find(".ui-menu"));
                currentMenu.length || (currentMenu = this.element), this._close(currentMenu), this.blur(event), this.activeMenu = currentMenu
            }, this.delay)
        },
        _close: function(startMenu) {
            startMenu || (startMenu = this.active ? this.active.parent() : this.element), startMenu.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
        },
        _closeOnDocumentClick: function(event) {
            return !$(event.target).closest(".ui-menu").length
        },
        _isDivider: function(item) {
            return !/[^\-\u2014\u2013\s]/.test(item.text())
        },
        collapse: function(event) {
            var newItem = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            newItem && newItem.length && (this._close(), this.focus(event, newItem))
        },
        expand: function(event) {
            var newItem = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            newItem && newItem.length && (this._open(newItem.parent()), this._delay(function() {
                this.focus(event, newItem)
            }))
        },
        next: function(event) {
            this._move("next", "first", event)
        },
        previous: function(event) {
            this._move("prev", "last", event)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(direction, filter, event) {
            var next;
            this.active && (next = "first" === direction || "last" === direction ? this.active["first" === direction ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[direction + "All"](".ui-menu-item").eq(0)), next && next.length && this.active || (next = this.activeMenu.find(this.options.items)[filter]()), this.focus(event, next)
        },
        nextPage: function(event) {
            var item, base, height;
            return this.active ? void(this.isLastItem() || (this._hasScroll() ? (base = this.active.offset().top, height = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return item = $(this), item.offset().top - base - height < 0
            }), this.focus(event, item)) : this.focus(event, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(event)
        },
        previousPage: function(event) {
            var item, base, height;
            return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (base = this.active.offset().top, height = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return item = $(this), item.offset().top - base + height > 0
            }), this.focus(event, item)) : this.focus(event, this.activeMenu.find(this.options.items).first()))) : void this.next(event)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(event) {
            this.active = this.active || $(event.target).closest(".ui-menu-item");
            var ui = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(event, !0), this._trigger("select", event, ui)
        },
        _filterMenuItems: function(character) {
            var escapedCharacter = character.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                regex = new RegExp("^" + escapedCharacter, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                return regex.test($.trim($(this).text()))
            })
        }
    })
}),
/*!
 * jQuery UI Autocomplete 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 */
function(factory) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./widget", "./position", "./menu"], factory) : factory(jQuery)
}(function($) {
    return $.widget("ui.autocomplete", {
        version: "1.11.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var suppressKeyPress, suppressKeyPressRepeat, suppressInput, nodeName = this.element[0].nodeName.toLowerCase(),
                isTextarea = "textarea" === nodeName,
                isInput = "input" === nodeName;
            this.isMultiLine = isTextarea ? !0 : isInput ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function(event) {
                    if (this.element.prop("readOnly")) return suppressKeyPress = !0, suppressInput = !0, void(suppressKeyPressRepeat = !0);
                    suppressKeyPress = !1, suppressInput = !1, suppressKeyPressRepeat = !1;
                    var keyCode = $.ui.keyCode;
                    switch (event.keyCode) {
                        case keyCode.PAGE_UP:
                            suppressKeyPress = !0, this._move("previousPage", event);
                            break;
                        case keyCode.PAGE_DOWN:
                            suppressKeyPress = !0, this._move("nextPage", event);
                            break;
                        case keyCode.UP:
                            suppressKeyPress = !0, this._keyEvent("previous", event);
                            break;
                        case keyCode.DOWN:
                            suppressKeyPress = !0, this._keyEvent("next", event);
                            break;
                        case keyCode.ENTER:
                            this.menu.active && (suppressKeyPress = !0, event.preventDefault(), this.menu.select(event));
                            break;
                        case keyCode.TAB:
                            this.menu.active && this.menu.select(event);
                            break;
                        case keyCode.ESCAPE:
                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(event), event.preventDefault());
                            break;
                        default:
                            suppressKeyPressRepeat = !0, this._searchTimeout(event)
                    }
                },
                keypress: function(event) {
                    if (suppressKeyPress) return suppressKeyPress = !1, void((!this.isMultiLine || this.menu.element.is(":visible")) && event.preventDefault());
                    if (!suppressKeyPressRepeat) {
                        var keyCode = $.ui.keyCode;
                        switch (event.keyCode) {
                            case keyCode.PAGE_UP:
                                this._move("previousPage", event);
                                break;
                            case keyCode.PAGE_DOWN:
                                this._move("nextPage", event);
                                break;
                            case keyCode.UP:
                                this._keyEvent("previous", event);
                                break;
                            case keyCode.DOWN:
                                this._keyEvent("next", event)
                        }
                    }
                },
                input: function(event) {
                    return suppressInput ? (suppressInput = !1, void event.preventDefault()) : void this._searchTimeout(event)
                },
                focus: function() {
                    this.selectedItem = null, this.previous = this._value()
                },
                blur: function(event) {
                    return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(event), void this._change(event))
                }
            }), this._initSource(), this.menu = $("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().menu("instance"), this._on(this.menu.element, {
                mousedown: function(event) {
                    event.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur
                    });
                    var menuElement = this.menu.element[0];
                    $(event.target).closest(".ui-menu-item").length || this._delay(function() {
                        var that = this;
                        this.document.one("mousedown", function(event) {
                            event.target === that.element[0] || event.target === menuElement || $.contains(menuElement, event.target) || that.close()
                        })
                    })
                },
                menufocus: function(event, ui) {
                    var label, item;
                    return this.isNewMenu && (this.isNewMenu = !1, event.originalEvent && /^mouse/.test(event.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function() {
                        $(event.target).trigger(event.originalEvent)
                    })) : (item = ui.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", event, {
                        item: item
                    }) && event.originalEvent && /^key/.test(event.originalEvent.type) && this._value(item.value), label = ui.item.attr("aria-label") || item.value, void(label && $.trim(label).length && (this.liveRegion.children().hide(), $("<div>").text(label).appendTo(this.liveRegion))))
                },
                menuselect: function(event, ui) {
                    var item = ui.item.data("ui-autocomplete-item"),
                        previous = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = previous, this._delay(function() {
                        this.previous = previous, this.selectedItem = item
                    })), !1 !== this._trigger("select", event, {
                        item: item
                    }) && this._value(item.value), this.term = this._value(), this.close(event), this.selectedItem = item
                }
            }), this.liveRegion = $("<span>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function(key, value) {
            this._super(key, value), "source" === key && this._initSource(), "appendTo" === key && this.menu.element.appendTo(this._appendTo()), "disabled" === key && value && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var element = this.options.appendTo;
            return element && (element = element.jquery || element.nodeType ? $(element) : this.document.find(element).eq(0)), element && element[0] || (element = this.element.closest(".ui-front")), element.length || (element = this.document[0].body), element
        },
        _initSource: function() {
            var array, url, that = this;
            $.isArray(this.options.source) ? (array = this.options.source, this.source = function(request, response) {
                response($.ui.autocomplete.filter(array, request.term))
            }) : "string" == typeof this.options.source ? (url = this.options.source, this.source = function(request, response) {
                that.xhr && that.xhr.abort(), that.xhr = $.ajax({
                    url: url,
                    data: request,
                    dataType: "json",
                    success: function(data) {
                        response(data)
                    },
                    error: function() {
                        response([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(event) {
            clearTimeout(this.searching), this.searching = this._delay(function() {
                var equalValues = this.term === this._value(),
                    menuVisible = this.menu.element.is(":visible"),
                    modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
                (!equalValues || equalValues && !menuVisible && !modifierKey) && (this.selectedItem = null, this.search(null, event))
            }, this.options.delay)
        },
        search: function(value, event) {
            return value = null != value ? value : this._value(), this.term = this._value(), value.length < this.options.minLength ? this.close(event) : this._trigger("search", event) !== !1 ? this._search(value) : void 0
        },
        _search: function(value) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                term: value
            }, this._response())
        },
        _response: function() {
            var index = ++this.requestIndex;
            return $.proxy(function(content) {
                index === this.requestIndex && this.__response(content), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function(content) {
            content && (content = this._normalize(content)), this._trigger("response", null, {
                content: content
            }), !this.options.disabled && content && content.length && !this.cancelSearch ? (this._suggest(content), this._trigger("open")) : this._close()
        },
        close: function(event) {
            this.cancelSearch = !0, this._close(event)
        },
        _close: function(event) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", event))
        },
        _change: function(event) {
            this.previous !== this._value() && this._trigger("change", event, {
                item: this.selectedItem
            })
        },
        _normalize: function(items) {
            return items.length && items[0].label && items[0].value ? items : $.map(items, function(item) {
                return "string" == typeof item ? {
                    label: item,
                    value: item
                } : $.extend({}, item, {
                    label: item.label || item.value,
                    value: item.value || item.label
                })
            })
        },
        _suggest: function(items) {
            var ul = this.menu.element.empty();
            this._renderMenu(ul, items), this.isNewMenu = !0, this.menu.refresh(), ul.show(), this._resizeMenu(), ul.position($.extend({ of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var ul = this.menu.element;
            ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(ul, items) {
            var that = this;
            $.each(items, function(index, item) {
                that._renderItemData(ul, item)
            })
        },
        _renderItemData: function(ul, item) {
            return this._renderItem(ul, item).data("ui-autocomplete-item", item)
        },
        _renderItem: function(ul, item) {
            return $("<li>").text(item.label).appendTo(ul)
        },
        _move: function(direction, event) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[direction](event) : void this.search(null, event)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(keyEvent, event) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(keyEvent, event), event.preventDefault())
        }
    }), $.extend($.ui.autocomplete, {
        escapeRegex: function(value) {
            return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(array, term) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
            return $.grep(array, function(value) {
                return matcher.test(value.label || value.value || value)
            })
        }
    }), $.widget("ui.autocomplete", $.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(amount) {
                    return amount + (amount > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(content) {
            var message;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (message = content && content.length ? this.options.messages.results(content.length) : this.options.messages.noResults, this.liveRegion.children().hide(), $("<div>").text(message).appendTo(this.liveRegion))
        }
    }), $.ui.autocomplete
}),
function($, undefined) {
    $.rails !== undefined && $.error("jquery-ujs has already been loaded!");
    var rails, $document = $(document);
    $.rails = rails = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        CSRFProtection: function(xhr) {
            var token = $('meta[name="csrf-token"]').attr("content");
            token && xhr.setRequestHeader("X-CSRF-Token", token)
        },
        refreshCSRFTokens: function() {
            var csrfToken = $("meta[name=csrf-token]").attr("content"),
                csrfParam = $("meta[name=csrf-param]").attr("content");
            $('form input[name="' + csrfParam + '"]').val(csrfToken)
        },
        fire: function(obj, name, data) {
            var event = $.Event(name);
            return obj.trigger(event, data), event.result !== !1
        },
        confirm: function(message) {
            return confirm(message)
        },
        ajax: function(options) {
            return $.ajax(options)
        },
        href: function(element) {
            return element[0].href
        },
        handleRemote: function(element) {
            var method, url, data, withCredentials, dataType, options;
            if (rails.fire(element, "ajax:before")) {
                if (withCredentials = element.data("with-credentials") || null, dataType = element.data("type") || $.ajaxSettings && $.ajaxSettings.dataType, element.is("form")) {
                    method = element.attr("method"), url = element.attr("action"), data = element.serializeArray();
                    var button = element.data("ujs:submit-button");
                    button && (data.push(button), element.data("ujs:submit-button", null))
                } else element.is(rails.inputChangeSelector) ? (method = element.data("method"), url = element.data("url"), data = element.serialize(), element.data("params") && (data = data + "&" + element.data("params"))) : element.is(rails.buttonClickSelector) ? (method = element.data("method") || "get", url = element.data("url"), data = element.serialize(), element.data("params") && (data = data + "&" + element.data("params"))) : (method = element.data("method"), url = rails.href(element), data = element.data("params") || null);
                return options = {
                    type: method || "GET",
                    data: data,
                    dataType: dataType,
                    beforeSend: function(xhr, settings) {
                        return settings.dataType === undefined && xhr.setRequestHeader("accept", "*/*;q=0.5, " + settings.accepts.script), rails.fire(element, "ajax:beforeSend", [xhr, settings]) ? void element.trigger("ajax:send", xhr) : !1
                    },
                    success: function(data, status, xhr) {
                        element.trigger("ajax:success", [data, status, xhr])
                    },
                    complete: function(xhr, status) {
                        element.trigger("ajax:complete", [xhr, status])
                    },
                    error: function(xhr, status, error) {
                        element.trigger("ajax:error", [xhr, status, error])
                    },
                    crossDomain: rails.isCrossDomain(url)
                }, withCredentials && (options.xhrFields = {
                    withCredentials: withCredentials
                }), url && (options.url = url), rails.ajax(options)
            }
            return !1
        },
        isCrossDomain: function(url) {
            var originAnchor = document.createElement("a");
            originAnchor.href = location.href;
            var urlAnchor = document.createElement("a");
            try {
                return urlAnchor.href = url, urlAnchor.href = urlAnchor.href, !urlAnchor.protocol || !urlAnchor.host || originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host
            } catch (e) {
                return !0
            }
        },
        handleMethod: function(link) {
            var href = rails.href(link),
                method = link.data("method"),
                target = link.attr("target"),
                csrfToken = $("meta[name=csrf-token]").attr("content"),
                csrfParam = $("meta[name=csrf-param]").attr("content"),
                form = $('<form method="post" action="' + href + '"></form>'),
                metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';
            csrfParam === undefined || csrfToken === undefined || rails.isCrossDomain(href) || (metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />'), target && form.attr("target", target), form.hide().append(metadataInput).appendTo("body"), form.submit()
        },
        formElements: function(form, selector) {
            return form.is("form") ? $(form[0].elements).filter(selector) : form.find(selector)
        },
        disableFormElements: function(form) {
            rails.formElements(form, rails.disableSelector).each(function() {
                rails.disableFormElement($(this))
            })
        },
        disableFormElement: function(element) {
            var method, replacement;
            method = element.is("button") ? "html" : "val", replacement = element.data("disable-with"), element.data("ujs:enable-with", element[method]()), replacement !== undefined && element[method](replacement), element.prop("disabled", !0)
        },
        enableFormElements: function(form) {
            rails.formElements(form, rails.enableSelector).each(function() {
                rails.enableFormElement($(this))
            })
        },
        enableFormElement: function(element) {
            var method = element.is("button") ? "html" : "val";
            element.data("ujs:enable-with") && element[method](element.data("ujs:enable-with")), element.prop("disabled", !1)
        },
        allowAction: function(element) {
            var callback, message = element.data("confirm"),
                answer = !1;
            return message ? (rails.fire(element, "confirm") && (answer = rails.confirm(message), callback = rails.fire(element, "confirm:complete", [answer])), answer && callback) : !0
        },
        blankInputs: function(form, specifiedSelector, nonBlank) {
            var input, valueToCheck, inputs = $(),
                selector = specifiedSelector || "input,textarea",
                allInputs = form.find(selector);
            return allInputs.each(function() {
                if (input = $(this), valueToCheck = input.is("input[type=checkbox],input[type=radio]") ? input.is(":checked") : input.val(), !valueToCheck == !nonBlank) {
                    if (input.is("input[type=radio]") && allInputs.filter('input[type=radio]:checked[name="' + input.attr("name") + '"]').length) return !0;
                    inputs = inputs.add(input)
                }
            }), inputs.length ? inputs : !1
        },
        nonBlankInputs: function(form, specifiedSelector) {
            return rails.blankInputs(form, specifiedSelector, !0)
        },
        stopEverything: function(e) {
            return $(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function(element) {
            var replacement = element.data("disable-with");
            element.data("ujs:enable-with", element.html()), replacement !== undefined && element.html(replacement), element.bind("click.railsDisable", function(e) {
                return rails.stopEverything(e)
            })
        },
        enableElement: function(element) {
            element.data("ujs:enable-with") !== undefined && (element.html(element.data("ujs:enable-with")), element.removeData("ujs:enable-with")), element.unbind("click.railsDisable")
        }
    }, rails.fire($document, "rails:attachBindings") && ($.ajaxPrefilter(function(options, originalOptions, xhr) {
        options.crossDomain || rails.CSRFProtection(xhr)
    }), $document.delegate(rails.linkDisableSelector, "ajax:complete", function() {
        rails.enableElement($(this))
    }), $document.delegate(rails.buttonDisableSelector, "ajax:complete", function() {
        rails.enableFormElement($(this))
    }), $document.delegate(rails.linkClickSelector, "click.rails", function(e) {
        var link = $(this),
            method = link.data("method"),
            data = link.data("params"),
            metaClick = e.metaKey || e.ctrlKey;
        if (!rails.allowAction(link)) return rails.stopEverything(e);
        if (!metaClick && link.is(rails.linkDisableSelector) && rails.disableElement(link), link.data("remote") !== undefined) {
            if (metaClick && (!method || "GET" === method) && !data) return !0;
            var handleRemote = rails.handleRemote(link);
            return handleRemote === !1 ? rails.enableElement(link) : handleRemote.error(function() {
                rails.enableElement(link)
            }), !1
        }
        return link.data("method") ? (rails.handleMethod(link), !1) : void 0
    }), $document.delegate(rails.buttonClickSelector, "click.rails", function(e) {
        var button = $(this);
        if (!rails.allowAction(button)) return rails.stopEverything(e);
        button.is(rails.buttonDisableSelector) && rails.disableFormElement(button);
        var handleRemote = rails.handleRemote(button);
        return handleRemote === !1 ? rails.enableFormElement(button) : handleRemote.error(function() {
            rails.enableFormElement(button)
        }), !1
    }), $document.delegate(rails.inputChangeSelector, "change.rails", function(e) {
        var link = $(this);
        return rails.allowAction(link) ? (rails.handleRemote(link), !1) : rails.stopEverything(e)
    }), $document.delegate(rails.formSubmitSelector, "submit.rails", function(e) {
        var blankRequiredInputs, nonBlankFileInputs, form = $(this),
            remote = form.data("remote") !== undefined;
        if (!rails.allowAction(form)) return rails.stopEverything(e);
        if (form.attr("novalidate") == undefined && (blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector), blankRequiredInputs && rails.fire(form, "ajax:aborted:required", [blankRequiredInputs]))) return rails.stopEverything(e);
        if (remote) {
            if (nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector)) {
                setTimeout(function() {
                    rails.disableFormElements(form)
                }, 13);
                var aborted = rails.fire(form, "ajax:aborted:file", [nonBlankFileInputs]);
                return aborted || setTimeout(function() {
                    rails.enableFormElements(form)
                }, 13), aborted
            }
            return rails.handleRemote(form), !1
        }
        setTimeout(function() {
            rails.disableFormElements(form)
        }, 13)
    }), $document.delegate(rails.formInputClickSelector, "click.rails", function(event) {
        var button = $(this);
        if (!rails.allowAction(button)) return rails.stopEverything(event);
        var name = button.attr("name"),
            data = name ? {
                name: name,
                value: button.val()
            } : null;
        button.closest("form").data("ujs:submit-button", data)
    }), $document.delegate(rails.formSubmitSelector, "ajax:send.rails", function(event) {
        this == event.target && rails.disableFormElements($(this))
    }), $document.delegate(rails.formSubmitSelector, "ajax:complete.rails", function(event) {
        this == event.target && rails.enableFormElements($(this))
    }), $(function() {
        rails.refreshCSRFTokens()
    }))
}(jQuery),
function($) {
    window.NestedFormEvents = function() {
        this.addFields = $.proxy(this.addFields, this), this.removeFields = $.proxy(this.removeFields, this)
    }, NestedFormEvents.prototype = {
        addFields: function(e) {
            var link = e.currentTarget,
                assoc = $(link).data("association"),
                blueprint = $("#" + $(link).data("blueprint-id")),
                content = blueprint.data("blueprint"),
                context = ($(link).closest(".fields").closestChild("input, textarea, select").eq(0).attr("name") || "").replace(/\[[a-z_]+\]$/, ""),
                current = content.match(new RegExp("\\[([a-z_]+)\\]\\[new_" + assoc + "\\]"));
            if (current && (context = context.replace(new RegExp("\\[" + current[1] + "\\]\\[(new_)?\\d+\\]$"), "")), context)
                for (var parentNames = context.match(/[a-z_]+_attributes(?=\]\[(new_)?\d+\])/g) || [], parentIds = context.match(/[0-9]+/g) || [], i = 0; i < parentNames.length; i++) parentIds[i] && (content = content.replace(new RegExp("(_" + parentNames[i] + ")_.+?_", ""), "$1_" + parentIds[i] + "_"), content = content.replace(new RegExp("(\\[" + parentNames[i] + "\\])\\[.+?\\]", ""), "$1[" + parentIds[i] + "]"));
            var regexp = new RegExp("new_" + assoc, "g"),
                new_id = this.newId();
            content = $.trim(content.replace(regexp, new_id));
            var field = this.insertFields(content, assoc, link);
            return field.trigger({
                type: "nested:fieldAdded",
                field: field
            }).trigger({
                type: "nested:fieldAdded:" + assoc,
                field: field
            }), !1
        },
        newId: function() {
            return (new Date).getTime()
        },
        insertFields: function(content, assoc, link) {
            var target = $(link).data("target");
            return target ? $(content).appendTo($(target)) : $(content).insertBefore(link)
        },
        removeFields: function(e) {
            var $link = $(e.currentTarget),
                assoc = $link.data("association"),
                hiddenField = $link.prev("input[type=hidden]");
            hiddenField.val("1");
            var field = $link.closest(".fields");
            return field.hide(), field.trigger({
                type: "nested:fieldRemoved",
                field: field
            }).trigger({
                type: "nested:fieldRemoved:" + assoc,
                field: field
            }), !1
        }
    }, window.nestedFormEvents = new NestedFormEvents, $(document).off("click", "form a.add_nested_fields").on("click", "form a.add_nested_fields", nestedFormEvents.addFields).off("click", "form a.remove_nested_fields").on("click", "form a.remove_nested_fields", nestedFormEvents.removeFields)
}(jQuery),
/*
 * Copyright 2011, Tobias Lindig
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */
function($) {
    $.fn.closestChild = function(selector) {
        if (selector && "" != selector) {
            var queue = [];
            for (queue.push(this); queue.length > 0;)
                for (var node = queue.shift(), children = node.children(), i = 0; i < children.length; ++i) {
                    var child = $(children[i]);
                    if (child.is(selector)) return child;
                    queue.push(child)
                }
        }
        return $()
    }
}(jQuery), ! function() {
    var a, AbstractChosen, Chosen, SelectParser, b, c = {}.hasOwnProperty,
        d = function(a, b) {
            function d() {
                this.constructor = a
            }
            for (var e in b) c.call(b, e) && (a[e] = b[e]);
            return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
        };
    SelectParser = function() {
        function SelectParser() {
            this.options_index = 0, this.parsed = []
        }
        return SelectParser.prototype.add_node = function(a) {
            return "OPTGROUP" === a.nodeName.toUpperCase() ? this.add_group(a) : this.add_option(a)
        }, SelectParser.prototype.add_group = function(a) {
            var b, c, d, e, f, g;
            for (b = this.parsed.length, this.parsed.push({
                    array_index: b,
                    group: !0,
                    label: this.escapeExpression(a.label),
                    children: 0,
                    disabled: a.disabled
                }), f = a.childNodes, g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(this.add_option(c, b, a.disabled));
            return g
        }, SelectParser.prototype.add_option = function(a, b, c) {
            return "OPTION" === a.nodeName.toUpperCase() ? ("" !== a.text ? (null != b && (this.parsed[b].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: a.value,
                text: a.text,
                html: a.innerHTML,
                selected: a.selected,
                disabled: c === !0 ? c : a.disabled,
                group_array_index: b,
                classes: a.className,
                style: a.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1) : void 0
        }, SelectParser.prototype.escapeExpression = function(a) {
            var b, c;
            return null == a || a === !1 ? "" : /[\&\<\>\"\'\`]/.test(a) ? (b = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            }, c = /&(?!\w+;)|[\<\>\"\'\`]/g, a.replace(c, function(a) {
                return b[a] || "&amp;"
            })) : a
        }, SelectParser
    }(), SelectParser.select_to_array = function(a) {
        var b, c, d, e, f;
        for (c = new SelectParser, f = a.childNodes, d = 0, e = f.length; e > d; d++) b = f[d], c.add_node(b);
        return c.parsed
    }, AbstractChosen = function() {
        function AbstractChosen(a, b) {
            this.form_field = a, this.options = null != b ? b : {}, AbstractChosen.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers())
        }
        return AbstractChosen.prototype.set_default_values = function() {
            var a = this;
            return this.click_test_action = function(b) {
                return a.test_active_click(b)
            }, this.activate_action = function(b) {
                return a.activate_field(b)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0
        }, AbstractChosen.prototype.set_default_text = function() {
            return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text
        }, AbstractChosen.prototype.mouse_enter = function() {
            return this.mouse_on_container = !0
        }, AbstractChosen.prototype.mouse_leave = function() {
            return this.mouse_on_container = !1
        }, AbstractChosen.prototype.input_focus = function() {
            var a = this;
            if (this.is_multiple) {
                if (!this.active_field) return setTimeout(function() {
                    return a.container_mousedown()
                }, 50)
            } else if (!this.active_field) return this.activate_field()
        }, AbstractChosen.prototype.input_blur = function() {
            var a = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function() {
                return a.blur_test()
            }, 100))
        }, AbstractChosen.prototype.results_option_build = function(a) {
            var b, c, d, e, f;
            for (b = "", f = this.results_data, d = 0, e = f.length; e > d; d++) c = f[d], b += c.group ? this.result_add_group(c) : this.result_add_option(c), (null != a ? a.first : void 0) && (c.selected && this.is_multiple ? this.choice_build(c) : c.selected && !this.is_multiple && this.single_set_selected_text(c.text));
            return b
        }, AbstractChosen.prototype.result_add_option = function(a) {
            var b, c;
            return a.search_match && this.include_option_in_results(a) ? (b = [], a.disabled || a.selected && this.is_multiple || b.push("active-result"), !a.disabled || a.selected && this.is_multiple || b.push("disabled-result"), a.selected && b.push("result-selected"), null != a.group_array_index && b.push("group-option"), "" !== a.classes && b.push(a.classes), c = document.createElement("li"), c.className = b.join(" "), c.style.cssText = a.style, c.setAttribute("data-option-array-index", a.array_index), c.innerHTML = a.search_text, this.outerHTML(c)) : ""
        }, AbstractChosen.prototype.result_add_group = function(a) {
            var b;
            return (a.search_match || a.group_match) && a.active_options > 0 ? (b = document.createElement("li"), b.className = "group-result", b.innerHTML = a.search_text, this.outerHTML(b)) : ""
        }, AbstractChosen.prototype.results_update_field = function() {
            return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing ? this.winnow_results() : void 0
        }, AbstractChosen.prototype.reset_single_select_options = function() {
            var a, b, c, d, e;
            for (d = this.results_data, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.selected ? a.selected = !1 : void 0);
            return e
        }, AbstractChosen.prototype.results_toggle = function() {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, AbstractChosen.prototype.results_search = function() {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, AbstractChosen.prototype.winnow_results = function() {
            var a, b, c, d, e, f, g, h, i, j, k, l, m;
            for (this.no_results_clear(), e = 0, g = this.get_search_text(), a = g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), d = this.search_contains ? "" : "^", c = new RegExp(d + a, "i"), j = new RegExp(a, "i"), m = this.results_data, k = 0, l = m.length; l > k; k++) b = m[k], b.search_match = !1, f = null, this.include_option_in_results(b) && (b.group && (b.group_match = !1, b.active_options = 0), null != b.group_array_index && this.results_data[b.group_array_index] && (f = this.results_data[b.group_array_index], 0 === f.active_options && f.search_match && (e += 1), f.active_options += 1), (!b.group || this.group_search) && (b.search_text = b.group ? b.label : b.html, b.search_match = this.search_string_match(b.search_text, c), b.search_match && !b.group && (e += 1), b.search_match ? (g.length && (h = b.search_text.search(j), i = b.search_text.substr(0, h + g.length) + "</em>" + b.search_text.substr(h + g.length), b.search_text = i.substr(0, h) + "<em>" + i.substr(h)), null != f && (f.group_match = !0)) : null != b.group_array_index && this.results_data[b.group_array_index].search_match && (b.search_match = !0)));
            return this.result_clear_highlight(), 1 > e && g.length ? (this.update_results_content(""), this.no_results(g)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
        }, AbstractChosen.prototype.search_string_match = function(a, b) {
            var c, d, e, f;
            if (b.test(a)) return !0;
            if (this.enable_split_word_search && (a.indexOf(" ") >= 0 || 0 === a.indexOf("[")) && (d = a.replace(/\[|\]/g, "").split(" "), d.length))
                for (e = 0, f = d.length; f > e; e++)
                    if (c = d[e], b.test(c)) return !0
        }, AbstractChosen.prototype.choices_count = function() {
            var a, b, c, d;
            if (null != this.selected_option_count) return this.selected_option_count;
            for (this.selected_option_count = 0, d = this.form_field.options, b = 0, c = d.length; c > b; b++) a = d[b], a.selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }, AbstractChosen.prototype.choices_click = function(a) {
            return a.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
        }, AbstractChosen.prototype.keyup_checker = function(a) {
            var b, c;
            switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), b) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) return this.keydown_backstroke();
                    if (!this.pending_backstroke) return this.result_clear_highlight(), this.results_search();
                    break;
                case 13:
                    if (a.preventDefault(), this.results_showing) return this.result_select(a);
                    break;
                case 27:
                    return this.results_showing && this.results_hide(), !0;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search()
            }
        }, AbstractChosen.prototype.clipboard_event_checker = function() {
            var a = this;
            return setTimeout(function() {
                return a.results_search()
            }, 50)
        }, AbstractChosen.prototype.container_width = function() {
            return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
        }, AbstractChosen.prototype.include_option_in_results = function(a) {
            return this.is_multiple && !this.display_selected_options && a.selected ? !1 : !this.display_disabled_options && a.disabled ? !1 : a.empty ? !1 : !0
        }, AbstractChosen.prototype.search_results_touchstart = function(a) {
            return this.touch_started = !0, this.search_results_mouseover(a)
        }, AbstractChosen.prototype.search_results_touchmove = function(a) {
            return this.touch_started = !1, this.search_results_mouseout(a)
        }, AbstractChosen.prototype.search_results_touchend = function(a) {
            return this.touch_started ? this.search_results_mouseup(a) : void 0
        }, AbstractChosen.prototype.outerHTML = function(a) {
            var b;
            return a.outerHTML ? a.outerHTML : (b = document.createElement("div"), b.appendChild(a), b.innerHTML)
        }, AbstractChosen.browser_is_supported = function() {
            return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
        }, AbstractChosen.default_multiple_text = "Select Some Options", AbstractChosen.default_single_text = "Select an Option", AbstractChosen.default_no_result_text = "No results match", AbstractChosen
    }(), a = jQuery, a.fn.extend({
        chosen: function(b) {
            return AbstractChosen.browser_is_supported() ? this.each(function() {
                var c, d;
                c = a(this), d = c.data("chosen"), "destroy" === b && d ? d.destroy() : d || c.data("chosen", new Chosen(this, b))
            }) : this
        }
    }), Chosen = function(c) {
        function Chosen() {
            return b = Chosen.__super__.constructor.apply(this, arguments)
        }
        return d(Chosen, c), Chosen.prototype.setup = function() {
            return this.form_field_jq = a(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
        }, Chosen.prototype.set_up_html = function() {
            var b, c;
            return b = ["chosen-container"], b.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && b.push(this.form_field.className), this.is_rtl && b.push("chosen-rtl"), c = {
                "class": b.join(" "),
                style: "width: " + this.container_width() + ";",
                title: this.form_field.title
            }, this.form_field.id.length && (c.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = a("<div />", c), this.container.html(this.is_multiple ? '<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>' : '<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior(), this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            })
        }, Chosen.prototype.register_observers = function() {
            var a = this;
            return this.container.bind("mousedown.chosen", function(b) {
                a.container_mousedown(b)
            }), this.container.bind("mouseup.chosen", function(b) {
                a.container_mouseup(b)
            }), this.container.bind("mouseenter.chosen", function(b) {
                a.mouse_enter(b)
            }), this.container.bind("mouseleave.chosen", function(b) {
                a.mouse_leave(b)
            }), this.search_results.bind("mouseup.chosen", function(b) {
                a.search_results_mouseup(b)
            }), this.search_results.bind("mouseover.chosen", function(b) {
                a.search_results_mouseover(b)
            }), this.search_results.bind("mouseout.chosen", function(b) {
                a.search_results_mouseout(b)
            }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function(b) {
                a.search_results_mousewheel(b)
            }), this.search_results.bind("touchstart.chosen", function(b) {
                a.search_results_touchstart(b)
            }), this.search_results.bind("touchmove.chosen", function(b) {
                a.search_results_touchmove(b)
            }), this.search_results.bind("touchend.chosen", function(b) {
                a.search_results_touchend(b)
            }), this.form_field_jq.bind("chosen:updated.chosen", function(b) {
                a.results_update_field(b)
            }), this.form_field_jq.bind("chosen:activate.chosen", function(b) {
                a.activate_field(b)
            }), this.form_field_jq.bind("chosen:open.chosen", function(b) {
                a.container_mousedown(b)
            }), this.form_field_jq.bind("chosen:close.chosen", function(b) {
                a.input_blur(b)
            }), this.search_field.bind("blur.chosen", function(b) {
                a.input_blur(b)
            }), this.search_field.bind("keyup.chosen", function(b) {
                a.keyup_checker(b)
            }), this.search_field.bind("keydown.chosen", function(b) {
                a.keydown_checker(b)
            }), this.search_field.bind("focus.chosen", function(b) {
                a.input_focus(b)
            }), this.search_field.bind("cut.chosen", function(b) {
                a.clipboard_event_checker(b)
            }), this.search_field.bind("paste.chosen", function(b) {
                a.clipboard_event_checker(b)
            }), this.is_multiple ? this.search_choices.bind("click.chosen", function(b) {
                a.choices_click(b)
            }) : this.container.bind("click.chosen", function(a) {
                a.preventDefault()
            })
        }, Chosen.prototype.destroy = function() {
            return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
        }, Chosen.prototype.search_field_disabled = function() {
            return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
        }, Chosen.prototype.container_mousedown = function(b) {
            return this.is_disabled || (b && "mousedown" === b.type && !this.results_showing && b.preventDefault(), null != b && a(b.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !b || a(b.target)[0] !== this.selected_item[0] && !a(b.target).parents("a.chosen-single").length || (b.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), a(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
        }, Chosen.prototype.container_mouseup = function(a) {
            return "ABBR" !== a.target.nodeName || this.is_disabled ? void 0 : this.results_reset(a)
        }, Chosen.prototype.search_results_mousewheel = function(a) {
            var b;
            return a.originalEvent && (b = -a.originalEvent.wheelDelta || a.originalEvent.detail), null != b ? (a.preventDefault(), "DOMMouseScroll" === a.type && (b = 40 * b), this.search_results.scrollTop(b + this.search_results.scrollTop())) : void 0
        }, Chosen.prototype.blur_test = function() {
            return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
        }, Chosen.prototype.close_field = function() {
            return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
        }, Chosen.prototype.activate_field = function() {
            return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
        }, Chosen.prototype.test_active_click = function(b) {
            var c;
            return c = a(b.target).closest(".chosen-container"), c.length && this.container[0] === c[0] ? this.active_field = !0 : this.close_field()
        }, Chosen.prototype.results_build = function() {
            return this.parsing = !0, this.selected_option_count = null, this.results_data = SelectParser.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
                first: !0
            })), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
        }, Chosen.prototype.result_do_highlight = function(a) {
            var b, c, d, e, f;
            if (a.length) {
                if (this.result_clear_highlight(), this.result_highlight = a, this.result_highlight.addClass("highlighted"), d = parseInt(this.search_results.css("maxHeight"), 10), f = this.search_results.scrollTop(), e = d + f, c = this.result_highlight.position().top + this.search_results.scrollTop(), b = c + this.result_highlight.outerHeight(), b >= e) return this.search_results.scrollTop(b - d > 0 ? b - d : 0);
                if (f > c) return this.search_results.scrollTop(c)
            }
        }, Chosen.prototype.result_clear_highlight = function() {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, Chosen.prototype.results_show = function() {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this
            }))
        }, Chosen.prototype.update_results_content = function(a) {
            return this.search_results.html(a)
        }, Chosen.prototype.results_hide = function() {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
                chosen: this
            })), this.results_showing = !1
        }, Chosen.prototype.set_tab_index = function() {
            var a;
            return this.form_field.tabIndex ? (a = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = a) : void 0
        }, Chosen.prototype.set_label_behavior = function() {
            var b = this;
            return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = a("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function(a) {
                return b.is_multiple ? b.container_mousedown(a) : b.activate_field()
            }) : void 0
        }, Chosen.prototype.show_search_field_default = function() {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, Chosen.prototype.search_results_mouseup = function(b) {
            var c;
            return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c.length ? (this.result_highlight = c, this.result_select(b), this.search_field.focus()) : void 0
        }, Chosen.prototype.search_results_mouseover = function(b) {
            var c;
            return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c ? this.result_do_highlight(c) : void 0
        }, Chosen.prototype.search_results_mouseout = function(b) {
            return a(b.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        }, Chosen.prototype.choice_build = function(b) {
            var c, d, e = this;
            return c = a("<li />", {
                "class": "search-choice"
            }).html("<span>" + b.html + "</span>"), b.disabled ? c.addClass("search-choice-disabled") : (d = a("<a />", {
                "class": "search-choice-close",
                "data-option-array-index": b.array_index
            }), d.bind("click.chosen", function(a) {
                return e.choice_destroy_link_click(a)
            }), c.append(d)), this.search_container.before(c)
        }, Chosen.prototype.choice_destroy_link_click = function(b) {
            return b.preventDefault(), b.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(a(b.target))
        }, Chosen.prototype.choice_destroy = function(a) {
            return this.result_deselect(a[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), a.parents("li").first().remove(), this.search_field_scale()) : void 0
        }, Chosen.prototype.results_reset = function() {
            return this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
        }, Chosen.prototype.results_reset_cleanup = function() {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, Chosen.prototype.result_select = function(a) {
            var b, c;
            return this.result_highlight ? (b = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }), !1) : (this.is_multiple ? b.removeClass("active-result") : this.reset_single_select_options(), c = this.results_data[b[0].getAttribute("data-option-array-index")], c.selected = !0, this.form_field.options[c.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(c) : this.single_set_selected_text(c.text), (a.metaKey || a.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {
                selected: this.form_field.options[c.options_index].value
            }), this.current_selectedIndex = this.form_field.selectedIndex, this.search_field_scale())) : void 0
        }, Chosen.prototype.single_set_selected_text = function(a) {
            return null == a && (a = this.default_text), a === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").text(a)
        }, Chosen.prototype.result_deselect = function(a) {
            var b;
            return b = this.results_data[a], this.form_field.options[b.options_index].disabled ? !1 : (b.selected = !1, this.form_field.options[b.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {
                deselected: this.form_field.options[b.options_index].value
            }), this.search_field_scale(), !0)
        }, Chosen.prototype.single_deselect_control_build = function() {
            return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
        }, Chosen.prototype.get_search_text = function() {
            return this.search_field.val() === this.default_text ? "" : a("<div/>").text(a.trim(this.search_field.val())).html()
        }, Chosen.prototype.winnow_results_set_highlight = function() {
            var a, b;
            return b = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), a = b.length ? b.first() : this.search_results.find(".active-result").first(), null != a ? this.result_do_highlight(a) : void 0
        }, Chosen.prototype.no_results = function(b) {
            var c;
            return c = a('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), c.find("span").first().html(b), this.search_results.append(c), this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            })
        }, Chosen.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove()
        }, Chosen.prototype.keydown_arrow = function() {
            var a;
            return this.results_showing && this.result_highlight ? (a = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(a) : void 0 : this.results_show()
        }, Chosen.prototype.keyup_arrow = function() {
            var a;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (a = this.result_highlight.prevAll("li.active-result"), a.length ? this.result_do_highlight(a.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
        }, Chosen.prototype.keydown_backstroke = function() {
            var a;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (a = this.search_container.siblings("li.search-choice").last(), a.length && !a.hasClass("search-choice-disabled") ? (this.pending_backstroke = a, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
        }, Chosen.prototype.clear_backstroke = function() {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, Chosen.prototype.keydown_checker = function(a) {
            var b, c;
            switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), 8 !== b && this.pending_backstroke && this.clear_backstroke(), b) {
                case 8:
                    this.backstroke_length = this.search_field.val().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(a), this.mouse_on_container = !1;
                    break;
                case 13:
                    a.preventDefault();
                    break;
                case 38:
                    a.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    a.preventDefault(), this.keydown_arrow()
            }
        }, Chosen.prototype.search_field_scale = function() {
            var b, c, d, e, f, g, h, i, j;
            if (this.is_multiple) {
                for (d = 0, h = 0, f = "position:absolute; left: -1000px; top: -1000px; display:none;", g = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], i = 0, j = g.length; j > i; i++) e = g[i], f += e + ":" + this.search_field.css(e) + ";";
                return b = a("<div />", {
                    style: f
                }), b.text(this.search_field.val()), a("body").append(b), h = b.width() + 25, b.remove(), c = this.container.outerWidth(), h > c - 10 && (h = c - 10), this.search_field.css({
                    width: h + "px"
                })
            }
        }, Chosen
    }(AbstractChosen)
}.call(this),
    function(g, i, j, b) {
        function k(n, m) {
            this.element = n, this.options = g.extend(!0, {}, f, m), this.options.share = m.share, this._defaults = f, this._name = h, this.init()
        }
        var h = "sharrre",
            f = {
                className: "sharrre",
                share: {
                    googlePlus: !1,
                    facebook: !1,
                    twitter: !1,
                    digg: !1,
                    delicious: !1,
                    stumbleupon: !1,
                    linkedin: !1,
                    pinterest: !1
                },
                shareTotal: 0,
                template: "",
                title: "",
                url: j.location.href,
                text: j.title,
                urlCurl: "sharrre.php",
                count: {},
                total: 0,
                shorterTotal: !0,
                enableHover: !0,
                enableCounter: !0,
                enableTracking: !1,
                hover: function() {},
                hide: function() {},
                click: function() {},
                render: function() {},
                buttons: {
                    googlePlus: {
                        url: "",
                        urlCount: !1,
                        size: "medium",
                        lang: "en-US",
                        annotation: ""
                    },
                    facebook: {
                        url: "",
                        urlCount: !1,
                        action: "like",
                        layout: "button_count",
                        width: "",
                        send: "false",
                        faces: "false",
                        colorscheme: "",
                        font: "",
                        lang: "en_US"
                    },
                    twitter: {
                        url: "",
                        urlCount: !1,
                        count: "horizontal",
                        hashtags: "",
                        via: "",
                        related: "",
                        lang: "en"
                    },
                    digg: {
                        url: "",
                        urlCount: !1,
                        type: "DiggCompact"
                    },
                    delicious: {
                        url: "",
                        urlCount: !1,
                        size: "medium"
                    },
                    stumbleupon: {
                        url: "",
                        urlCount: !1,
                        layout: "1"
                    },
                    linkedin: {
                        url: "",
                        urlCount: !1,
                        counter: ""
                    },
                    pinterest: {
                        url: "",
                        media: "",
                        description: "",
                        layout: "horizontal"
                    }
                }
            },
            c = {
                googlePlus: "",
                facebook: "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
                twitter: "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
                digg: "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
                delicious: "http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",
                stumbleupon: "",
                linkedin: "http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
                pinterest: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?"
            },
            l = {
                googlePlus: function(m) {
                    var n = m.options.buttons.googlePlus;
                    g(m.element).find(".buttons").append('<div class="button googleplus"><div class="g-plusone" data-size="' + n.size + '" data-href="' + ("" !== n.url ? n.url : m.options.url) + '" data-annotation="' + n.annotation + '"></div></div>'), i.___gcfg = {
                        lang: m.options.buttons.googlePlus.lang
                    };
                    var o = 0;
                    "undefined" == typeof gapi && 0 == o ? (o = 1, function() {
                        var p = j.createElement("script");
                        p.type = "text/javascript", p.async = !0, p.src = "//apis.google.com/js/plusone.js";
                        var q = j.getElementsByTagName("script")[0];
                        q.parentNode.insertBefore(p, q)
                    }()) : gapi.plusone.go()
                },
                facebook: function(m) {
                    var n = m.options.buttons.facebook;
                    g(m.element).find(".buttons").append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="' + ("" !== n.url ? n.url : m.options.url) + '" data-send="' + n.send + '" data-layout="' + n.layout + '" data-width="' + n.width + '" data-show-faces="' + n.faces + '" data-action="' + n.action + '" data-colorscheme="' + n.colorscheme + '" data-font="' + n.font + '" data-via="' + n.via + '"></div></div>');
                    var o = 0;
                    "undefined" == typeof FB && 0 == o ? (o = 1, function(t, p, u) {
                        var r, q = t.getElementsByTagName(p)[0];
                        t.getElementById(u) || (r = t.createElement(p), r.id = u, r.src = "//connect.facebook.net/" + n.lang + "/all.js#xfbml=1", q.parentNode.insertBefore(r, q))
                    }(j, "script", "facebook-jssdk")) : FB.XFBML.parse()
                },
                twitter: function(m) {
                    var n = m.options.buttons.twitter;
                    g(m.element).find(".buttons").append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="' + ("" !== n.url ? n.url : m.options.url) + '" data-count="' + n.count + '" data-text="' + m.options.text + '" data-via="' + n.via + '" data-hashtags="' + n.hashtags + '" data-related="' + n.related + '" data-lang="' + n.lang + '">Tweet</a></div>');
                    var o = 0;
                    "undefined" == typeof twttr && 0 == o ? (o = 1, function() {
                        var q = j.createElement("script");
                        q.type = "text/javascript", q.async = !0, q.src = "//platform.twitter.com/widgets.js";
                        var p = j.getElementsByTagName("script")[0];
                        p.parentNode.insertBefore(q, p)
                    }()) : g.ajax({
                        url: "//platform.twitter.com/widgets.js",
                        dataType: "script",
                        cache: !0
                    })
                },
                digg: function(m) {
                    var n = m.options.buttons.digg;
                    g(m.element).find(".buttons").append('<div class="button digg"><a class="DiggThisButton ' + n.type + '" rel="nofollow external" href="http://digg.com/submit?url=' + encodeURIComponent("" !== n.url ? n.url : m.options.url) + '"></a></div>');
                    var o = 0;
                    "undefined" == typeof __DBW && 0 == o && (o = 1, function() {
                        var q = j.createElement("SCRIPT"),
                            p = j.getElementsByTagName("SCRIPT")[0];
                        q.type = "text/javascript", q.async = !0, q.src = "//widgets.digg.com/buttons.js", p.parentNode.insertBefore(q, p)
                    }())
                },
                delicious: function(o) {
                    if ("tall" == o.options.buttons.delicious.size) var p = "width:50px;",
                        n = "height:35px;width:50px;font-size:15px;line-height:35px;",
                        m = "height:18px;line-height:18px;margin-top:3px;";
                    else var p = "width:93px;",
                        n = "float:right;padding:0 3px;height:20px;width:26px;line-height:20px;",
                        m = "float:left;height:20px;line-height:20px;";
                    var q = o.shorterTotal(o.options.count.delicious);
                    "undefined" == typeof q && (q = 0), g(o.element).find(".buttons").append('<div class="button delicious"><div style="' + p + 'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;"><div style="' + n + 'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">' + q + '</div><div style="' + m + 'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;"><img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>'), g(o.element).find(".delicious").on("click", function() {
                        o.openPopup("delicious")
                    })
                },
                stumbleupon: function(m) {
                    var n = m.options.buttons.stumbleupon;
                    g(m.element).find(".buttons").append('<div class="button stumbleupon"><su:badge layout="' + n.layout + '" location="' + ("" !== n.url ? n.url : m.options.url) + '"></su:badge></div>');
                    var o = 0;
                    "undefined" == typeof STMBLPN && 0 == o ? (o = 1, function() {
                        var p = j.createElement("script");
                        p.type = "text/javascript", p.async = !0, p.src = "//platform.stumbleupon.com/1/widgets.js";
                        var q = j.getElementsByTagName("script")[0];
                        q.parentNode.insertBefore(p, q)
                    }(), s = i.setTimeout(function() {
                        "undefined" != typeof STMBLPN && (STMBLPN.processWidgets(), clearInterval(s))
                    }, 500)) : STMBLPN.processWidgets()
                },
                linkedin: function(m) {
                    var n = m.options.buttons.linkedin;
                    g(m.element).find(".buttons").append('<div class="button linkedin"><script type="in/share" data-url="' + ("" !== n.url ? n.url : m.options.url) + '" data-counter="' + n.counter + '"></script></div>');
                    var o = 0;
                    "undefined" == typeof i.IN && 0 == o ? (o = 1, function() {
                        var p = j.createElement("script");
                        p.type = "text/javascript", p.async = !0, p.src = "//platform.linkedin.com/in.js";
                        var q = j.getElementsByTagName("script")[0];
                        q.parentNode.insertBefore(p, q)
                    }()) : i.IN.init()
                },
                pinterest: function(m) {
                    var n = m.options.buttons.pinterest;
                    g(m.element).find(".buttons").append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url=' + ("" !== n.url ? n.url : m.options.url) + "&media=" + n.media + "&description=" + n.description + '" class="pin-it-button" count-layout="' + n.layout + '">Pin It</a></div>'),
                        function() {
                            var o = j.createElement("script");
                            o.type = "text/javascript", o.async = !0, o.src = "//assets.pinterest.com/js/pinit.js";
                            var p = j.getElementsByTagName("script")[0];
                            p.parentNode.insertBefore(o, p)
                        }()
                }
            },
            d = {
                googlePlus: function() {},
                facebook: function() {
                    fb = i.setInterval(function() {
                        "undefined" != typeof FB && (FB.Event.subscribe("edge.create", function(m) {
                            _gaq.push(["_trackSocial", "facebook", "like", m])
                        }), FB.Event.subscribe("edge.remove", function(m) {
                            _gaq.push(["_trackSocial", "facebook", "unlike", m])
                        }), FB.Event.subscribe("message.send", function(m) {
                            _gaq.push(["_trackSocial", "facebook", "send", m])
                        }), clearInterval(fb))
                    }, 1e3)
                },
                twitter: function() {
                    tw = i.setInterval(function() {
                        "undefined" != typeof twttr && (twttr.events.bind("tweet", function(m) {
                            m && _gaq.push(["_trackSocial", "twitter", "tweet"])
                        }), clearInterval(tw))
                    }, 1e3)
                },
                digg: function() {},
                delicious: function() {},
                stumbleupon: function() {},
                linkedin: function() {},
                pinterest: function() {}
            },
            a = {
                googlePlus: function(m) {
                    i.open("https://plus.google.com/share?hl=" + m.buttons.googlePlus.lang + "&url=" + encodeURIComponent("" !== m.buttons.googlePlus.url ? m.buttons.googlePlus.url : m.url), "", "toolbar=0, status=0, width=900, height=500")
                },
                facebook: function(m) {
                    i.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("" !== m.buttons.facebook.url ? m.buttons.facebook.url : m.url) + "&t=" + m.text, "", "toolbar=0, status=0, width=900, height=500")
                },
                twitter: function(m) {
                    i.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(m.text) + "&url=" + encodeURIComponent("" !== m.buttons.twitter.url ? m.buttons.twitter.url : m.url) + ("" !== m.buttons.twitter.via ? "&via=" + m.buttons.twitter.via : ""), "", "toolbar=0, status=0, width=650, height=360")
                },
                digg: function(m) {
                    i.open("http://digg.com/tools/diggthis/submit?url=" + encodeURIComponent("" !== m.buttons.digg.url ? m.buttons.digg.url : m.url) + "&title=" + m.text + "&related=true&style=true", "", "toolbar=0, status=0, width=650, height=360")
                },
                delicious: function(m) {
                    i.open("http://www.delicious.com/save?v=5&noui&jump=close&url=" + encodeURIComponent("" !== m.buttons.delicious.url ? m.buttons.delicious.url : m.url) + "&title=" + m.text, "delicious", "toolbar=no,width=550,height=550")
                },
                stumbleupon: function(m) {
                    i.open("http://www.stumbleupon.com/badge/?url=" + encodeURIComponent("" !== m.buttons.delicious.url ? m.buttons.delicious.url : m.url), "stumbleupon", "toolbar=no,width=550,height=550")
                },
                linkedin: function(m) {
                    i.open("https://www.linkedin.com/cws/share?url=" + encodeURIComponent("" !== m.buttons.delicious.url ? m.buttons.delicious.url : m.url) + "&token=&isFramed=true", "linkedin", "toolbar=no,width=550,height=550")
                },
                pinterest: function(m) {
                    i.open("http://pinterest.com/pin/create/button/?url=" + encodeURIComponent("" !== m.buttons.pinterest.url ? m.buttons.pinterest.url : m.url) + "&media=" + encodeURIComponent(m.buttons.pinterest.media) + "&description=" + m.buttons.pinterest.description, "pinterest", "toolbar=no,width=700,height=300")
                }
            };
        k.prototype.init = function() {
            var m = this;
            "" !== this.options.urlCurl && (c.googlePlus = this.options.urlCurl + "?url={url}&type=googlePlus", c.stumbleupon = this.options.urlCurl + "?url={url}&type=stumbleupon"), g(this.element).addClass(this.options.className), "undefined" != typeof g(this.element).data("title") && (this.options.title = g(this.element).attr("data-title")), "undefined" != typeof g(this.element).data("url") && (this.options.url = g(this.element).data("url")), "undefined" != typeof g(this.element).data("text") && (this.options.text = g(this.element).data("text")), g.each(this.options.share, function(n, o) {
                o === !0 && m.options.shareTotal++
            }), m.options.enableCounter === !0 ? g.each(this.options.share, function(n, p) {
                if (p === !0) try {
                    m.getSocialJson(n)
                } catch (o) {}
            }) : "" !== m.options.template ? this.options.render(this, this.options) : this.loadButtons(), g(this.element).hover(function() {
                0 === g(this).find(".buttons").length && m.options.enableHover === !0 && m.loadButtons(), m.options.hover(m, m.options)
            }, function() {
                m.options.hide(m, m.options)
            }), g(this.element).click(function() {
                return m.options.click(m, m.options), !1
            })
        }, k.prototype.loadButtons = function() {
            var m = this;
            g(this.element).append('<div class="buttons"></div>'), g.each(m.options.share, function(n, o) {
                1 == o && (l[n](m), m.options.enableTracking === !0 && d[n]())
            })
        }, k.prototype.getSocialJson = function(o) {
            var m = this,
                p = 0,
                n = c[o].replace("{url}", encodeURIComponent(this.options.url));
            this.options.buttons[o].urlCount === !0 && "" !== this.options.buttons[o].url && (n = c[o].replace("{url}", this.options.buttons[o].url)), "" != n && "" !== m.options.urlCurl ? g.getJSON(n, function(r) {
                if ("undefined" != typeof r.count) {
                    var q = r.count + "";
                    q = q.replace("\xc2\xa0", ""), p += parseInt(q, 10)
                } else r.data && r.data.length > 0 && "undefined" != typeof r.data[0].total_count ? p += parseInt(r.data[0].total_count, 10) : "undefined" != typeof r[0] ? p += parseInt(r[0].total_posts, 10) : "undefined" != typeof r[0];
                m.options.count[o] = p, m.options.total += p, m.renderer(), m.rendererPerso()
            }).error(function() {
                m.options.count[o] = 0, m.rendererPerso()
            }) : (m.renderer(), m.options.count[o] = 0, m.rendererPerso())
        }, k.prototype.rendererPerso = function() {
            var m = 0;
            for (e in this.options.count) m++;
            m === this.options.shareTotal && this.options.render(this, this.options)
        }, k.prototype.renderer = function() {
            var n = this.options.total,
                m = this.options.template;
            this.options.shorterTotal === !0 && (n = this.shorterTotal(n)), "" !== m ? (m = m.replace("{total}", n), g(this.element).html(m)) : g(this.element).html('<div class="box"><a class="count" href="#">' + n + "</a>" + ("" !== this.options.title ? '<a class="share" href="#">' + this.options.title + "</a>" : "") + "</div>")
        }, k.prototype.shorterTotal = function(m) {
            return m >= 1e6 ? m = (m / 1e6).toFixed(2) + "M" : m >= 1e3 && (m = (m / 1e3).toFixed(1) + "k"), m
        }, k.prototype.openPopup = function(m) {
            if (a[m](this.options), this.options.enableTracking === !0) {
                var n = {
                    googlePlus: {
                        site: "Google",
                        action: "+1"
                    },
                    facebook: {
                        site: "facebook",
                        action: "like"
                    },
                    twitter: {
                        site: "twitter",
                        action: "tweet"
                    },
                    digg: {
                        site: "digg",
                        action: "add"
                    },
                    delicious: {
                        site: "delicious",
                        action: "add"
                    },
                    stumbleupon: {
                        site: "stumbleupon",
                        action: "add"
                    },
                    linkedin: {
                        site: "linkedin",
                        action: "share"
                    },
                    pinterest: {
                        site: "pinterest",
                        action: "pin"
                    }
                };
                _gaq.push(["_trackSocial", n[m].site, n[m].action])
            }
        }, k.prototype.simulateClick = function() {
            var m = g(this.element).html();
            g(this.element).html(m.replace(this.options.total, this.options.total + 1))
        }, k.prototype.update = function(m, n) {
            "" !== m && (this.options.url = m), "" !== n && (this.options.text = n)
        }, g.fn[h] = function(n) {
            var m = arguments;
            return n === b || "object" == typeof n ? this.each(function() {
                g.data(this, "plugin_" + h) || g.data(this, "plugin_" + h, new k(this, n))
            }) : "string" == typeof n && "_" !== n[0] && "init" !== n ? this.each(function() {
                var o = g.data(this, "plugin_" + h);
                o instanceof k && "function" == typeof o[n] && o[n].apply(o, Array.prototype.slice.call(m, 1))
            }) : void 0
        }
    }(jQuery, window, document),
    /* ========================================================================
     * Bootstrap: transition.js v3.2.0
     * http://getbootstrap.com/javascript/#transitions
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function transitionEnd() {
            var el = document.createElement("bootstrap"),
                transEndEventNames = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var name in transEndEventNames)
                if (void 0 !== el.style[name]) return {
                    end: transEndEventNames[name]
                };
            return !1
        }
        $.fn.emulateTransitionEnd = function(duration) {
            var called = !1,
                $el = this;
            $(this).one("bsTransitionEnd", function() {
                called = !0
            });
            var callback = function() {
                called || $($el).trigger($.support.transition.end)
            };
            return setTimeout(callback, duration), this
        }, $(function() {
            $.support.transition = transitionEnd(), $.support.transition && ($.event.special.bsTransitionEnd = {
                bindType: $.support.transition.end,
                delegateType: $.support.transition.end,
                handle: function(e) {
                    return $(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
                }
            })
        })
    }(jQuery),
    /* ========================================================================
     * Bootstrap: alert.js v3.2.0
     * http://getbootstrap.com/javascript/#alerts
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.alert");
                data || $this.data("bs.alert", data = new Alert(this)), "string" == typeof option && data[option].call($this)
            })
        }
        var dismiss = '[data-dismiss="alert"]',
            Alert = function(el) {
                $(el).on("click", dismiss, this.close)
            };
        Alert.VERSION = "3.2.0", Alert.prototype.close = function(e) {
            function removeElement() {
                $parent.detach().trigger("closed.bs.alert").remove()
            }
            var $this = $(this),
                selector = $this.attr("data-target");
            selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""));
            var $parent = $(selector);
            e && e.preventDefault(), $parent.length || ($parent = $this.hasClass("alert") ? $this : $this.parent()), $parent.trigger(e = $.Event("close.bs.alert")), e.isDefaultPrevented() || ($parent.removeClass("in"), $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(150) : removeElement())
        };
        var old = $.fn.alert;
        $.fn.alert = Plugin, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function() {
            return $.fn.alert = old, this
        }, $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close)
    }(jQuery),
    /* ========================================================================
     * Bootstrap: modal.js v3.2.0
     * http://getbootstrap.com/javascript/#modals
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function Plugin(option, _relatedTarget) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.modal"),
                    options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
                data || $this.data("bs.modal", data = new Modal(this, options)), "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget)
            })
        }
        var Modal = function(element, options) {
            this.options = options, this.$body = $(document.body), this.$element = $(element), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        };
        Modal.VERSION = "3.2.0", Modal.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, Modal.prototype.toggle = function(_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget)
        }, Modal.prototype.show = function(_relatedTarget) {
            var that = this,
                e = $.Event("show.bs.modal", {
                    relatedTarget: _relatedTarget
                });
            this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this)), this.backdrop(function() {
                var transition = $.support.transition && that.$element.hasClass("fade");
                that.$element.parent().length || that.$element.appendTo(that.$body), that.$element.show().scrollTop(0), transition && that.$element[0].offsetWidth, that.$element.addClass("in").attr("aria-hidden", !1), that.enforceFocus();
                var e = $.Event("shown.bs.modal", {
                    relatedTarget: _relatedTarget
                });
                transition ? that.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                    that.$element.trigger("focus").trigger(e)
                }).emulateTransitionEnd(300) : that.$element.trigger("focus").trigger(e)
            }))
        }, Modal.prototype.hide = function(e) {
            e && e.preventDefault(), e = $.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), $(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
        }, Modal.prototype.enforceFocus = function() {
            $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
                this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
            }, this))
        }, Modal.prototype.escape = function() {
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", $.proxy(function(e) {
                27 == e.which && this.hide()
            }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
        }, Modal.prototype.hideModal = function() {
            var that = this;
            this.$element.hide(), this.backdrop(function() {
                that.$element.trigger("hidden.bs.modal")
            })
        }, Modal.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, Modal.prototype.backdrop = function(callback) {
            var that = this,
                animate = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                if (this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                        e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                    }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !callback) return;
                doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(150) : callback()
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var callbackRemove = function() {
                    that.removeBackdrop(), callback && callback()
                };
                $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(150) : callbackRemove()
            } else callback && callback()
        }, Modal.prototype.checkScrollbar = function() {
            document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
        }, Modal.prototype.setScrollbar = function() {
            var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
            this.scrollbarWidth && this.$body.css("padding-right", bodyPad + this.scrollbarWidth)
        }, Modal.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", "")
        }, Modal.prototype.measureScrollbar = function() {
            var scrollDiv = document.createElement("div");
            scrollDiv.className = "modal-scrollbar-measure", this.$body.append(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            return this.$body[0].removeChild(scrollDiv), scrollbarWidth
        };
        var old = $.fn.modal;
        $.fn.modal = Plugin, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
            return $.fn.modal = old, this
        }, $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var $this = $(this),
                href = $this.attr("href"),
                $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")),
                option = $target.data("bs.modal") ? "toggle" : $.extend({
                    remote: !/#/.test(href) && href
                }, $target.data(), $this.data());
            $this.is("a") && e.preventDefault(), $target.one("show.bs.modal", function(showEvent) {
                showEvent.isDefaultPrevented() || $target.one("hidden.bs.modal", function() {
                    $this.is(":visible") && $this.trigger("focus")
                })
            }), Plugin.call($target, option, this)
        })
    }(jQuery),
    /* ========================================================================
     * Bootstrap: dropdown.js v3.2.0
     * http://getbootstrap.com/javascript/#dropdowns
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function clearMenus(e) {
            e && 3 === e.which || ($(backdrop).remove(), $(toggle).each(function() {
                var $parent = getParent($(this)),
                    relatedTarget = {
                        relatedTarget: this
                    };
                $parent.hasClass("open") && ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)), e.isDefaultPrevented() || $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget))
            }))
        }

        function getParent($this) {
            var selector = $this.attr("data-target");
            selector || (selector = $this.attr("href"), selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
            var $parent = selector && $(selector);
            return $parent && $parent.length ? $parent : $this.parent()
        }

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.dropdown");
                data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this)
            })
        }
        var backdrop = ".dropdown-backdrop",
            toggle = '[data-toggle="dropdown"]',
            Dropdown = function(element) {
                $(element).on("click.bs.dropdown", this.toggle)
            };
        Dropdown.VERSION = "3.2.0", Dropdown.prototype.toggle = function(e) {
            var $this = $(this);
            if (!$this.is(".disabled, :disabled")) {
                var $parent = getParent($this),
                    isActive = $parent.hasClass("open");
                if (clearMenus(), !isActive) {
                    "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click", clearMenus);
                    var relatedTarget = {
                        relatedTarget: this
                    };
                    if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
                    $this.trigger("focus"), $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget)
                }
                return !1
            }
        }, Dropdown.prototype.keydown = function(e) {
            if (/(38|40|27)/.test(e.keyCode)) {
                var $this = $(this);
                if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
                    var $parent = getParent($this),
                        isActive = $parent.hasClass("open");
                    if (!isActive || isActive && 27 == e.keyCode) return 27 == e.which && $parent.find(toggle).trigger("focus"), $this.trigger("click");
                    var desc = " li:not(.divider):visible a",
                        $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);
                    if ($items.length) {
                        var index = $items.index($items.filter(":focus"));
                        38 == e.keyCode && index > 0 && index--, 40 == e.keyCode && index < $items.length - 1 && index++, ~index || (index = 0), $items.eq(index).trigger("focus")
                    }
                }
            }
        };
        var old = $.fn.dropdown;
        $.fn.dropdown = Plugin, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
            return $.fn.dropdown = old, this
        }, $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
            e.stopPropagation()
        }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)
    }(jQuery),
    /* ========================================================================
     * Bootstrap: scrollspy.js v3.2.0
     * http://getbootstrap.com/javascript/#scrollspy
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function ScrollSpy(element, options) {
            var process = $.proxy(this.process, this);
            this.$body = $("body"), this.$scrollElement = $($(element).is("body") ? window : element), this.options = $.extend({}, ScrollSpy.DEFAULTS, options), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", process), this.refresh(), this.process()
        }

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.scrollspy"),
                    options = "object" == typeof option && option;
                data || $this.data("bs.scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]()
            })
        }
        ScrollSpy.VERSION = "3.2.0", ScrollSpy.DEFAULTS = {
            offset: 10
        }, ScrollSpy.prototype.getScrollHeight = function() {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
        }, ScrollSpy.prototype.refresh = function() {
            var offsetMethod = "offset",
                offsetBase = 0;
            $.isWindow(this.$scrollElement[0]) || (offsetMethod = "position", offsetBase = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
            var self = this;
            this.$body.find(this.selector).map(function() {
                var $el = $(this),
                    href = $el.data("target") || $el.attr("href"),
                    $href = /^#./.test(href) && $(href);
                return $href && $href.length && $href.is(":visible") && [
                    [$href[offsetMethod]().top + offsetBase, href]
                ] || null
            }).sort(function(a, b) {
                return a[0] - b[0]
            }).each(function() {
                self.offsets.push(this[0]), self.targets.push(this[1])
            })
        }, ScrollSpy.prototype.process = function() {
            var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
                scrollHeight = this.getScrollHeight(),
                maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height(),
                offsets = this.offsets,
                targets = this.targets,
                activeTarget = this.activeTarget;
            if (this.scrollHeight != scrollHeight && this.refresh(), scrollTop >= maxScroll) return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
            if (activeTarget && scrollTop <= offsets[0]) return activeTarget != (i = targets[0]) && this.activate(i);
            for (i = offsets.length; i--;) activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
        }, ScrollSpy.prototype.activate = function(target) {
            this.activeTarget = target, $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
            var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]',
                active = $(selector).parents("li").addClass("active");
            active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")), active.trigger("activate.bs.scrollspy")
        };
        var old = $.fn.scrollspy;
        $.fn.scrollspy = Plugin, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.noConflict = function() {
            return $.fn.scrollspy = old, this
        }, $(window).on("load.bs.scrollspy.data-api", function() {
            $('[data-spy="scroll"]').each(function() {
                var $spy = $(this);
                Plugin.call($spy, $spy.data())
            })
        })
    }(jQuery),
    /* ========================================================================
     * Bootstrap: tab.js v3.2.0
     * http://getbootstrap.com/javascript/#tabs
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.tab");
                data || $this.data("bs.tab", data = new Tab(this)), "string" == typeof option && data[option]()
            })
        }
        var Tab = function(element) {
            this.element = $(element)
        };
        Tab.VERSION = "3.2.0", Tab.prototype.show = function() {
            var $this = this.element,
                $ul = $this.closest("ul:not(.dropdown-menu)"),
                selector = $this.data("target");
            if (selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), !$this.parent("li").hasClass("active")) {
                var previous = $ul.find(".active:last a")[0],
                    e = $.Event("show.bs.tab", {
                        relatedTarget: previous
                    });
                if ($this.trigger(e), !e.isDefaultPrevented()) {
                    var $target = $(selector);
                    this.activate($this.closest("li"), $ul), this.activate($target, $target.parent(), function() {
                        $this.trigger({
                            type: "shown.bs.tab",
                            relatedTarget: previous
                        })
                    })
                }
            }
        }, Tab.prototype.activate = function(element, container, callback) {
            function next() {
                $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), element.addClass("active"), transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active"), callback && callback()
            }
            var $active = container.find("> .active"),
                transition = callback && $.support.transition && $active.hasClass("fade");
            transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(150) : next(), $active.removeClass("in")
        };
        var old = $.fn.tab;
        $.fn.tab = Plugin, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function() {
            return $.fn.tab = old, this
        }, $(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
            e.preventDefault(), Plugin.call($(this), "show")
        })
    }(jQuery),
    /* ========================================================================
     * Bootstrap: tooltip.js v3.2.0
     * http://getbootstrap.com/javascript/#tooltip
     * Inspired by the original jQuery.tipsy by Jason Frame
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.tooltip"),
                    options = "object" == typeof option && option;
                (data || "destroy" != option) && (data || $this.data("bs.tooltip", data = new Tooltip(this, options)), "string" == typeof option && data[option]())
            })
        }
        var Tooltip = function(element, options) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", element, options)
        };
        Tooltip.VERSION = "3.2.0", Tooltip.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1,
            viewport: {
                selector: "body",
                padding: 0
            }
        }, Tooltip.prototype.init = function(type, element, options) {
            this.enabled = !0, this.type = type, this.$element = $(element), this.options = this.getOptions(options), this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);
            for (var triggers = this.options.trigger.split(" "), i = triggers.length; i--;) {
                var trigger = triggers[i];
                if ("click" == trigger) this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
                else if ("manual" != trigger) {
                    var eventIn = "hover" == trigger ? "mouseenter" : "focusin",
                        eventOut = "hover" == trigger ? "mouseleave" : "focusout";
                    this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = $.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, Tooltip.prototype.getDefaults = function() {
            return Tooltip.DEFAULTS
        }, Tooltip.prototype.getOptions = function(options) {
            return options = $.extend({}, this.getDefaults(), this.$element.data(), options), options.delay && "number" == typeof options.delay && (options.delay = {
                show: options.delay,
                hide: options.delay
            }), options
        }, Tooltip.prototype.getDelegateOptions = function() {
            var options = {},
                defaults = this.getDefaults();
            return this._options && $.each(this._options, function(key, value) {
                defaults[key] != value && (options[key] = value)
            }), options
        }, Tooltip.prototype.enter = function(obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
            return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), $(obj.currentTarget).data("bs." + this.type, self)), clearTimeout(self.timeout), self.hoverState = "in", self.options.delay && self.options.delay.show ? void(self.timeout = setTimeout(function() {
                "in" == self.hoverState && self.show()
            }, self.options.delay.show)) : self.show()
        }, Tooltip.prototype.leave = function(obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
            return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), $(obj.currentTarget).data("bs." + this.type, self)), clearTimeout(self.timeout), self.hoverState = "out", self.options.delay && self.options.delay.hide ? void(self.timeout = setTimeout(function() {
                "out" == self.hoverState && self.hide()
            }, self.options.delay.hide)) : self.hide()
        }, Tooltip.prototype.show = function() {
            var e = $.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(e);
                var inDom = $.contains(document.documentElement, this.$element[0]);
                if (e.isDefaultPrevented() || !inDom) return;
                var that = this,
                    $tip = this.tip(),
                    tipId = this.getUID(this.type);
                this.setContent(), $tip.attr("id", tipId), this.$element.attr("aria-describedby", tipId), this.options.animation && $tip.addClass("fade");
                var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement,
                    autoToken = /\s?auto?\s?/i,
                    autoPlace = autoToken.test(placement);
                autoPlace && (placement = placement.replace(autoToken, "") || "top"), $tip.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(placement).data("bs." + this.type, this), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
                var pos = this.getPosition(),
                    actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight;
                if (autoPlace) {
                    var orgPlacement = placement,
                        $parent = this.$element.parent(),
                        parentDim = this.getPosition($parent);
                    placement = "bottom" == placement && pos.top + pos.height + actualHeight - parentDim.scroll > parentDim.height ? "top" : "top" == placement && pos.top - parentDim.scroll - actualHeight < 0 ? "bottom" : "right" == placement && pos.right + actualWidth > parentDim.width ? "left" : "left" == placement && pos.left - actualWidth < parentDim.left ? "right" : placement, $tip.removeClass(orgPlacement).addClass(placement)
                }
                var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
                this.applyPlacement(calculatedOffset, placement);
                var complete = function() {
                    that.$element.trigger("shown.bs." + that.type), that.hoverState = null
                };
                $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(150) : complete()
            }
        }, Tooltip.prototype.applyPlacement = function(offset, placement) {
            var $tip = this.tip(),
                width = $tip[0].offsetWidth,
                height = $tip[0].offsetHeight,
                marginTop = parseInt($tip.css("margin-top"), 10),
                marginLeft = parseInt($tip.css("margin-left"), 10);
            isNaN(marginTop) && (marginTop = 0), isNaN(marginLeft) && (marginLeft = 0), offset.top = offset.top + marginTop, offset.left = offset.left + marginLeft, $.offset.setOffset($tip[0], $.extend({
                using: function(props) {
                    $tip.css({
                        top: Math.round(props.top),
                        left: Math.round(props.left)
                    })
                }
            }, offset), 0), $tip.addClass("in");
            var actualWidth = $tip[0].offsetWidth,
                actualHeight = $tip[0].offsetHeight;
            "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight);
            var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
            delta.left ? offset.left += delta.left : offset.top += delta.top;
            var arrowDelta = delta.left ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight,
                arrowPosition = delta.left ? "left" : "top",
                arrowOffsetPosition = delta.left ? "offsetWidth" : "offsetHeight";
            $tip.offset(offset), this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
        }, Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
            this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + "%" : "")
        }, Tooltip.prototype.setContent = function() {
            var $tip = this.tip(),
                title = this.getTitle();
            $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right")
        }, Tooltip.prototype.hide = function() {
            function complete() {
                "in" != that.hoverState && $tip.detach(), that.$element.trigger("hidden.bs." + that.type)
            }
            var that = this,
                $tip = this.tip(),
                e = $.Event("hide.bs." + this.type);
            return this.$element.removeAttr("aria-describedby"), this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : ($tip.removeClass("in"), $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(150) : complete(), this.hoverState = null, this)
        }, Tooltip.prototype.fixTitle = function() {
            var $e = this.$element;
            ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "")
        }, Tooltip.prototype.hasContent = function() {
            return this.getTitle()
        }, Tooltip.prototype.getPosition = function($element) {
            $element = $element || this.$element;
            var el = $element[0],
                isBody = "BODY" == el.tagName;
            return $.extend({}, "function" == typeof el.getBoundingClientRect ? el.getBoundingClientRect() : null, {
                scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
                width: isBody ? $(window).width() : $element.outerWidth(),
                height: isBody ? $(window).height() : $element.outerHeight()
            }, isBody ? {
                top: 0,
                left: 0
            } : $element.offset())
        }, Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
            return "bottom" == placement ? {
                top: pos.top + pos.height,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : "top" == placement ? {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : "left" == placement ? {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left - actualWidth
            } : {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left + pos.width
            }
        }, Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
            var delta = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return delta;
            var viewportPadding = this.options.viewport && this.options.viewport.padding || 0,
                viewportDimensions = this.getPosition(this.$viewport);
            if (/right|left/.test(placement)) {
                var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll,
                    bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
                topEdgeOffset < viewportDimensions.top ? delta.top = viewportDimensions.top - topEdgeOffset : bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height && (delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset)
            } else {
                var leftEdgeOffset = pos.left - viewportPadding,
                    rightEdgeOffset = pos.left + viewportPadding + actualWidth;
                leftEdgeOffset < viewportDimensions.left ? delta.left = viewportDimensions.left - leftEdgeOffset : rightEdgeOffset > viewportDimensions.width && (delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset)
            }
            return delta
        }, Tooltip.prototype.getTitle = function() {
            var title, $e = this.$element,
                o = this.options;
            return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title)
        }, Tooltip.prototype.getUID = function(prefix) {
            do prefix += ~~(1e6 * Math.random()); while (document.getElementById(prefix));
            return prefix
        }, Tooltip.prototype.tip = function() {
            return this.$tip = this.$tip || $(this.options.template)
        }, Tooltip.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, Tooltip.prototype.validate = function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, Tooltip.prototype.enable = function() {
            this.enabled = !0
        }, Tooltip.prototype.disable = function() {
            this.enabled = !1
        }, Tooltip.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled
        }, Tooltip.prototype.toggle = function(e) {
            var self = this;
            e && (self = $(e.currentTarget).data("bs." + this.type), self || (self = new this.constructor(e.currentTarget, this.getDelegateOptions()), $(e.currentTarget).data("bs." + this.type, self))), self.tip().hasClass("in") ? self.leave(self) : self.enter(self)
        }, Tooltip.prototype.destroy = function() {
            clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
        };
        var old = $.fn.tooltip;
        $.fn.tooltip = Plugin, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.noConflict = function() {
            return $.fn.tooltip = old, this
        }
    }(jQuery),
    /* ========================================================================
     * Bootstrap: popover.js v3.2.0
     * http://getbootstrap.com/javascript/#popovers
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.popover"),
                    options = "object" == typeof option && option;
                (data || "destroy" != option) && (data || $this.data("bs.popover", data = new Popover(this, options)), "string" == typeof option && data[option]())
            })
        }
        var Popover = function(element, options) {
            this.init("popover", element, options)
        };
        if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
        Popover.VERSION = "3.2.0", Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype), Popover.prototype.constructor = Popover, Popover.prototype.getDefaults = function() {
            return Popover.DEFAULTS
        }, Popover.prototype.setContent = function() {
            var $tip = this.tip(),
                title = this.getTitle(),
                content = this.getContent();
            $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content").empty()[this.options.html ? "string" == typeof content ? "html" : "append" : "text"](content), $tip.removeClass("fade top bottom left right in"), $tip.find(".popover-title").html() || $tip.find(".popover-title").hide()
        }, Popover.prototype.hasContent = function() {
            return this.getTitle() || this.getContent()
        }, Popover.prototype.getContent = function() {
            var $e = this.$element,
                o = this.options;
            return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content)
        }, Popover.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        }, Popover.prototype.tip = function() {
            return this.$tip || (this.$tip = $(this.options.template)), this.$tip
        };
        var old = $.fn.popover;
        $.fn.popover = Plugin, $.fn.popover.Constructor = Popover, $.fn.popover.noConflict = function() {
            return $.fn.popover = old, this
        }
    }(jQuery),
    /* ========================================================================
     * Bootstrap: button.js v3.2.0
     * http://getbootstrap.com/javascript/#buttons
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.button"),
                    options = "object" == typeof option && option;
                data || $this.data("bs.button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option)
            })
        }
        var Button = function(element, options) {
            this.$element = $(element), this.options = $.extend({}, Button.DEFAULTS, options), this.isLoading = !1
        };
        Button.VERSION = "3.2.0", Button.DEFAULTS = {
            loadingText: "loading..."
        }, Button.prototype.setState = function(state) {
            var d = "disabled",
                $el = this.$element,
                val = $el.is("input") ? "val" : "html",
                data = $el.data();
            state += "Text", null == data.resetText && $el.data("resetText", $el[val]()), $el[val](null == data[state] ? this.options[state] : data[state]), setTimeout($.proxy(function() {
                "loadingText" == state ? (this.isLoading = !0, $el.addClass(d).attr(d, d)) : this.isLoading && (this.isLoading = !1, $el.removeClass(d).removeAttr(d))
            }, this), 0)
        }, Button.prototype.toggle = function() {
            var changed = !0,
                $parent = this.$element.closest('[data-toggle="buttons"]');
            if ($parent.length) {
                var $input = this.$element.find("input");
                "radio" == $input.prop("type") && ($input.prop("checked") && this.$element.hasClass("active") ? changed = !1 : $parent.find(".active").removeClass("active")), changed && $input.prop("checked", !this.$element.hasClass("active")).trigger("change")
            }
            changed && this.$element.toggleClass("active")
        };
        var old = $.fn.button;
        $.fn.button = Plugin, $.fn.button.Constructor = Button, $.fn.button.noConflict = function() {
            return $.fn.button = old, this
        }, $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            var $btn = $(e.target);
            $btn.hasClass("btn") || ($btn = $btn.closest(".btn")), Plugin.call($btn, "toggle"), e.preventDefault()
        })
    }(jQuery),
    /* ========================================================================
     * Bootstrap: collapse.js v3.2.0
     * http://getbootstrap.com/javascript/#collapse
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.collapse"),
                    options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
                !data && options.toggle && "show" == option && (option = !option), data || $this.data("bs.collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]()
            })
        }
        var Collapse = function(element, options) {
            this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), this.transitioning = null, this.options.parent && (this.$parent = $(this.options.parent)), this.options.toggle && this.toggle()
        };
        Collapse.VERSION = "3.2.0", Collapse.DEFAULTS = {
            toggle: !0
        }, Collapse.prototype.dimension = function() {
            var hasWidth = this.$element.hasClass("width");
            return hasWidth ? "width" : "height"
        }, Collapse.prototype.show = function() {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var startEvent = $.Event("show.bs.collapse");
                if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                    var actives = this.$parent && this.$parent.find("> .panel > .in");
                    if (actives && actives.length) {
                        var hasData = actives.data("bs.collapse");
                        if (hasData && hasData.transitioning) return;
                        Plugin.call(actives, "hide"), hasData || actives.data("bs.collapse", null)
                    }
                    var dimension = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[dimension](0), this.transitioning = 1;
                    var complete = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!$.support.transition) return complete.call(this);
                    var scrollSize = $.camelCase(["scroll", dimension].join("-"));
                    this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
                }
            }
        }, Collapse.prototype.hide = function() {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var startEvent = $.Event("hide.bs.collapse");
                if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                    var dimension = this.dimension();
                    this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                    var complete = function() {
                        this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                    };
                    return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(350) : complete.call(this)
                }
            }
        }, Collapse.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        };
        var old = $.fn.collapse;
        $.fn.collapse = Plugin, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
            return $.fn.collapse = old, this
        }, $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
            var href, $this = $(this),
                target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""),
                $target = $(target),
                data = $target.data("bs.collapse"),
                option = data ? "toggle" : $this.data(),
                parent = $this.attr("data-parent"),
                $parent = parent && $(parent);
            data && data.transitioning || ($parent && $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass("collapsed"), $this[$target.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), Plugin.call($target, option)
        })
    }(jQuery),
    /* ========================================================================
     * Bootstrap: carousel.js v3.2.0
     * http://getbootstrap.com/javascript/#carousel
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.carousel"),
                    options = $.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof option && option),
                    action = "string" == typeof option ? option : options.slide;
                data || $this.data("bs.carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.pause().cycle()
            })
        }
        var Carousel = function(element, options) {
            this.$element = $(element).on("keydown.bs.carousel", $.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), this.options = options, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this))
        };
        Carousel.VERSION = "3.2.0", Carousel.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0
        }, Carousel.prototype.keydown = function(e) {
            switch (e.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            e.preventDefault()
        }, Carousel.prototype.cycle = function(e) {
            return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), this
        }, Carousel.prototype.getItemIndex = function(item) {
            return this.$items = item.parent().children(".item"), this.$items.index(item || this.$active)
        }, Carousel.prototype.to = function(pos) {
            var that = this,
                activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            return pos > this.$items.length - 1 || 0 > pos ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
                that.to(pos)
            }) : activeIndex == pos ? this.pause().cycle() : this.slide(pos > activeIndex ? "next" : "prev", $(this.$items[pos]))
        }, Carousel.prototype.pause = function(e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition && (this.$element.trigger($.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, Carousel.prototype.next = function() {
            return this.sliding ? void 0 : this.slide("next")
        }, Carousel.prototype.prev = function() {
            return this.sliding ? void 0 : this.slide("prev")
        }, Carousel.prototype.slide = function(type, next) {
            var $active = this.$element.find(".item.active"),
                $next = next || $active[type](),
                isCycling = this.interval,
                direction = "next" == type ? "left" : "right",
                fallback = "next" == type ? "first" : "last",
                that = this;
            if (!$next.length) {
                if (!this.options.wrap) return;
                $next = this.$element.find(".item")[fallback]()
            }
            if ($next.hasClass("active")) return this.sliding = !1;
            var relatedTarget = $next[0],
                slideEvent = $.Event("slide.bs.carousel", {
                    relatedTarget: relatedTarget,
                    direction: direction
                });
            if (this.$element.trigger(slideEvent), !slideEvent.isDefaultPrevented()) {
                if (this.sliding = !0, isCycling && this.pause(), this.$indicators.length) {
                    this.$indicators.find(".active").removeClass("active");
                    var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
                    $nextIndicator && $nextIndicator.addClass("active")
                }
                var slidEvent = $.Event("slid.bs.carousel", {
                    relatedTarget: relatedTarget,
                    direction: direction
                });
                return $.support.transition && this.$element.hasClass("slide") ? ($next.addClass(type), $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), $active.one("bsTransitionEnd", function() {
                    $next.removeClass([type, direction].join(" ")).addClass("active"), $active.removeClass(["active", direction].join(" ")), that.sliding = !1, setTimeout(function() {
                        that.$element.trigger(slidEvent)
                    }, 0)
                }).emulateTransitionEnd(1e3 * $active.css("transition-duration").slice(0, -1))) : ($active.removeClass("active"), $next.addClass("active"), this.sliding = !1, this.$element.trigger(slidEvent)), isCycling && this.cycle(), this
            }
        };
        var old = $.fn.carousel;
        $.fn.carousel = Plugin, $.fn.carousel.Constructor = Carousel, $.fn.carousel.noConflict = function() {
            return $.fn.carousel = old, this
        }, $(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
            var href, $this = $(this),
                $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
            if ($target.hasClass("carousel")) {
                var options = $.extend({}, $target.data(), $this.data()),
                    slideIndex = $this.attr("data-slide-to");
                slideIndex && (options.interval = !1), Plugin.call($target, options), slideIndex && $target.data("bs.carousel").to(slideIndex), e.preventDefault()
            }
        }), $(window).on("load", function() {
            $('[data-ride="carousel"]').each(function() {
                var $carousel = $(this);
                Plugin.call($carousel, $carousel.data())
            })
        })
    }(jQuery),
    /* ========================================================================
     * Bootstrap: affix.js v3.2.0
     * http://getbootstrap.com/javascript/#affix
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */
    + function($) {
        "use strict";

        function Plugin(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("bs.affix"),
                    options = "object" == typeof option && option;
                data || $this.data("bs.affix", data = new Affix(this, options)), "string" == typeof option && data[option]()
            })
        }
        var Affix = function(element, options) {
            this.options = $.extend({}, Affix.DEFAULTS, options), this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this)), this.$element = $(element), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
        };
        Affix.VERSION = "3.2.0", Affix.RESET = "affix affix-top affix-bottom", Affix.DEFAULTS = {
            offset: 0,
            target: window
        }, Affix.prototype.getPinnedOffset = function() {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(Affix.RESET).addClass("affix");
            var scrollTop = this.$target.scrollTop(),
                position = this.$element.offset();
            return this.pinnedOffset = position.top - scrollTop
        }, Affix.prototype.checkPositionWithEventLoop = function() {
            setTimeout($.proxy(this.checkPosition, this), 1)
        }, Affix.prototype.checkPosition = function() {
            if (this.$element.is(":visible")) {
                var scrollHeight = $(document).height(),
                    scrollTop = this.$target.scrollTop(),
                    position = this.$element.offset(),
                    offset = this.options.offset,
                    offsetTop = offset.top,
                    offsetBottom = offset.bottom;
                "object" != typeof offset && (offsetBottom = offsetTop = offset), "function" == typeof offsetTop && (offsetTop = offset.top(this.$element)), "function" == typeof offsetBottom && (offsetBottom = offset.bottom(this.$element));
                var affix = null != this.unpin && scrollTop + this.unpin <= position.top ? !1 : null != offsetBottom && position.top + this.$element.height() >= scrollHeight - offsetBottom ? "bottom" : null != offsetTop && offsetTop >= scrollTop ? "top" : !1;
                if (this.affixed !== affix) {
                    null != this.unpin && this.$element.css("top", "");
                    var affixType = "affix" + (affix ? "-" + affix : ""),
                        e = $.Event(affixType + ".bs.affix");
                    this.$element.trigger(e), e.isDefaultPrevented() || (this.affixed = affix, this.unpin = "bottom" == affix ? this.getPinnedOffset() : null, this.$element.removeClass(Affix.RESET).addClass(affixType).trigger($.Event(affixType.replace("affix", "affixed"))), "bottom" == affix && this.$element.offset({
                        top: scrollHeight - this.$element.height() - offsetBottom
                    }))
                }
            }
        };
        var old = $.fn.affix;
        $.fn.affix = Plugin, $.fn.affix.Constructor = Affix, $.fn.affix.noConflict = function() {
            return $.fn.affix = old, this
        }, $(window).on("load", function() {
            $('[data-spy="affix"]').each(function() {
                var $spy = $(this),
                    data = $spy.data();
                data.offset = data.offset || {}, data.offsetBottom && (data.offset.bottom = data.offsetBottom), data.offsetTop && (data.offset.top = data.offsetTop), Plugin.call($spy, data)
            })
        })
    }(jQuery),
    /*
    jQuery.Turbolinks ~ https://github.com/kossnocorp/jquery.turbolinks
    jQuery plugin for drop-in fix binded events problem caused by Turbolinks

    The MIT License
    Copyright (c) 2012-2013 Sasha Koss & Rico Sta. Cruz
     */
    function() {
        var $, $document;
        $ = window.jQuery || ("function" == typeof require ? require("jquery") : void 0), $document = $(document), $.turbo = {
            version: "2.0.2",
            isReady: !1,
            use: function(load, fetch) {
                return $document.off(".turbo").on("" + load + ".turbo", this.onLoad).on("" + fetch + ".turbo", this.onFetch)
            },
            addCallback: function(callback) {
                return $.turbo.isReady ? callback($) : $document.on("turbo:ready", function() {
                    return callback($)
                })
            },
            onLoad: function() {
                return $.turbo.isReady = !0, $document.trigger("turbo:ready")
            },
            onFetch: function() {
                return $.turbo.isReady = !1
            },
            register: function() {
                return $(this.onLoad), $.fn.ready = this.addCallback
            }
        }, $.turbo.register(), $.turbo.use("page:load", "page:fetch")
    }.call(this),
    function() {
        var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, indexOf = [].indexOf || function(item) {
                for (var i = 0, l = this.length; l > i; i++)
                    if (i in this && this[i] === item) return i;
                return -1
            },
            extend = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            },
            hasProp = {}.hasOwnProperty,
            slice = [].slice,
            bind = function(fn, me) {
                return function() {
                    return fn.apply(me, arguments)
                }
            };
        pageCache = {}, cacheSize = 10, transitionCacheEnabled = !1, progressBar = null, currentState = null, loadedAssets = null, referer = null, xhr = null, EVENTS = {
            BEFORE_CHANGE: "page:before-change",
            FETCH: "page:fetch",
            RECEIVE: "page:receive",
            CHANGE: "page:change",
            UPDATE: "page:update",
            LOAD: "page:load",
            RESTORE: "page:restore",
            BEFORE_UNLOAD: "page:before-unload",
            EXPIRE: "page:expire"
        }, fetch = function(url) {
            var cachedPage;
            return url = new ComponentUrl(url), rememberReferer(), cacheCurrentPage(), null != progressBar && progressBar.start(), transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute)) ? (fetchHistory(cachedPage), fetchReplacement(url, null, !1)) : fetchReplacement(url, resetScrollPosition)
        }, transitionCacheFor = function(url) {
            var cachedPage;
            return cachedPage = pageCache[url], cachedPage && !cachedPage.transitionCacheDisabled ? cachedPage : void 0
        }, enableTransitionCache = function(enable) {
            return null == enable && (enable = !0), transitionCacheEnabled = enable
        }, enableProgressBar = function(enable) {
            return null == enable && (enable = !0), browserSupportsTurbolinks ? enable ? null != progressBar ? progressBar : progressBar = new ProgressBar("html") : (null != progressBar && progressBar.uninstall(), progressBar = null) : void 0
        }, fetchReplacement = function(url, onLoadFunction, showProgressBar) {
            return null == showProgressBar && (showProgressBar = !0), triggerEvent(EVENTS.FETCH, {
                url: url.absolute
            }), null != xhr && xhr.abort(), xhr = new XMLHttpRequest, xhr.open("GET", url.withoutHashForIE10compatibility(), !0), xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml, application/xml"), xhr.setRequestHeader("X-XHR-Referer", referer), xhr.onload = function() {
                var doc;
                return triggerEvent(EVENTS.RECEIVE, {
                    url: url.absolute
                }), (doc = processResponse()) ? (reflectNewUrl(url), reflectRedirectedUrl(), changePage.apply(null, extractTitleAndBody(doc)), manuallyTriggerHashChangeForFirefox(), "function" == typeof onLoadFunction && onLoadFunction(), triggerEvent(EVENTS.LOAD)) : document.location.href = crossOriginRedirect() || url.absolute
            }, progressBar && showProgressBar && (xhr.onprogress = function() {
                return function(event) {
                    var percent;
                    return percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10, progressBar.advanceTo(percent)
                }
            }(this)), xhr.onloadend = function() {
                return xhr = null
            }, xhr.onerror = function() {
                return document.location.href = url.absolute
            }, xhr.send()
        }, fetchHistory = function(cachedPage) {
            return null != xhr && xhr.abort(), changePage(cachedPage.title, cachedPage.body), recallScrollPosition(cachedPage), triggerEvent(EVENTS.RESTORE)
        }, cacheCurrentPage = function() {
            var currentStateUrl;
            return currentStateUrl = new ComponentUrl(currentState.url), pageCache[currentStateUrl.absolute] = {
                url: currentStateUrl.relative,
                body: document.body,
                title: document.title,
                positionY: window.pageYOffset,
                positionX: window.pageXOffset,
                cachedAt: (new Date).getTime(),
                transitionCacheDisabled: null != document.querySelector("[data-no-transition-cache]")
            }, constrainPageCacheTo(cacheSize)
        }, pagesCached = function(size) {
            return null == size && (size = cacheSize), /^[\d]+$/.test(size) ? cacheSize = parseInt(size) : void 0
        }, constrainPageCacheTo = function(limit) {
            var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
            for (pageCacheKeys = Object.keys(pageCache), cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
                    return pageCache[url].cachedAt
                }).sort(function(a, b) {
                    return b - a
                }), results = [], i = 0, len = pageCacheKeys.length; len > i; i++) key = pageCacheKeys[i], pageCache[key].cachedAt <= cacheTimesRecentFirst[limit] && (triggerEvent(EVENTS.EXPIRE, pageCache[key]), results.push(delete pageCache[key]));
            return results
        }, changePage = function(title, body, csrfToken, runScripts) {
            return triggerEvent(EVENTS.BEFORE_UNLOAD), document.title = title, document.documentElement.replaceChild(body, document.body), null != csrfToken && CSRFToken.update(csrfToken), setAutofocusElement(), runScripts && executeScriptTags(), currentState = window.history.state, null != progressBar && progressBar.done(), triggerEvent(EVENTS.CHANGE), triggerEvent(EVENTS.UPDATE)
        }, executeScriptTags = function() {
            var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
            for (scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')), i = 0, len = scripts.length; len > i; i++)
                if (script = scripts[i], "" === (ref = script.type) || "text/javascript" === ref) {
                    for (copy = document.createElement("script"), ref1 = script.attributes, j = 0, len1 = ref1.length; len1 > j; j++) attr = ref1[j], copy.setAttribute(attr.name, attr.value);
                    script.hasAttribute("async") || (copy.async = !1), copy.appendChild(document.createTextNode(script.innerHTML)), parentNode = script.parentNode, nextSibling = script.nextSibling, parentNode.removeChild(script), parentNode.insertBefore(copy, nextSibling)
                }
        }, removeNoscriptTags = function(node) {
            return node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi, ""), node
        }, setAutofocusElement = function() {
            var autofocusElement, list;
            return autofocusElement = (list = document.querySelectorAll("input[autofocus], textarea[autofocus]"))[list.length - 1], autofocusElement && document.activeElement !== autofocusElement ? autofocusElement.focus() : void 0
        }, reflectNewUrl = function(url) {
            return (url = new ComponentUrl(url)).absolute !== referer ? window.history.pushState({
                turbolinks: !0,
                url: url.absolute
            }, "", url.absolute) : void 0
        }, reflectRedirectedUrl = function() {
            var location, preservedHash;
            return (location = xhr.getResponseHeader("X-XHR-Redirected-To")) ? (location = new ComponentUrl(location), preservedHash = location.hasNoHash() ? document.location.hash : "", window.history.replaceState(window.history.state, "", location.href + preservedHash)) : void 0
        }, crossOriginRedirect = function() {
            var redirect;
            return null != (redirect = xhr.getResponseHeader("Location")) && new ComponentUrl(redirect).crossOrigin() ? redirect : void 0
        }, rememberReferer = function() {
            return referer = document.location.href
        }, rememberCurrentUrl = function() {
            return window.history.replaceState({
                turbolinks: !0,
                url: document.location.href
            }, "", document.location.href)
        }, rememberCurrentState = function() {
            return currentState = window.history.state
        }, manuallyTriggerHashChangeForFirefox = function() {
            var url;
            return navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash() ? (window.history.replaceState(currentState, "", url.withoutHash()), document.location.hash = url.hash) : void 0
        }, recallScrollPosition = function(page) {
            return window.scrollTo(page.positionX, page.positionY)
        }, resetScrollPosition = function() {
            return document.location.hash ? document.location.href = document.location.href : window.scrollTo(0, 0)
        }, clone = function(original) {
            var copy, key, value;
            if (null == original || "object" != typeof original) return original;
            copy = new original.constructor;
            for (key in original) value = original[key], copy[key] = clone(value);
            return copy
        }, popCookie = function(name) {
            var ref, value;
            return value = (null != (ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) ? ref[1].toUpperCase() : void 0) || "", document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/", value
        }, triggerEvent = function(name, data) {
            var event;
            return "undefined" != typeof Prototype && Event.fire(document, name, data, !0), event = document.createEvent("Events"), data && (event.data = data), event.initEvent(name, !0, !0), document.dispatchEvent(event)
        }, pageChangePrevented = function(url) {
            return !triggerEvent(EVENTS.BEFORE_CHANGE, {
                url: url
            })
        }, processResponse = function() {
            var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
            return clientOrServerError = function() {
                var ref;
                return 400 <= (ref = xhr.status) && 600 > ref
            }, validContent = function() {
                var contentType;
                return null != (contentType = xhr.getResponseHeader("Content-Type")) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)
            }, extractTrackAssets = function(doc) {
                var i, len, node, ref, results;
                for (ref = doc.querySelector("head").childNodes, results = [], i = 0, len = ref.length; len > i; i++) node = ref[i], null != ("function" == typeof node.getAttribute ? node.getAttribute("data-turbolinks-track") : void 0) && results.push(node.getAttribute("src") || node.getAttribute("href"));
                return results
            }, assetsChanged = function(doc) {
                var fetchedAssets;
                return loadedAssets || (loadedAssets = extractTrackAssets(document)), fetchedAssets = extractTrackAssets(doc), fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length
            }, intersection = function(a, b) {
                var i, len, ref, results, value;
                for (a.length > b.length && (ref = [b, a], a = ref[0], b = ref[1]), results = [], i = 0, len = a.length; len > i; i++) value = a[i], indexOf.call(b, value) >= 0 && results.push(value);
                return results
            }, !clientOrServerError() && validContent() && (doc = createDocument(xhr.responseText), doc && !assetsChanged(doc)) ? doc : void 0
        }, extractTitleAndBody = function(doc) {
            var title;
            return title = doc.querySelector("title"), [null != title ? title.textContent : void 0, removeNoscriptTags(doc.querySelector("body")), CSRFToken.get(doc).token, "runScripts"]
        }, CSRFToken = {
            get: function(doc) {
                var tag;
                return null == doc && (doc = document), {
                    node: tag = doc.querySelector('meta[name="csrf-token"]'),
                    token: null != tag && "function" == typeof tag.getAttribute ? tag.getAttribute("content") : void 0
                }
            },
            update: function(latest) {
                var current;
                return current = this.get(), null != current.token && null != latest && current.token !== latest ? current.node.setAttribute("content", latest) : void 0
            }
        }, createDocument = function(html) {
            var doc;
            return doc = document.documentElement.cloneNode(), doc.innerHTML = html, doc.head = doc.querySelector("head"), doc.body = doc.querySelector("body"), doc
        }, ComponentUrl = function() {
            function ComponentUrl(original1) {
                return this.original = null != original1 ? original1 : document.location.href, this.original.constructor === ComponentUrl ? this.original : void this._parse()
            }
            return ComponentUrl.prototype.withoutHash = function() {
                return this.href.replace(this.hash, "").replace("#", "")
            }, ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
                return this.withoutHash()
            }, ComponentUrl.prototype.hasNoHash = function() {
                return 0 === this.hash.length
            }, ComponentUrl.prototype.crossOrigin = function() {
                return this.origin !== (new ComponentUrl).origin
            }, ComponentUrl.prototype._parse = function() {
                var ref;
                return (null != this.link ? this.link : this.link = document.createElement("a")).href = this.original, ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash, this.origin = [this.protocol, "//", this.hostname].join(""), 0 !== this.port.length && (this.origin += ":" + this.port), this.relative = [this.pathname, this.search, this.hash].join(""), this.absolute = this.href
            }, ComponentUrl
        }(), Link = function(superClass) {
            function Link(link1) {
                return this.link = link1, this.link.constructor === Link ? this.link : (this.original = this.link.href, this.originalElement = this.link, this.link = this.link.cloneNode(!1), void Link.__super__.constructor.apply(this, arguments))
            }
            return extend(Link, superClass), Link.HTML_EXTENSIONS = ["html"], Link.allowExtensions = function() {
                var extension, extensions, i, len;
                for (extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [], i = 0, len = extensions.length; len > i; i++) extension = extensions[i], Link.HTML_EXTENSIONS.push(extension);
                return Link.HTML_EXTENSIONS
            }, Link.prototype.shouldIgnore = function() {
                return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target()
            }, Link.prototype._anchored = function() {
                return (this.hash.length > 0 || "#" === this.href.charAt(this.href.length - 1)) && this.withoutHash() === (new ComponentUrl).withoutHash()
            }, Link.prototype._nonHtml = function() {
                return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + Link.HTML_EXTENSIONS.join("|") + ")?$", "g"))
            }, Link.prototype._optOut = function() {
                var ignore, link;
                for (link = this.originalElement; !ignore && link !== document;) ignore = null != link.getAttribute("data-no-turbolink"), link = link.parentNode;
                return ignore
            }, Link.prototype._target = function() {
                return 0 !== this.link.target.length
            }, Link
        }(ComponentUrl), Click = function() {
            function Click(event1) {
                this.event = event1, this.event.defaultPrevented || (this._extractLink(), this._validForTurbolinks() && (pageChangePrevented(this.link.absolute) || visit(this.link.href), this.event.preventDefault()))
            }
            return Click.installHandlerLast = function(event) {
                return event.defaultPrevented ? void 0 : (document.removeEventListener("click", Click.handle, !1), document.addEventListener("click", Click.handle, !1))
            }, Click.handle = function(event) {
                return new Click(event)
            }, Click.prototype._extractLink = function() {
                var link;
                for (link = this.event.target; link.parentNode && "A" !== link.nodeName;) link = link.parentNode;
                return "A" === link.nodeName && 0 !== link.href.length ? this.link = new Link(link) : void 0
            }, Click.prototype._validForTurbolinks = function() {
                return null != this.link && !(this.link.shouldIgnore() || this._nonStandardClick())
            }, Click.prototype._nonStandardClick = function() {
                return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey
            }, Click
        }(), ProgressBar = function() {
            function ProgressBar(elementSelector) {
                this.elementSelector = elementSelector, this._trickle = bind(this._trickle, this), this.value = 0, this.content = "", this.speed = 300, this.opacity = .99, this.install()
            }
            var className;
            return className = "turbolinks-progress-bar", ProgressBar.prototype.install = function() {
                return this.element = document.querySelector(this.elementSelector), this.element.classList.add(className), this.styleElement = document.createElement("style"), document.head.appendChild(this.styleElement), this._updateStyle()
            }, ProgressBar.prototype.uninstall = function() {
                return this.element.classList.remove(className), document.head.removeChild(this.styleElement)
            }, ProgressBar.prototype.start = function() {
                return this.advanceTo(5)
            }, ProgressBar.prototype.advanceTo = function(value) {
                var ref;
                if (value > (ref = this.value) && 100 >= ref) {
                    if (this.value = value, this._updateStyle(), 100 === this.value) return this._stopTrickle();
                    if (this.value > 0) return this._startTrickle()
                }
            }, ProgressBar.prototype.done = function() {
                return this.value > 0 ? (this.advanceTo(100), this._reset()) : void 0
            }, ProgressBar.prototype._reset = function() {
                var originalOpacity;
                return originalOpacity = this.opacity, setTimeout(function(_this) {
                    return function() {
                        return _this.opacity = 0, _this._updateStyle()
                    }
                }(this), this.speed / 2), setTimeout(function(_this) {
                    return function() {
                        return _this.value = 0, _this.opacity = originalOpacity, _this._withSpeed(0, function() {
                            return _this._updateStyle(!0)
                        })
                    }
                }(this), this.speed)
            }, ProgressBar.prototype._startTrickle = function() {
                return this.trickling ? void 0 : (this.trickling = !0, setTimeout(this._trickle, this.speed))
            }, ProgressBar.prototype._stopTrickle = function() {
                return delete this.trickling
            }, ProgressBar.prototype._trickle = function() {
                return this.trickling ? (this.advanceTo(this.value + Math.random() / 2), setTimeout(this._trickle, this.speed)) : void 0
            }, ProgressBar.prototype._withSpeed = function(speed, fn) {
                var originalSpeed, result;
                return originalSpeed = this.speed, this.speed = speed, result = fn(), this.speed = originalSpeed, result
            }, ProgressBar.prototype._updateStyle = function(forceRepaint) {
                return null == forceRepaint && (forceRepaint = !1), forceRepaint && this._changeContentToForceRepaint(), this.styleElement.textContent = this._createCSSRule()
            }, ProgressBar.prototype._changeContentToForceRepaint = function() {
                return this.content = "" === this.content ? " " : ""
            }, ProgressBar.prototype._createCSSRule = function() {
                return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + this.speed / 2 + "ms ease-in;\n  transform: translate3d(0,0,0);\n}"
            }, ProgressBar
        }(), bypassOnLoadPopstate = function(fn) {
            return setTimeout(fn, 500)
        }, installDocumentReadyPageEventTriggers = function() {
            return document.addEventListener("DOMContentLoaded", function() {
                return triggerEvent(EVENTS.CHANGE), triggerEvent(EVENTS.UPDATE)
            }, !0)
        }, installJqueryAjaxSuccessPageUpdateTrigger = function() {
            return "undefined" != typeof jQuery ? jQuery(document).on("ajaxSuccess", function(event, xhr) {
                return jQuery.trim(xhr.responseText) ? triggerEvent(EVENTS.UPDATE) : void 0
            }) : void 0
        }, installHistoryChangeHandler = function(event) {
            var cachedPage, ref;
            return (null != (ref = event.state) ? ref.turbolinks : void 0) ? (cachedPage = pageCache[new ComponentUrl(event.state.url).absolute]) ? (cacheCurrentPage(), fetchHistory(cachedPage)) : visit(event.target.location.href) : void 0
        }, initializeTurbolinks = function() {
            return rememberCurrentUrl(), rememberCurrentState(), document.addEventListener("click", Click.installHandlerLast, !0), window.addEventListener("hashchange", function() {
                return rememberCurrentUrl(), rememberCurrentState()
            }, !1), bypassOnLoadPopstate(function() {
                return window.addEventListener("popstate", installHistoryChangeHandler, !1)
            })
        }, historyStateIsDefined = void 0 !== window.history.state || navigator.userAgent.match(/Firefox\/2[6|7]/), browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined, browserIsntBuggy = !navigator.userAgent.match(/CriOS\//), requestMethodIsSafe = "GET" === (ref = popCookie("request_method")) || "" === ref, browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe, browserSupportsCustomEvents = document.addEventListener && document.createEvent, browserSupportsCustomEvents && (installDocumentReadyPageEventTriggers(), installJqueryAjaxSuccessPageUpdateTrigger()), browserSupportsTurbolinks ? (visit = fetch, initializeTurbolinks()) : visit = function(url) {
            return document.location.href = url
        }, this.Turbolinks = {
            visit: visit,
            pagesCached: pagesCached,
            enableTransitionCache: enableTransitionCache,
            enableProgressBar: enableProgressBar,
            allowLinkExtensions: Link.allowExtensions,
            supported: browserSupportsTurbolinks,
            EVENTS: clone(EVENTS)
        }
    }.call(this),
    function() {
        var $ = jQuery,
            LightboxOptions = function() {
                function LightboxOptions() {
                    this.fadeDuration = 500, this.fitImagesInViewport = !0, this.resizeDuration = 700, this.positionFromTop = 50, this.showImageNumberLabel = !0, this.alwaysShowNavOnTouchDevices = !1, this.wrapAround = !1
                }
                return LightboxOptions.prototype.albumLabel = function(curImageNum, albumSize) {
                    return "Image " + curImageNum + " of " + albumSize
                }, LightboxOptions
            }(),
            Lightbox = function() {
                function Lightbox(options) {
                    this.options = options, this.album = [], this.currentImageIndex = void 0, this.init()
                }
                return Lightbox.prototype.init = function() {
                    this.enable(), this.build()
                }, Lightbox.prototype.enable = function() {
                    var self = this;
                    $("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function(event) {
                        return self.start($(event.currentTarget)), !1
                    })
                }, Lightbox.prototype.build = function() {
                    var self = this;
                    $("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo($("body")), this.$lightbox = $("#lightbox"), this.$overlay = $("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function() {
                        return self.end(), !1
                    }), this.$lightbox.hide().on("click", function(event) {
                        return "lightbox" === $(event.target).attr("id") && self.end(), !1
                    }), this.$outerContainer.on("click", function(event) {
                        return "lightbox" === $(event.target).attr("id") && self.end(), !1
                    }), this.$lightbox.find(".lb-prev").on("click", function() {
                        return self.changeImage(0 === self.currentImageIndex ? self.album.length - 1 : self.currentImageIndex - 1), !1
                    }), this.$lightbox.find(".lb-next").on("click", function() {
                        return self.changeImage(self.currentImageIndex === self.album.length - 1 ? 0 : self.currentImageIndex + 1), !1
                    }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function() {
                        return self.end(), !1
                    })
                }, Lightbox.prototype.start = function($link) {
                    function addToAlbum($link) {
                        self.album.push({
                            link: $link.attr("href"),
                            title: $link.attr("data-title") || $link.attr("title")
                        })
                    }
                    var self = this,
                        $window = $(window);
                    $window.on("resize", $.proxy(this.sizeOverlay, this)), $("select, object, embed").css({
                        visibility: "hidden"
                    }), this.sizeOverlay(), this.album = [];
                    var $links, imageNumber = 0,
                        dataLightboxValue = $link.attr("data-lightbox");
                    if (dataLightboxValue) {
                        $links = $($link.prop("tagName") + '[data-lightbox="' + dataLightboxValue + '"]');
                        for (var i = 0; i < $links.length; i = ++i) addToAlbum($($links[i])), $links[i] === $link[0] && (imageNumber = i)
                    } else if ("lightbox" === $link.attr("rel")) addToAlbum($link);
                    else {
                        $links = $($link.prop("tagName") + '[rel="' + $link.attr("rel") + '"]');
                        for (var j = 0; j < $links.length; j = ++j) addToAlbum($($links[j])), $links[j] === $link[0] && (imageNumber = j)
                    }
                    var top = $window.scrollTop() + this.options.positionFromTop,
                        left = $window.scrollLeft();
                    this.$lightbox.css({
                        top: top + "px",
                        left: left + "px"
                    }).fadeIn(this.options.fadeDuration), this.changeImage(imageNumber)
                }, Lightbox.prototype.changeImage = function(imageNumber) {
                    var self = this;
                    this.disableKeyboardNav();
                    var $image = this.$lightbox.find(".lb-image");
                    this.$overlay.fadeIn(this.options.fadeDuration), $(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
                    var preloader = new Image;
                    preloader.onload = function() {
                        var $preloader, imageHeight, imageWidth, maxImageHeight, maxImageWidth, windowHeight, windowWidth;
                        $image.attr("src", self.album[imageNumber].link), $preloader = $(preloader), $image.width(preloader.width), $image.height(preloader.height), self.options.fitImagesInViewport && (windowWidth = $(window).width(), windowHeight = $(window).height(), maxImageWidth = windowWidth - self.containerLeftPadding - self.containerRightPadding - 20, maxImageHeight = windowHeight - self.containerTopPadding - self.containerBottomPadding - 120, (preloader.width > maxImageWidth || preloader.height > maxImageHeight) && (preloader.width / maxImageWidth > preloader.height / maxImageHeight ? (imageWidth = maxImageWidth, imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10), $image.width(imageWidth), $image.height(imageHeight)) : (imageHeight = maxImageHeight, imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10), $image.width(imageWidth), $image.height(imageHeight)))), self.sizeContainer($image.width(), $image.height())
                    }, preloader.src = this.album[imageNumber].link, this.currentImageIndex = imageNumber
                }, Lightbox.prototype.sizeOverlay = function() {
                    this.$overlay.width($(window).width()).height($(document).height())
                }, Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
                    function postResize() {
                        self.$lightbox.find(".lb-dataContainer").width(newWidth), self.$lightbox.find(".lb-prevLink").height(newHeight), self.$lightbox.find(".lb-nextLink").height(newHeight), self.showImage()
                    }
                    var self = this,
                        oldWidth = this.$outerContainer.outerWidth(),
                        oldHeight = this.$outerContainer.outerHeight(),
                        newWidth = imageWidth + this.containerLeftPadding + this.containerRightPadding,
                        newHeight = imageHeight + this.containerTopPadding + this.containerBottomPadding;
                    oldWidth !== newWidth || oldHeight !== newHeight ? this.$outerContainer.animate({
                        width: newWidth,
                        height: newHeight
                    }, this.options.resizeDuration, "swing", function() {
                        postResize()
                    }) : postResize()
                }, Lightbox.prototype.showImage = function() {
                    this.$lightbox.find(".lb-loader").hide(), this.$lightbox.find(".lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
                }, Lightbox.prototype.updateNav = function() {
                    var alwaysShowNav = !1;
                    try {
                        document.createEvent("TouchEvent"), alwaysShowNav = this.options.alwaysShowNavOnTouchDevices ? !0 : !1
                    } catch (e) {}
                    this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (alwaysShowNav && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), alwaysShowNav && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), alwaysShowNav && this.$lightbox.find(".lb-next").css("opacity", "1"))))
                }, Lightbox.prototype.updateDetails = function() {
                    var self = this;
                    "undefined" != typeof this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title && this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast").find("a").on("click", function() {
                        location.href = $(this).attr("href")
                    }), this.album.length > 1 && this.options.showImageNumberLabel ? this.$lightbox.find(".lb-number").text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn("fast") : this.$lightbox.find(".lb-number").hide(), this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function() {
                        return self.sizeOverlay()
                    })
                }, Lightbox.prototype.preloadNeighboringImages = function() {
                    if (this.album.length > this.currentImageIndex + 1) {
                        var preloadNext = new Image;
                        preloadNext.src = this.album[this.currentImageIndex + 1].link
                    }
                    if (this.currentImageIndex > 0) {
                        var preloadPrev = new Image;
                        preloadPrev.src = this.album[this.currentImageIndex - 1].link
                    }
                }, Lightbox.prototype.enableKeyboardNav = function() {
                    $(document).on("keyup.keyboard", $.proxy(this.keyboardAction, this))
                }, Lightbox.prototype.disableKeyboardNav = function() {
                    $(document).off(".keyboard")
                }, Lightbox.prototype.keyboardAction = function(event) {
                    var KEYCODE_ESC = 27,
                        KEYCODE_LEFTARROW = 37,
                        KEYCODE_RIGHTARROW = 39,
                        keycode = event.keyCode,
                        key = String.fromCharCode(keycode).toLowerCase();
                    keycode === KEYCODE_ESC || key.match(/x|o|c/) ? this.end() : "p" === key || keycode === KEYCODE_LEFTARROW ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : ("n" === key || keycode === KEYCODE_RIGHTARROW) && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
                }, Lightbox.prototype.end = function() {
                    this.disableKeyboardNav(), $(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), $("select, object, embed").css({
                        visibility: "visible"
                    })
                }, Lightbox
            }();
        $(document).on("page:load ready", function() {
            {
                var options = new LightboxOptions;
                new Lightbox(options)
            }
        })
    }.call(this), ! function(a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
    }(function(a) {
        "use strict";
        var b = window.Slick || {};
        b = function() {
            function c(c, d) {
                var f, e = this;
                e.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: a(c),
                    appendDots: a(c),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(a, b) {
                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (b + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, e.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.hidden = "hidden", e.paused = !1, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, f, d), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0), e.checkResponsive(!0)
            }
            var b = 0;
            return c
        }(), b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
            var e = this;
            if ("boolean" == typeof c) d = c, c = null;
            else if (0 > c || c >= e.slideCount) return !1;
            e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
                a(c).attr("data-slick-index", b)
            }), e.$slidesCache = e.$slides, e.reinit()
        }, b.prototype.animateHeight = function() {
            var a = this;
            if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
                var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                a.$list.animate({
                    height: b
                }, a.options.speed)
            }
        }, b.prototype.animateSlide = function(b, c) {
            var d = {},
                e = this;
            e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
                left: b
            }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
                top: b
            }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
                animStart: e.currentLeft
            }).animate({
                animStart: b
            }, {
                duration: e.options.speed,
                easing: e.options.easing,
                step: function(a) {
                    a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
                },
                complete: function() {
                    c && c.call()
                }
            })) : (e.applyTransition(), b = Math.ceil(b), d[e.animType] = e.options.vertical === !1 ? "translate3d(" + b + "px, 0px, 0px)" : "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
                e.disableTransition(), c.call()
            }, e.options.speed))
        }, b.prototype.asNavFor = function(b) {
            var c = this,
                d = c.options.asNavFor;
            d && null !== d && (d = a(d).not(c.$slider)), null !== d && "object" == typeof d && d.each(function() {
                var c = a(this).slick("getSlick");
                c.unslicked || c.slideHandler(b, !0)
            })
        }, b.prototype.applyTransition = function(a) {
            var b = this,
                c = {};
            c[b.transitionType] = b.options.fade === !1 ? b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.autoPlay = function() {
            var a = this;
            a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
        }, b.prototype.autoPlayClear = function() {
            var a = this;
            a.autoPlayTimer && clearInterval(a.autoPlayTimer)
        }, b.prototype.autoPlayIterator = function() {
            var a = this;
            a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (0 === a.currentSlide - 1 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
        }, b.prototype.buildArrows = function() {
            var b = this;
            b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, b.prototype.buildDots = function() {
            var c, d, b = this;
            if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
                for (d = '<ul class="' + b.options.dotsClass + '">', c = 0; c <= b.getDotCount(); c += 1) d += "<li>" + b.options.customPaging.call(this, b, c) + "</li>";
                d += "</ul>", b.$dots = a(d).appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, b.prototype.buildOut = function() {
            var b = this;
            b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
                a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
            }), b.$slidesCache = b.$slides, b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
        }, b.prototype.buildRows = function() {
            var b, c, d, e, f, g, h, a = this;
            if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
                for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                    var i = document.createElement("div");
                    for (c = 0; c < a.options.rows; c++) {
                        var j = document.createElement("div");
                        for (d = 0; d < a.options.slidesPerRow; d++) {
                            var k = b * h + (c * a.options.slidesPerRow + d);
                            g.get(k) && j.appendChild(g.get(k))
                        }
                        i.appendChild(j)
                    }
                    e.appendChild(i)
                }
                a.$slider.html(e), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, b.prototype.checkResponsive = function(b, c) {
            var e, f, g, d = this,
                h = !1,
                i = d.$slider.width(),
                j = window.innerWidth || a(window).width();
            if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
                f = null;
                for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
                null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
            }
        }, b.prototype.changeSlide = function(b, c) {
            var f, g, h, d = this,
                e = a(b.target);
            switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = 0 !== d.slideCount % d.options.slidesToScroll, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
                case "previous":
                    g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
                    break;
                case "next":
                    g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
                    break;
                case "index":
                    var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
                    d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, b.prototype.checkNavigable = function(a) {
            var c, d, b = this;
            if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
            else
                for (var e in c) {
                    if (a < c[e]) {
                        a = d;
                        break
                    }
                    d = c[e]
                }
            return a
        }, b.prototype.cleanUpEvents = function() {
            var b = this;
            b.options.dots && null !== b.$dots && (a("li", b.$dots).off("click.slick", b.changeSlide), b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).off("mouseenter.slick", a.proxy(b.setPaused, b, !0)).off("mouseleave.slick", a.proxy(b.setPaused, b, !1))), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.$list.off("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
        }, b.prototype.cleanUpRows = function() {
            var b, a = this;
            a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.html(b))
        }, b.prototype.clickHandler = function(a) {
            var b = this;
            b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
        }, b.prototype.destroy = function(b) {
            var c = this;
            c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                a(this).attr("style", a(this).data("originalStyling"))
            }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
        }, b.prototype.disableTransition = function(a) {
            var b = this,
                c = {};
            c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.fadeSlide = function(a, b) {
            var c = this;
            c.cssTransitions === !1 ? (c.$slides.eq(a).css({
                zIndex: c.options.zIndex
            }), c.$slides.eq(a).animate({
                opacity: 1
            }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
                opacity: 1,
                zIndex: c.options.zIndex
            }), b && setTimeout(function() {
                c.disableTransition(a), b.call()
            }, c.options.speed))
        }, b.prototype.fadeSlideOut = function(a) {
            var b = this;
            b.cssTransitions === !1 ? b.$slides.eq(a).animate({
                opacity: 0,
                zIndex: b.options.zIndex - 2
            }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
                opacity: 0,
                zIndex: b.options.zIndex - 2
            }))
        }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
            var b = this;
            null !== a && (b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
        }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
            var a = this;
            return a.currentSlide
        }, b.prototype.getDotCount = function() {
            var a = this,
                b = 0,
                c = 0,
                d = 0;
            if (a.options.infinite === !0)
                for (; b < a.slideCount;) ++d, b = c + a.options.slidesToShow, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
            else if (a.options.centerMode === !0) d = a.slideCount;
            else
                for (; b < a.slideCount;) ++d, b = c + a.options.slidesToShow, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
            return d - 1
        }, b.prototype.getLeft = function(a) {
            var c, d, f, b = this,
                e = 0;
            return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = -1 * b.slideWidth * b.options.slidesToShow, e = -1 * d * b.options.slidesToShow), 0 !== b.slideCount % b.options.slidesToScroll && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = -1 * (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth, e = -1 * (b.options.slidesToShow - (a - b.slideCount)) * d) : (b.slideOffset = -1 * b.slideCount % b.options.slidesToScroll * b.slideWidth, e = -1 * b.slideCount % b.options.slidesToScroll * d))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? -1 * a * b.slideWidth + b.slideOffset : -1 * a * d + e, b.options.variableWidth === !0 && (f = b.$slideTrack.children(".slick-slide").eq(b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? a : a + b.options.slidesToShow), c = f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.$slideTrack.children(".slick-slide").eq(b.options.infinite === !1 ? a : a + b.options.slidesToShow + 1), c = f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
        }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
            var b = this;
            return b.options[a]
        }, b.prototype.getNavigableIndexes = function() {
            var e, a = this,
                b = 0,
                c = 0,
                d = [];
            for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
            return d
        }, b.prototype.getSlick = function() {
            return this
        }, b.prototype.getSlideCount = function() {
            var c, d, e, b = this;
            return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
                return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
            }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
        }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
            var c = this;
            c.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(a)
                }
            }, b)
        }, b.prototype.init = function(b) {
            var c = this;
            a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA()
        }, b.prototype.initArrowEvents = function() {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {
                message: "previous"
            }, a.changeSlide), a.$nextArrow.on("click.slick", {
                message: "next"
            }, a.changeSlide))
        }, b.prototype.initDotEvents = function() {
            var b = this;
            b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
                message: "index"
            }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.setPaused, b, !0)).on("mouseleave.slick", a.proxy(b.setPaused, b, !1))
        }, b.prototype.initializeEvents = function() {
            var b = this;
            b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.$list.on("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
        }, b.prototype.initUI = function() {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay()
        }, b.prototype.keyHandler = function(a) {
            var b = this;
            a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
                data: {
                    message: "next"
                }
            }))
        }, b.prototype.lazyLoad = function() {
            function g(b) {
                a("img[data-lazy]", b).each(function() {
                    var b = a(this),
                        c = a(this).attr("data-lazy"),
                        d = document.createElement("img");
                    d.onload = function() {
                        b.animate({
                            opacity: 0
                        }, 100, function() {
                            b.attr("src", c).animate({
                                opacity: 1
                            }, 200, function() {
                                b.removeAttr("data-lazy").removeClass("slick-loading")
                            })
                        })
                    }, d.src = c
                })
            }
            var c, d, e, f, b = this;
            b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = e + b.options.slidesToShow, b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
        }, b.prototype.loadSlider = function() {
            var a = this;
            a.setPosition(), a.$slideTrack.css({
                opacity: 1
            }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
        }, b.prototype.next = b.prototype.slickNext = function() {
            var a = this;
            a.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, b.prototype.orientationChange = function() {
            var a = this;
            a.checkResponsive(), a.setPosition()
        }, b.prototype.pause = b.prototype.slickPause = function() {
            var a = this;
            a.autoPlayClear(), a.paused = !0
        }, b.prototype.play = b.prototype.slickPlay = function() {
            var a = this;
            a.paused = !1, a.autoPlay()
        }, b.prototype.postSlide = function(a) {
            var b = this;
            b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay(), b.options.accessibility === !0 && b.initADA()
        }, b.prototype.prev = b.prototype.slickPrev = function() {
            var a = this;
            a.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, b.prototype.preventDefault = function(a) {
            a.preventDefault()
        }, b.prototype.progressiveLazyLoad = function() {
            var c, d, b = this;
            c = a("img[data-lazy]", b.$slider).length, c > 0 && (d = a("img[data-lazy]", b.$slider).first(), d.attr("src", d.attr("data-lazy")).removeClass("slick-loading").load(function() {
                d.removeAttr("data-lazy"), b.progressiveLazyLoad(), b.options.adaptiveHeight === !0 && b.setPosition()
            }).error(function() {
                d.removeAttr("data-lazy"), b.progressiveLazyLoad()
            }))
        }, b.prototype.refresh = function(b) {
            var c = this,
                d = c.currentSlide;
            c.destroy(!0), a.extend(c, c.initials, {
                currentSlide: d
            }), c.init(), b || c.changeSlide({
                data: {
                    message: "index",
                    index: d
                }
            }, !1)
        }, b.prototype.registerBreakpoints = function() {
            var c, d, e, b = this,
                f = b.options.responsive || null;
            if ("array" === a.type(f) && f.length) {
                b.respondTo = b.options.respondTo || "window";
                for (c in f)
                    if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                        for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                        b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
                    }
                b.breakpoints.sort(function(a, c) {
                    return b.options.mobileFirst ? a - c : c - a
                })
            }
        }, b.prototype.reinit = function() {
            var b = this;
            b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses(0), b.setPosition(), b.$slider.trigger("reInit", [b]), b.options.autoplay === !0 && b.focusHandler()
        }, b.prototype.resize = function() {
            var b = this;
            a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
                b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
            }, 50))
        }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
            var d = this;
            return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
        }, b.prototype.setCSS = function(a) {
            var d, e, b = this,
                c = {};
            b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
        }, b.prototype.setDimensions = function() {
            var a = this;
            a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
                padding: "0px " + a.options.centerPadding
            }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
                padding: a.options.centerPadding + " 0px"
            })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
            var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
            a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
        }, b.prototype.setFade = function() {
            var c, b = this;
            b.$slides.each(function(d, e) {
                c = -1 * b.slideWidth * d, a(e).css(b.options.rtl === !0 ? {
                    position: "relative",
                    right: c,
                    top: 0,
                    zIndex: b.options.zIndex - 2,
                    opacity: 0
                } : {
                    position: "relative",
                    left: c,
                    top: 0,
                    zIndex: b.options.zIndex - 2,
                    opacity: 0
                })
            }), b.$slides.eq(b.currentSlide).css({
                zIndex: b.options.zIndex - 1,
                opacity: 1
            })
        }, b.prototype.setHeight = function() {
            var a = this;
            if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
                var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                a.$list.css("height", b)
            }
        }, b.prototype.setOption = b.prototype.slickSetOption = function(b, c, d) {
            var f, g, e = this;
            if ("responsive" === b && "array" === a.type(c))
                for (g in c)
                    if ("array" !== a.type(e.options.responsive)) e.options.responsive = [c[g]];
                    else {
                        for (f = e.options.responsive.length - 1; f >= 0;) e.options.responsive[f].breakpoint === c[g].breakpoint && e.options.responsive.splice(f, 1), f--;
                        e.options.responsive.push(c[g])
                    }
            else e.options[b] = c;
            d === !0 && (e.unload(), e.reinit())
        }, b.prototype.setPosition = function() {
            var a = this;
            a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
        }, b.prototype.setProps = function() {
            var a = this,
                b = document.body.style;
            a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = null !== a.animType && a.animType !== !1
        }, b.prototype.setSlideClasses = function(a) {
            var c, d, e, f, b = this;
            d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
        }, b.prototype.setupInfinite = function() {
            var c, d, e, b = this;
            if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
                for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
                for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
                b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    a(this).attr("id", "")
                })
            }
        }, b.prototype.setPaused = function(a) {
            var b = this;
            b.options.autoplay === !0 && b.options.pauseOnHover === !0 && (b.paused = a, a ? b.autoPlayClear() : b.autoPlay())
        }, b.prototype.selectHandler = function(b) {
            var c = this,
                d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
                e = parseInt(d.attr("data-slick-index"));
            return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
        }, b.prototype.slideHandler = function(a, b, c) {
            var d, e, f, g, h = null,
                i = this;
            return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
                i.postSlide(d)
            }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
                i.postSlide(d)
            }) : i.postSlide(d))) : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer), e = 0 > d ? 0 !== i.slideCount % i.options.slidesToScroll ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? 0 !== i.slideCount % i.options.slidesToScroll ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() {
                i.postSlide(e)
            })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() {
                i.postSlide(e)
            }) : i.postSlide(e))))
        }, b.prototype.startLoad = function() {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
        }, b.prototype.swipeDirection = function() {
            var a, b, c, d, e = this;
            return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "left" : "right" : "vertical"
        }, b.prototype.swipeEnd = function() {
            var c, b = this;
            if (b.dragging = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
            if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) switch (b.swipeDirection()) {
                case "left":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.slideHandler(c), b.currentDirection = 0, b.touchObject = {}, b.$slider.trigger("swipe", [b, "left"]);
                    break;
                case "right":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.slideHandler(c), b.currentDirection = 1, b.touchObject = {}, b.$slider.trigger("swipe", [b, "right"])
            } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
        }, b.prototype.swipeHandler = function(a) {
            var b = this;
            if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
                case "start":
                    b.swipeStart(a);
                    break;
                case "move":
                    b.swipeMove(a);
                    break;
                case "end":
                    b.swipeEnd(a)
            }
        }, b.prototype.swipeMove = function(a) {
            var d, e, f, g, h, b = this;
            return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.swipeLeft = b.options.vertical === !1 ? d + f * g : d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
        }, b.prototype.swipeStart = function(a) {
            var c, b = this;
            return 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
        }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
            var a = this;
            null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
        }, b.prototype.unload = function() {
            var b = this;
            a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, b.prototype.unslick = function(a) {
            var b = this;
            b.$slider.trigger("unslick", [b, a]), b.destroy()
        }, b.prototype.updateArrows = function() {
            var b, a = this;
            b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, b.prototype.updateDots = function() {
            var a = this;
            null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, b.prototype.visibility = function() {
            var a = this;
            document[a.hidden] ? (a.paused = !0, a.autoPlayClear()) : a.options.autoplay === !0 && (a.paused = !1, a.autoPlay())
        }, b.prototype.initADA = function() {
            var b = this;
            b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
                a(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + b.instanceUid + c
                })
            }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
                a(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + b.instanceUid + c,
                    id: "slick-slide" + b.instanceUid + c
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
        }, b.prototype.activateADA = function() {
            var a = this,
                b = a.$slider.find("*").is(":focus");
            a.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false",
                tabindex: "0"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            }), b && a.$slideTrack.find(".slick-active").focus()
        }, b.prototype.focusHandler = function() {
            var b = this;
            b.$slider.on("focus.slick blur.slick", "*", function(c) {
                c.stopImmediatePropagation();
                var d = a(this);
                setTimeout(function() {
                    b.isPlay && (d.is(":focus") ? (b.autoPlayClear(), b.paused = !0) : (b.paused = !1, b.autoPlay()))
                }, 0)
            })
        }, a.fn.slick = function() {
            var g, a = this,
                c = arguments[0],
                d = Array.prototype.slice.call(arguments, 1),
                e = a.length,
                f = 0;
            for (f; e > f; f++)
                if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
            return a
        }
    }), ! function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function(a, b) {
            ! function(c, d) {
                "use strict";
                var e = c.document,
                    f = a("./src/utils/get-by-class"),
                    g = a("./src/utils/extend"),
                    h = a("./src/utils/index-of"),
                    i = a("./src/utils/events"),
                    j = a("./src/utils/to-string"),
                    k = a("./src/utils/natural-sort"),
                    l = a("./src/utils/classes"),
                    m = a("./src/utils/get-attribute"),
                    n = a("./src/utils/to-array"),
                    o = function(b, c, p) {
                        var q, r = this,
                            s = a("./src/item")(r),
                            t = a("./src/add-async")(r);
                        q = {
                            start: function() {
                                r.listClass = "list", r.searchClass = "search", r.sortClass = "sort", r.page = 1e4, r.i = 1, r.items = [], r.visibleItems = [], r.matchingItems = [], r.searched = !1, r.filtered = !1, r.searchColumns = d, r.handlers = {
                                    updated: []
                                }, r.plugins = {}, r.valueNames = [], r.utils = {
                                    getByClass: f,
                                    extend: g,
                                    indexOf: h,
                                    events: i,
                                    toString: j,
                                    naturalSort: k,
                                    classes: l,
                                    getAttribute: m,
                                    toArray: n
                                }, r.utils.extend(r, c), r.listContainer = "string" == typeof b ? e.getElementById(b) : b, r.listContainer && (r.list = f(r.listContainer, r.listClass, !0), r.parse = a("./src/parse")(r), r.templater = a("./src/templater")(r), r.search = a("./src/search")(r), r.filter = a("./src/filter")(r), r.sort = a("./src/sort")(r), this.handlers(), this.items(), r.update(), this.plugins())
                            },
                            handlers: function() {
                                for (var a in r.handlers) r[a] && r.on(a, r[a])
                            },
                            items: function() {
                                r.parse(r.list), p !== d && r.add(p)
                            },
                            plugins: function() {
                                for (var a = 0; a < r.plugins.length; a++) {
                                    var b = r.plugins[a];
                                    r[b.name] = b, b.init(r, o)
                                }
                            }
                        }, this.reIndex = function() {
                            r.items = [], r.visibleItems = [], r.matchingItems = [], r.searched = !1, r.filtered = !1, r.parse(r.list)
                        }, this.toJSON = function() {
                            for (var a = [], b = 0, c = r.items.length; c > b; b++) a.push(r.items[b].values());
                            return a
                        }, this.add = function(a, b) {
                            if (0 !== a.length) {
                                if (b) return void t(a, b);
                                var c = [],
                                    e = !1;
                                a[0] === d && (a = [a]);
                                for (var f = 0, g = a.length; g > f; f++) {
                                    var h = null;
                                    e = r.items.length > r.page ? !0 : !1, h = new s(a[f], d, e), r.items.push(h), c.push(h)
                                }
                                return r.update(), c
                            }
                        }, this.show = function(a, b) {
                            return this.i = a, this.page = b, r.update(), r
                        }, this.remove = function(a, b, c) {
                            for (var d = 0, e = 0, f = r.items.length; f > e; e++) r.items[e].values()[a] == b && (r.templater.remove(r.items[e], c), r.items.splice(e, 1), f--, e--, d++);
                            return r.update(), d
                        }, this.get = function(a, b) {
                            for (var c = [], d = 0, e = r.items.length; e > d; d++) {
                                var f = r.items[d];
                                f.values()[a] == b && c.push(f)
                            }
                            return c
                        }, this.size = function() {
                            return r.items.length
                        }, this.clear = function() {
                            return r.templater.clear(), r.items = [], r
                        }, this.on = function(a, b) {
                            return r.handlers[a].push(b), r
                        }, this.off = function(a, b) {
                            var c = r.handlers[a],
                                d = h(c, b);
                            return d > -1 && c.splice(d, 1), r
                        }, this.trigger = function(a) {
                            for (var b = r.handlers[a].length; b--;) r.handlers[a][b](r);
                            return r
                        }, this.reset = {
                            filter: function() {
                                for (var a = r.items, b = a.length; b--;) a[b].filtered = !1;
                                return r
                            },
                            search: function() {
                                for (var a = r.items, b = a.length; b--;) a[b].found = !1;
                                return r
                            }
                        }, this.update = function() {
                            var a = r.items,
                                b = a.length;
                            r.visibleItems = [], r.matchingItems = [], r.templater.clear();
                            for (var c = 0; b > c; c++) a[c].matching() && r.matchingItems.length + 1 >= r.i && r.visibleItems.length < r.page ? (a[c].show(), r.visibleItems.push(a[c]), r.matchingItems.push(a[c])) : a[c].matching() ? (r.matchingItems.push(a[c]), a[c].hide()) : a[c].hide();
                            return r.trigger("updated"), r
                        }, q.start()
                    };
                "function" == typeof define && define.amd && define(function() {
                    return o
                }), b.exports = o, c.List = o
            }(window)
        }, {
            "./src/add-async": 2,
            "./src/filter": 3,
            "./src/item": 4,
            "./src/parse": 5,
            "./src/search": 6,
            "./src/sort": 7,
            "./src/templater": 8,
            "./src/utils/classes": 9,
            "./src/utils/events": 10,
            "./src/utils/extend": 11,
            "./src/utils/get-attribute": 12,
            "./src/utils/get-by-class": 13,
            "./src/utils/index-of": 14,
            "./src/utils/natural-sort": 15,
            "./src/utils/to-array": 16,
            "./src/utils/to-string": 17
        }],
        2: [function(a, b) {
            b.exports = function(a) {
                var b = function(c, d, e) {
                    var f = c.splice(0, 50);
                    e = e || [], e = e.concat(a.add(f)), c.length > 0 ? setTimeout(function() {
                        b(c, d, e)
                    }, 1) : (a.update(), d(e))
                };
                return b
            }
        }, {}],
        3: [function(a, b) {
            b.exports = function(a) {
                return a.handlers.filterStart = a.handlers.filterStart || [], a.handlers.filterComplete = a.handlers.filterComplete || [],
                    function(b) {
                        if (a.trigger("filterStart"), a.i = 1, a.reset.filter(), void 0 === b) a.filtered = !1;
                        else {
                            a.filtered = !0;
                            for (var c = a.items, d = 0, e = c.length; e > d; d++) {
                                var f = c[d];
                                f.filtered = b(f) ? !0 : !1
                            }
                        }
                        return a.update(), a.trigger("filterComplete"), a.visibleItems
                    }
            }
        }, {}],
        4: [function(a, b) {
            b.exports = function(a) {
                return function(b, c, d) {
                    var e = this;
                    this._values = {}, this.found = !1, this.filtered = !1;
                    var f = function(b, c, d) {
                        if (void 0 === c) d ? e.values(b, d) : e.values(b);
                        else {
                            e.elm = c;
                            var f = a.templater.get(e, b);
                            e.values(f)
                        }
                    };
                    this.values = function(b, c) {
                        if (void 0 === b) return e._values;
                        for (var d in b) e._values[d] = b[d];
                        c !== !0 && a.templater.set(e, e.values())
                    }, this.show = function() {
                        a.templater.show(e)
                    }, this.hide = function() {
                        a.templater.hide(e)
                    }, this.matching = function() {
                        return a.filtered && a.searched && e.found && e.filtered || a.filtered && !a.searched && e.filtered || !a.filtered && a.searched && e.found || !a.filtered && !a.searched
                    }, this.visible = function() {
                        return e.elm && e.elm.parentNode == a.list ? !0 : !1
                    }, f(b, c, d)
                }
            }
        }, {}],
        5: [function(a, b) {
            b.exports = function(b) {
                var c = a("./item")(b),
                    d = function(a) {
                        for (var b = a.childNodes, c = [], d = 0, e = b.length; e > d; d++) void 0 === b[d].data && c.push(b[d]);
                        return c
                    },
                    e = function(a, d) {
                        for (var e = 0, f = a.length; f > e; e++) b.items.push(new c(d, a[e]))
                    },
                    f = function(a, c) {
                        var d = a.splice(0, 50);
                        e(d, c), a.length > 0 ? setTimeout(function() {
                            f(a, c)
                        }, 1) : (b.update(), b.trigger("parseComplete"))
                    };
                return b.handlers.parseComplete = b.handlers.parseComplete || [],
                    function() {
                        var a = d(b.list),
                            c = b.valueNames;
                        b.indexAsync ? f(a, c) : e(a, c)
                    }
            }
        }, {
            "./item": 4
        }],
        6: [function(a, b) {
            b.exports = function(a) {
                var b, c, d, e, f = {
                        resetList: function() {
                            a.i = 1, a.templater.clear(), e = void 0
                        },
                        setOptions: function(a) {
                            2 == a.length && a[1] instanceof Array ? c = a[1] : 2 == a.length && "function" == typeof a[1] ? e = a[1] : 3 == a.length && (c = a[1], e = a[2])
                        },
                        setColumns: function() {
                            0 !== a.items.length && void 0 === c && (c = void 0 === a.searchColumns ? f.toArray(a.items[0].values()) : a.searchColumns)
                        },
                        setSearchString: function(b) {
                            b = a.utils.toString(b).toLowerCase(), b = b.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"), d = b
                        },
                        toArray: function(a) {
                            var b = [];
                            for (var c in a) b.push(c);
                            return b
                        }
                    },
                    g = {
                        list: function() {
                            for (var b = 0, c = a.items.length; c > b; b++) g.item(a.items[b])
                        },
                        item: function(a) {
                            a.found = !1;
                            for (var b = 0, d = c.length; d > b; b++)
                                if (g.values(a.values(), c[b])) return void(a.found = !0)
                        },
                        values: function(c, e) {
                            return c.hasOwnProperty(e) && (b = a.utils.toString(c[e]).toLowerCase(), "" !== d && b.search(d) > -1) ? !0 : !1
                        },
                        reset: function() {
                            a.reset.search(), a.searched = !1
                        }
                    },
                    h = function(b) {
                        return a.trigger("searchStart"), f.resetList(), f.setSearchString(b), f.setOptions(arguments), f.setColumns(), "" === d ? g.reset() : (a.searched = !0, e ? e(d, c) : g.list()), a.update(), a.trigger("searchComplete"), a.visibleItems
                    };
                return a.handlers.searchStart = a.handlers.searchStart || [], a.handlers.searchComplete = a.handlers.searchComplete || [], a.utils.events.bind(a.utils.getByClass(a.listContainer, a.searchClass), "keyup", function(b) {
                    var c = b.target || b.srcElement,
                        d = "" === c.value && !a.searched;
                    d || h(c.value)
                }), a.utils.events.bind(a.utils.getByClass(a.listContainer, a.searchClass), "input", function(a) {
                    var b = a.target || a.srcElement;
                    "" === b.value && h("")
                }), h
            }
        }, {}],
        7: [function(a, b) {
            b.exports = function(a) {
                a.sortFunction = a.sortFunction || function(b, c, d) {
                    return d.desc = "desc" == d.order ? !0 : !1, a.utils.naturalSort(b.values()[d.valueName], c.values()[d.valueName], d)
                };
                var b = {
                        els: void 0,
                        clear: function() {
                            for (var c = 0, d = b.els.length; d > c; c++) a.utils.classes(b.els[c]).remove("asc"), a.utils.classes(b.els[c]).remove("desc")
                        },
                        getOrder: function(b) {
                            var c = a.utils.getAttribute(b, "data-order");
                            return "asc" == c || "desc" == c ? c : a.utils.classes(b).has("desc") ? "asc" : a.utils.classes(b).has("asc") ? "desc" : "asc"
                        },
                        getInSensitive: function(b, c) {
                            var d = a.utils.getAttribute(b, "data-insensitive");
                            c.insensitive = "false" === d ? !1 : !0
                        },
                        setOrder: function(c) {
                            for (var d = 0, e = b.els.length; e > d; d++) {
                                var f = b.els[d];
                                if (a.utils.getAttribute(f, "data-sort") === c.valueName) {
                                    var g = a.utils.getAttribute(f, "data-order");
                                    "asc" == g || "desc" == g ? g == c.order && a.utils.classes(f).add(c.order) : a.utils.classes(f).add(c.order)
                                }
                            }
                        }
                    },
                    c = function() {
                        a.trigger("sortStart");
                        var c = {},
                            d = arguments[0].currentTarget || arguments[0].srcElement || void 0;
                        d ? (c.valueName = a.utils.getAttribute(d, "data-sort"), b.getInSensitive(d, c), c.order = b.getOrder(d)) : (c = arguments[1] || c, c.valueName = arguments[0], c.order = c.order || "asc", c.insensitive = "undefined" == typeof c.insensitive ? !0 : c.insensitive), b.clear(), b.setOrder(c), c.sortFunction = c.sortFunction || a.sortFunction, a.items.sort(function(a, b) {
                            var d = "desc" === c.order ? -1 : 1;
                            return c.sortFunction(a, b, c) * d
                        }), a.update(), a.trigger("sortComplete")
                    };
                return a.handlers.sortStart = a.handlers.sortStart || [], a.handlers.sortComplete = a.handlers.sortComplete || [], b.els = a.utils.getByClass(a.listContainer, a.sortClass), a.utils.events.bind(b.els, "click", c), a.on("searchStart", b.clear), a.on("filterStart", b.clear), c
            }
        }, {}],
        8: [function(a, b) {
            var d = function(a) {
                var b, c = this,
                    d = function() {
                        b = c.getItemSource(a.item), b = c.clearSourceItem(b, a.valueNames)
                    };
                this.clearSourceItem = function(b, c) {
                    for (var d = 0, e = c.length; e > d; d++) {
                        var f;
                        if (c[d].data)
                            for (var g = 0, h = c[d].data.length; h > g; g++) b.setAttribute("data-" + c[d].data[g], "");
                        else c[d].attr && c[d].name ? (f = a.utils.getByClass(b, c[d].name, !0), f && f.setAttribute(c[d].attr, "")) : (f = a.utils.getByClass(b, c[d], !0), f && (f.innerHTML = ""));
                        f = void 0
                    }
                    return b
                }, this.getItemSource = function(b) {
                    if (void 0 === b) {
                        for (var c = a.list.childNodes, d = 0, e = c.length; e > d; d++)
                            if (void 0 === c[d].data) return c[d].cloneNode(!0)
                    } else {
                        if (/^tr[\s>]/.exec(b)) {
                            var f = document.createElement("table");
                            return f.innerHTML = b, f.firstChild
                        }
                        if (-1 !== b.indexOf("<")) {
                            var g = document.createElement("div");
                            return g.innerHTML = b, g.firstChild
                        }
                        var h = document.getElementById(a.item);
                        if (h) return h
                    }
                    throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.")
                }, this.get = function(b, d) {
                    c.create(b);
                    for (var e = {}, f = 0, g = d.length; g > f; f++) {
                        var h;
                        if (d[f].data)
                            for (var i = 0, j = d[f].data.length; j > i; i++) e[d[f].data[i]] = a.utils.getAttribute(b.elm, "data-" + d[f].data[i]);
                        else d[f].attr && d[f].name ? (h = a.utils.getByClass(b.elm, d[f].name, !0), e[d[f].name] = h ? a.utils.getAttribute(h, d[f].attr) : "") : (h = a.utils.getByClass(b.elm, d[f], !0), e[d[f]] = h ? h.innerHTML : "");
                        h = void 0
                    }
                    return e
                }, this.set = function(b, d) {
                    var e = function(b) {
                            for (var c = 0, d = a.valueNames.length; d > c; c++)
                                if (a.valueNames[c].data) {
                                    for (var e = a.valueNames[c].data, f = 0, g = e.length; g > f; f++)
                                        if (e[f] === b) return {
                                            data: b
                                        }
                                } else {
                                    if (a.valueNames[c].attr && a.valueNames[c].name && a.valueNames[c].name == b) return a.valueNames[c];
                                    if (a.valueNames[c] === b) return b
                                }
                        },
                        f = function(c, d) {
                            var f, g = e(c);
                            g && (g.data ? b.elm.setAttribute("data-" + g.data, d) : g.attr && g.name ? (f = a.utils.getByClass(b.elm, g.name, !0), f && f.setAttribute(g.attr, d)) : (f = a.utils.getByClass(b.elm, g, !0), f && (f.innerHTML = d)), f = void 0)
                        };
                    if (!c.create(b))
                        for (var g in d) d.hasOwnProperty(g) && f(g, d[g])
                }, this.create = function(a) {
                    if (void 0 !== a.elm) return !1;
                    var d = b.cloneNode(!0);
                    return d.removeAttribute("id"), a.elm = d, c.set(a, a.values()), !0
                }, this.remove = function(b) {
                    b.elm.parentNode === a.list && a.list.removeChild(b.elm)
                }, this.show = function(b) {
                    c.create(b), a.list.appendChild(b.elm)
                }, this.hide = function(b) {
                    void 0 !== b.elm && b.elm.parentNode === a.list && a.list.removeChild(b.elm)
                }, this.clear = function() {
                    if (a.list.hasChildNodes())
                        for (; a.list.childNodes.length >= 1;) a.list.removeChild(a.list.firstChild)
                }, d()
            };
            b.exports = function(a) {
                return new d(a)
            }
        }, {}],
        9: [function(a, b) {
            function d(a) {
                if (!a || !a.nodeType) throw new Error("A DOM element reference is required");
                this.el = a, this.list = a.classList
            }
            var e = a("./index-of"),
                f = /\s+/,
                g = Object.prototype.toString;
            b.exports = function(a) {
                return new d(a)
            }, d.prototype.add = function(a) {
                if (this.list) return this.list.add(a), this;
                var b = this.array(),
                    c = e(b, a);
                return ~c || b.push(a), this.el.className = b.join(" "), this
            }, d.prototype.remove = function(a) {
                if ("[object RegExp]" == g.call(a)) return this.removeMatching(a);
                if (this.list) return this.list.remove(a), this;
                var b = this.array(),
                    c = e(b, a);
                return ~c && b.splice(c, 1), this.el.className = b.join(" "), this
            }, d.prototype.removeMatching = function(a) {
                for (var b = this.array(), c = 0; c < b.length; c++) a.test(b[c]) && this.remove(b[c]);
                return this
            }, d.prototype.toggle = function(a, b) {
                return this.list ? ("undefined" != typeof b ? b !== this.list.toggle(a, b) && this.list.toggle(a) : this.list.toggle(a), this) : ("undefined" != typeof b ? b ? this.add(a) : this.remove(a) : this.has(a) ? this.remove(a) : this.add(a), this)
            }, d.prototype.array = function() {
                var a = this.el.getAttribute("class") || "",
                    b = a.replace(/^\s+|\s+$/g, ""),
                    c = b.split(f);
                return "" === c[0] && c.shift(), c
            }, d.prototype.has = d.prototype.contains = function(a) {
                return this.list ? this.list.contains(a) : !!~e(this.array(), a)
            }
        }, {
            "./index-of": 14
        }],
        10: [function(a, b, c) {
            var d = window.addEventListener ? "addEventListener" : "attachEvent",
                e = window.removeEventListener ? "removeEventListener" : "detachEvent",
                f = "addEventListener" !== d ? "on" : "",
                g = a("./to-array");
            c.bind = function(a, b, c, e) {
                a = g(a);
                for (var h = 0; h < a.length; h++) a[h][d](f + b, c, e || !1)
            }, c.unbind = function(a, b, c, d) {
                a = g(a);
                for (var h = 0; h < a.length; h++) a[h][e](f + b, c, d || !1)
            }
        }, {
            "./to-array": 16
        }],
        11: [function(a, b) {
            b.exports = function(a) {
                for (var b, c = Array.prototype.slice.call(arguments, 1), d = 0; b = c[d]; d++)
                    if (b)
                        for (var e in b) a[e] = b[e];
                return a
            }
        }, {}],
        12: [function(a, b) {
            b.exports = function(a, b) {
                var c = a.getAttribute && a.getAttribute(b) || null;
                if (!c)
                    for (var d = a.attributes, e = d.length, f = 0; e > f; f++) void 0 !== b[f] && b[f].nodeName === b && (c = b[f].nodeValue);
                return c
            }
        }, {}],
        13: [function(a, b) {
            b.exports = function() {
                return document.getElementsByClassName ? function(a, b, c) {
                    return c ? a.getElementsByClassName(b)[0] : a.getElementsByClassName(b)
                } : document.querySelector ? function(a, b, c) {
                    return b = "." + b, c ? a.querySelector(b) : a.querySelectorAll(b)
                } : function(a, b, c) {
                    var d = [],
                        e = "*";
                    null === a && (a = document);
                    for (var f = a.getElementsByTagName(e), g = f.length, h = new RegExp("(^|\\s)" + b + "(\\s|$)"), i = 0, j = 0; g > i; i++)
                        if (h.test(f[i].className)) {
                            if (c) return f[i];
                            d[j] = f[i], j++
                        }
                    return d
                }
            }()
        }, {}],
        14: [function(a, b) {
            var d = [].indexOf;
            b.exports = function(a, b) {
                if (d) return a.indexOf(b);
                for (var c = 0; c < a.length; ++c)
                    if (a[c] === b) return c;
                return -1
            }
        }, {}],
        15: [function(a, b) {
            b.exports = function(a, b, c) {
                var d, e, f = /(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[\da-fA-F]+$|\d+)/g,
                    g = /^\s+|\s+$/g,
                    h = /\s+/g,
                    i = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
                    j = /^0x[0-9a-f]+$/i,
                    k = /^0/,
                    l = c || {},
                    m = function(a) {
                        return l.insensitive && ("" + a).toLowerCase() || "" + a
                    },
                    n = m(a) || "",
                    o = m(b) || "",
                    p = n.replace(f, "\x00$1\x00").replace(/\0$/, "").replace(/^\0/, "").split("\x00"),
                    q = o.replace(f, "\x00$1\x00").replace(/\0$/, "").replace(/^\0/, "").split("\x00"),
                    r = parseInt(n.match(j), 16) || 1 !== p.length && Date.parse(n),
                    s = parseInt(o.match(j), 16) || r && o.match(i) && Date.parse(o) || null,
                    t = function(a, b) {
                        return (!a.match(k) || 1 == b) && parseFloat(a) || a.replace(h, " ").replace(g, "") || 0
                    };
                if (s) {
                    if (s > r) return -1;
                    if (r > s) return 1
                }
                for (var u = 0, v = p.length, w = q.length, x = Math.max(v, w); x > u; u++) {
                    if (d = t(p[u], v), e = t(q[u], w), isNaN(d) !== isNaN(e)) return isNaN(d) ? 1 : -1;
                    if (typeof d != typeof e && (d += "", e += ""), e > d) return -1;
                    if (d > e) return 1
                }
                return 0
            }
        }, {}],
        16: [function(a, b) {
            function d(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }
            b.exports = function(a) {
                if ("undefined" == typeof a) return [];
                if (null === a) return [null];
                if (a === window) return [window];
                if ("string" == typeof a) return [a];
                if (d(a)) return a;
                if ("number" != typeof a.length) return [a];
                if ("function" == typeof a && a instanceof Function) return [a];
                for (var b = [], c = 0; c < a.length; c++)(Object.prototype.hasOwnProperty.call(a, c) || c in a) && b.push(a[c]);
                return b.length ? b : []
            }
        }, {}],
        17: [function(a, b) {
            b.exports = function(a) {
                return a = void 0 === a ? "" : a, a = null === a ? "" : a, a = a.toString()
            }
        }, {}]
    }, {}, [1]),
    function() {
        $(function() {
            var cssEditor, cssInput, htmlEditor, htmlInput;
            return $("a[rel^='scrolling']").off("click"), $("a[rel^='scrolling']").on("click", function() {
                var target;
                return location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname && (target = $(this.hash), target = target.length ? target : $("[name=" + this.hash.slice(1) + "]"), target.length) ? ($("html,body").animate({
                    scrollTop: target.offset().top
                }, 1e3), !1) : void 0
            }), $(document).off("page:change.lightbox"), $(document).on("page:change.lightbox", function() {
                return $("#lightboxOverlay").remove(), $("#lightbox").remove()
            }), $("form").length > 0 && ("reportValidity" in document.createElement("form") || $("form").attr("novalidate", "novalidate")), $(document).on("nested:fieldRemoved", function(event) {
                return $("[required]", event.field).removeAttr("required")
            }), $(".socials-share .share").length > 0 && (delete IN, delete FB, $("script[src='//platform.linkedin.com/in.js']").remove(), $("script[src='//platform.twitter.com/widgets.js']").remove(), $("script#facebook-jssdk").remove(), $(".socials-share .share").html(""), $(".socials-share .share").sharrre({
                share: {
                    facebook: !0,
                    twitter: !0,
                    linkedin: !0
                },
                buttons: {
                    facebook: {
                        layout: "box_count"
                    },
                    twitter: {
                        count: "vertical"
                    },
                    linkedin: {
                        counter: "top"
                    }
                },
                enableHover: !0,
                enableCounter: !1,
                enableTracking: !1
            })), $(".edit-advanced.modal-form").length > 0 ? (cssInput = $(".edit-advanced #careers_site_custom_css"), cssEditor = ace.edit("css-editor"), cssEditor.setTheme("ace/theme/crimson_editor"), cssEditor.getSession().setMode("ace/mode/css"), cssEditor.$blockScrolling = 1 / 0, cssEditor.session.setOptions({
                tabSize: 2,
                useSoftTabs: !0
            }), cssEditor.setValue(cssInput.val()), cssEditor.selection.clearSelection(), cssEditor.getSession().off("change"), cssEditor.getSession().on("change", function() {
                return cssInput.val(cssEditor.getValue())
            }), htmlInput = $(".edit-advanced #careers_site_custom_head"), htmlEditor = ace.edit("html-editor"), htmlEditor.setTheme("ace/theme/crimson_editor"), htmlEditor.getSession().setMode("ace/mode/html"), htmlEditor.$blockScrolling = 1 / 0, htmlEditor.session.setOptions({
                tabSize: 2,
                useSoftTabs: !0
            }), htmlEditor.setValue(htmlInput.val()), htmlEditor.selection.clearSelection(), htmlEditor.getSession().off("change"), htmlEditor.getSession().on("change", function() {
                return htmlInput.val(htmlEditor.getValue())
            })) : void 0
        })
    }.call(this),
    function() {
        $(function() {
            return $(".apply-form-component .boolean label.radio").off("click"), $(".apply-form-component .boolean label.radio").on("click", function() {
                return $(this).parents(".boolean").find("label.radio").removeClass("selected"), $(this).addClass("selected")
            }), $(".apply-form-component form").submit(function(event) {
                var valid;
                return $(".apply-form-component form input:submit").prop("disabled", !0), $(".apply-form-component .form-group .has-error").remove(), valid = !0, $(".apply-form-component .form-group.check_boxes").each(function(_, checkBoxes) {
                    return 0 === $(checkBoxes).find("input[type=checkbox]:checked").length ? ($(checkBoxes).addClass("has-error").append($('<span class="help-block has-error">This field is required</span>')), valid = !1) : void 0
                }), valid ? void 0 : ($(".apply-form-component form input:submit").prop("disabled", !1), event.preventDefault())
            })
        })
    }.call(this),
    function() {
        $(function() {
            return $(".gallery-component .gallery-carousel:not(.slick-initialized)").slick({
                slidesToScroll: 1,
                infinite: !0,
                centerMode: !0,
                variableWidth: !0
            })
        })
    }.call(this),
    function() {
        $(function() {
            return $(".header-component ul.menu a").off("click"), $(".header-component ul.menu a").on("click", function(e) {
                var link, section, top;
                return link = $(this), section = $(this.hash), section.length > 0 ? (e.preventDefault(), top = section.offset().top, $("html, body").animate({
                    scrollTop: top
                }, 500)) : void 0
            }), null != window.location.hash && "" !== window.location.hash && "#editor" !== window.location.hash ? ($("a[href$='" + window.location.hash + "']").trigger("click"), window.location.hash = "/") : void 0
        })
    }.call(this),
    function() {
        $(function() {
            return $(document).off("page:change.indeed"), $(document).on("page:change.indeed", function() {
                return delete indeed, $("script#indeed-apply-js").remove(), $("script:contains('apply.indeed.com')").remove()
            }), $("a.btn-indeed").off("click"), $("a.btn-indeed").on("click", function(e) {
                return e.preventDefault(), $("span.indeed-apply-widget").trigger("click")
            })
        })
    }.call(this),
    function() {
        /*$(function() {
            return $(".map-component").each(function(index, element) {
                var boundsObject, currentInfoWindow, i, len, listener, map, mapOptions, marker, markers;
                if (!$(element).hasClass("activated")) {
                    for ($(element).addClass("activated"), markers = [], currentInfoWindow = null, mapOptions = {
                            zoom: 8,
                            center: new google.maps.LatLng(0, 0),
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            scrollwheel: !1
                        }, map = new google.maps.Map($(element).find(".map-holder")[0], mapOptions), $(element).find(".marker").each(function(index, markerElement) {
                            var latLng, marker, markerOptions;
                            return latLng = new google.maps.LatLng($(markerElement).data("lat"), $(markerElement).data("lng")), markerOptions = {
                                position: latLng,
                                map: map,
                                title: $(markerElement).data("title"),
                                icon: "/assets/careers/map_pin.png"
                            }, marker = new google.maps.Marker(markerOptions), google.maps.event.addListener(marker, "click", function() {
                                return null != currentInfoWindow && currentInfoWindow.close(), currentInfoWindow = new google.maps.InfoWindow({
                                    content: $(markerElement).html(),
                                    maxWidth: 350
                                }), currentInfoWindow.open(map, marker)
                            }), markers.push(marker)
                        }), boundsObject = new google.maps.LatLngBounds, i = 0, len = markers.length; len > i; i++) marker = markers[i], boundsObject.extend(marker.position);
                    return map.fitBounds(boundsObject), listener = google.maps.event.addListener(map, "idle", function() {
                        return map.getZoom() > 16 && map.setZoom(16), google.maps.event.removeListener(listener)
                    })
                }
            })
        })*/
    }.call(this), $(document).on("ready page:change", function() {
        function escapeString(string) {
            return string.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        }
        var jobsList = [],
            jobsFilters = {};
        if ($(".offers-component #jobs-list").length > 0) {
            var options = {
                valueNames: ["title", "department", "city"]
            };
            jobsList = new List("jobs-list", options), jobsList.on("searchComplete", function() {
                jobsList.visibleItems.length > 0 ? $(".offers-component .filters-view .empty-state").addClass("hidden") : $(".offers-component .filters-view .empty-state").removeClass("hidden")
            }), jobsList.on("filterComplete", function() {
                jobsList.visibleItems.length > 0 ? $(".offers-component .filters-view .empty-state").addClass("hidden") : $(".offers-component .filters-view .empty-state").removeClass("hidden")
            })
        }
        ".offers-component .grouped-view".length > 0 && ($(".offers-component .grouped-view .filter ul.pills a").off("click"), $(".offers-component .grouped-view .filter ul.pills a").on("click", function(e) {
            e.preventDefault(), $(this).closest("ul.pills").find("a").removeClass("btn-primary").addClass("btn-reversed"), $(this).removeClass("btn-reversed").addClass("btn-primary");
            var filter = $(".offers-component .filter").data("filter"),
                value = $(this).data("value");
            null != filter && null != value ? (value = escapeString(value), jobsList.filter(function(item) {
                return item.values()[filter] == value
            })) : jobsList.filter()
        })), ".offers-component .filters-view".length > 0 && ($(".offers-component .filters-view .filters input").off("keyup"), $(".offers-component .filters-view .filters input").on("keyup", function() {
            var value = $(this).val();
            value.length > 0 ? jobsList.search(value, ["title"]) : jobsList.search()
        }), $(".offers-component .filters-view .filters select").off("change"), $(".offers-component .filters-view .filters select").on("change", function() {
            var filter = $(this).attr("name"),
                value = $(this).val();
            null != value && value.length > 0 ? jobsFilters[filter] = escapeString(value) : delete jobsFilters[filter], jobsList.filter(function(item) {
                var equal = !0;
                return $.each(jobsFilters, function(filter, value) {
                    return equal = item.values()[filter] == value
                }), equal
            })
        }), $(".offers-component .filters-view .filters a.clear-filters").off("click"), $(".offers-component .filters-view .filters a.clear-filters").on("click", function(e) {
            e.preventDefault(), $(".offers-component .filters-view .filters input").val(""), $(".offers-component .filters-view .filters select").val(""), jobsList.filter(), jobsList.search()
        }))
    }),
    function() {
        $(function() {
            var bindAutocompleteInputs, bindCurrentDateRangeCheckboxes;
            return bindAutocompleteInputs = function() {
                return $(".questionnaire-form-component input.autocomplete").each(function() {
                    return $(this).autocomplete({
                        source: $(this).data("url"),
                        minLength: 1
                    })
                })
            }, bindAutocompleteInputs(), $(document).on("nested:fieldAdded", function() {
                return bindAutocompleteInputs(), bindCurrentDateRangeCheckboxes()
            }), $(".questionnaire-form-component .conviction-group").length > 0 && $(".questionnaire-form-component section.closing input.btn-primary").click(function(event) {
                var checked, convictions;
                return checked = $(".questionnaire-form-component .conviction-group .accept-statement input").is(":checked"), convictions = $(".questionnaire-form-component .conviction-group .result-sets-container > .fields:visible").length, checked || 0 !== convictions ? void 0 : ($(".questionnaire-form-component .conviction-group .accept-statement .has-error").show(), event.preventDefault())
            }), $(".declaration").length > 0 && $(".questionnaire-form-component section.closing input.btn-primary").click(function(event) {
                return $(".declaration input[type='checkbox']").each(function(_index, input) {
                    return $(input).is(":checked") ? void 0 : ($(".declaration .has-error").show(), event.preventDefault())
                })
            }), $(".questionnaire-form-component form").length > 0 && $(".questionnaire-form-component form").submit(function() {
                return $(".questionnaire-form-component form input:submit").css("pointer-events", "none").css("opacity", .6), setTimeout(function() {
                    return $(".questionnaire-form-component form input:submit").prop("disabled", !0)
                }, 10)
            }), bindCurrentDateRangeCheckboxes = function() {
                return $(".date-range-clear-end-date__checkbox-current").change(function() {
                    var selects, wrapper;
                    return wrapper = $(this).parents(".date-range-clear-end-date"), selects = wrapper.find("select"), this.checked ? (selects.css("visibility", "hidden"), selects.val(null)) : (selects.first().val(wrapper.data("month")), selects.last().val(wrapper.data("year")), selects.css("visibility", "visible"))
                })
            }, bindCurrentDateRangeCheckboxes(), $(".date-range-clear-end-date").each(function() {
                return ($(this).data("answer") || "").endsWith(" - ") || !$(this).data("end-date") ? $(this).find("input").prop("checked", !0).trigger("change") : void 0
            })
        })
    }.call(this),
    function() {}.call(this);
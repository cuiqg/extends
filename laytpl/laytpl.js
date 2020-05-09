/*! laytpl-v1.2.0 JavaScript模板引擎 MIT License  By http://www.layui.com/doc/modules/laytpl.html */
!(function () {
    'use strict'
    var e = { open: '{{', close: '}}' },
        r = {
            exp: function (e) {
                return new RegExp(e, 'g')
            },
            query: function (r, t, c) {
                var o = ['#([\\s\\S])+?', '([^{#}])*?'][r || 0]
                return n((t || '') + e.open + o + e.close + (c || ''))
            },
            escape: function (e) {
                return String(e || '')
                    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/'/g, '&#39;')
                    .replace(/"/g, '&quot;')
            },
            error: function (e, r) {
                var n = 'Laytpl Error：'
                return (
                    'object' == typeof console &&
                        console.error(n + e + '\n' + (r || '')),
                    n + e
                )
            }
        },
        n = r.exp,
        t = function (e) {
            this.tpl = e
        }
    ;(t.pt = t.prototype),
        (window.errors = 0),
        (t.pt.parse = function (t, c) {
            var o = this,
                p = t,
                a = n('^' + e.open + '#', ''),
                l = n(e.close + '$', '')
            ;(t = t
                .replace(/\s+|\r|\t|\n/g, ' ')
                .replace(n(e.open + '#'), e.open + '# ')
                .replace(n(e.close + '}'), '} ' + e.close)
                .replace(/\\/g, '\\\\')
                .replace(/(?="|')/g, '\\')
                .replace(r.query(), function (e) {
                    return (
                        (e = e.replace(a, '').replace(l, '')),
                        '";' + e.replace(/\\/g, '') + ';view+="'
                    )
                })
                .replace(r.query(1), function (r) {
                    var t = '"+('
                    return r.replace(/\s/g, '') === e.open + e.close
                        ? ''
                        : ((r = r.replace(n(e.open + '|' + e.close), '')),
                          /^=/.test(r) &&
                              ((r = r.replace(/^=/, '')), (t = '"+_escape_(')),
                          t + r.replace(/\\/g, '') + ')+"')
                })),
                (t = '"use strict";var view = "' + t + '";return view;')
            try {
                return (
                    (o.cache = t = new Function('d, _escape_', t)),
                    t(c, r.escape)
                )
            } catch (u) {
                return delete o.cache, r.error(u, p)
            }
        }),
        (t.pt.render = function (e, n) {
            var t,
                c = this
            return e
                ? ((t = c.cache ? c.cache(e, r.escape) : c.parse(c.tpl, e)),
                  console.log(),
                  n ? void n(t) : t)
                : r.error('no data')
        })
    var c = function (e) {
        return 'string' != typeof e ? r.error('Template not found') : new t(e)
    }
    ;(c.config = function (r) {
        r = r || {}
        for (var n in r) e[n] = r[n]
    }),
        (c.v = '1.2'),
        'function' == typeof define
            ? define(function () {
                  return c
              })
            : 'undefined' != typeof exports
            ? (module.exports = c)
            : (window.laytpl = c)
})()

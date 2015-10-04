var animate_time = 160;
define("app/src/edit/main", ["lib/jquery-lib", "lib/util", "lib/contextMenu/jquery-contextMenu", "lib/artDialog/jquery-artDialog", "./function_list", "./taskTap", "./toolbar", "./edit", "./mode", "../../common/core", "../../tpl/copyright.html", "../../tpl/search.html", "../../tpl/search_list.html", "../../tpl/upload.html"], function(e) {
    e("lib/jquery-lib"), e("lib/util"), e("lib/contextMenu/jquery-contextMenu"), e("lib/artDialog/jquery-artDialog"), FunctionList = e("./function_list"), Tap = e("./taskTap"), Toolbar = e("./toolbar"), Editor = e("./edit"), core = e("../../common/core"), rightMenu = Tap.rightMenu, preview = Toolbar.preview, auto_function_list = !1, Global = {
        topbar_height: 40,
        isIE: !-[1]
    }, $(document).ready(function() {
        Editor.init(), Toolbar.init(), FunctionList.init(), Tap.init(), "" != G.frist_file && Editor.add(G.frist_file), window.onbeforeunload = function() {
            return Editor.hasFileSave() ? LNG.if_save_file : void 0
        }
    })
}), define("app/src/edit/function_list", [], function() {
    var e = {
            php: [{
                reg: /\s*function\s+(\w*)\s*\(.*\)*/g,
                reg_name: /.*function\s+(.*\))/,
                reg_index: 1,
                type: "function"
            }, {
                reg: /\s*class\s+(\w*)\s*.*\{/g,
                reg_name: /\s*class\s+(\w*)\s*.*\{/,
                reg_index: 1,
                type: "class"
            }],
            javascript: [{
                reg: /\s*([\w\.]+)\s*=\s*function\s*\([\w\s]*\)\s*\{/g,
                reg_name: /\s*([\w\.]+)\s*=\s*function\s*(\([\w\s]*\))/,
                reg_index: 1,
                reg_name_all: [1, 2],
                type: "function function_var"
            }, {
                reg: /\s*function\s+([\w\s]+)\s*\([\w\s]*\)\s*\{/g,
                reg_name: /\s*function\s+([\w\s]+)\s*(\([\w\s]*\))/,
                reg_index: 1,
                reg_name_all: [1, 2],
                type: "function function_define"
            }, {
                reg: /\s*([\w\.]+)\s*:\s*function\s*\([\w\s]*\)\s*\{/g,
                reg_name: /\s*([\w\.]+)\s*:\s*function\s*(\([\w\s]*\))/,
                reg_index: 1,
                reg_name_all: [1, 2],
                type: "function function_value"
            }],
            python: [{
                reg: /\s*class\s+(\w+)\s*\(/g,
                reg_name: /\s*class\s+(\w+)\s*\(/,
                reg_index: 1,
                type: "class"
            }, {
                reg: /\s*def\s+(\w+)\s*\(.*\)/g,
                reg_name: /\s*def\s+(\w+)\s*\(.*\)/,
                reg_index: 1,
                type: "function"
            }],
            ruby: [{
                reg: /\s*class\s+(\w+)\s*/g,
                reg_name: /\s*class\s+(\w+)\s*/,
                reg_index: 1,
                type: "class"
            }, {
                reg: /\s*def\s+(\w+)\s*/g,
                reg_name: /\s*def\s+(\w+)\s*/,
                reg_index: 1,
                type: "function"
            }],
            java: [{
                reg: /\s*(final)?\s*(public|private|protected)\s*.*\s+(\w+)\s*\(.*\).*\{/g,
                reg_name: /\s*(final)?\s*(public|private|protected)\s*.*\s+(\w+)\s*\(.*\).*\{/,
                reg_index: 3,
                type: "function"
            }, {
                reg: /\s*class\s+(\w+)\s*/g,
                reg_name: /\s*class\s+(\w+)\s*/,
                reg_index: 1,
                type: "class"
            }],
            objectivec: [{
                reg: /[\+-]\s*\(.*\)\s*(\w+)\s*\:\s*\(.*/g,
                reg_name: /[\+-]\s*\(.*\)\s*(\w+)\s*\:\s*\(.*/,
                reg_index: 1,
                type: "function"
            }, {
                reg: /[\+-]\s*\([^:\{\}]*\)\s*(\w*)\s*\{/g,
                reg_name: /[\+-]\s*\([^:\{\}]*\)\s*(\w*)\s*\{/,
                reg_index: 1,
                type: "function"
            }, {
                reg: /@implementation\s+(\w*)/g,
                reg_name: /@implementation\s+(\w*)/,
                reg_index: 1,
                type: "class"
            }, {
                reg: /#pragma\s+(mark\s+)?(.*)/g,
                reg_name: /#pragma\s+(mark\s+)?(.*)/,
                reg_index: 2,
                type: "mark"
            }, {
                reg: /([\w*]+\s+)+\*?(\w+)\s*\([\w,\s\*\[\]\<\>&]*\)\s*\{/g,
                reg_name: /(\w+\s*)+\s\*?(\w+)\s*\(/,
                reg_index: 2,
                type: "function function_value"
            }, {
                reg: /\s*(\w+)::~?(\w+)\s*\([\w,\s\*\[\]\<\>&]*\)\s*\{/g,
                reg_name: /\s*(\w+)::~?(\w+)\s*\(/,
                reg_index: 2,
                type: "function function_define"
            }],
            c_cpp: [{
                reg: /([\w*]+\s+)+\*?(\w+)\s*\([\w,\s\*\[\]\<\>&]*\)\s*\{/g,
                reg_name: /(\w+\s*)+\s\*?(\w+)\s*\(/,
                reg_index: 2,
                type: "function"
            }, {
                reg: /\s*(\w+)::~?(\w+)\s*\([\w,\s\*\[\]\<\>&]*\)\s*\{/g,
                reg_name: /\s*(\w+)::~?(\w+)\s*\(/,
                reg_index: 2,
                type: "function function_define"
            }, {
                reg: /\s*class\s+(\w+)\s*:/g,
                reg_name: /\s*class\s+(\w+)\s*:/,
                reg_index: 1,
                type: "class"
            }]
        },
        t = function(e, t) {
            var a = e.match(t.reg);
            if (a) {
                for (var i = [], n = a.length, s = 0, o = e, r = 0; n > r; r++) {
                    var l = {};
                    l.the_match = a[r];
                    var c = l.the_match.match(t.reg_name);
                    if (!(2 > c.length) && c[t.reg_index]) {
                        l.name = c[t.reg_index];
                        var d = o.indexOf(l.the_match),
                            p = l.the_match.indexOf(l.name);
                        if (l.pos_start = s + d + p, l.pos_end = l.pos_start + l.name.length, "object" == typeof t.reg_name_all) {
                            l.name = "";
                            for (var u = t.reg_name_all, h = 0; u.length > h; h++) l.name += c[u[h]]
                        }
                        s = s + d + l.the_match.length, o = e.substr(s), l.type = t.type, i.push(l)
                    }
                }
                return i
            }
        },
        a = function(a, i) {
            if (void 0 !== e[i]) {
                for (var n = e[i], s = [], o = 0; n.length > o; o++) {
                    var r = t(a, n[o]);
                    r && Array.prototype.push.apply(s, r)
                }
                s.sort(function(e, t) {
                    var a = "pos_start";
                    return e[a] < t[a] ? -1 : e[a] >= t[a] ? 1 : void 0
                });
                for (var l = a.split("\n"), c = l.length, d = 0, p = s[d], u = 0, h = 0; c > h && p; h++) {
                    for (; p && p.pos_start >= u && p.pos_start <= u + l[h].length;) s[d].range = {
                        start: {
                            row: h,
                            column: p.pos_start - u
                        },
                        end: {
                            row: h,
                            column: p.pos_end - u
                        }
                    }, d++, p = s[d];
                    u = u + l[h].length + 1
                }
                return s
            }
        },
        i = function(e) {
            return e = e.replace(/[\r\n {]+/gi, " "), e = e.replace(/"/gi, "'"), e = e.replace(/\</gi, "&lt;"), e = e.replace(/\>/gi, "&gt;")
        },
        n = function() {
            var e = '<div class="cell_null">No outline for the active view</div>',
                t = Editor.current();
            if (!t || t.kod === void 0) return $(".function_list_box").html(e), void 0;
            var n = function(e) {
                    var t = e.replace(/(^\s*)|(\s*$)/g, "");
                    return t.replace(/(\{$)/, "")
                },
                s = t.kod.mode,
                o = a(t.getValue(), s);
            if (o === void 0 || 0 == o.length) return $(".function_list_box").html(e), void 0;
            var r = t.getCursorPosition().row;
            e = "";
            for (var l = 0; o.length > l; l++) {
                var c = o[l],
                    d = c.range;
                if (d) {
                    o.length - 1 > l && r >= o[l].range.start.row && o[l + 1].range && o[l + 1].range.start.row > r && (c.type += " row_select"), l == o.length - 1 && r >= o[l].range.start.row && (c.type += " row_select");
                    var p = d.start.row + "," + d.start.column + "," + d.end.row + "," + d.end.column,
                        u = n(n(c.the_match)).substr(0, 150);
                    e += '<div class="list_row ' + i(c.type) + ' " title="' + i(u) + '" data-range="' + p + '">' + '<span class="icon"></span>' + '<span class="cell">' + i(c.name) + "</span></div>"
                }
            }
            $(".function_list_box").html(e)
        },
        s = function() {
            $(".function_list_box .list_row").die("mouseenter").live("mouseenter", function() {
                $(this).addClass("row_hover")
            }).die("mouseleave").live("mouseleave", function() {
                $(this).removeClass("row_hover")
            }).die("click").live("click", function() {
                $(".function_list_box .list_row").removeClass("row_select"), $(this).addClass("row_select");
                var e = $(this).attr("data-range"),
                    t = e.split(","),
                    a = {
                        start: {
                            row: t[0],
                            column: t[1]
                        },
                        end: {
                            row: t[2],
                            column: t[3]
                        }
                    };
                Editor.current() && (Editor.current().gotoLine(t[0]), Editor.current().selection.setSelectionRange(a, !0))
            })
        };
    return {
        init: s,
        refresh: n,
        mode_list: function() {
            return objectKeys(e)
        }
    }
}), define("app/src/edit/taskTap", [], function() {
    var e = function() {
            $(".edit_tab .tab").live("mouseenter", function() {
                $(this).hasClass("this") || $(this).addClass("hover"), $(this).unbind("mousedown").mousedown(function(e) {
                    $(this).hasClass("this") || $.nodeName(e.target, "A") || ($(this).removeClass("hover").addClass("this"), Editor.select($(this).attr("uuid")))
                })
            }).die("mouseleave").live("mouseleave", function() {
                $(this).removeClass("hover")
            }).die("dblclick").live("dblclick", function(e) {
                Editor.remove($(this).attr("uuid")), stopPP(e)
            }), $(".edit_tab").die("dblclick").live("dblclick", function(e) {
                Editor.add(), stopPP(e)
            }), $(".edit_tab .tab .close").live("click", function() {
                var e = $(this).parent().attr("uuid");
                Editor.remove(e)
            })
        },
        t = function() {
            $(".context-menu-list").filter(":visible").trigger("contextmenu:hide")
        },
        a = function() {
            $("body").click(t).contextmenu(t), $.contextMenu({
                zIndex: 9999,
                selector: ".edit_tab_menu",
                items: {
                    close: {
                        name: LNG.close,
                        icon: "remove",
                        accesskey: "d"
                    },
                    close_right: {
                        name: LNG.close_right,
                        icon: "remove-sign",
                        accesskey: "r"
                    },
                    close_others: {
                        name: LNG.close_others,
                        icon: "remove-circle",
                        accesskey: "o"
                    },
                    sep1: "--------",
                    create: {
                        name: LNG.newfile,
                        icon: "plus",
                        accesskey: "n"
                    },
                    preview: {
                        name: LNG.preview,
                        icon: "globe",
                        accesskey: "p"
                    }
                },
                callback: function(e, t) {
                    var a = t.$trigger,
                        i = a.attr("uuid");
                    switch (e) {
                        case "close":
                            Editor.remove();
                            break;
                        case "close_right":
                            var n = $(".edit_tab .tabs .tab").index(a);
                            $(".edit_tab .tabs .tab:gt(" + n + ")").each(function() {
                                Editor.remove($(this).attr("uuid"))
                            });
                            break;
                        case "close_others":
                            $(".edit_tab .tabs .tab").each(function() {
                                var e = $(this).attr("uuid");
                                e != i && Editor.remove(e)
                            });
                            break;
                        case "create":
                            Editor.add();
                            break;
                        case "preview":
                            Toolbar.doAction("preview");
                            break;
                        default:
                    }
                }
            })
        },
        i = function() {
            var e, t, a, i, n = !1,
                s = !1,
                o = 0,
                r = 0,
                l = 0,
                c = 0,
                d = 0,
                p = 0;
            $(".edit_tab .tab").die("mousedown").live("mousedown", function(t) {
                $.nodeName(t.target, "A") || (e = $.nodeName(t.target, "SPAN") ? $(t.target).parent() : $(this), n = !0, this.setCapture && this.setCapture(), $(document).mousemove(function(e) {
                    h(e)
                }), $(document).one("mouseup", function(e) {
                    m(e), this.releaseCapture && this.releaseCapture()
                }))
            });
            var u = function(i) {
                    s = !0, o = i.pageX, $tab_parent = $(".edit_tab"), t = $(".edit_tab .tab"), $(".draggable-dragging").remove(), a = e.clone().addClass("draggable-dragging").prependTo("body"), c = $sizeInt(t.css("margin-right")), d = $tab_parent.width(), p = $tab_parent.get(0).getBoundingClientRect().left, p += $(window).scrollLeft(), r = e.get(0).getBoundingClientRect().left, l = $sizeInt(t.css("width"));
                    var n = e.get(0).getBoundingClientRect().top - $sizeInt(e.css("margin-top")),
                        u = i.clientX - o + r;
                    $("body").prepend("<div class='dragMaskView'></div>"), a.css({
                        width: l + "px",
                        top: n,
                        left: u
                    }), e.css("opacity", 0)
                },
                h = function(i) {
                    if (n) {
                        0 == s && u(i);
                        var h = i.clientX - o + r;
                        p > h || h > p + d - l || (a.css("left", h), t.each(function() {
                            var t = $(this).get(0).getBoundingClientRect().left;
                            if (h > t && t + l / 2 + c > h) {
                                if (e.attr("uuid") == $(this).attr("uuid")) return;
                                f($(this).attr("uuid"), "left")
                            }
                            if (h > t - l / 2 + c && t > h) {
                                if (e.attr("uuid") == $(this).attr("uuid")) return;
                                f($(this).attr("uuid"), "right")
                            }
                        }))
                    }
                },
                f = function(a, n) {
                    if (!e.is(":animated") || i != a) {
                        i = a, e.stop(!0, !0), $(".insertTemp").remove(), t = $(".edit_tab .tab");
                        var s = e.width(),
                            o = $(".edit_tab .tab_" + a),
                            r = e.clone(!0).insertAfter(e).css({
                                "margin-right": "0px",
                                border: "none"
                            }).addClass("insertTemp");
                        "left" == n ? e.after(o).css("width", "0px") : (e.before(o).css("width", "0px"), o.before(r)), e.animate({
                            width: s + "px"
                        }, animate_time), r.animate({
                            width: "0px"
                        }, animate_time, function() {
                            $(this).remove(), t = $(".edit_tab .tab")
                        })
                    }
                },
                m = function() {
                    n = !1, s = !1, startTime = 0, $(".dragMaskView").remove(), void 0 != a && (r = e.get(0).getBoundingClientRect().left, a.animate({
                        left: r + "px"
                    }, animate_time, function() {
                        e.css("opacity", 1), $(this).remove()
                    }))
                }
        },
        n = function(e, t, a) {
            var i = 1.5 * animate_time,
                n = 122,
                s = n,
                o = $(".edit_tab .tab"),
                r = $sizeInt($(".edit_tab .tabs").width()) - 4,
                l = $sizeInt(o.css("margin-right")) + $sizeInt(o.css("border-right")),
                c = $sizeInt($(".edit_tab .add").css("width")) + 2 * l,
                d = o.length,
                p = Math.floor((r - c) / (n + l));
            switch (d > p && (s = Math.floor((r - c) / d) - l), e) {
                case "add":
                    $(".edit_tab .tabs .this").css({
                        "margin-top": "30px",
                        width: s
                    }).animate({
                        "margin-top": "0px"
                    }, i), o.animate({
                        width: s + "px"
                    }, i);
                    break;
                case "remove":
                    void 0 != a && Editor.select(a), t.animate({
                        width: "0",
                        "margin-top": "+=30"
                    }, i, function() {
                        t.remove()
                    }), o.animate({
                        width: s + "px"
                    }, i);
                    break;
                case "resize":
                    o.css("width", s + "px");
                    break;
                default:
            }
        };
    return {
        rightMenu: {
            hidden: t
        },
        resetWidth: n,
        init: function() {
            $("body").live("resize", function() {
                n("resize")
            }), e(), i(), a()
        }
    }
}), define("app/src/edit/toolbar", [], function() {
    var e = function() {
            $(window).bind("resize", function() {
                n.resize()
            }), $(".toolMenu").bind("click mouseup", stopPP), $(".toolMenu").on("mousedown", function() {
                $(".toolMenu").removeClass("select"), $(this).addClass("select");
                var e = $(this).offset().left - 4;
                $(this).contextMenu({
                    x: e,
                    y: 25
                })
            }), $(".toolMenu").on("hover", function() {
                if (!$(".toolMenu").hasClass("context-menu-active")) return !0;
                $(".toolMenu").removeClass("select"), $(this).addClass("select");
                var e = $(this).offset().left - 4;
                $(this).contextMenu({
                    x: e,
                    y: 25
                })
            }), $.contextMenu({
                selector: ".editMenuFile",
                trigger: "none",
                callback: t,
                items: {
                    save: {
                        name: LNG.button_save + "<b>Ctrl+S</b>",
                        icon: "save",
                        accesskey: "s"
                    },
                    saveall: {
                        name: LNG.button_save_all,
                        icon: "paste",
                        accesskey: "a"
                    },
                    sep1: "---------",
                    newfile: {
                        name: LNG.newfile,
                        icon: "file-alt",
                        accesskey: "j"
                    },
                    sep2: "---------",
                    close: {
                        name: LNG.close,
                        icon: "remove",
                        accesskey: "q"
                    }
                }
            }), $.contextMenu({
                selector: ".editMenuEdit",
                trigger: "none",
                callback: t,
                items: {
                    undo: {
                        name: LNG.undo + "<b>Ctrl+Z</b>",
                        icon: "undo"
                    },
                    redo: {
                        name: LNG.redo + "<b>Ctrl+Y</b>",
                        icon: "repeat"
                    },
                    sep1: "---------",
                    startAutocomplete: {
                        name: LNG.complete_current,
                        icon: "code"
                    },
                    search: {
                        name: LNG.search + "<b>Ctrl+F</b>",
                        icon: "search"
                    },
                    searchReplace: {
                        name: LNG.replace + "<b>Ctrl+F+F</b>",
                        icon: "exchange"
                    },
                    gotoline: {
                        name: LNG.gotoline + "<b>Ctrl+L</b>",
                        icon: "pushpin"
                    },
                    sep2: "---------",
                    selectAll: {
                        name: LNG.selectAll + "<b>Ctrl+A</b>",
                        icon: "eye-open"
                    }
                }
            });
            for (var e = [12, 13, 14, 15, 16, 18, 20, 24, 28, 32], a = G.code_theme_all.split(","), i = Editor.mode.modeAll(), s = {}, o = {}, r = {}, l = 0; e.length > l; l++) {
                var c = e[l];
                s["set_code_font-" + c] = {
                    name: c + "px",
                    className: "set_code_font-" + c
                }
            }
            for (var l = 0; a.length > l; l++) {
                var d = a[l];
                o["set_code_theme-" + d] = {
                    name: d,
                    className: "set_code_theme-" + d
                }
            }
            for (var l = 0; i.length > l; l++) {
                var p = i[l];
                r["set_code_mode-" + p] = {
                    name: p,
                    className: "set_code_mode-" + p
                }
            }
            $.contextMenu({
                selector: ".editMenuView",
                trigger: "none",
                callback: t,
                items: {
                    code_font: {
                        className: "code_font_list",
                        name: LNG.font_size,
                        icon: "font",
                        items: s
                    },
                    code_theme: {
                        className: "code_theme_list",
                        name: LNG.code_theme,
                        icon: "magic",
                        items: o
                    },
                    code_mode: {
                        className: "code_mode_list",
                        name: LNG.code_mode,
                        icon: "leaf",
                        items: r
                    },
                    sep1: "---------",
                    function_list: {
                        name: LNG.function_list + "<b>Ctrl+R</b>",
                        className: "function_list"
                    },
                    auto_complete: {
                        name: LNG.auto_complete,
                        className: "auto_complete"
                    },
                    sep2: "---------",
                    wordbreak: {
                        name: LNG.wordwrap,
                        className: "wordbreak"
                    },
                    display_char: {
                        name: LNG.char_all_display,
                        className: "display_char"
                    },
                    sep3: "---------",
                    fullscreen: {
                        name: LNG.full_screen,
                        icon: "fullscreen"
                    }
                }
            }), $.contextMenu({
                selector: ".editMenuTools",
                trigger: "none",
                callback: t,
                items: {
                    preview: {
                        name: LNG.preview + "<b>Ctrl+Shift+S</b>",
                        icon: "edit"
                    },
                    open_ie: {
                        name: LNG.open_ie,
                        icon: "globe",
                        accesskey: "b"
                    }
                }
            }), $.contextMenu({
                selector: ".editMenuHelp",
                trigger: "none",
                callback: t,
                items: {
                    setting: {
                        name: LNG.setting,
                        icon: "cog"
                    },
                    about: {
                        name: LNG.about,
                        icon: "info-sign"
                    },
                    sep1: "---------",
                    learnMore: {
                        name: LNG.learnMore,
                        icon: "question"
                    }
                }
            }), $(".tools a[action]").bind("click", function() {
                var e = $(this).attr("action");
                t(e), Editor.current() && Editor.current().focus()
            }), $("body").click(function() {
                Editor.current() && Editor.current().focus(), $(".toolMenu").removeClass("select");
                try {
                    window.parent.rightMenu.hidden()
                } catch (e) {}
            }), $("ul.code_font_list .context-menu-item").mouseenter(function() {
                Editor.current().setFontSize($(this).text()), $(this).unbind("click").click(function() {
                    var e = $(this).text();
                    Editor.config("fontsize", e), $("ul.code_font_list .context-menu-item").removeClass("selected"), $(this).addClass("selected"), Editor.current() && Editor.current().focus()
                })
            }).mouseleave(function() {
                Editor.current().setFontSize(G.code_config.font_size)
            }), $("ul.code_theme_list .context-menu-item").mouseenter(function() {
                Editor.current().setTheme("ace/theme/" + $(this).find("span").html()), $(this).unbind("click").click(function() {
                    var e = $(this).find("span").html();
                    Editor.config("theme", e), $("ul.code_theme_list .context-menu-item").removeClass("selected"), $(this).addClass("selected"), Editor.current() && Editor.current().focus()
                })
            }).mouseleave(function() {
                Editor.current().setTheme("ace/theme/" + G.code_config.theme)
            }), $("ul.code_mode_list .context-menu-item").mouseenter(function() {
                Editor.current().getSession().setMode("ace/mode/" + $(this).find("span").html()), $(this).unbind("click").click(function() {
                    var e = $(this).find("span").html();
                    Editor.current().kod.mode = e, $("ul.code_mode_list .context-menu-item").removeClass("selected"), $(this).addClass("selected"), Editor.current() && Editor.current().focus()
                })
            }).mouseleave(function() {
                Editor.current().getSession().setMode("ace/mode/" + Editor.current().kod.mode)
            }), $(".tools a[action]").tooltip({
                placement: "bottom"
            })
        },
        t = function(e) {
            switch (e) {
                case "newfile":
                    Editor.add();
                    break;
                case "fullscreen":
                    $(".icon-resize-full").toggleClass("icon-resize-small"), FrameCall.father("core.editorFull", "''");
                    break;
                default:
            }
            if (Editor.current()) switch (e) {
                case "save":
                    Editor.save();
                    break;
                case "saveall":
                    Editor.saveall();
                    break;
                case "undo":
                    Editor.current().undo();
                    break;
                case "redo":
                    Editor.current().redo();
                    break;
                case "copy":
                    break;
                case "paste":
                    break;
                case "cute":
                    break;
                case "delete":
                    Editor.current().execCommand("del");
                    break;
                case "selectAll":
                    Editor.current().execCommand("selectall");
                    break;
                case "startAutocomplete":
                    Editor.current().execCommand("startAutocomplete");
                    break;
                case "search":
                    Editor.current().execCommand("find");
                    break;
                case "searchReplace":
                    Editor.current().execCommand("replace");
                    break;
                case "gotoline":
                    Editor.current().commands.exec("gotoline", Editor.current());
                    break;
                case "wordbreak":
                    Editor.config("wrap");
                    break;
                case "display_char":
                    Editor.config("display_char");
                    break;
                case "setting":
                    Editor.config("setting");
                    break;
                case "auto_complete":
                    Editor.config("auto_complete");
                    break;
                case "function_list":
                    if (auto_function_list && "none" == $(".frame_right .function_list").css("display")) return n.open("function_list"), void 0;
                    auto_function_list ? (auto_function_list = 0, n.close()) : (auto_function_list = 1, n.open("function_list")), Editor.config("function_list", auto_function_list);
                    break;
                case "open_ie":
                    var t = urlDecode(urlDecode(Editor.current().kod.filename));
                    t = core.path2url(t), window.open(t);
                    break;
                case "preview":
                    var t = urlDecode(urlDecode(Editor.current().kod.filename));
                    t = core.path2url(t), n.open("preview", t);
                    break;
                case "close":
                    Editor.remove();
                    break;
                case "about":
                    core.setting("about");
                    break;
                case "learnMore":
                    window.open("http://kalcaddle.com/editor.html");
                    break;
                case "shortcut":
                    break;
                default:
            }
        },
        a = function(e) {
            $(".context-menu-root .context-menu-item").removeClass("selected"), 1 == e.display_char && $(".context-menu-root .display_char").addClass("selected"), 1 == e.function_list && $(".context-menu-root .function_list").addClass("selected"), 1 == e.auto_complete && $(".context-menu-root .auto_complete").addClass("selected"), 1 == e.wrap && $(".context-menu-root .wordbreak").addClass("selected"), $(".set_code_theme-" + e.theme).addClass("selected"), $(".set_code_font-" + e.fontsize.substr(0, 2)).addClass("selected"), Editor.current() && Editor.current().kod && Editor.current().kod.mode && $(".set_code_mode-" + Editor.current().kod.mode).addClass("selected")
        },
        i = function() {
            $(".frame_right input").keyEnter(n.refresh);
            var e = !1,
                t = 0,
                a = 0;
            $drag = $(".frame_right .resize"), $box_left = $(".frame_left"), $box = $drag.parent(), $drag.die("mousedown").live("mousedown", function(e) {
                return 1 != e.which ? !0 : (i(e), this.setCapture && this.setCapture(), $(document).mousemove(function(e) {
                    s(e)
                }), $(document).one("mouseup", function(e) {
                    o(e), this.releaseCapture && this.releaseCapture()
                }), void 0)
            });
            var i = function(i) {
                    e = !0, t = i.pageX, a = $box.width(), $drag.addClass("resize_active"), $("body").css("cursor", "col-resize"), $box.append('<div class="preview_frame mask_view"></div>')
                },
                s = function(i) {
                    if (!e) return !0;
                    var n = i.pageX - t,
                        s = a - n,
                        o = $(window).width();
                    s >= o - 50 && (s = o - 50), 100 >= s && (s = 100), $box_left.css("width", o - s).find(".edit_body").css("width", o - s), $box.width(s), $box.find(".function_list").css("width", s), $box.find(".preview").css("width", s), Tap.resetWidth("resize"), Editor.config("resize")
                },
                o = function() {
                    return e ? (e = !1, $drag.removeClass("resize_active"), $("body").css("cursor", "default"), $box.find(".mask_view").remove(), void 0) : !1
                }
        },
        n = function() {
            var e = $(".frame_right"),
                t = $(".frame_left"),
                a = e.find("input"),
                i = function(t, i) {
                    var s = 0;
                    if ("function_list" == t) {
                        if (!auto_function_list) return;
                        s = 200, FunctionList.refresh(), e.find("iframe").attr("src", ""), e.find(".preview").css("display", "none")
                    } else if ("preview" == t && (s = 400, a.val(i), e.find(".open_ie").attr("href", i), e.find("iframe").attr("src", i), e.find(".function_list").css("display", "none"), "block" == e.find(".preview").css("display"))) return;
                    e.find("." + t).css("display", "block").css("width", s), e.css("display", "block").css("width", "0").stop(!0, !0).animate({
                        width: s
                    }, 200, function() {
                        var e = $(window).width() - s;
                        $(".frame_left").css("width", e).find(".edit_body").css("width", e), n.resize()
                    }), "function_list" == t && FunctionList.refresh()
                };
            return {
                open: i,
                openUrl: function() {
                    window.open($(".frame_right input").attr("value"))
                },
                resize: function() {
                    if ("block" == e.css("display")) {
                        var a = e.width(),
                            i = $(window).width();
                        a >= i - 50 && (a = i - 50), 100 >= a && (a = 100), e.width(a), t.css("width", i - a).find(".edit_body").css("width", i - a)
                    }
                    Tap.resetWidth("resize"), Editor.config("resize")
                },
                close: function() {
                    e.stop(!0, !0).animate({
                        width: 0
                    }, 200, function() {
                        e.css("display", "none"), e.find(".preview").css("display", "none"), e.find(".function_list").css("display", "none"), e.find("iframe").attr("src", ""), a.val("")
                    }), $(".frame_left").css("width", "100%").find(".edit_body").css("width", "100%"), Tap.resetWidth("resize"), Editor.config("resize")
                },
                refresh: function() {
                    var t = a.attr("value");
                    e.find(".open_ie").attr("href", t), e.find("iframe").attr("src", t)
                }
            }
        }();
    return {
        preview: n,
        doAction: t,
        toolbarSelected: a,
        init: function() {
            e(), i(), Mousetrap.bind(["ctrl+s", "command+s"], function(e) {
                e.preventDefault(), e.returnvalue = !1, Editor.save()
            }), Mousetrap.bind(["ctrl+r", "command+r"], function(e) {
                e.preventDefault(), e.returnvalue = !1, Toolbar.doAction("function_list")
            })
        }
    }
}), define("app/src/edit/edit", ["./mode"], function(e) {
    var t = {
            theme: G.code_config.theme,
            fontsize: G.code_config.font_size,
            auto_complete: parseInt(G.code_config.auto_complete),
            wrap: parseInt(G.code_config.auto_wrap),
            display: parseInt(G.code_config.display_char),
            function_list: parseInt(G.code_config.function_list)
        },
        a = {},
        i = void 0,
        n = e("./mode");
    ace_tools = ace.require("ace/ext/language_tools");
    var s = function(e, t) {
            if (void 0 == t || void 0 == e || 1 > a.length) return "";
            for (var i in a)
                if (a[i].kod[e] == t) return a[i].kod.uuid;
            return ""
        },
        o = function() {
            auto_function_list = 1 == t.function_list ? !0 : !1, Toolbar.toolbarSelected(t)
        },
        r = function(e) {
            var t, i = "id_" + UUID();
            if (void 0 == e) return t = {
                uuid: i,
                name: "newfile.txt",
                charset: "utf-8",
                filename: "",
                mode: n.get("txt")
            }, l(t), c(t), $(".edit_body .this").removeClass("this"), $(".edit_body pre#" + i).addClass("this"), void 0;
            t = {
                charset: "utf-8",
                uuid: i,
                name: core.pathThis(urlDecode(urlDecode(e))),
                filename: e,
                mode: n.get(core.pathExt(urlDecode(e)))
            }, l(t, !0);
            var s = art.dialog({
                    title: !1,
                    content: LNG.getting,
                    icon: "warning"
                }),
                o = "./index.php?editor/fileGet&filename=" + e;
            G.share_page !== void 0 && (o = "./index.php?share/fileGet&user=" + G.user + "&sid=" + G.sid + "&filename=" + e), $.ajax({
                dataType: "json",
                url: o,
                error: function(e, a, i) {
                    s.close(), _(t.uuid), core.ajaxError(e, a, i)
                },
                success: function(e) {
                    if (s.close(), !e.code) return Tips.tips(e), _(t.uuid), void 0;
                    var n = e.data;
                    a[i] = void 0, $("pre#" + i).text(n.content), c(t), $(".edit_body .this").removeClass("this"), $(".edit_body pre#" + i).addClass("this");
                    var o = a[i];
                    o.kod.charset = n.charset, o.navigateTo(0), o.moveCursorTo(0, 0)
                }
            })
        },
        l = function(e, t) {
            var a = '<div class="edit_tab_menu tab tab_' + e.uuid + '" uuid="' + e.uuid + '" title="' + urlDecode(urlDecode(e.filename)) + '">' + '   <div class="name">' + e.name + "</div>" + '   <a href="javascript:void(0);" class="close icon-remove-sign"></a>' + '   <div style="clear:both;"></div>' + "</div>";
            $(a).insertBefore(".edit_tab .add");
            var i = '<pre id="' + e.uuid + '" class="edit_content"></pre>';
            if ($(".edit_body .tabs").append(i), d(e.uuid), t) {
                var n = animate_time;
                animate_time = 1, Tap.resetWidth("add"), animate_time = n
            } else Tap.resetWidth("add")
        },
        c = function(e) {
            var i = ace.edit(e.uuid);
            i.setTheme("ace/theme/" + t.theme), void 0 != e.mode && i.getSession().setMode("ace/mode/" + e.mode), i.getSession().setTabSize(4), i.getSession().setUseSoftTabs(!0), i.getSession().setUseWrapMode(t.wrap), i.$blockScrolling = 1 / 0, i.setShowPrintMargin(!1), i.setDragDelay(100), i.setShowInvisibles(t.display), i.setFontSize(t.fontsize), i.setAnimatedScroll(!0), i.setOptions({
                enableBasicAutocompletion: !0,
                enableSnippets: !0,
                enableLiveAutocompletion: t.auto_complete
            }), i.on("change", function() {
                h(i, !0), auto_function_list && "block" == $(".frame_right .function_list").css("display") && FunctionList.refresh()
            }), i.commands.addCommand({
                name: "editSave",
                bindKey: {
                    win: "Ctrl-S",
                    mac: "Command-S",
                    sender: "editor|cli"
                },
                exec: function(e) {
                    f(e.kod.uuid)
                }
            }), i.commands.addCommand({
                name: "editFunction",
                bindKey: {
                    win: "Ctrl-R",
                    mac: "Command-R",
                    sender: "editor|cli"
                },
                exec: function() {
                    Toolbar.doAction("function_list")
                }
            }), i.commands.addCommand({
                name: "preview",
                bindKey: {
                    win: "Ctrl-Shift-S",
                    mac: "Command-Shift-S"
                },
                exec: function() {
                    Toolbar.doAction("preview")
                }
            }), e.mode || (e.mode = ""), i.kod = {
                mode: e.mode,
                uuid: e.uuid,
                name: e.name,
                charset: "ansii",
                filename: e.filename
            }, i.hasChanged = !1, a[e.uuid] = i, d(e.uuid, !1)
        },
        d = function(e, t) {
            if ($(".edit_tab .this").removeClass("this"), $(".edit_tab .tab_" + e).addClass("this"), i = e, void 0 != a[e] && a[e].focus(), t && $(".edit_tab .this").stop(!0, !0).animate({
                    opacity: .3
                }, 100).animate({
                    opacity: .8
                }, 100).animate({
                    opacity: .5
                }, 40).animate({
                    opacity: 1
                }, 40, function() {
                    a[e].focus()
                }), auto_function_list) {
                if (!Editor.current()) return;
                "none" == $(".frame_right .preview").css("display") && (-1 == $.inArray(a[e].kod.mode, FunctionList.mode_list()) ? preview.close() : "none" == $(".frame_right .function_list").css("display") && preview.open("function_list")), FunctionList.refresh()
            }
            if (Editor.current()) try {
                var n = window.parent.art.dialog.list.openEditor,
                    s = '<img draggable="false" src="' + G.static_path + 'images/file_16/edit.png"/>' + urlDecode(urlDecode(Editor.current().kod.filename));
                n && n.title(s)
            } catch (o) {}
        },
        p = function(e, t) {
            void 0 != e && "" != e && (d(e, t), $(".edit_body .this").removeClass("this"), $(".edit_body pre#" + e).addClass("this"))
        },
        u = function(e, i, n) {
            var s = a;
            void 0 != n && (s = {}, s[n] = a[n]);
            var o = void 0;
            for (var r in s) {
                var l = s[r];
                switch (e) {
                    case "resize":
                        l.resize();
                        break;
                    case "theme":
                        t[e] = i, l.setTheme("ace/theme/" + i), G.code_config.theme = i, o = {
                            k: "theme",
                            v: i
                        };
                        break;
                    case "fontsize":
                        t[e] = i, l.setFontSize(i), G.code_config.font_size = i, o = {
                            k: "font_size",
                            v: i
                        };
                        break;
                    case "wrap":
                        t[e] = !l.getSession().getUseWrapMode(), l.getSession().setUseWrapMode(t[e]), G.code_config.auto_wrap = t[e];
                        var c = t[e] ? 1 : 0;
                        o = {
                            k: "auto_wrap",
                            v: c
                        };
                        break;
                    case "display_char":
                        t[e] = !l.getShowInvisibles(), l.setShowInvisibles(t[e]), G.code_config.display_char = t[e];
                        var c = t[e] ? 1 : 0;
                        o = {
                            k: "display_char",
                            v: c
                        };
                        break;
                    case "setting":
                        l.commands.exec("showSettingsMenu", l);
                        break;
                    case "function_list":
                        t[e] = i, G.code_config.function_list = i, o = {
                            k: "function_list",
                            v: i
                        };
                        break;
                    case "auto_complete":
                        t[e] = !l.$enableBasicAutocompletion, l.setOptions({
                            enableLiveAutocompletion: t[e]
                        }), l.$enableBasicAutocompletion = t[e], G.code_config.auto_complete = t[e];
                        var c = t[e] ? 1 : 0;
                        o = {
                            k: "auto_complete",
                            v: c
                        };
                        break;
                    default:
                }
                Toolbar.toolbarSelected(t)
            }
            o && $.ajax({
                url: "./index.php?editor/setConfig&k=" + o.k + "&v=" + o.v,
                dataType: "json",
                success: function() {}
            })
        },
        h = function(e, t) {
            t != e.hasChanged && (e.hasChanged = t, $(".edit_tab .tabs .tab_" + e.kod.uuid).toggleClass("edit_changed"))
        },
        f = function(e, t) {
            if (void 0 != i) {
                void 0 == e && (e = i), void 0 == t && (t = !1);
                var n = a[e];
                if (n.hasChanged) {
                    if (void 0 == n || "" == n) return tips(LNG.data_error, "warning"), void 0;
                    y().focus();
                    var s = urlEncode2(n.getValue()),
                        o = n.kod.filename,
                        r = "./index.php?editor/fileSave";
                    G.share_page !== void 0 && (r = "./index.php?share/fileSave&user=" + G.user + "&sid=" + G.sid + "&filename=" + o), $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: r,
                        data: "path=" + o + "&charset=" + n.kod.charset + "&filestr=" + s,
                        beforeSend: function() {
                            Tips.loading(LNG.sending)
                        },
                        error: core.ajaxError,
                        success: function(a) {
                            Tips.close(a), a.code && (h(n, !1), t && _(e))
                        }
                    })
                }
            }
        },
        m = function() {
            for (var e in a) f(e)
        },
        v = function(e) {
            if (void 0 == e && (e = i), void 0 != a[e]) {
                var t = a[e];
                t.hasChanged ? $.dialog({
                    title: LNG.warning,
                    resize: !1,
                    background: "#fff",
                    opacity: .4,
                    lock: !0,
                    icon: "question",
                    content: t.kod.name + "<br/>" + LNG.if_save_file,
                    padding: 40,
                    button: [{
                        name: LNG.button_save,
                        focus: !0,
                        callback: function() {
                            f(e, !0)
                        }
                    }, {
                        name: LNG.button_not_save,
                        callback: function() {
                            _(e)
                        }
                    }]
                }) : _(e)
            }
        },
        _ = function(e) {
            delete a[e];
            var t = "",
                i = $(".edit_tab .tab"),
                n = $(".edit_tab .tab_" + e),
                s = $(".edit_body pre#" + e);
            n.hasClass("this") ? ($(i[0]).attr("uuid") == e ? t = $(i[1]).attr("uuid") : i.each(function() {
                var a = $(this).attr("uuid");
                return a == e ? !1 : (t = a, void 0)
            }), "" != t && $(".edit_body pre#" + t).addClass("this"), s.remove(), Tap.resetWidth("remove", n, t)) : (s.remove(), Tap.resetWidth("remove", n)), 0 == $(".edit_body .tabs pre").length && preview.close()
        },
        g = function() {
            for (var e in a)
                if (a[e].hasChanged) return !0;
            return !1
        },
        b = function(e) {
            core.setSkin(e, "app_code_edit.css")
        },
        y = function() {
            return i && a[i] ? a[i] : !1
        };
    return {
        init: o,
        current: y,
        hasFileSave: g,
        config: u,
        setTheme: b,
        select: p,
        remove: v,
        save: f,
        saveall: m,
        mode: n,
        add: function(e) {
            var t = s("filename", e);
            "" != t ? p(t, !0) : r(e)
        }
    }
}), define("app/src/edit/mode", [], function() {
    function e() {
        for (var e in i)
            for (var t = 0; i[e].length > t; t++) a[i[e][t]] = e
    }

    function t(e) {
        return a[e]
    }
    var a = {},
        i = {
            abap: ["abap"],
            actionscript: ["as"],
            ada: ["ada", "adb"],
            apache_conf: ["htaccess", "htgroups", "htpasswd", "conf", "htaccess", "htgroups", "htpasswd"],
            asciidoc: ["asciidoc"],
            assembly_x86: ["asm"],
            autohotkey: ["ahk"],
            batchfile: ["bat", "cmd"],
            c9search: ["c9search_results"],
            c_cpp: ["cpp", "c", "cc", "cxx", "h", "hh", "hpp", "pch"],
            clojure: ["clj"],
            cobol: ["cbl", "cob"],
            coffee: ["coffee", "cf", "cson", "cakefile"],
            coldfusion: ["cfm"],
            csharp: ["cs", "asp"],
            css: ["css"],
            curly: ["curly"],
            d: ["d", "di"],
            dart: ["dart"],
            diff: ["diff", "patch"],
            dot: ["dot"],
            erlang: ["erl", "hrl"],
            ejs: ["ejs"],
            forth: ["frt", "fs", "ldr"],
            ftl: ["ftl"],
            glsl: ["glsl", "frag", "vert"],
            golang: ["go"],
            groovy: ["groovy"],
            haml: ["haml"],
            handlebars: ["hbs", "handlebars", "mustache"],
            haskell: ["hs"],
            haxe: ["hx"],
            html: ["html", "htm", "xhtml", "cshtml", "htc", "lasso"],
            html_ruby: ["erb", "rhtml"],
            ini: ["ini", "conf", "cfg", "prefs"],
            jack: ["jack"],
            jade: ["jade"],
            java: ["java"],
            javascript: ["js", "jsm"],
            json: ["json", "oexe"],
            jsoniq: ["jq"],
            jsp: ["jsp"],
            jsx: ["jsx"],
            julia: ["jl"],
            latex: ["tex", "latex", "ltx", "bib"],
            less: ["less"],
            liquid: ["liquid"],
            lisp: ["lisp"],
            livescript: ["ls"],
            logiql: ["logic", "lql"],
            lsl: ["lsl"],
            lua: ["lua"],
            luapage: ["lp"],
            lucene: ["lucene"],
            makefile: ["makefile", "gnumakefile", "makefile", "ocamlmakefile", "make"],
            matlab: ["matlab"],
            markdown: ["md", "markdown"],
            mel: ["mel"],
            mysql: ["mysql"],
            mushcode: ["mc", "mush"],
            nix: ["nix"],
            objectivec: ["m", "mm"],
            ocaml: ["ml", "mli"],
            pascal: ["pas", "p"],
            perl: ["pl", "pm", "cgi"],
            pgsql: ["pgsql"],
            php: ["php", "phtml"],
            powershell: ["ps1"],
            prolog: ["plg", "prolog"],
            properties: ["properties"],
            protobuf: ["proto"],
            python: ["py"],
            r: ["r"],
            rdoc: ["rd"],
            rhtml: ["rhtml"],
            ruby: ["rb", "ru", "gemspec", "rake", "guardfile", "rakefile", "gemfile"],
            rust: ["rs"],
            sass: ["sass"],
            scad: ["scad"],
            scala: ["scala"],
            scheme: ["scm", "rkt"],
            scss: ["scss"],
            sh: ["sh", "bash", "bashrc", "bash_profile"],
            sjs: ["sjs"],
            space: ["space"],
            snippets: ["snippets"],
            soy_template: ["soy"],
            sql: ["sql"],
            stylus: ["styl", "stylus"],
            svg: ["svg"],
            tcl: ["tcl"],
            tex: ["tex"],
            text: ["txt", "log"],
            textile: ["textile"],
            smarty: ["smarty", "tpl"],
            toml: ["toml"],
            twig: ["twig"],
            typescript: ["ts", "typescript", "str"],
            vbscript: ["vbs", "vb"],
            velocity: ["vm"],
            verilog: ["v", "vh", "sv", "svh"],
            xml: ["xml", "rdf", "rss", "wsdl", "xslt", "atom", "mathml", "vsdisco", "xaml", "mml", "xul", "xbl", "xib", "storyboard", "plist", "csproj"],
            xquery: ["xq"],
            yaml: ["yaml", "yml"]
        };
    return e(), {
        get: t,
        modes: a,
        modeAll: function() {
            return objectKeys(i)
        }
    }
}), define("app/common/core", [], function(require, exports) {
    return {
        filetype: {
            image: ["jpg", "jpeg", "png", "bmp", "gif", "ico"],
            music: ["mp3", "wma", "wav", "mid", "m4a", "aac", "midi"],
            movie: ["avi", "flv", "f4v", "wmv", "3gp", "mp4", "wmv", "asf", "m4v", "mov", "mpg"],
            doc: ["doc", "docx", "docm", "xls", "xlsx", "xlsb", "xlsm", "ppt", "pptx", "pptm"],
            text: ["oexe", "inc", "inf", "csv", "log", "asc", "tsv"],
            code: ["abap", "abc", "as", "ada", "adb", "htgroups", "htpasswd", "conf", "htaccess", "htgroups", "htpasswd", "asciidoc", "asm", "ahk", "bat", "cmd", "c9search_results", "cpp", "c", "cc", "cxx", "h", "hh", "hpp", "cirru", "cr", "clj", "cljs", "CBL", "COB", "coffee", "cf", "cson", "Cakefile", "cfm", "cs", "css", "curly", "d", "di", "dart", "diff", "patch", "Dockerfile", "dot", "dummy", "dummy", "e", "ejs", "ex", "exs", "elm", "erl", "hrl", "frt", "fs", "ldr", "ftl", "gcode", "feature", ".gitignore", "glsl", "frag", "vert", "go", "groovy", "haml", "hbs", "handlebars", "tpl", "mustache", "hs", "hx", "html", "htm", "xhtml", "erb", "rhtml", "ini", "cfg", "prefs", "io", "jack", "jade", "java", "js", "jsm", "json", "jq", "jsp", "jsx", "jl", "tex", "latex", "ltx", "bib", "lean", "hlean", "less", "liquid", "lisp", "ls", "logic", "lql", "lsl", "lua", "lp", "lucene", "Makefile", "GNUmakefile", "makefile", "OCamlMakefile", "make", "md", "markdown", "mask", "matlab", "mel", "mc", "mush", "mysql", "nix", "m", "mm", "ml", "mli", "pas", "p", "pl", "pm", "pgsql", "php", "phtml", "ps1", "praat", "praatscript", "psc", "proc", "plg", "prolog", "properties", "proto", "py", "r", "Rd", "Rhtml", "rb", "ru", "gemspec", "rake", "Guardfile", "Rakefile", "Gemfile", "rs", "sass", "scad", "scala", "scm", "rkt", "scss", "sh", "bash", ".bashrc", "sjs", "smarty", "tpl", "snippets", "soy", "space", "sql", "styl", "stylus", "svg", "tcl", "tex", "txt", "textile", "toml", "twig", "ts", "typescript", "str", "vala", "vbs", "vb", "vm", "v", "vh", "sv", "svh", "vhd", "vhdl", "xml", "rdf", "rss", "wsdl", "xslt", "atom", "mathml", "mml", "xul", "xbl", "xaml", "xq", "yaml", "yml", "htm", "xib", "storyboard", "plist", "csproj"],
            bindary: ["pdf", "bin", "zip", "swf", "gzip", "rar", "arj", "tar", "gz", "cab", "tbz", "tbz2", "lzh", "uue", "bz2", "ace", "exe", "so", "dll", "chm", "rtf", "odp", "odt", "pages", "class", "psd", "ttf", "fla", "7z", "dmg", "iso", "dat", "ipa"]
        },
        ico: function(e) {
            var t = G.static_path + "images/file_16/",
                a = ["folder", "file", "edit", "search", "up", "setting", "appStore", "error", "info", "mp3", "flv", "pdf", "doc", "xls", "ppt", "html", "swf"],
                i = $.inArray(e, a);
            return -1 == i ? t + "file.png" : t + e + ".png"
        },
        contextmenu: function(e) {
            try {
                rightMenu.hidden()
            } catch (t) {}
            var t = e || window.event;
            return t ? t && $(t.target).is("textarea") || $(t.target).is("input") || 0 != $(t.target).parents(".topbar").length || 0 != $(t.target).parents(".edit_body").length || 0 != $(t.target).parents(".aui_state_focus").length ? !0 : !1 : !0
        },
        pathThis: function(e) {
            e = e.replace(/\\/g, "/");
            var t = e.split("/"),
                a = t[t.length - 1];
            if ("" == a && (a = t[t.length - 2]), 0 == a.search("fileProxy")) {
                a = urlDecode(a.substr(a.search("&path=")));
                var t = a.split("/");
                a = t[t.length - 1], "" == a && (a = t[t.length - 2])
            }
            return a
        },
        pathFather: function(e) {
            e = e.replace(/\\/g, "/");
            var t = e.lastIndexOf("/");
            return e.substr(0, t + 1)
        },
        pathExt: function(e) {
            e = e.replace(/\\/g, "/"), e = e.replace(/\/+/g, "/");
            var t = e.lastIndexOf(".");
            return e = e.substr(t + 1), e.toLowerCase()
        },
        path2url: function(e) {
            if ("http" == e.substr(0, 4)) return e;
            if (e = e.replace(/\\/g, "/"), e = e.replace(/\/+/g, "/"), e = e.replace(/\/\.*\//g, "/"), G.is_root && e.substring(0, G.web_root.length) == G.web_root) return G.web_host + e.replace(G.web_root, "");
            var t = G.app_host + "/index.php?explorer/fileProxy&path=" + urlEncode(e);
            return G.share_page !== void 0 && (t = G.app_host + "/index.php?share/fileProxy&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(e)), t
        },
        authCheck: function(e, t) {
            return G.is_root ? !0 : AUTH.hasOwnProperty(e) ? AUTH[e] ? !0 : (void 0 == t && (t = LNG.no_permission), core.tips.tips(t, !1), !1) : !0
        },
        ajaxError: function(e) {
            core.tips.close(LNG.system_error, !1);
            var t = e.responseText,
                a = '<div class="ajaxError">' + t + "</div>",
                i = $.dialog.list.ajaxErrorDialog;
            return "<!--user login-->" == t.substr(0, 17) ? (FrameCall.goRefresh(), void 0) : (i ? i.content(a) : $.dialog({
                id: "ajaxErrorDialog",
                padding: 0,
                fixed: !0,
                resize: !0,
                ico: core.ico("error"),
                title: "ajax error",
                content: a
            }), void 0)
        },
        file_get: function(e, t) {
            var a = "./index.php?editor/fileGet&filename=" + urlEncode2(e);
            G.share_page !== void 0 && (a = "./index.php?share/fileGet&user=" + G.user + "&sid=" + G.sid + "&filename=" + urlEncode2(e)), $.ajax({
                url: a,
                dataType: "json",
                beforeSend: function() {
                    core.tips.loading(LNG.loading)
                },
                error: core.ajaxError,
                success: function(e) {
                    core.tips.close(LNG.success), "function" == typeof t && t(e.data.content)
                }
            })
        },
        setting: function(e) {
            void 0 == e && (e = G.is_root ? "system" : "user"), void 0 == window.top.frames.Opensetting_mode ? $.dialog.open("./index.php?setting#" + e, {
                id: "setting_mode",
                fixed: !0,
                ico: core.ico("setting"),
                resize: !0,
                title: LNG.setting,
                width: 960,
                height: 580
            }) : ($.dialog.list.setting_mode.display(!0), FrameCall.top("Opensetting_mode", "Setting.setGoto", '"' + e + '"'))
        },
        copyright: function() {
            var e = require("../tpl/copyright.html"),
                t = template.compile(e),
                a = t({
                    LNG: LNG,
                    G: G
                });
            $.dialog({
                id: "copyright_dialog",
                bottom: 0,
                right: 0,
                simple: !0,
                resize: !1,
                title: LNG.about + " kod",
                width: 425,
                padding: "0",
                fixed: !0,
                content: a
            })
        },
        appStore: function() {
            $.dialog.open("./index.php?app", {
                id: "app_store",
                fixed: !0,
                ico: core.ico("appStore"),
                resize: !0,
                title: LNG.app_store,
                width: 900,
                height: 550
            })
        },
        openIE: function(e) {
            $.dialog.open(e, {
                fixed: !0,
                resize: !0,
                title: LNG.app_store,
                width: "80%",
                height: "70%"
            })
        },
        openApp: function(app) {
            if ("url" == app.type) {
                var icon = app.icon; - 1 == app.icon.search(G.static_path) && "http" != app.icon.substring(0, 4) && (icon = G.static_path + "images/app/" + app.icon), "number" != typeof app.width && -1 == app.width.search("%") && (app.width = parseInt(app.width)), "number" != typeof app.height && -1 == app.height.search("%") && (app.height = parseInt(app.height)), $.dialog.open(app.content, {
                    title: app.name,
                    fixed: !0,
                    ico: icon,
                    resize: app.resize,
                    simple: app.simple,
                    title: app.name.replace(".oexe", ""),
                    width: app.width,
                    height: app.height
                })
            } else {
                var exec = app.content;
                eval("{" + exec + "}")
            }
        },
        update: function(e) {
            var t = base64_decode("aHR0cDovL3N0YXRpYy5rYWxjYWRkbGUuY29tL3VwZGF0ZS9tYWluLmpz") + "?a=" + UUID();
            require.async(t, function(t) {
                try {
                    t.todo(e)
                } catch (a) {}
            })
        },
        explorer: function(e, t) {
            void 0 == e && (e = ""), void 0 == t && (t = core.pathThis(e));
            var a = "./index.php?/explorer&type=iframe&path=" + e;
            G.share_page !== void 0 && (a = "./index.php?share/folder&type=iframe&user=" + G.user + "&sid=" + G.sid + "&path=" + e), $.dialog.open(a, {
                resize: !0,
                fixed: !0,
                ico: core.ico("folder"),
                title: t,
                width: 880,
                height: 550
            })
        },
        explorerCode: function(e) {
            void 0 == e && (e = "");
            var t = "index.php?/editor&project=" + e;
            G.share_page !== void 0 && (t = "./index.php?share/code_read&user=" + G.user + "&sid=" + G.sid + "&project=" + e), $.dialog.open(t, {
                resize: !0,
                fixed: !0,
                ico: core.ico("folder"),
                title: core.pathThis(e),
                width: "80%",
                height: "70%"
            })
        },
        setSkin_finished: function() {
            var e = $(".setSkin_finished").attr("src");
            e && ($("#link_css_list").attr("href", e), $(".setSkin_finished").remove())
        },
        setSkin: function(e, t) {
            var a = G.static_path + "style/skin/" + e + t;
            $("body").append('<img src="' + a + '" onload="core.setSkin_finished();" onerror="core.setSkin_finished();" class="setSkin_finished">')
        },
        editorFull: function() {
            var e = $("iframe[name=OpenopenEditor]");
            e.toggleClass("frame_fullscreen")
        },
        language: function(e) {
            Cookie.set("kod_user_language", e, 8760), window.location.reload()
        },
        tips: {
            topHeight: function() {
                return "undefined" != typeof Global && Global.topbar_height ? Global.topbar_height : 0
            },
            loading: function(e) {
                Tips.loading(e, "info", core.tips.topHeight())
            },
            close: function(e, t) {
                "object" == typeof e ? Tips.close(e.data, e.code, core.tips.topHeight()) : Tips.close(e, t, core.tips.topHeight())
            },
            tips: function(e, t) {
                "object" == typeof e ? Tips.tips(e.data, e.code, core.tips.topHeight()) : Tips.tips(e, t, core.tips.topHeight())
            }
        },
        fullScreen: function() {
            "true" == $("body").attr("fullScreen") && core.exitfullScreen(), $("body").attr("fullScreen", "true");
            var e = document.documentElement;
            e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen && e.webkitRequestFullScreen()
        },
        exitfullScreen: function() {
            $("body").attr("fullScreen", "false"), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
        },
        createFlash: function(e, t, a) {
            var i = '<object type="application/x-shockwave-flash" id="' + a + '" data="' + e + '" width="100%" height="100%">' + '<param name="movie" value="' + e + '"/>' + '<param name="allowfullscreen" value="true" />' + '<param name="allowscriptaccess" value="always" />' + '<param name="flashvars" value="' + t + '" />' + '<param name="wmode" value="transparent" />' + "</object>";
            return i
        },
        search: function(e, t) {
            var a, i, n = require("../tpl/search.html"),
                s = require("../tpl/search_list.html"),
                o = function() {
                    var s = template.compile(n);
                    0 == $(".dialog_do_search").length ? (l(), i = {
                        search: e,
                        path: t,
                        is_content: void 0,
                        is_case: void 0,
                        ext: "",
                        LNG: LNG
                    }, a = $.dialog({
                        id: "dialog_do_search",
                        padding: 0,
                        fixed: !0,
                        ico: core.ico("search"),
                        resize: !0,
                        title: LNG.search,
                        width: 450,
                        content: s(i)
                    }), c(i), $("#search_ext").tooltip({
                        placement: "bottom",
                        html: !0
                    }), $("#search_path").tooltip({
                        placement: "bottom",
                        html: !0,
                        title: function() {
                            return $("#search_path").val()
                        }
                    })) : ($("#search_value").val(e), $("#search_path").val(t), r(), $.dialog.list.dialog_do_search.display(!0))
                },
                r = function() {
                    i = {
                        search: $("#search_value").val(),
                        path: $("#search_path").val(),
                        is_content: $("#search_is_content").attr("checked"),
                        is_case: $("#search_is_case").attr("checked"),
                        ext: $("#search_ext").val()
                    }, c(i)
                },
                l = function() {
                    $("#search_value").die("keyup").live("keyup", function() {
                        ui.path.setSearchByStr($(this).val())
                    }), $("#search_value,#search_ext,#search_path").keyEnter(r), $(".search_header a.button").die("click").live("click", r), $(".search_result .list .name").die("click").live("click", function() {
                        var e = $(this).find("a").html(),
                            t = $(this).parent().find(".path a").html() + e;
                        $(this).parent().hasClass("file") ? ui.pathOpen.open(t) : "explorer" == Config.pageApp ? ui.path.list(t + "/", "tips") : core.explorer(t + "/")
                    }), $(".search_result .list .path a").die("click").live("click", function() {
                        var e = $(this).html();
                        "explorer" == Config.pageApp ? ui.path.list(e, "tips") : core.explorer(e)
                    })
                },
                c = function(e) {
                    var t = 150;
                    $("#search_value").focus(), $(".search_result .list").remove();
                    var a = $(".search_result .message td");
                    if (!e.search || !e.path) return a.hide().html(LNG.search_info).fadeIn(t), void 0;
                    if (1 >= e.search.length) return a.hide().html("too short!").fadeIn(t), void 0;
                    var i = "index.php?explorer/search";
                    G.share_page !== void 0 && (i = "index.php?share/search&user=" + G.user + "&sid=" + G.sid), $.ajax({
                        url: i,
                        dataType: "json",
                        type: "POST",
                        data: e,
                        beforeSend: function() {
                            a.hide().html(LNG.searching + '<img src="' + G.static_path + 'images/loading.gif">').fadeIn(t)
                        },
                        error: core.ajaxError,
                        success: function(e) {
                            if (!e.code) return a.hide().html(e.data).fadeIn(t), void 0;
                            if (0 == e.data.filelist.length && 0 == e.data.folderlist.length) return a.hide().html(LNG.search_null).fadeIn(t), void 0;
                            a.hide();
                            var i = template.compile(s);
                            e.data.LNG = LNG, $(i(e.data)).insertAfter(".search_result .message").fadeIn(t)
                        }
                    })
                };
            o()
        },
        server_dwonload: function(e) {
            core.upload_check("explorer:serverDownload");
            var t = $(".download_box"),
                a = t.find("#download_list"),
                i = t.find("input").val();
            if (t.find("input").val(""), !i || "http" != i.substr(0, 4)) return core.tips.tips("url false!", !1), void 0;
            var n = UUID(),
                s = '<div id="' + n + '" class="item">' + '<div class="info"><span class="title" tytle="' + i + '">' + core.pathThis(i) + "</span>" + '<span class="size">0b</span>' + '<span class="state">' + LNG.upload_ready + "</span>" + '<a class="remove font-icon icon-remove" href="javascript:void(0)"></a>' + '<div style="clear:both"></div></div></div>';
            a.find(".item").length > 0 ? $(s).insertBefore(a.find(".item:eq(0)")) : a.append(s);
            var o, r, l, c = 0,
                d = $("#" + n),
                p = $("#" + n + " .state").text(LNG.download_ready),
                u = $('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0%;text-align:right;"></div></div>').appendTo("#" + n).find(".progress-bar");
            $("#" + n + " .remove").bind("click", function() {
                $.get("./index.php?explorer/serverDownload&type=remove&uuid=" + n), $(this).parent().parent().slideUp(function() {
                    $(this).remove(), ui.f5()
                })
            }), $.ajax({
                url: "./index.php?explorer/serverDownload&type=download&save_path=" + e + "&url=" + urlEncode2(i) + "&uuid=" + n,
                dataType: "json",
                error: function(e, t, a) {
                    core.ajaxError(e, t, a), clearInterval(o), o = !1, clearTimeout(r), o = !1, u.parent().remove(), p.addClass("error").text(LNG.download_error)
                },
                success: function(e) {
                    clearInterval(o), o = !1, clearTimeout(r), o = !1, e.code ? (ui.f5_callback(function() {
                        ui.path.setSelectByFilename(e.info)
                    }), p.text(LNG.download_success), $("#" + n + " .info .title").html(e.info)) : p.addClass("error").text(LNG.error), u.parent().remove()
                }
            });
            var h = function() {
                $.ajax({
                    url: "./index.php?explorer/serverDownload&type=percent&uuid=" + n,
                    dataType: "json",
                    success: function(e) {
                        var t = "",
                            a = e.data;
                        if (o) {
                            if (!e.code) return p.text(LNG.loading), void 0;
                            if (a) {
                                if (a.size = parseFloat(a.size), a.time = parseFloat(a.time), l) {
                                    var i = (a.size - l.size) / (a.time - l.time);
                                    if (c > .2 * i) {
                                        var n = c;
                                        c = i, i = n
                                    } else c = i;
                                    t = core.file_size(i) + "/s"
                                }
                                if (0 == a.length) d.find(".progress-bar").css("width", "100%").text(LNG.loading);
                                else {
                                    var s = 100 * (a.size / a.length);
                                    d.find(".progress-bar").css("width", s + "%"), p.text(parseInt(s) + "%(" + t + ")")
                                }
                                d.find(".size").text(core.file_size(a.length)), l = a
                            }
                        }
                    }
                })
            };
            r = setTimeout(function() {
                h(), o = setInterval(function() {
                    h()
                }, 1e3)
            }, 100)
        },
        file_size: function(e) {
            if (0 == e) return "0B";
            e = parseFloat(e);
            var t = {
                GB: 1073741824,
                MB: 1048576,
                KB: 1024,
                "B ": 0
            };
            for (var a in t)
                if (e >= t[a]) return (e / t[a]).toFixed(1) + a;
            return "0B"
        },
        upload_check: function(e) {
            return void 0 == e && (e = "explorer:fileUpload"), !G.is_root && AUTH.hasOwnProperty(e) && 1 != AUTH[e] ? (core.tips.tips(LNG.no_permission, !1), void 0) : "*recycle*/" == G.this_path || "*share*/" == G.this_path || "*share*/" == G.this_path || G.json_data && "writeable" != G.json_data.path_type ? (core.tips.tips(LNG.no_permission_write, !1), !1) : !0
        },
        upload: function() {
            G.upload_path = G.this_path;
            var e = urlDecode(G.upload_path);
            if (uploader.option("server", "index.php?explorer/fileUpload&path=" + urlEncode(G.upload_path)), 30 >= e.length ? e : "..." + e.substr(e.length - 30), 0 != $(".dialog_file_upload").length) return $.dialog.list.dialog_file_upload.display(!0), void 0;
            var t = require("../tpl/upload.html"),
                a = template.compile(t),
                i = WebUploader.Base.formatSize(G.upload_max);
            $.dialog({
                padding: 5,
                resize: !0,
                ico: core.ico("up"),
                id: "dialog_file_upload",
                fixed: !0,
                title: LNG.upload_muti,
                content: a({
                    LNG: LNG,
                    maxsize: i
                }),
                close: function() {
                    $.each(uploader.getFiles(), function(e, t) {
                        uploader.skipFile(t), uploader.removeFile(t)
                    })
                }
            }), $(".file_upload .tips").tooltip({
                placement: "bottom"
            }), $(".file_upload .top_nav a.menu").unbind("click").bind("click", function() {
                $(this).hasClass("tab_upload") ? ($(".file_upload .tab_upload").addClass("this"), $(".file_upload .tab_download").removeClass("this"), $(".file_upload .upload_box").removeClass("hidden"), $(".file_upload .download_box").addClass("hidden")) : ($(".file_upload .tab_upload").removeClass("this"), $(".file_upload .tab_download").addClass("this"), $(".file_upload .upload_box").addClass("hidden"), $(".file_upload .download_box").removeClass("hidden"))
            }), $(".file_upload .download_box button").unbind("click").bind("click", function() {
                core.server_dwonload(G.upload_path)
            }), uploader.addButton({
                id: "#picker"
            })
        },
        upload_init: function() {
            var e = "#thelist",
                t = !0;
            $.browser.msie && (t = !1);
            var a = 10485760;
            a >= G.upload_max && (a = .8 * G.upload_max), uploader = WebUploader.create({
                swf: G.static_path + "js/lib/webuploader/Uploader.swf",
                dnd: "body",
                threads: 2,
                compress: !1,
                resize: !1,
                prepareNextFile: !0,
                duplicate: !0,
                chunked: t,
                chunkRetry: 3,
                chunkSize: a
            }), $("#uploader .success").die("click").live("click", function() {
                var e = $(this).find("span.title").attr("title");
                "explorer" == Config.pageApp ? ui.path.list(core.pathFather(e), "tips", function() {
                    ui.path.setSelectByFilename(core.pathThis(e))
                }) : core.explorer(core.pathFather(e))
            }), $("#uploader .open").die("click").live("click", function(e) {
                var t = $(this).find("span.title").attr("title");
                ui.pathOpen.open(t), stopPP(e)
            }), $(".upload_box_clear").die("click").live("click", function() {
                $("#thelist .success,#thelist .error").each(function() {
                    $(this).slideUp(300, function() {
                        $(this).remove()
                    })
                })
            }), $(".upload_box_setting").die("click").live("click", function() {
                $(".upload_box_config").toggleClass("hidden")
            }), $("#uploader .remove").die("click").live("click", function(e) {
                var t = $(this).parent().parent().attr("id");
                uploader.skipFile(t), uploader.removeFile(t, !0), $(this).parent().parent().slideUp(function() {
                    $(this).remove()
                }), stopPP(e)
            });
            var i = 0,
                n = 0,
                s = "0B/s",
                o = function(e, t) {
                    var a = e.size * t,
                        i = 3;
                    e.speed === void 0 ? e.speed = [
                        [time() - 500, 0],
                        [time(), a]
                    ] : i >= e.speed.length ? e.speed.push([time(), a]) : (e.speed = e.speed.slice(1, i), e.speed.push([time(), a]));
                    var n = e.speed[e.speed.length - 1],
                        o = e.speed[0],
                        r = (n[1] - o[1]) / ((n[0] - o[0]) / 1e3);
                    return r = core.file_size(r) + "/s", s = r, r
                },
                r = [];
            uploader.on("uploadBeforeSend", function(e, t) {
                var a = urlEncode(e.file.fullPath);
                (void 0 == a || "undefined" == a) && (a = ""), t.fullPath = a
            }).on("fileQueued", function(t) {
                if (!core.upload_check()) return uploader.skipFile(t), uploader.removeFile(t), void 0;
                var a, n = $(e),
                    a = t.fullPath;
                t.finished = !1, (void 0 == a || "undefined" == a) && (a = t.name), i++, $(e).find(".item").length > 0 && (n = $(e).find(".item:eq(0)"));
                var s = '<div id="' + t.id + '" class="item"><div class="info">' + '<span class="title" title="' + G.upload_path + a + '">' + core.pathThis(a) + "</span>" + '<span class="size">' + core.file_size(t.size) + "</span>" + '<span class="state">' + LNG.upload_ready + "</span>" + '<a class="remove font-icon icon-remove" href="javascript:void(0)"></a>' + '<div style="clear:both"></div></div></div>';
                $(e).find(".item").length > 0 ? $(s).insertBefore($(e).find(".item:eq(0)")) : $(e).append(s), uploader.upload()
            }).on("uploadProgress", function(e, t) {
                $(".dialog_file_upload .aui_title").text(LNG.uploading + ": " + n + "/" + i + " (" + s + ")");
                var a = o(e, t),
                    r = $("#" + e.id),
                    l = r.find(".progress .progress-bar");
                l.length || (l = $('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0%"></div></div>').appendTo(r).find(".progress-bar")), r.find(".state").text(parseInt(100 * t) + "%(" + a + ")"), l.css("width", 100 * t + "%")
            }).on("uploadAccept", function(e, t) {
                e.file.serverData = t;
                try {
                    r.push(core.pathThis(t.info))
                } catch (a) {}
            }).on("uploadSuccess", function(e) {
                var t = 36 * $("#" + e.id).index(".item");
                $("#uploader").scrollTop(t), n++;
                var a = e.serverData;
                if (a.code ? ($("#" + e.id).addClass("success"), $("#" + e.id).find(".state").text(a.data), $("#" + e.id).find(".remove").removeClass("icon-remove").addClass("icon-ok").addClass("open").removeClass("remove")) : ($("#" + e.id).find(".state").addClass("error"), $("#" + e.id).find(".state").text(a.data).attr("title", a.data)), uploader.removeFile(e), $("#" + e.id).find(".progress").fadeOut(), !e.fullPath) {
                    var i = r;
                    ui.f5_callback(function() {
                        ui.path.setSelectByFilename(i)
                    })
                }
            }).on("uploadError", function(e, t) {
                n++, $("#" + e.id).find(".progress").fadeOut(), $("#" + e.id).find(".state").addClass("error"), $("#" + e.id).find(".state").text(LNG.upload_error + "(" + t + ")")
            }).on("uploadFinished", function() {
                $(".dialog_file_upload .aui_title").text(LNG.upload_success + ": " + n + "/" + i), i = 0, n = 0, uploader.reset(), "explorer" == Config.pageApp && ui.tree.checkIfChange(G.this_path);
                var e = r;
                ui.f5_callback(function() {
                    ui.path.setSelectByFilename(e), r = []
                })
            }).on("error", function(e) {
                core.tips.tips(e, !1)
            });
            var l;
            inState = !1, dragOver = function() {
                0 == inState && (inState = !0, MaskView.tips(LNG.upload_drag_tips)), l && window.clearTimeout(l)
            }, dragLeave = function(e) {
                stopPP(e), l && window.clearTimeout(l), l = window.setTimeout(function() {
                    inState = !1, MaskView.close()
                }, 100)
            }, dragDrop = function(e) {
                try {
                    if (e = e.originalEvent || e, core.upload_check()) {
                        var t = e.dataTransfer.getData("text/plain");
                        t && "http" == t.substring(0, 4) ? ui.pathOperate.appAddURL(t) : core.upload()
                    }
                    stopPP(e)
                } catch (e) {}
                inState && (inState = !1, MaskView.close())
            }
        }
    }
}), define("app/tpl/copyright.html", [], '<div class="copyright_dialog_content">\n	<div class="title">\n		<div class="logo"><i class="icon-cloud"></i>KodExplorer v{{G.version}}</div>\n		<div class=\'info\'>——{{LNG.kod_name_copyright}}</div>\n	</div>\n	<div class="content">\n		<p>{{#LNG.copyright_desc}}</p>\n		<div>{{#LNG.copyright_contact}}</div>\n		<div>{{#LNG.copyright_info}}</div> \n	</div>\n</div>'), define("app/tpl/search.html", [], "<div class='do_search'>\n    <div class='search_header'>\n       <div class='s_br'>\n            <input type='text' id='search_value' value='{{search}}'/><a class='right button icon-search'></a>\n            <div style='float:right'>{{LNG.path}}:<input type='text' id='search_path' value='{{path}}'/></div>\n        </div>\n       <div class='s_br'>\n            <input type='checkbox' id='search_is_case' {{if is_case}}checked='true'{{/if}}/>\n            <label for='search_is_case'>{{LNG.search_uplow}}</label>\n            <input type='checkbox' id='search_is_content' {{if is_content}}checked='true'{{/if}}/>\n            <label for='search_is_content'>{{LNG.search_content}}</label>\n            <div style='float:right'>{{LNG.file_type}}:<input type='text' id='search_ext' value='{{ext}}' title='{{LNG.search_ext_tips}}'/></div>\n        </div>\n    </div>\n    <div class='search_result'>\n        <table border='0' cellspacing='0' cellpadding='0'>\n            <tr class='search_title'>\n               <td class='name'>{{LNG.name}}</td>\n               <td class='type'>{{LNG.type}}</td>\n               <td class='size'>{{LNG.size}}</td>\n               <td class='path'>{{LNG.path}}</td>\n            </tr>\n            <tr class='message'><td colspan='4'></td></tr>\n        </table>\n    </div>\n</div>\n\n"), define("app/tpl/search_list.html", [], "{{each folderlist as v i}}\n    <tr class='list folder' data-path='{{v.path}}{{v.name}}' data-type='folder' data-size='0'>\n        <td class='name'><a href='javascript:void(0);' title='{{LNG.open}}{{v.name}}'>{{v.name}}</a></td>\n        <td class='type'>{{LNG.folder}}</td>\n        <td class='size'>0</td>\n        <td class='path'><a href='javascript:void(0);' title='{{LNG.goto}}{{v.path}}'>{{v.path}}</a></td>\n    </tr>\n{{/each}}\n{{each filelist as v i}}\n<tr class='list file'\n    data-path='{{v.path}}{{v.name}}' \n    data-type='{{v.ext}}' \n    data-size='{{v.size}}'>\n    <td class='name'><a href='javascript:void(0);' title='{{LNG.open}}{{v.name}}'>{{v.name}}</a></td>\n    <td class='type'>{{v.ext}}</td>\n    <td class='size'>{{v.size_friendly}}</td>\n    <td class='path'><a href='javascript:void(0);' title='{{LNG.goto}}{{v.path}}'>{{v.path}}</a></td>\n</tr>\n{{/each}}"), define("app/tpl/upload.html", [], "<div class='file_upload'>\n    <div class='top_nav'>\n       <a href='javascript:void(0);' class='menu this tab_upload'>{{LNG.upload_local}}</a>\n       <a href='javascript:void(0);' class='menu tab_download''>{{LNG.download_from_server}}</a>\n       <div style='clear:both'></div>\n    </div>\n    <div class='upload_box'>\n        <div class='btns'>\n            <div id='picker'>{{LNG.upload_select}}</div>\n            <div class=\"upload_box_tips\">\n            <a href=\"javascript:void(0);\" class=\"upload_box_clear\">{{LNG.upload_clear}}</a> \n            <!-- \n            | <a href=\"javascript:void(0);\" class=\"upload_box_setting\">\n            {{LNG.upload_setting}}<b class=\"caret\"></b></a> \n            -->\n            </div>\n            <div style='clear:both'></div>\n        </div>\n\n        <div class=\"upload_box_config hidden\">\n            <i>{{LNG.upload_tips}}</i>\n            <div class=\"upload_check_box\">\n                <b>{{LNG.upload_exist}}</b>\n                <label><input type=\"radio\" name=\"existing\" value=\"rename\" checked=\"checked\">{{LNG.upload_exist_rename}}</label>\n                <label><input type=\"radio\" name=\"existing\" value=\"replace\">{{LNG.upload_exist_replace}}</label>\n                <label><input type=\"radio\" name=\"existing\" value=\"skip\">{{LNG.upload_exist_skip}}</label>\n            </div>\n        </div>\n        <div id='uploader' class='wu-example'>\n            <div id='thelist' class='uploader-list'></div>\n        </div>\n    </div>\n    <div class='download_box hidden'>\n        <div class='list'>{{LNG.download_address}}<input type='text' name='url'/>\n        <button class='btn btn-default btn-sm' type='button'>{{LNG.download}}</button>\n        </div>\n        <div style='clear:both'></div>\n        <div id='downloader'>\n            <div id='download_list' class='uploader-list'></div>\n        </div>\n    </div>\n</div>");
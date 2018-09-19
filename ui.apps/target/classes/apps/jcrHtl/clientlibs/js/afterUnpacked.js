<script>
;(function(win,doc,callback){'use strict';callback=callback||function(){};function detach(){if(doc.addEventListener){doc.removeEventListener('DOMContentLoaded',completed);}else{doc.detachEvent('onreadystatechange',completed);}}function completed(){if(doc.addEventListener||event.type==='load'||doc.readyState==='complete'){detach();callback(window,window.jQuery);}}function init(){if (doc.addEventListener){doc.addEventListener('DOMContentLoaded',completed);}else{doc.attachEvent('onreadystatechange',completed);}}init();})(window,document,function(win,$){
	   var _ymp = _ymp || [];
   (function() {
      var yda   = document.createElement('script');
      yda.type  = 'text/javascript';
      yda.async = true;
      yda.src = ('https:' == document.location.protocol ? 'https://databank.yoyi.com.cn' : 'http://databank.yoyi.com.cn')
              + '/s.js?MzI2MTEzMDaMNwBCw3hDMyOzJPM0c8tEIwA%3D';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(yda, s);
   })();

});
</script>

<script>
;(function(win,doc,callback){'use strict';callback=callback||function(){};function detach(){if(doc.addEventListener){doc.removeEventListener('DOMContentLoaded',completed);}else{doc.detachEvent('onreadystatechange',completed);}}function completed(){if(doc.addEventListener||event.type==='load'||doc.readyState==='complete'){detach();callback(window,window.jQuery);}}function init(){if (doc.addEventListener){doc.addEventListener('DOMContentLoaded',completed);}else{doc.attachEvent('onreadystatechange',completed);}}init();})(window,document,function(win,$){
	
  var uid = (+new Date()).toString() + Math.floor(Math.random()*111111);
  var cookiename = "sitemaster";
  var _smq = _smq || [];

  var cookievalue = get_cookie(cookiename);
    if (cookievalue == void 0 || cookievalue == null){
      set_cookie(cookiename, uid, 10000);
    }
    else{
      uid = cookievalue;
    }
    var pagelabel = " DC_mainpage ";
    eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('(4(e){4 l(a,b,c){i d,3,g,5,j;3=[];k(!a){2 3}A(d=5=0,j=a.9;5<j;d=++5){g=a[d];3[3.9]=b.n(c,g,d,a)}2 3};4 h(a,b){i c=\'\';l(a,4(x){k(x[0]===b){2 c=x[1]}});2 c};i f,8,7,q,o,6;k(!e){2{}}f=(r s(\'#.*$\')).t(e);8=u.v.w.n(f)===\'[y p]\'?f[0]:\'\';6=e.z(8,\'\').m(\'?\');o=6.B();q=6.C(\'?\')||"";7=q.9>0?l(q.m(\'&\'),4(x){2 x.m(\'=\')}):[];D=h(7,\'E\');F=h(7,\'G\')})(H.I);', 45, 45, '||return|results|function|_i|urlArr|params|hash|length|||||||value|findParam|var|_len|if|customMap|split|call|uri|Array||new|RegExp|exec|Object|prototype|toString||object|replace|for|shift|join|adm_idfa|idfa|adm_imei|imei|location|href'.split('|'), 0, {}))

  _smq.push(['_setAccount', '42b0723', new Date()]);
  _smq.push(['_setDomainName', 'samsung.com']);
  _smq.push(['_setCustomVar', 4, uid, 3]);
  _smq.push(['_setCustomVar', 5, pagelabel, 3]);
  _smq.push(['_setCustomVar', 2, adm_imei, 1]);
  _smq.push(['_setCustomVar', 3, adm_idfa, 1]);
  _smq.push(['pageview']);

  window._smq=_smq;
  (function() {
    var sm = document.createElement('script'); sm.type = 'text/javascript'; sm.async = true;
    sm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'site.cdnmaster.cn/sitemaster/collect.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sm, s);
    
  })();


  function set_cookie(name, value, exp_days) {
      if (exp_days == 0) {
          document.cookie = name + "=" + escape(value) + "; domain=samsung.com; path=/"
      } else {
          var exp = new Date();
          exp.setTime(exp.getTime() + exp_days * 24 * 60 * 60 * 1000);
          document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; domain=samsung.com; path=/";
      }
  }

  function get_cookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
  }

  function del_cookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }

});
</script>
  <!--[if lte IE 9]> 
		<script type='text/javascript' src='//cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.3/jquery.xdomainrequest.min.js'></script> 
		<![endif]-->
         
        <script type="text/javascript">
    	    _satellite.pageBottom();
    	</script>

        <script>
		function thatxx(){
            console.log("1111");
        }
         </script>
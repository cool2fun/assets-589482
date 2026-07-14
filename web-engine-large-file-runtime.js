(function(){
  var files=[{"path":"index.pck","rawPath":"index.pck","size":33673584}];
  var rawBase="https://raw.githubusercontent.com/cool2fun/assets-589482/main/";
  function rewrite(input){
    if(rawBase.indexOf("{{")===0)return "";
    var value=typeof input==="string"?input:(input&&input.url);
    if(!value)return "";
    var url;
    try{url=new URL(value,document.baseURI)}catch(_){return ""}
    var pathname;
    try{pathname=decodeURIComponent(url.pathname)}catch(_){pathname=url.pathname}
    for(var i=0;i<files.length;i++){
      var key="/"+files[i].path;
      if(pathname.slice(-key.length)===key)return rawBase+files[i].rawPath;
    }
    return "";
  }
  if(typeof XMLHttpRequest!=="undefined"){
    var nativeOpen=XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open=function(method,url){
      var replacement=rewrite(url);
      var args=Array.prototype.slice.call(arguments);
      if(replacement)args[1]=replacement;
      return nativeOpen.apply(this,args);
    };
  }
  if(typeof fetch==="function"){
    var nativeFetch=fetch.bind(window);
    window.fetch=function(input,init){
      var replacement=rewrite(input);
      if(!replacement)return nativeFetch(input,init);
      if(typeof Request!=="undefined"&&input instanceof Request){
        return nativeFetch(new Request(replacement,input),init);
      }
      return nativeFetch(replacement,init);
    };
  }
  window.__webEngineLargeFiles={files:files,rewrite:rewrite};
})();

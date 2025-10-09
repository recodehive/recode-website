console.log("✅ pinterest-init.js loaded");
!(function (e) {
  if (!window.pintrk) {
    window.pintrk = function () {
      window.pintrk.queue.push(Array.prototype.slice.call(arguments));
    };
    var n = window.pintrk;
    ((n.queue = []), (n.version = "3.0"));
    var t = document.createElement("script");
    t.async = !0;
    t.src = e;
    var r = document.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(t, r);
  }
})("https://s.pinimg.com/ct/core.js");

pintrk("load", "2613717138491", {
  em: "b58906c504c5638798eb06151e6f49af1b0e4c6c3b5d4f30d9c2268dbe6f9d60", // example hashed email
});
pintrk("page");

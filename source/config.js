var CONFIG = (function() {
     var private = {
         "LIST_FIELDS":["School Name","Campus/Site Name"],
         "INFO_FIELDS":["School Name","Campus/Site Name"]
     };

     return {
        get: function(name) { return private[name]; }
    };
})();

/**
 *  They should add this to Rico, and easy way to wrap an element.  Sometimes
 *  you have to work with crap HTML, and you have to add stuff like div wrappers.
 */
Rico.Effect.Wrap = Class.create();
Rico.Effect.Wrap.prototype = {
   initialize: function(tagName, className, wrapper) {
      var elements = document.getElementsByTagAndClassName(tagName,className);
      for ( var i = 0 ; i < elements.length ; i++ ) {
         e = elements[i];
         new Insertion.Before(e, wrapper);
         wrapperElement = e.previousSibling;
	 while( wrapperElement.hasChildNodes() ) {
            wrapperElement = wrapperElement.firstChild;
         }
         wrapperElement.appendChild(e);
      }
   }
};


window.onload=function(){
   // Style the site with some JS
   
   new Rico.Effect.Wrap('table', 'warningMacro', "<div class='warning'></div>")
   new Rico.Effect.Round('div', 'warning' );

}
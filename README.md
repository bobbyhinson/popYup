# popYup


PopYup.js is a lightweight, simple to use modal jQuery plugin that weighs in at just over 4kb when minified.

It's a complete solution that requires no additional stylesheet or other external files to use (other than jQuery, of course).

One of the primary goals when creating popYup.js was to provide for a very "mobile-friendly" modal solution. No other plugin I'd found or used seemed to work well in a responsive/mobile scenario (though I'm sure they're out there). And most required a lot of customization and tweaking to keep from failing the user on smaller screens. PopYup.js is built around a definable mobile breakpoint, which – through simple CSS – optimizes the user experience when viewed on any screen size.

popYup.js works with all the usual suspects; iframes, images, ajax, DOM elements and inline content. 



**************************

How to use popYup.js

**************************

Usage is as simple as including a (local) link to popYup.js (which follows the jQuery library link in your code) and marking-up the modal link(s) with the appropriate class and relationship.


A popYup.js modal is triggered by a link that typically includes three attributes; class, href and rel.

Any element that includes the class "popYup-open" will function as a trigger for a modal. Of course, other classes can be applied to the trigger, but this one must be present to activate the modal.

The href defines the source of the modal content. This allows for a simple fallback. If there's any errors with the scripting, you'll still be able to get to the link.

The rel attribute defines how popYup.js will treat the source content. The options for rel are as follows:


"local" 
------------
Used for an element (div or other) that's on the same page as the link. Requires the addition of a target element on the page which must include the "popYup" class. The href of the link is the id of the target.

Example:
```
<a href="#myTarget" class="popYup-open" rel="local">My Local Modal Link</a>

<div id="myTarget" class="popYup">My modal content</div>
```

"image" 
------------
Used to open a linked image in a modal.

Example:
```
<a href="images/myImage.jpg" class="popYup-open" rel="image">My Modal Image</a>
```

"iframe" 
------------
Used to open an external page or website in a modal iframe.

Example:
```
<a href="http://www.mywebsite.com" class="popYup-open" rel="iframe">My iframe Link</a>
```

"inline" 
------------
Used to open modal content from within the link tag.

Example:
```
<a href="#" class="popYup-open" rel="inline" content="Hello World!">My inline Link</a>
```
Note that inline modals add the "content" attribute, which serves as the source of the modal content.


"ajax" 
------------
Used to open an ajax object in a modal.

Example:
```
<a href="#" class="popYup-open" rel="ajax">My ajax link</a>
```

Ajax is a special case that requires a little additional work. To use ajax with popYup.js, you'll add the following function in an external script:

```
function popYupAjax(){

	// Put your ajax code here.

	$('#pyAjax').show();killLoader();
}
```

As you'll notice, the href in the trigger link example is simply "#". You can put whatever link you want for the href to serve as a fallback and popYup.js will ignore it if the relationship is "ajax". (The same holds true for inline links, as well.) 



**************************

Options

**************************

With the above markup, you can use popYup.js as is. But there are several ways you can customize the look and functionality. Just add '$.popYupOptions = {};' to an external script and inside the curly brackets, include the options and values you'd like to use.

Below is a complete list of the available options, their default values and a brief explanation of what each does.

```
$.popYupOptions = {
	loader: 'LOADING...',	// Used for the loader. HTML is ok. Want to "disable" loader? Set value to ''.
	breakpoint: '480px',    // The point where the responsive/mobile styles will engage.
	showX: true,		// If true, will show a close "button" at the top right corner of the modal.
	xText: 'x',	        // Used for the close button. HTML is ok.
	xBG: '#ccc',           	// Background color for the close button.
	xColor: '#fff',		// Text and border color for the close button.
	xShift:'-10px',		// Position offset of close button, relative to top right corner, when not under mobile breakpoint.
	borderColor: '#ccc',	// Border color for the modal.
	bgColor: '#fff',	// Background color for the modal.
	fromTop: 50,        	// vertical offset of the modal (as a percentage), from the top of the window. a value of 50 will vertically center the modal.
	fixedW: '600px',	// Maximum width of modal (except for rel=image) when not under breakpoint.
	maxH: '75vh',		// Maximum height of modal (except for rel=image) when not under breakpoint.
	iframeH: '400px',	// height of iframe modals when not under breakpoint.
	overlayClose: false,	// If true, clicking overlay will close the modal.
	overlayColor: '#fff',	// Color of overlay.
	overlayAlpha: 0.9	// Opacity value of overlay.
};	
```

Here's an example of some customized settings:

```
<script>
$.popYupOptions = {
	xText: '!',
	xBG: '#fff',
	xColor: '#000',
	overlayClose: true,
	overlayColor: '#000',
	overlayAlpha: 0.4
};
</script>
```



**************************

Other Stuff

**************************


popYup.js has been tested in Chrome (MacOS, Windows & iOS), Firefox (MacOS & Windows),Safari (MacOS & iOS) and Internet Explorer 9+ (Windows)

------------

Created by Bobby Hinson (github.com/bobbyhinson)

This work is distributed under the GNU General Public License, version 3 (GPL-3.0).




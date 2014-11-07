/**
 * hoverStop - Disables pointer-events on scroll
 *
 * Based on examples by Paul Lewis via html5rocks
 * http://www.html5rocks.com/en/tutorials/speed/unnecessary-paints/
 *
 * and Ryan Sheddon @ thecssninja.com
 * http://www.thecssninja.com/javascript/pointer-events-60fps
 *
 * 
 */

;( function( $, window, undefined ) {

	$.AChoverStop = function ( options, elements) {
		this.$el = $( elements );
		this._init ( options );
	};

	$.AChoverStop.defaults = {
		delay: 1000
	};

	$.AChoverStop.prototype = {
		_init: function ( options ) {

			this.options = $.extend( true, {}, $.AChoverStop.defaults, options );

			this._config();

			this._initEvents();
		},

		_config : function () {
			
			this.delay = this.options.delay;
			this.element = this.$el[0];
			console.log(this.element);
			this.timer = 0;
		},

		_initEvents : function () {
			var self = this;
			window.addEventListener('scroll', function() {
				clearTimeout(self.timer);
				self._disablePointerEvents();

				// enable after 1 second ( default ), choose your own value here!
				self.timer = setTimeout($.proxy( self._enablePointerEvents, self) , self.delay);
			}, false);
		},
		_disablePointerEvents : function () {
			this.element.style.pointerEvents = "none";
		},
		_enablePointerEvents : function () {
			this.element.style.pointerEvents = "auto";
		}

	};

	// So we can log errors
	var logError = function ( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.hoverStop = function ( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call (arguments, 1 );
			this.each( function () {
				if ( !instance ) {
					logError ( "Cannot call methods on hoverStop prior to initialization" );
					return;
				}
				if ( !$.isFunction( instance[ options ]) || options.charAt(0) === "_" ) {
					logError ("no such methods '" + options + "' for hoverStop instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		}
		else {
			this.each( function() {
				var instance = $.data( this, 'hoverStop' );
				if ( instance ){
					instance.init();
				}
				else {
					instance = $.data( this, 'hoverStop', new $.AChoverStop( options, this) );
				}
			});
		}

		return this;
	};
	$('body').hoverStop( {delay: 300});

} )( jQuery, window );


;(function(){
    var $ = window.jQuery,
        $win = $(window),
        $doc = $(document),
        $body;

    // Can I use inline svg ?
    var svgNS = 'http://www.w3.org/2000/svg',
        svgSupported = 'SVGAngle' in window && (function(){
            var supported,
                el = document.createElement('div');
            el.innerHTML = '<svg/>';
            supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
            el.innerHTML = '';
            return supported;
        })();

    // Can I use transition ?
    var transitionSupported = (function(){
        var style = document.createElement('div').style;
        return 'transition' in style ||
            'WebkitTransition' in style ||
            'MozTransition' in style ||
            'msTransition' in style ||
            'OTransition' in style;
    })();

    var min;
    var frangesMin;
    var total;


    // Listen touch events in touch screen device, instead of mouse events in desktop.
    var touchSupported = 'ontouchstart' in window,
        mousedownEvent = 'mousedown' + ( touchSupported ? ' touchstart' : ''),
        mousemoveEvent = 'mousemove.clockpicker' + ( touchSupported ? ' touchmove.clockpicker' : ''),
        mouseupEvent = 'mouseup.clockpicker' + ( touchSupported ? ' touchend.clockpicker' : '');

    // Vibrate the device if supported
    var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

    function createSvgElement(name) {
        return document.createElementNS(svgNS, name);
    }

    // Get a unique id
    var idCounter = 0;
    function uniqueId(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    }

    // Clock size
    var dialRadius = 100,
        outerRadius = 80,
        tickRadius = 13,
        diameter = dialRadius * 2,
        duration = transitionSupported ? 350 : 1;

    // rellotge template
    var tpl = [
        '<div class="rellotge clockpicker-rellotge">',
        '<div class="rellotge-title">',
        '<span class="clockpicker-span-minuts text-primary"></span> Minuts',
        '</div>',
        '<div class="rellotge-content">',
        '<div class="clockpicker-plate">',
        '<div class="clockpicker-canvas"></div>',
        '<div class="clockpicker-dial clockpicker-minuts"></div>',
        '<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>',
        '</div>',

        '</div>',
        '</div>'
    ].join('');

    // ClockPicker
    function ClockPicker(element, options) {
        var rellotge = $(tpl),
            plate = rellotge.find('.clockpicker-plate'),
            minutsView = rellotge.find('.clockpicker-minuts'),
            input = element,
            self = this,
            timer;
        this.id = uniqueId('cp');
        this.element = element;
        this.options = options;
        this.currentView = 'minuts';
        this.input = input;
        this.rellotge = rellotge;
        this.plate = plate;
        this.minutsView = minutsView;
        this.spanminuts = rellotge.find('.clockpicker-span-minuts');

        minuts = this.options.minuts;
        frangesMin = this.options.franges;
        total = minuts / frangesMin;


        rellotge.addClass('clockpicker-align-' + options.align);

        this.spanminuts.click($.proxy(this.toggleView, this, 'minuts'));


        // Build ticks
        var tickTpl = $('<div class="clockpicker-tick"></div>'),
            i, tick, radian, radius;
        // minuts view
        for (i = 1; i <= total; i += 1) {
            tick = tickTpl.clone();
            radian = i / (total/2) * Math.PI;
            radius = outerRadius;
            tick.css('font-size', '120%');
            tick.css({
                left: dialRadius + Math.sin(radian) * radius - tickRadius,
                top: dialRadius - Math.cos(radian) * radius - tickRadius
            });
            tick.html(i === 0 ? '00' : i * frangesMin);
            minutsView.append(tick);
            tick.on(mousedownEvent, mousedown);
        }


        // Clicking on minutes view space
        plate.on(mousedownEvent, function(e){
            if ($(e.target).closest('.clockpicker-tick').length === 0) {
                mousedown(e, true);
            }
        });

        // Mousedown or touchstart
        function mousedown(e, space) {
            var offset = plate.offset(),
                isTouch = /^touch/.test(e.type),
                x0 = offset.left + dialRadius,
                y0 = offset.top + dialRadius,
                dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
                z = Math.sqrt(dx * dx + dy * dy),
                moved = false;

            // When clicking on minutes view space, check the mouse position
            if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
                return;
            }
            e.preventDefault();

            // Set cursor style of body after 200ms
            var movingTimer = setTimeout(function(){
                $body.addClass('clockpicker-moving');
            }, 200);

            // Place the canvas to top
            if (svgSupported) {
                plate.append(self.canvas);
            }

            // Clock
            self.setHand(dx, dy, ! space, true);

            // Mousemove on document
            $doc.off(mousemoveEvent).on(mousemoveEvent, function(e){
                e.preventDefault();
                var isTouch = /^touch/.test(e.type),
                    x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                    y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
                if (! moved && x === dx && y === dy) {
                    // Clicking in chrome on windows will trigger a mousemove event
                    return;
                }
                moved = true;
                self.setHand(x, y, false, true);
            });

            // Mouseup on document
            $doc.off(mouseupEvent).on(mouseupEvent, function(e){
                $doc.off(mouseupEvent);
                e.preventDefault();
                var isTouch = /^touch/.test(e.type),
                    x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
                    y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
                if ((space || moved) && x === dx && y === dy) {
                    self.setHand(x, y);
                }
                setTimeout(function(){
                    self.done();
                }, duration / 2);
                plate.prepend(canvas);

                // Reset cursor style of body
                clearTimeout(movingTimer);
                $body.removeClass('clockpicker-moving');

                // Unbind mousemove event
                $doc.off(mousemoveEvent);
            });
        }

        if (svgSupported) {
            // Draw clock hands and others
            var canvas = rellotge.find('.clockpicker-canvas'),
                svg = createSvgElement('svg');
            svg.setAttribute('class', 'clockpicker-svg');
            svg.setAttribute('width', diameter);
            svg.setAttribute('height', diameter);
            var g = createSvgElement('g');
            g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
            var bearing = createSvgElement('circle');
            bearing.setAttribute('class', 'clockpicker-canvas-bearing');
            bearing.setAttribute('cx', 0);
            bearing.setAttribute('cy', 0);
            bearing.setAttribute('r', 2);
            var hand = createSvgElement('line');
            hand.setAttribute('x1', 0);
            hand.setAttribute('y1', 0);
            var bg = createSvgElement('circle');
            bg.setAttribute('class', 'clockpicker-canvas-bg');
            bg.setAttribute('r', tickRadius);
            var fg = createSvgElement('circle');
            fg.setAttribute('class', 'clockpicker-canvas-fg');
            fg.setAttribute('r', 3.5);
            g.appendChild(hand);
            g.appendChild(bg);
            g.appendChild(fg);
            g.appendChild(bearing);
            svg.appendChild(g);
            canvas.append(svg);

            this.hand = hand;
            this.bg = bg;
            this.fg = fg;
            this.bearing = bearing;
            this.g = g;
            this.canvas = canvas;
        }

        raiseCallback(this.options.init);




        var self = this;

        // Initialize
        $body = $('body');
        console.log($body);
        console.log(this.rellotge);
        $body.append(this.rellotge);

        // Get the time
        var value = 5;
        this.minuts = value / frangesMin;
        this.spanminuts.html(leadingZero(this.minuts * frangesMin));

        // Toggle to minuts view
        this.toggleView('minuts');

        // Set position
        this.locate();

        this.isShown = true;

    }
    function leadingZero(num) {
        if (num === 0) {
            num = minuts;
        }
        return (num < 10 ? '0' : '') + num;
    }

    function raiseCallback(callbackFunction) {
        if (callbackFunction && typeof callbackFunction === "function") {
            callbackFunction();
        }
    }

    // Default options
    ClockPicker.DEFAULTS = {
        'default': '',       // default time, 'now' or '13:14' e.g.
        fromnow: 0,          // set default time to * milliseconds from now (using with default = 'now')
        align: 'left',       // rellotge arrow align
        donetext: '完成'    // done button text
    };

    // Show or hide rellotge
    ClockPicker.prototype.toggle = function(){
        this[this.isShown ? 'hide' : 'show']();
    };

    // Set rellotge position
    ClockPicker.prototype.locate = function(){
        var element = this.element,
            rellotge = this.rellotge,
            offset = element.offset(),
            width = element.outerWidth(),
            height = element.outerHeight(),
            align = this.options.align,
            styles = {},
            self = this;

        rellotge.show();
    };


    // Toggle to minuts or minutes view
    ClockPicker.prototype.toggleView = function(view, delay){
        this.resetClock(delay);
    };

    // Reset clock hand
    ClockPicker.prototype.resetClock = function(delay){
        var view = this.currentView,
            value = this[view],
            unit = Math.PI / (total/2),
            radian = value * unit,
            radius = outerRadius,
            x = Math.sin(radian) * radius,
            y = - Math.cos(radian) * radius,
            self = this;
        if (svgSupported && delay) {
            self.canvas.addClass('clockpicker-canvas-out');
            setTimeout(function(){
                self.canvas.removeClass('clockpicker-canvas-out');
                self.setHand(x, y);
            }, delay);
        } else {
            this.setHand(x, y);
        }
    };

    // Set clock hand to (x, y)
    ClockPicker.prototype.setHand = function(x, y, roundBy5, dragging){
        var radian = Math.atan2(x, - y),
            unit = Math.PI / (total/2),
            z = Math.sqrt(x * x + y * y),
            options = this.options,
            radius = outerRadius;

        // Radian should in range [0, 2PI]
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }

        // Get the round value
        value = Math.round(radian / unit);


        // Get the round radian
        radian = value * unit;


        // Once minuts or minutes changed, vibrate the device
        if (this[this.currentView] !== value) {
            if (vibrate) {
                // Do not vibrate too frequently
                if (! this.vibrateTimer) {
                    navigator[vibrate](10);
                    this.vibrateTimer = setTimeout($.proxy(function(){
                        this.vibrateTimer = null;
                    }, this), 100);
                }
            }
        }

        this[this.currentView] = value;



        // Place clock hand at the top when dragging
        if (dragging || (value % 5)) {
            this.g.insertBefore(this.hand, this.bearing);
            this.g.insertBefore(this.bg, this.fg);
            this.bg.setAttribute('class', 'clockpicker-canvas-bg clockpicker-canvas-bg-trans');
        } else {
            // Or place it at the bottom
            this.g.insertBefore(this.hand, this.bg);
            this.g.insertBefore(this.fg, this.bg);
            this.bg.setAttribute('class', 'clockpicker-canvas-bg');
        }

        // Set clock hand and others' position
        var cx = Math.sin(radian) * radius,
            cy = - Math.cos(radian) * radius;
        this.hand.setAttribute('x2', cx);
        this.hand.setAttribute('y2', cy);
        this.bg.setAttribute('cx', cx);
        this.bg.setAttribute('cy', cy);
        this.fg.setAttribute('cx', cx);
        this.fg.setAttribute('cy', cy);
    };

    // minuts and minutes are selected
    ClockPicker.prototype.done = function() {
        raiseCallback(this.options.beforeDone);
        value = leadingZero(this.minuts*frangesMin);
        this.input.prop('value', value);
        $('.clockpicker-span-minuts').text(value);

        raiseCallback(this.options.afterDone);
    };
    ClockPicker.prototype.remove = function() {
        this.element.removeData('clockpicker');
        this.input.off('focus.clockpicker click.clockpicker');
        this.addon.off('click.clockpicker');
        this.rellotge.remove();
    };


    // Extends $.fn.clockpicker
    $.fn.clockpicker = function(option){
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function(){
            var $this = $(this),
                data = $this.data('clockpicker');
            if (! data) {
                var options = $.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
                $this.data('clockpicker', new ClockPicker($this, options));
            } else {
                // Manual operatsions. show, hide, remove, e.g.
                if (typeof data[option] === 'function') {
                    data[option].apply(data, args);
                }
            }
        });
    };
}());
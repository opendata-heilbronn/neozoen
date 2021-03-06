(function (angular, app) {
    'use strict';

    /**
     * super simple carousel
     * animation between panes happens with css transitions
     */
    function Carousel(element, scope) {
        var self = this;
        element = $(element);

        var container = element.find('ul');
        var panes = container.find('li');

        var pane_width = 0;
        var pane_count = panes.length;

        var current_pane = 0;


        /**
         * initial
         */
        this.init = function () {
            setPaneDimensions();

            $(window).on("load resize orientationchange", function () {
                setPaneDimensions();
            })
        };


        /**
         * set the pane dimensions and scale the container
         */
        function setPaneDimensions() {
            pane_width = element.width();
            panes.each(function () {
                $(this).width(pane_width);
            });
            container.width(pane_width * pane_count);
        };


        /**
         * show pane by index
         */
        this.showPane = function (index, animate, ignoreUrl) {
            // between the bounds
            index = Math.max(0, Math.min(index, pane_count - 1));
            current_pane = index;

            var offset = -((100 / pane_count) * current_pane);
            setContainerOffset(offset, animate);
            if (!ignoreUrl) {
                scope.active = index;
                scope.$apply();
            }
        };


        function setContainerOffset(percent, animate) {
            container.removeClass("animate");

            if (animate) {
                container.addClass("animate");
            }

            if (Modernizr.csstransforms3d) {
                container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
            }
            else if (Modernizr.csstransforms) {
                container.css("transform", "translate(" + percent + "%,0)");
            }
            else {
                var px = ((pane_width * pane_count) / 100) * percent;
                container.css("left", px + "px");
            }
        }

        this.next = function () {
            return this.showPane(current_pane + 1, true);
        };
        this.prev = function () {
            return this.showPane(current_pane - 1, true);
        };


        function handleHammer(ev) {
            // disable browser scrolling
            //ev.gesture.preventDefault();

            switch (ev.type) {
                case 'dragright':
                case 'dragleft':
                    // stick to the finger
                    var pane_offset = -(100 / pane_count) * current_pane;
                    var drag_offset = ((100 / pane_width) * ev.gesture.deltaX) / pane_count;

                    // slow down at the first and last pane
                    if ((current_pane == 0 && ev.gesture.direction == "right") ||
                        (current_pane == pane_count - 1 && ev.gesture.direction == "left")) {
                        drag_offset *= .4;
                    }

                    setContainerOffset(drag_offset + pane_offset);
                    break;

                case 'swipeleft':
                    self.next();
                    ev.gesture.stopDetect();
                    break;

                case 'swiperight':
                    self.prev();
                    ev.gesture.stopDetect();
                    break;

                case 'release':
                    // more then 50% moved, navigate
                    if (Math.abs(ev.gesture.deltaX) > pane_width / 2) {
                        if (ev.gesture.direction == 'right') {
                            self.prev();
                        } else {
                            self.next();
                        }
                    }
                    else {
                        self.showPane(current_pane, true);
                    }
                    break;
            }
        }

        new Hammer(element[0], { dragLockToAxis: true, dragBlockHorizontal: true }).on("release dragleft dragright swipeleft swiperight", handleHammer);
    }

    angular.module('app').directive('carousel', function () {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                active: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch('model', function () {
                    var carousel = new Carousel(element.find('#carousel'), scope);
                    carousel.init();
                    carousel.showPane(scope.active, false, true);
                });
            }
        };
    });
})(angular, app);
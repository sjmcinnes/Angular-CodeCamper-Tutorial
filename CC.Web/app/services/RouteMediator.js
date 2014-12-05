(function () {
    'use strict';

    var serviceId = 'routeMediator';
    var handleRouteChangeError = false;

    angular
        .module('app')
        .factory(serviceId, routeMediator);

    routeMediator.$inject = ['$rootScope', '$location', 'config', 'logger'];

    function routeMediator($rootScope, $location, config, logger) {
        var service = {
            setRoutingHandlers: setRoutingHandlers
        };

        return service;

        function setRoutingHandlers() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function handleRoutingErrors() {
            $rootScope.$on('$routeChangeError', 
                function (event, current, previous, rejection) {

                    if (handleRouteChangeError) { return; }

                    handleRouteChangeError = true;
                    var msg = 'Error routing: ' + 
                        (current && current.name) +
                        '. ' + (rejection.msg || '');
                    logger.logWarning(msg, current, serviceId, true);
                    $location.path('/');
                });
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
           function (event, current, previous) {
               handleRouteChangeError = false;
               var title = config.docTitle + ' ' + (current.title || 'CC');
               $rootScope.title = title;
           }
         );

        }
    }
})();
(function () {
    'use strict';
    var controllerId = 'sessions';

    angular
        .module('app')
        .controller('sessions', sessions);

    sessions.$inject = ['$routeParams','common','config','datacontext']; 

    function sessions($routeParams, common, config, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var applyFilter = function () { };
        var keyCodes = config.keyCodes;

        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Sessions';
        vm.search = search;
        vm.sessionsSearch = $routeParams.search || '';
        vm.sessionsFilter = sessionsFilter;
        vm.filteredSessions = [];
        vm.sessions = [];
        vm.refresh = refresh;
        activate();

        function activate() {
            common.activateController([getSessions()], controllerId)
                .then(function () {
                    log('Activated Sessions View');
            });
        }

        function getSessions(forceRefresh) {
            return datacontext.getSessionPartials(forceRefresh).
                then(function (data) {
                    vm.sessions = vm.filteredSessions = data;
                    applyFilter = common.createSearchThrottle(vm, 'sessions');
                    if (vm.sessionsSearch) { applyFilter(true); }
                return vm.filteredSessions;
            });
        }

        function refresh() {
            getSessions(true);
        }

        function search($event) {
            if ($event.keyCode === keyCodes.esc) {
                vm.sessionsSearch = '';
                applyFilter(true);
            }
            else {
                applyFilter();
            }
        }

        function sessionsFilter(session) {
            var textContains = common.textContains;
            var searchText = vm.sessionsSearch;
            var isMatch = searchText ?
                textContains(session.title, searchText)
                    || textContains(session.tagsFormatted, searchText)
                    || textContains(session.room.name, searchText)
                    || textContains(session.speaker.fullName, searchText)
                    || textContains(session.track.name, searchText)
                : true;
            return isMatch;
        }
    }
})();

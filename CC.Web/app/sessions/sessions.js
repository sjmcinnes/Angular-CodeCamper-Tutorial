﻿(function () {
    'use strict';
    var controllerId = 'sessions';

    angular
        .module('app')
        .controller('sessions', sessions);

    sessions.$inject = ['common','datacontext']; 

    function sessions(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Sessions';
        vm.sessions = [];
        vm.refresh = refresh;
        activate();

        function activate() {
            common.activateController([getSessions()], controllerId)
                .then(function () { log('Activated Sessions View'); });
        }

        function getSessions(forceRefresh) {
            return datacontext.getSessionPartials(forceRefresh).
                then(function (data) {
                return vm.sessions = data;
            });
        }

        function refresh() {
            getSessions(true);
        }
    }
})();

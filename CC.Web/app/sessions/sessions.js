(function () {
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
        activate();

        function activate() {
            common.activateController([getSessions()], controllerId)
                .then(function () { log('Activated Sessions View'); });
        }

        function getSessions() {
            return datacontext.getSessionPartials().then(function (data) {
                return vm.sessions = data;
            });
        }
    }
})();
